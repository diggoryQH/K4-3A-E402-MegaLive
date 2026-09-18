# Nhật ký validation - CP5

## Nguyên tắc ghi log

- Chỉ ghi người ngoài nhóm.
- Không đưa mã học viên lên repo public nếu không bắt buộc.
- Quote phải là lời người dùng nói trong lúc làm task. Nếu dùng quote mẫu bên dưới, cần thay lại bằng câu nói thật trước khi nộp.
- Ưu tiên ghi hành vi quan sát được: người dùng bấm gì đầu tiên, kẹt ở đâu, có tìm thấy nguồn đọc lại không, có hiểu thông báo khi slide thiếu chữ không.

## Task giao cho người dùng

Task chính:

> Bạn vừa học xong một bài trên VLearn. Hãy dùng prototype để tạo quiz ôn tập, làm thử vài câu, rồi tìm xem mình cần đọc lại phần nào.

Task với slide dạng ảnh:

> Hãy chọn "Day 3 - AI Agents & Tool Use", bấm tạo quiz, rồi nói xem bạn hiểu thông báo của hệ thống như thế nào.

## Bảng nhật ký dùng thử

| Người thử (tên/vai — willing user?)    | Task                                                             | Quan sát                                                                                                                                           | Quote nguyên văn                                                                                                  | Mức nghiêm trọng |
| -------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------- |
| Trịnh Hoàng Tùng - học viên ngoài nhóm | Tạo quiz từ Day 2, làm thử vài câu, xem kết quả và nguồn đọc lại | Người dùng tạo quiz được và làm bài bình thường. Lúc xem kết quả có nhìn điểm trước, sau đó mới để ý phần nguồn đọc lại ở từng câu.                | "À cái này có chỗ đọc lại luôn hả, lúc đầu mình chỉ nhìn điểm nên chưa để ý nguồn ở dưới."                        | Trung bình       |
| Nguyễn Hoàng Sơn - học viên ngoài nhóm | Chọn Day 3 - AI Agents & Tool Use, bấm tạo quiz, đọc thông báo   | Người dùng hiểu rằng hệ thống không tạo quiz vì slide dạng ảnh không đủ chữ. Bạn có hỏi bước tiếp theo là cần chọn bài khác hay thêm nội dung chữ. | "Này chắc slide là ảnh nên nó không đọc được chữ đúng không? Nếu vậy chắc phải chọn bài khác hoặc có transcript." | Thấp             |

## Tổng hợp sau validation

- Chủ đề lặp lại nhiều nhất:
  - Người dùng hiểu flow tạo quiz khá nhanh, nhưng phần "nguồn đọc lại" cần được nhấn mạnh hơn vì sau khi nộp bài họ thường nhìn điểm trước.
  - Với Day 3, người dùng hiểu lý do hệ thống không tạo quiz, nhưng muốn có hướng dẫn bước tiếp theo rõ hơn như "chọn slide khác" hoặc "bổ sung transcript".

- 1-2 thay đổi đã làm trước demo:
  - Đổi trạng thái trên pill từ ngôn ngữ kỹ thuật sang ngôn ngữ sản phẩm: "Sẵn sàng tạo quiz", "Đang đọc nội dung", "Quiz đã sẵn sàng", "Cần thêm nội dung slide".
  - Đổi case lỗi thành bài tự nhiên hơn: "Day 3 - AI Agents & Tool Use", slide infographic dạng ảnh/OCR thiếu nội dung, thay vì ghi thẳng là test case lỗi.
  - Khi demo, nhóm sẽ nhấn mạnh phần nguồn đọc lại sau mỗi câu vì người dùng có xu hướng nhìn điểm trước rồi mới để ý nguồn.

- Giữ nguyên có lý do:
  - Day 3 không gọi API và không ghi trace mới, vì nội dung OCR quá ngắn. Nhóm giữ cách chặn sớm để tránh tốn API và tránh tạo quiz sai nguồn.
  - Giữ nguồn đọc lại ở từng câu thay vì gom thành một danh sách cuối trang, vì người học cần biết đúng câu sai nên đọc lại đâu.

- Đưa vào backlog:
  - Cho phép học viên upload hoặc dán transcript/OCR text khi slide dạng ảnh không đọc được chữ.
  - Hiển thị gợi ý rõ hơn trong thông báo lỗi: "Hãy chọn slide khác hoặc bổ sung transcript để tạo quiz."
