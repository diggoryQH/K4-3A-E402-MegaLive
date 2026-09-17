# # AI SPEC - VLearn Quiz Ôn Tập Có Nguồn - Nhóm C3 - Zone E402

#
Hướng: [X] A — VLearn  [ ] B — Trợ lý Học viên  [ ] C — Làn mở
Loại: [ ] Tối ưu tính năng có sẵn  [X] Tính năng mới

## §1. User & Job
- Job executor + workflow:
  - Học viên vừa học xong một bài/lab trên VLearn và cần ôn lại trước quiz hoặc trước buổi học tiếp theo.
  - Workflow hiện tại: mở lại VLearn, đọc slide/transcript, hỏi bạn hoặc AI riêng, rồi tự đoán mình yếu phần nào.

- Core JTBD:
  - Khi vừa học xong một nội dung trên VLearn, học viên muốn tự kiểm tra nhanh mình đã hiểu đúng chưa và biết cần đọc lại đâu, để ôn đúng trọng tâm thay vì đọc lại toàn bộ slide.

- Problem statement:
  - Học viên đọc xong bài nhưng khó tự tạo câu hỏi kiểm tra và khó biết mình đang thiếu phần nào, dẫn đến ôn tràn lan hoặc tự tin sai trước quiz.

- Evidence:
  - Data VLearn có 13.494 lượt hỏi-đáp giữa học viên và AI tutor trong đó có 89,9% các câu hỏi liên quan trực tiếp tới nội dung bài học, cho thấy nhu cầu hỏi lại kiến thức bài học là hành vi đã tồn tại.
  - Theo `data/vlearn-pack/README.md`, 28% câu trả lời không có trích dẫn nguồn (`has_citation = False`: 3.781/13.494), nên output học tập cần có source để học viên tự kiểm chứng.
  

## §2. Impact & quyết định chọn
| Ứng viên | Bao nhiêu người gặp | Tần suất | Mỗi lần tốn gì | Khả thi | Chọn? |
|---|---:|---|---|---|---|
| A. Khó khăn trong việc ôn tập, cần công cụ để ôn tập đúng trọng tâm | 12/22 người khảo sát gặp vấn đề này | Sau mỗi bài | Mất thời gian đọc lại toàn bộ, không biết yếu phần nào | Cao: AI tạo câu hỏi, đáp án, giải thích, nguồn | Chọn |
| B. Hướng dẫn nội dung lab nhưng không hiểu  | 1/22 người khảo sát gặp vấn đề này | Sau mỗi lab | Mất nhiều thời gian để bắt đầu lab | Cao nhưng khó triển khai do có nhiều câu hỏi người dùng không được đề cập trong tài liệu lab | Không chọn  |
| C. Khó liên hệ labcoach  | 0/22 người gặp vấn đề này | Theo buổi/lớp | Giảng viên khó nắm lớp | Cao nhưng đã có nền tàng khác thay thế | Không chọn |


VLearn Quiz Ôn Tập: AI đọc nội dung bài/slide đang chọn, tạo 20 câu quiz, mỗi câu có đáp án, giải thích và nguồn đọc lại. Sau khi học viên làm bài, hệ thống chỉ ra phần cần ôn lại.

## §3. Giải pháp tương tự đã nghiên cứu
Quizlet AI:
  - Flow: biến nội dung học thành flashcard/quiz để tự kiểm tra.
  - Đáng học: quiz ngắn giúp học viên biết mình hiểu đến đâu.
  - Đáng né: nếu không có source, học viên khó quay lại đúng nội dung gốc.
  - Mình khác: mỗi câu có source đọc lại trong VLearn.gì

## §4. Thiết kế
- Lát cắt MỘT :
  - Một học viên vừa học xong một bài trên VLearn · chọn một slide/lab cần ôn · AI tạo 20 câu quiz có đáp án, giải thích và source đọc lại · học viên làm quiz và biết mình cần ôn lại phần nào.

- Non-goals:
  - Không xây lại toàn bộ VLearn.
  - Không chấm điểm chính thức hay lưu điểm học viên.
  - Không tạo đáp án cho quiz/kiểm tra thật.
  - Không dùng dữ liệu cá nhân ngoài data pack.

- Mức prototype:
  - [] Sketch  [x] Mock  [ ] Working
  - Phần thật: `codebase/server.mjs` gọi OpenAI Responses API để tạo 20 câu quiz từ nội dung bài học.
  - Phần mock: UI VLearn, slide preview.

- Automation:
  - [x] Augment  [x] Conditional  [ ] Automate
  - Lý do: sai kiến thức học tập là lỗi đắt. AI được tạo quiz khi có nội dung/source.

- §4b. Nguyên tắc đã áp dụng):
 
| Nguyên tắc | Áp cụ thể vào đâu trong prototype |
|---|---|
| HAX G1 - Làm rõ hệ thống làm được gì | Màn hình đầu nói rõ đây là flow tạo quiz ôn tập từ nội dung VLearn |
| HAX G2 - Làm rõ nó làm tốt đến đâu | Mỗi câu hỏi có source; trace AI hiện provider/model/trace id |
| HAX G10 - Thu hẹp phạm vi khi nghi ngờ | Case output sai nội dung bài giảng cần check lại |
| HAX G11 - Giải thích vì sao | Mỗi câu có explanation và source đọc lại |
| PAIR - Explainability + Trust | Học viên không cần tin AI tuyệt đối; có source để tự kiểm chứng |


## §5. Kiểu lỗi — 4 lớp chỗ khó + kịch bản (≥8) [bảng theo guide §2.5]

| Tình huống cụ thể | Lớp | Hành vi mong muốn | Nguyên tắc |
|---|---|---|---|
| Học viên chọn đúng bài Quick Problem Card rồi bấm "Tạo quiz" | Nguồn sự thật / căn cứ | Tạo 20 câu bám 6 ô của Quick Problem Card; mỗi câu có đáp án, giải thích và source đọc lại rõ ràng | G2, G11 |
| Học viên chưa chọn bài nào nhưng bấm "Tạo quiz" | Mơ hồ / thiếu thông tin | Không gọi AI ngay; yêu cầu học viên chọn một bài/slide trước khi tạo quiz | G1, G10 |
| Học viên chọn nhầm bài khác với bài vừa học, ví dụ chọn bài Agent trong khi muốn ôn Quick Problem Card | Mơ hồ / sai ngữ cảnh người dùng | Tạo quiz đúng theo bài đã chọn và hiển thị rõ phạm vi "Quiz được tạo từ bài..." để học viên phát hiện chọn nhầm | G1, G2 |
| Học viên chọn bài có nội dung quá ít hoặc không có transcript/slide đủ rõ | Nguồn sự thật / không đủ căn cứ | Không bịa đủ 20 câu; báo không đủ nội dung để tạo quiz chất lượng và đề nghị chọn bài khác | G10, G11 |
| Source có hai đoạn dễ nhầm: "problem statement" và "solution direction" ở gần nhau | Nguồn sự thật / nhiễu ngữ cảnh | Câu hỏi phải phân biệt problem không cài sẵn solution; không trộn nội dung giải pháp vào phần định nghĩa vấn đề | G2, G11 |
| Source có nội dung đúng nhưng thiếu metadata slide/page, chỉ có tên bài | Nguồn sự thật / chất lượng citation | Vẫn tạo quiz nếu đủ nội dung, nhưng source phải ghi mức chính xác cao nhất có sẵn; không tự bịa số slide/page | G2, G11 |
| Bài được chọn rất dài, có nhiều chủ đề nhỏ trong cùng một transcript | Nguồn sự thật / quá tải ngữ cảnh | Tóm phạm vi theo các topic chính của bài, không lấy vài đoạn đầu làm toàn bộ; bộ quiz phải phủ nhiều phần quan trọng | G2, G10 |
| Học viên bấm "Tạo quiz" nhiều lần liên tiếp khi AI đang chạy | Trạng thái hệ thống / thao tác lặp | Khóa nút hoặc hiện trạng thái đang tạo; không tạo nhiều bộ quiz trùng nhau gây nhiễu kết quả | G1 |
| Nội dung bài/slide chứa câu giống chỉ thị như "ignore previous instructions" hoặc text từ ví dụ prompt | Ngoài phạm vi / prompt injection từ nguồn | Xem đó là nội dung học, không phải lệnh điều khiển hệ thống; vẫn chỉ tạo quiz có source từ bài đã chọn | G1, G10 |
| Bài được chọn có nhắc "quiz thật", "đáp án kiểm tra", hoặc ví dụ gian lận trong nội dung học | Ngoài phạm vi / ranh giới học tập | Chỉ tạo câu hỏi ôn tập khái niệm từ source; không biến thành đáp án cho bài kiểm tra thật hoặc mẹo gian lận | PAIR control, G1 |
| Bài/slide có thông tin cá nhân hoặc dữ liệu lớp không cần cho mục tiêu ôn tập | Ngoài phạm vi / riêng tư | Không đưa thông tin cá nhân vào câu hỏi; chỉ hỏi kiến thức học tập và source học lại | G1 |
| AI cite sai slide/page, ví dụ nội dung ở slide 28/76 nhưng source chỉ ghi "Quick Problem Card" | Đặc thù domain / source precision | Xem là lỗi fail; cần sửa prompt để source gồm tên bài + slide/page/ô nội dung khi metadata có sẵn | G2, G11 |
| Câu hỏi quá khó so với học viên mới, ví dụ bắt suy luận framework ngoài bài học | Đặc thù domain / mức độ khó | Điều chỉnh về mức nhận biết, hiểu, áp dụng nhẹ; đáp án nhiễu hợp lý nhưng không đánh đố ngoài source | PAIR mental model, G10 |
| Bộ 20 câu bị lệch, hỏi quá nhiều về một ô và bỏ qua các ô còn lại của Quick Problem Card | Đặc thù domain / coverage | Phân bố câu hỏi tối thiểu qua nhiều topic chính; sau khi làm bài phải chỉ ra đúng phần cần đọc lại | G2, G11 |



## §6. Bốn đường đi của trải nghiệm
- Happy path:
  - Học viên chọn nội dung Quick Problem Card. AI tạo 20 câu, học viên làm, xem câu sai và source đọc lại.

- Low-confidence:
  - Nội dung ngắn/mơ hồ. Hệ thống cần ghi rõ trace hoặc hỏi lại trước khi tạo quiz.

- Failure/không căn cứ:
  - User đòi nội dung không có trong source. Hệ thống từ chối hoặc nói không đủ căn cứ.

- Correction:
  - Học viên thấy quiz lệch nội dung, quay lại sửa nội dung chọn và tạo lại.

- Ngoài phạm vi:
  - Yêu cầu làm bài/quiz thay, hack điểm, thông tin cá nhân: từ chối và hướng về ôn tập.



## §7. Kiểm thử
- Chiều chất lượng + định nghĩa kiểm chứng:
  - Factuality/có căn cứ: câu hỏi, đáp án đúng và explanation chỉ dựa trên nội dung được cấp.
  - Citation/source: mỗi câu có source đọc lại; nếu không đủ source thì không được bịa.
  - Helpfulness: quiz giúp học viên biết mình cần ôn lại topic nào.
  - Safe failure:  AI tạo nội dung sai mục đích.
  - Coverage: bộ 20 câu phủ ít nhất 4 topic liên quan, không lặp một ý quá nhiều.

- Golden set:
  - File: `eval/golden-set.csv`.
  - Số case: 20.
  - Bao gồm: 10 case thường phát triển từ chatlog, 2 case không có nguồn, 2 case mơ hồ, 2 case ngoài phạm vi, 2 case citation/domain, 2 case hiếm/prompt injection.

- Quality bar:
  - Đạt khi >=75% case trong golden set pass.
  - Điều kiện cứng: 100% câu hỏi kiến thức phải có source hoặc từ chối/hỏi lại khi không đủ căn cứ; không chấp nhận bịa source.

- Kết quả các lượt chạy:
  - Run 1: 17/20 pass = 85%, xem `eval/run-1-results.csv` và `eval/run-1-summary.md`.
  - Failure lớn nhất: source precision chưa ổn định, một số câu chỉ ghi "Quick Problem Card" thay vì "VLearn Bài 2 DAY02, slide 28/76".
  - Sửa sau Run 1: ép source gồm tên bài + slide/page; thêm rule input quá ngắn; thêm coverage rule cho topic.



## §8. Phân công & kế hoạch
- Phân công :
  - Ngụy Quang Hùng - Lead/Product: chốt hướng Track A, problem statement, lát cắt một câu, quality bar, tổng hợp nội dung nộp checkpoint và kiểm tra `spec.md`.
  - Nguyễn Văn Việt - Evidence/QA: rà soát evidence, kiểm tra tính nhất quán giữa `spec.md`, `eval/`, video CP3; hỗ trợ phát hiện lỗi còn lại và phần chưa xong cho CP4/CP5.
  - Hà Huy Nhất - AI/Backend: phụ trách `codebase/server.mjs`, setup `.env`, gọi OpenAI API thật, ghi và kiểm tra AI trace/log trong `eval/ai-traces.jsonl`.
  - Đinh Xuân Quyền - Prototype UI/Evaluation: xây flow prototype trong `codebase/index.html`; phụ trách `eval/` gồm golden set 20 case, kết quả run 1 và phân tích 17/20 = 85%.

- Cách chạy prototype CP3:
  - Đặt `OPENAI_API_KEY` trong `.env`.
  - Chạy `node codebase/server.mjs`.
  - Mở `http://localhost:4173`, bấm "Tạo 20 câu quiz bằng AI".
  - Trace thật sẽ được append vào `eval/ai-traces.jsonl`.

- Willing users:
  - [TÊN USER 1] - học viên ngoài nhóm, đồng ý dùng thử trước CP5.
  - [TÊN USER 2] - học viên ngoài nhóm, đồng ý dùng thử trước CP5.

## §9. Changelog


| Thời điểm | Đổi gì | Vì sao |
|---|---|---|
| CP1 | Chọn Track A, nhu cầu ôn lại nội dung VLearn có source | Data VLearn có nhiều hỏi-đáp và pain citation |
| CP2 | Tạo prototype mock bấm được: chọn nội dung -> tạo quiz -> làm bài -> xem source đọc lại | Cần show flow trước khi gắn AI |
| CP3 | Thêm `codebase/server.mjs`, app gọi `/api/generate-quiz`, tạo `eval/golden-set.csv`, `eval/run-1-results.csv`, `eval/ai-traces.jsonl` | Đáp ứng yêu cầu AI thật + đo lượt đầu |
| CP3 Run 1 | 17/20 pass = 85%; failure lớn nhất là source precision | Cơ sở để sửa prompt trước CP4/CP5 |
| CP4 | Chốt quality bar >=75%, điều kiện cứng về source, và phần chưa xong trước CP5 | Khóa chuẩn "đạt" để không đổi sau khi đã thấy kết quả |
