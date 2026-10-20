# Proposal and Planning — PA#1

**Tên dự án:** Quản lý lịch trình đi du lịch

**Thành viên:** Nguyễn Tiến Luật – 23127221; Đặng Nghi Văn – 23127281; Phạm Chí Bảo Ninh – 23127446.

**Repository:** https://github.com/Tienluat123/WebNC_Proposal

## 1. Người dùng và vấn đề

**Người dùng:** Một người điều phối phụ trách lập lịch đi du lịch (trong ngày hoặc nhiều ngày tại một thành phố/tỉnh ở Việt Nam) cho nhóm bạn, có danh sách nơi muốn đi nhưng khó phân bổ theo ngày, thống nhất ưu tiên và cân đối thời gian, chi phí.

**Tình huống minh họa (giả định):** Sinh viên A lập lịch đi Đà Lạt 2 ngày 1 đêm (từ 08:00 ngày 1 đến 17:00 ngày 2) cho nhóm 4 người, ngân sách tại điểm đến là 1.500.000 đồng/người (gồm lưu trú, ăn uống, vé và di chuyển nội bộ). Mọi người gửi tên quán, ảnh chụp màn hình review/menu, link công khai và sở thích khác nhau. Hiện A phải gom thông tin, tra bản đồ để xếp các điểm gần nhau vào cùng ngày quanh khách sạn, kiểm tra giờ mở cửa và cộng chi phí bằng bảng tính; khi nhóm yêu cầu đổi điểm hoặc đổi nơi ở, A phải tính lại toàn bộ lịch các ngày.

**Vấn đề chính:** Người điều phối thiếu công cụ tổng hợp địa điểm phi cấu trúc, dữ liệu di chuyển, điểm lưu trú và ưu tiên thành lịch trình nhiều ngày khả thi về tuyến đường, giờ mở cửa, ngân sách và dễ điều chỉnh.

## 2. Tính năng LLM và hậu quả khi sai

**Tính năng:** LLM đọc chữ, ảnh hoặc nội dung truy cập được từ link để lấy danh sách địa điểm (có thể tìm thêm). API xác minh và bổ sung quãng đường, thời gian, giờ mở cửa, giá, giao thông/thời tiết. Từ dữ liệu này và các bộ lọc đã chọn, LLM tạo/chỉnh lịch JSON gồm thứ tự, giờ đến/rời và chi phí; đồng thời có thể đề xuất thêm nơi đã được API xác minh. LLM chỉ dùng, không tự tính dữ liệu API; hệ thống hỏi lại khi mơ hồ và loại dữ liệu cá nhân/bí mật.

**Khi LLM sai:** Lịch đề xuất vi phạm ngân sách, khung giờ hoặc điểm đến đã chốt, khiến nhóm phải chi thêm, trễ lịch hoặc bỏ hoạt động dự kiến. LLM đối chiếu giá, giờ mở cửa với nguồn của quán, địa chỉ và thời gian đi với dữ liệu bản đồ; chỉ ra lỗi kèm minh chứng và sửa lịch theo yêu cầu đã chốt. LLM rà lại bản sửa, trình bày nguồn và chênh lệch tiền/giờ để người dùng xác nhận; thiếu dữ kiện thì hỏi thêm, chưa chốt.

**Ví dụ giả định về ngân sách:** AI coi giá 100.000 đồng/người trong video TikTok cũ là giá hiện tại mà chưa kiểm tra lại, rồi đề xuất lịch vừa đủ ngân sách. Nếu lỗi lọt qua kiểm tra, đến quán nhóm mới biết giá đã tăng lên 140.000 đồng/người.

| Cần làm rõ                      | Nội dung                                                                                                                                                                                      |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ai chịu hậu quả?                | Cả nhóm 4 người phải chi thêm; người điều phối phải điều chỉnh lịch để cân đối ngân sách.                                                                                                     |
| Thiệt hại và khả năng khắc phục | Nhóm vượt **160.000 đồng** ((140.000 − 100.000) × 4). Sửa được lịch trước khi đi; tiền đã chi khó thu hồi.                                                                                    |
| Ảnh hưởng tới hệ thống          | Ứng dụng vẫn hoạt động, nhưng lịch này không đáp ứng ngân sách; cần tính lại, tốn thêm thời gian và chi phí xử lý. |
| Phát hiện và xử lý              | Giá cần nguồn/ngày/đơn vị; quá 6 tháng hoặc thiếu phải hỏi. Đối chiếu giá với menu/nguồn của quán cho ngày đi. Cộng đủ phí đã nhập, không tự điền 0.                                          |
| Xác nhận của người dùng         | Trước khi chốt lịch, người điều phối kiểm tra nguồn giá mới và xác nhận tổng chi. Chưa xác minh được thì giữ bản nháp hoặc đề xuất đổi quán; giá thay đổi sau xác nhận cần được cập nhật lại. |

**PA#4:** Ít nhất 10 ca có yêu cầu và đáp án chuẩn, gồm lịch hợp lệ, vượt ngân sách, quá khung giờ và giá chưa xác minh. Đo tỷ lệ lịch vi phạm yêu cầu, hỏi lại đúng và lỗi lọt. Mục tiêu: **0 lịch vi phạm yêu cầu đã chốt hoặc dùng giá chưa xác minh được duyệt trong bộ ca**.

<!-- PAGE_BREAK -->

## 3. Phạm vi

**Sẽ làm trong học kỳ:**

- LLM trích xuất địa điểm, giá, ngày đăng; tìm thêm điểm theo sở thích và tạo/chỉnh lịch 1 hoặc nhiều ngày tại một tỉnh/thành phố ở Việt Nam.
- Google Maps API tra cứu vị trí (giới hạn theo tỉnh/thành phố điểm đến), tuyến đường, thời gian di chuyển và giờ mở cửa.
- Code tính và kiểm tra ngân sách toàn chuyến (lưu trú, vé, ăn uống, di chuyển nội bộ), độ mới của nguồn giá, giờ mở cửa và khung giờ từng ngày; yêu cầu bổ sung dữ liệu thiếu.
- Giao diện cho 1 người điều phối: hiển thị danh sách lịch theo ngày đồng bộ với bản đồ và tính lại lịch khi đầu vào hoặc điểm lưu trú đổi.

**Không làm:** Đặt vé/phòng hoặc tính vé di chuyển liên tỉnh (máy bay, tàu xe); cộng tác nhiều người dùng thời gian thực; đăng/lưu/tìm lịch cộng đồng; bình luận, đánh giá; đọc link bị giới hạn (mạng xã hội chặn bot); cập nhật giao thông/thời tiết thời gian thực. Nếu còn thời gian, nhóm sẽ cải thiện đọc ảnh/link và tối ưu gom nhóm địa điểm gần nhau theo ngày.

## 4. Kế hoạch và phân công

_(Lưu ý: Hạn PA#1 là hạn chính thức của môn học; các mốc từ PA#2 đến PA#6 là **hạn nội bộ của nhóm** — hoàn thành sớm trước hạn môn 1–2 ngày để kiểm tra chéo)._

| PA  | Đầu ra                                        | Phụ trách         | Hạn (Môn / Nội bộ)         |
| --- | --------------------------------------------- | ----------------- | -------------------------- |
| 1   | Proposal, repo, tự chấm, AI-LOG               | Đặng Nghi Văn     | 22:00 22/10/2026 (Hạn môn) |
| 2   | Quy ước, lint, tests, CI chặn lỗi             | Phạm Chí Bảo Ninh | 05/11/2026 (Hạn nội bộ)    |
| 3   | Prototype LLM, eval cơ bản, hạn mức, xác nhận | Nguyễn Tiến Luật  | 19/11/2026 (Hạn nội bộ)    |
| 4   | Eval, guardrails, kiểm thử đối kháng          | Đặng Nghi Văn     | 03/12/2026 (Hạn nội bộ)    |
| 5   | Bản cuối, logs/metrics/traces, báo cáo sự cố  | Nguyễn Tiến Luật  | 17/12/2026 (Hạn nội bộ)    |
| 6   | Chuẩn bị và tham gia vấn đáp cá nhân          | Phạm Chí Bảo Ninh | 31/12/2026 (Hạn nội bộ)    |

## 5. Hai rủi ro lớn nhất

**Rủi ro 1 – Lịch không khả thi:** LLM phân bổ các ngày quá tải, dùng giá cũ hoặc vi phạm ngân sách, giờ mở cửa, thời gian di chuyển. **Giảm thiểu:** Chuẩn hóa JSON theo ngày; code tính lại toàn bộ thời gian/chi phí, kiểm tra hạn 6 tháng của nguồn giá và từ chối/tạo lại lịch sai, yêu cầu bổ sung dữ liệu thiếu. **Làm ngay:** Xây ít nhất 10 ca kiểm thử theo mục 2.

**Rủi ro 2 – Sai địa điểm:** API tìm thấy một nơi có thật nhưng khác tỉnh/thành phố du lịch hoặc nhầm chi nhánh người dùng muốn đến. **Giảm thiểu:** Giới hạn vùng tìm kiếm (location bias) theo điểm đến trên Google Places API, đối chiếu ngữ cảnh và hỏi người dùng khi mơ hồ; loại nơi không tra cứu được. **Làm ngay:** Gán nhãn địa điểm đúng cho các ca rõ ràng, trùng tên khác tỉnh/chi nhánh, thiếu ngữ cảnh và lệch sở thích để đo lỗi trích xuất/đề xuất.

## 6. Lựa chọn công nghệ và chi phí

| Công nghệ                                                          | Lý do chọn                                                                                         |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| React + JavaScript                                                 | Giao diện chat, bộ lọc, danh sách lịch theo ngày và bản đồ.                                        |
| Node.js + Express + Zod                                            | Điều phối LLM/API, giữ khóa, kiểm tra JSON và lịch nhiều ngày.                                     |
| **Google Maps Platform** (Places API New, Routes API, Maps JS API) | Tra cứu vị trí theo tỉnh/thành, giờ mở cửa và thời gian di chuyển tại Việt Nam chính xác nhất [2]. |
| Gemini 3.5 Flash-Lite                                              | Đọc chữ/ảnh, hiểu yêu cầu, xuất JSON có cấu trúc [1].                                              |

**Chi phí dự kiến (cho 1.000 lượt lập lịch):**

- **LLM (Gemini 3.5 Flash-Lite Standard [1]):** Giá 0,30 USD/triệu token vào và 2,50 USD/triệu token ra. Với 1.000 lượt × (2.000 vào + 1.000 ra), chi phí là **3,10 USD**.
- **Bản đồ (Google Maps Platform [2]):** Ước tính 6.000 lượt gọi Places API (Text Search/Details) và 6.000 lượt gọi Routes API (Compute Routes) thuộc ngưỡng miễn phí **10.000 lượt gọi/tháng cho mỗi SKU** (hoặc gói tín dụng 200 USD/tháng) của Google, nên chi phí thực trả là **0 USD** (chưa gồm hạ tầng máy chủ).

**Nguồn kiểm tra ngày 20/10/2026:**

- [1] [Gemini: model](https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash-lite), [bảng giá](https://ai.google.dev/gemini-api/docs/pricing).
- [2] [Google Maps Platform: Places & Routes API](https://developers.google.com/maps/documentation), [bảng giá và hạn mức miễn phí](https://developers.google.com/maps/billing-and-pricing/pricing).
