import { createServer } from "node:http";
import { readFile, appendFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

async function loadEnvFile() {
  try {
    const envText = await readFile(join(repoRoot, ".env"), "utf8");
    for (const line of envText.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const separator = trimmed.indexOf("=");
      if (separator === -1) continue;
      const key = trimmed.slice(0, separator).trim();
      const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  } catch {
    // .env is optional; environment variables can still be set in the shell.
  }
}

await loadEnvFile();

const port = Number(process.env.PORT || 4173);
const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolveBody, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Request body qua lon."));
      }
    });
    req.on("end", () => resolveBody(body));
    req.on("error", reject);
  });
}

function normalizeQuestions(rawQuestions, fallbackSource) {
  if (!Array.isArray(rawQuestions)) {
    throw new Error("AI output khong phai mang cau hoi.");
  }

  const normalized = rawQuestions.slice(0, 20).map((item, index) => {
    const question = String(item.question || "").trim();
    const options = Array.isArray(item.options) ? item.options.map((option) => String(option).trim()) : [];
    const answerIndex = Number(item.answerIndex);
    const explanation = String(item.explanation || "").trim();
    const source = String(item.source || fallbackSource || "").trim();
    const topic = String(item.topic || "On tap").trim();

    if (!question || options.length !== 4 || !Number.isInteger(answerIndex) || answerIndex < 0 || answerIndex > 3 || !explanation || !source) {
      throw new Error(`Cau ${index + 1} thieu truong bat buoc.`);
    }

    return { question, options, answerIndex, explanation, source, topic };
  });

  if (normalized.length !== 20) {
    throw new Error(`AI chi tra ve ${normalized.length}/20 cau.`);
  }

  return normalized;
}

async function callOpenAI({ lessonTitle, source, content }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Thieu OPENAI_API_KEY.");
  }

  const prompt = [
    "Ban la tro ly tao quiz on tap cho VLearn.",
    "Chi dung noi dung nguoi dung cung cap. Khong bia nguon.",
    "Hay tao dung 20 cau quiz trac nghiem tieng Viet.",
    "Moi cau co 4 lua chon, answerIndex tu 0 den 3, explanation ngan, source doc lai, topic.",
    "Tra ve JSON duy nhat theo schema:",
    '{"questions":[{"question":"...","options":["A","B","C","D"],"answerIndex":0,"explanation":"...","source":"...","topic":"..."}]}',
    "",
    `Bai hoc: ${lessonTitle}`,
    `Nguon mac dinh: ${source}`,
    `Noi dung: ${content}`
  ].join("\n");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      input: prompt,
      text: { format: { type: "json_object" } }
    })
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error?.message || "OpenAI API error.");
  }

  const text = payload.output_text || payload.output?.flatMap((item) => item.content || []).find((item) => item.type === "output_text")?.text;
  if (!text) {
    throw new Error("OpenAI response khong co output_text.");
  }

  return JSON.parse(text);
}

async function handleGenerateQuiz(req, res) {
  try {
    const body = JSON.parse(await readBody(req));
    const lessonTitle = String(body.lessonTitle || "VLearn lesson").slice(0, 160);
    const source = String(body.source || "VLearn source").slice(0, 160);
    const content = String(body.content || "").trim();

    if (!content) {
      return sendJson(res, 400, { error: "Can co noi dung de tao quiz." });
    }

    const traceId = `cp3-${Date.now()}`;
    const aiOutput = await callOpenAI({ lessonTitle, source, content });
    const questions = normalizeQuestions(aiOutput.questions, source);
    const trace = {
      traceId,
      provider: "OpenAI Responses API",
      model,
      lessonTitle,
      source,
      contentChars: content.length,
      questionCount: questions.length,
      createdAt: new Date().toISOString()
    };

    await appendFile(join(repoRoot, "eval", "ai-traces.jsonl"), `${JSON.stringify(trace)}\n`, "utf8");
    sendJson(res, 200, { ...trace, questions });
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
}

async function handleStatic(req, res) {
  const pathname = new URL(req.url, `http://localhost:${port}`).pathname;
  const filePath = pathname === "/" ? join(__dirname, "index.html") : join(__dirname, pathname);

  try {
    const file = await readFile(filePath);
    const contentType = filePath.endsWith(".html") ? "text/html; charset=utf-8" : "text/plain; charset=utf-8";
    res.writeHead(200, { "Content-Type": contentType });
    res.end(file);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

const server = createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/generate-quiz") {
    handleGenerateQuiz(req, res);
    return;
  }
  handleStatic(req, res);
});

server.listen(port, () => {
  console.log(`VLearn CP3 prototype: http://localhost:${port}`);
});
