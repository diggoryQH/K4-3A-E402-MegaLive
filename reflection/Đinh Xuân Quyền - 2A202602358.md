# Reflection - Đinh Xuân Quyền - 2A202602358

## Vai trò

Prototype UI/Evaluation.

## Phần phụ trách

- Thiết kế giao diện prototype trong `codebase/index.html`.
- Hoàn thiện flow demo từ chọn bài, tạo quiz, làm bài đến xem kết quả.
- Xây dựng case lỗi, phụ trách `eval/`, kiểm tra case happy/failure.
- Quay video CP3 và CP5.

## AI hỗ trợ thế nào

AI hỗ trợ mình dựng nhanh prototype có đủ luồng chính: chọn bài VLearn, xem preview slide, tạo 20 câu quiz, làm bài, xem kết quả và nguồn đọc lại. Với phần evaluation, AI giúp nhóm chuyển các rủi ro trong spec thành golden set 20 case, bao gồm happy path, citation, input mơ hồ, thiếu nguồn, nội dung ngoài phạm vi và prompt injection.

Khi chạy CP3, nhóm không chỉ nhìn prototype có tạo được quiz hay không, mà còn ghi kết quả vào `eval/run-1-results.csv` và tóm tắt ở `eval/run-1-summary.md`. Kết quả 17/20 giúp nhóm biết prototype đã qua quality bar, nhưng vẫn còn lỗi cần sửa trước demo.

## Một bài học từ case fail của nhóm

Failure đáng nhớ nhất là coverage/source: có case câu hỏi tập trung quá nhiều vào một phần, và case source chỉ ghi "Quick Problem Card" mà thiếu slide/page. Bài học của mình là evaluation phải ép được lỗi lộ ra trước khi demo. Nếu chỉ test happy path thì prototype trông ổn, nhưng golden set mới cho thấy phần nào đang yếu và cần đưa vào prompt, UI hoặc backlog.
