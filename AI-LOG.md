# Nhật ký sử dụng AI — PA#1

**Công cụ:** Codex; công cụ đọc PDF, tra cứu web và chỉnh sửa Markdown.

**Phạm vi hỗ trợ:** Biên tập proposal từ ý tưởng nhóm; đề xuất công nghệ, chi phí, lịch nội bộ và phân công; đối chiếu rubric/đề cương; soạn báo cáo tự chấm.

**Các thay đổi qua góp ý của người dùng:**

- Sau góp ý của giảng viên và trao đổi với người dùng, thu hẹp vào sinh viên lập lịch đi chơi trong ngày cho nhóm bạn tại TP.HCM; đưa lịch cộng đồng và cập nhật giao thông/thời tiết thời gian thực ra ngoài phạm vi học kỳ.
- Giữ React + JavaScript; điền họ tên/MSSV, chia mỗi người hai task và tự xếp ngày nội bộ theo yêu cầu.
- Ghi rõ tình huống người dùng và thiệt hại 480.000 đồng là ví dụ giả định.
- Làm rõ LLM trích xuất/đề xuất địa điểm và bản nháp lịch; API cung cấp dữ liệu; code tính chi phí, giờ đến/rời và kiểm tra ràng buộc. Dữ liệu thiếu cần bổ sung, địa điểm mơ hồ cần người dùng xác nhận.
- Bổ sung kế hoạch PA#4 với ít nhất 10 ca có đáp án đã kiểm chứng, đo riêng lỗi LLM và lỗi còn lọt sau kiểm tra, đồng thời đo khả năng chấp nhận lịch hợp lệ. Đây là kế hoạch, chưa phải kết quả chạy eval.
- Theo góp ý tiếp theo của người dùng, sửa bảng thiệt hại để ghi rõ nguyên nhân từ AI, người dùng hoặc biến động bên ngoài, dựa trên thông tin hệ thống có tại thời điểm đề xuất. Đầu vào mơ hồ phải được hỏi lại; AI tự chốt thiếu căn cứ là lỗi AI. Giá tăng, kẹt xe và người dùng ở lại lâu hơn được đánh giá bằng phản ứng sau khi nhận cập nhật; code tính/kiểm tra sai được ghi riêng là lỗi hệ thống.
- Sửa đầu ra PA#2, PA#5, PA#6 theo đề cương; bổ sung yêu cầu eval, giới hạn, xác nhận và dữ liệu gửi LLM.
- Rút gọn báo cáo tự chấm thành bảng điểm, bằng chứng và phần chưa hoàn thành.
- Qua các lần góp ý tiếp theo, giữ ba ca đặc trưng: vượt ngân sách, ngoài giờ/không đi kịp và nhầm địa điểm; làm rõ nguồn giá, danh mục phí độc lập với bản nháp AI và hành vi mong đợi của từng ca.
- Sau rà rubric, bổ sung xác nhận giá cũ cho ngày đi, khả năng khắc phục thiệt hại và hạn nội bộ; đề xuất Google Maps JS + Places (New) + Routes theo tài liệu chính thức, kèm kế hoạch thử dữ liệu tại PA#2. Đồng bộ tên/MSSV theo proposal và cập nhật tự chấm 98/100; chưa gọi thử API hoặc chạy eval.
- Bổ sung LLM tìm thêm điểm đến; theo ảnh hướng dẫn và góp ý mới, rút mục 2 thành luồng ngắn và bảng bốn ví dụ, thay ca gợi ý trái sở thích bằng quán không tồn tại. Bỏ số tiền/phút minh họa chưa có căn cứ, nêu rõ khoản chi/cơ hội bị mất, người chịu thiệt, khả năng khắc phục và bước xác minh/hỏi thêm nguồn hoặc gợi ý khác.
- Theo yêu cầu tiếp theo, giữ bốn dòng riêng và cụ thể hóa mỗi lỗi bằng một ví dụ có số tiền, ghi rõ giá/cước giả định và cách tính; ca đầu dùng giá TikTok cũ và giữ cách xử lý giá đã thống nhất, ca hai bổ sung thời gian trễ và cách tính lại lịch khi được báo trễ.
- Theo yêu cầu mới, rút còn một ca giá TikTok cũ, làm rõ người chịu thiệt, số tiền, khả năng khắc phục, ảnh hưởng tới hệ thống, cách phát hiện và xác nhận giá có nguồn trước khi chốt lịch; điều chỉnh kế hoạch PA#4 theo ca này.
- Làm rõ lỗi ở mức tính năng tạo lịch: vi phạm yêu cầu đã chốt, làm lệch kế hoạch; giữ ca giá cũ để lượng hóa hậu quả, bổ sung đối chiếu từng bản lịch với yêu cầu và lưu phần vi phạm/lần sửa để theo dõi.
- Đổi kế hoạch sang sáu checkpoint CP1-CP6 với các cột Target Date, Key Deliverables và Owner. Điều chỉnh task để CP4 chỉ cam kết itinerary MVP theo ràng buộc, không mâu thuẫn với phần ngoài phạm vi là tối ưu tuyến đường toàn cục; phân công cân bằng hai checkpoint cho mỗi thành viên.
- Tách "Người dùng mục tiêu" khỏi "Tình huống đại diện" để phân biệt tệp người dùng với câu chuyện của An. Viết lại tính năng cốt lõi thành luồng năm bước có thể theo dõi từ input đến human confirmation. Sửa chi phí: Gemini dùng paid tier 3,10 USD cho 1.000 lượt, còn Google Maps Platform được giới hạn trong hạn mức miễn phí.

**Kiểm tra đã làm:** Đối chiếu tài liệu, phép tính, phân công, liên kết và ước tính bố cục hai trang. Chưa triển khai sản phẩm hoặc chạy bộ kiểm thử dự kiến.
