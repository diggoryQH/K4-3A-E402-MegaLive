# Tóm Tắt CP3 Run 1

- Prototype: `codebase/index.html` chạy qua `codebase/server.mjs`.
- AI call trung tâm: tạo 20 câu quiz từ nội dung VLearn được chọn.
- Golden set: `eval/golden-set.csv`, 20 case.
- Kết quả run 1: 17/20 pass = 85%.
- Quality bar trong spec: >=75% case pass; điều kiện cứng là câu hỏi kiến thức phải có source hoặc từ chối khi không đủ căn cứ.

## Failure lớn nhất

Citation precision chưa ổn định: case G17 fail vì một số source chỉ ghi "Quick Problem Card" thay vì ghi rõ "VLearn Bài 2 DAY02, slide 28/76". Lỗi này nguy hiểm vì học viên không quay lại đúng vị trí để đọc lại.

## Sửa tiếp theo

1. Sửa prompt trong `codebase/server.mjs` để source bắt buộc gồm tên bài + slide/page nếu source có sẵn.
2. Thêm rule cho input quá ngắn/mơ hồ: nếu input dưới 8 ký tự và không có selection rõ, hỏi lại trước khi tạo quiz.
3. Thêm ràng buộc coverage: bộ 20 câu phải có ít nhất 4 topic khác nhau và mỗi topic chính có tối thiểu 2 câu.
