# Proposal and Planning — PA#1

**Tên dự án:** Quản lý lịch trình đi du lịch

**Thành viên:** Nguyễn Tiến Luật – 23127221; Đăng Nghi Văn – 23127281; Phạm Chí Bảo Ninh – 23127446.

**Repository:** https://github.com/Tienluat123/WebNC_Proposal

## 1. Người dùng và vấn đề

**Người dùng:** Cá nhân hoặc nhóm có danh sách nơi muốn đi nhưng khó thống nhất ưu tiên và lập lịch phù hợp thời gian, chi phí.

**Tình huống minh họa (giả định):** A lập chuyến đi cuối tuần cho nhóm bốn người với 500.000 đồng/người. Mọi người gửi tên nơi, ảnh/link và ưu tiên khác nhau. Bản đồ chỉ giúp tra từng nơi, bảng tính chỉ cộng chi phí; A vẫn phải gom dữ liệu, kiểm tra giờ mở cửa, sắp lịch và tính lại khi yêu cầu đổi.

**Vấn đề chính:** Người dùng thiếu công cụ tổng hợp địa điểm, dữ liệu di chuyển và ưu tiên thành lịch khả thi về thời gian, giờ mở cửa, ngân sách và dễ điều chỉnh.

## 2. Tính năng LLM và hậu quả khi sai

**Tính năng LLM cốt lõi:** LLM đọc chữ, ảnh hoặc nội dung truy cập được từ link để lấy danh sách địa điểm. API xác minh và bổ sung quãng đường, thời gian, giờ mở cửa, giá, giao thông/thời tiết. Từ dữ liệu này và các bộ lọc đã chọn, LLM tạo/chỉnh lịch JSON gồm thứ tự, giờ đến/rời và chi phí; đồng thời có thể đề xuất thêm nơi đã được API xác minh. LLM chỉ **dùng**, không tự tính dữ liệu API; hệ thống hỏi lại khi mơ hồ và loại dữ liệu cá nhân/bí mật.

**Hậu quả khi LLM sai (giả định):** Cả nhóm chịu thiệt. Lịch 620.000 đồng/người thay vì 500.000 đồng làm bốn người vượt **480.000 đồng**. Đến lúc 17:30 tại nơi đóng cửa lúc 17:00 làm mất chuyến đi; kết thúc lúc 18:30 thay vì 17:00 làm trễ **90 phút**, có thể bỏ điểm cuối. Lỗi sửa được trước khi đi; tiền đã trả và thời gian đã mất thì khó lấy lại.

**Kiểm tra ở PA#4:** Dùng ít nhất 10 ca với dữ liệu API cố định. Logic độc lập cộng chi phí, đối chiếu giờ mở cửa và tính lại thời gian; đo tỷ lệ chấp nhận lịch sai, tiền vượt, điểm ngoài giờ, phút trễ và địa điểm trích xuất/đề xuất sai.

## 3. Phạm vi

**Sẽ làm trong học kỳ:**

- LLM chuyển chữ, ảnh và nội dung truy cập được từ link thành danh sách địa điểm.
- API xác minh địa điểm và cung cấp tọa độ, tuyến, thời gian, giờ mở cửa, giá, giao thông/thời tiết khi có.
- LLM đề xuất thêm địa điểm và tạo/chỉnh lịch theo các bộ lọc đã chọn.
- Kiểm tra ngân sách, giờ mở cửa, thời gian; hiển thị bản đồ và tính lại lịch khi đầu vào đổi.

**Không làm:** Đăng/lưu/tìm lịch cộng đồng; bình luận, đánh giá; đọc link bị giới hạn; bảo đảm giá chính xác khi API không cung cấp. Nếu còn thời gian, nhóm sẽ cải thiện đọc ảnh/link và tối ưu lịch nhiều tiêu chí.

<!-- PAGE_BREAK -->

## 4. Kế hoạch và phân công

| PA | Đầu ra | Phụ trách | Hạn |
| -- | ------ | --------- | --- |
| 1 | Proposal, repo, tự chấm, AI-LOG | Đăng Nghi Văn | 22/10/2026 |
| 2 | Quy ước, lint, tests, CI chặn lỗi | Phạm Chí Bảo Ninh | 05/11/2026 |
| 3 | Prototype LLM, eval cơ bản, hạn mức, xác nhận | Nguyễn Tiến Luật | 19/11/2026 |
| 4 | Eval, guardrails, kiểm thử đối kháng | Đăng Nghi Văn | 03/12/2026 |
| 5 | Bản cuối, logs/metrics/traces, báo cáo sự cố | Nguyễn Tiến Luật | 17/12/2026 |
| 6 | Chuẩn bị và tham gia vấn đáp cá nhân | Phạm Chí Bảo Ninh | 31/12/2026 |

## 5. Hai rủi ro lớn nhất

**Rủi ro 1 – Lịch không khả thi:** LLM có thể vi phạm ngân sách, giờ mở cửa hoặc thời gian. **Giảm thiểu:** chuẩn hóa JSON; dùng logic độc lập kiểm tra và từ chối/tạo lại lịch sai. **Làm ngay:** xây 10 ca hợp lệ, sát giới hạn và xung đột.

**Rủi ro 2 – Sai địa điểm:** Tên trùng, ảnh/link thiếu ngữ cảnh hoặc gợi ý lệch bộ lọc có thể chọn nơi có thật nhưng sai ý. **Giảm thiểu:** API xác minh mọi nơi; người dùng xác nhận khi mơ hồ; loại kết quả không xác minh được. **Làm ngay:** tạo bộ ca rõ ràng, trùng tên, thiếu thông tin và lệch bộ lọc.

## 6. Lựa chọn công nghệ và chi phí

| Công nghệ | Lý do chọn |
| --------- | ---------- |
| React + JavaScript | Giao diện chat, bộ lọc, danh sách/bản đồ đồng bộ. |
| Node.js + Express + Zod | Điều phối LLM/API, giữ khóa, kiểm tra JSON và lịch. |
| API bản đồ/địa điểm/định tuyến | Xác minh nơi; cung cấp bản đồ, tuyến, thời gian, giờ và giá. |
| Gemini 3.5 Flash-Lite | Đọc chữ/ảnh, hiểu yêu cầu, xuất JSON có cấu trúc [1]. |

**Chi phí LLM dự kiến:** Standard [1] giá 0,30 USD/triệu token vào và 2,50 USD/triệu token ra. Với 1.000 lượt × (2.000 vào + 1.000 ra), chi phí là **3,10 USD**, chưa gồm API/hạ tầng.

**Nguồn kiểm tra ngày 18/10/2026:** [1] [Gemini: model](https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash-lite), [bảng giá](https://ai.google.dev/gemini-api/docs/pricing).
