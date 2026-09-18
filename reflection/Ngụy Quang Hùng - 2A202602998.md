# Reflection - Ngụy Quang Hùng - 2A202602998

## Vai trò

Lead/Product.

## Phần phụ trách

- Trưởng nhóm, chốt hướng Track A và lát cắt sản phẩm.
- Phân công công việc và theo dõi tiến độ checkpoint.
- Rà soát `README.md`, `spec.md`, prototype, `eval/` và video trước khi nộp.
- Chốt problem statement, quality bar và nội dung trình bày tổng thể của nhóm.

## AI hỗ trợ thế nào

AI hỗ trợ mình trong việc biến dữ kiện rời rạc thành một spec có cấu trúc: user/job, problem statement, non-goals, failure modes, quality bar và changelog. Nhờ có AI, nhóm thử được nhiều cách diễn đạt vấn đề nhanh hơn, sau đó chọn lại hướng hẹp nhất: tạo quiz ôn tập từ nội dung VLearn, mỗi câu có giải thích và nguồn đọc lại.

Phần quan trọng là AI không thay nhóm quyết định sản phẩm. Quyết định chọn Track A đến từ evidence trong data VLearn và khảo sát: học viên có nhu cầu hỏi lại nội dung bài học, nhưng nếu thiếu source thì khó tự kiểm chứng. Vì vậy quality bar được chốt là >=75% case pass, kèm điều kiện cứng: câu hỏi kiến thức phải có source hoặc từ chối/hỏi lại khi không đủ căn cứ.

## Một bài học từ case fail của nhóm

Run 1 đạt 17/20, vượt quality bar, nhưng vẫn fail ở citation precision. Bài học của mình là số pass tổng thể không được che mất lỗi có rủi ro cao. Với bài toán học tập, một lỗi source sai hoặc mơ hồ có thể làm người học ôn nhầm, nên product spec phải ghi rõ "source precision" là điều kiện chất lượng riêng, không chỉ là chi tiết hiển thị.
