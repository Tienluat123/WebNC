# Proposal and Planning - PA#1

**Tên dự án:** Trợ lý lập lịch trình du lịch nhóm <br>
**Thành viên:** Nguyễn Tiến Luật - 23127221; Đặng Nghi Văn - 23127281; Phạm Chí Bảo Ninh - 23127446 <br>
**Repository:** https://github.com/Tienluat123/WebNC_Proposal

## 1. Người dùng và vấn đề

**Người dùng mục tiêu:** Sinh viên chịu trách nhiệm lập kế hoạch cho chuyến đi nhóm trong một hoặc nhiều ngày.

**Tình huống:** An lập lịch chuyến đi Đà Lạt hai ngày một đêm cho nhóm bốn người, với ngân sách 1.500.000 đồng mỗi người. Các thành viên gửi tên quán, ảnh menu hoặc review, link công khai và sở thích khác nhau. An phải tự tổng hợp thông tin, tra bản đồ, kiểm tra giờ mở cửa và cộng chi phí bằng bảng tính; mỗi thay đổi về địa điểm hoặc nơi lưu trú khiến An phải sắp xếp lại phần lớn lịch trình.

**Vấn đề chính:** Khi lập chuyến đi nhóm nhiều ngày, người điều phối phải tự biến thông tin rời rạc thành một lịch trình khả thi về tuyến đường, thời gian và ngân sách, rồi tính lại gần như toàn bộ khi đầu vào thay đổi.

## 2. Tính năng LLM và hậu quả khi sai

**Tính năng cốt lõi - Tạo và chỉnh lịch từ thông tin rời rạc:** Từ thời gian, ngân sách, nơi lưu trú và các địa điểm người dùng cung cấp qua văn bản, ảnh hoặc link công khai, LLM trích xuất thông tin và đề xuất lịch trình theo ngày. API bản đồ bổ sung địa chỉ, giờ mở cửa và thời gian di chuyển; logic nghiệp vụ tính giờ đến/rời, tổng chi phí và kiểm tra các ràng buộc về thời gian, ngân sách. Nếu lịch không hợp lệ, hệ thống yêu cầu LLM điều chỉnh; nếu địa điểm hoặc giá còn mơ hồ, người dùng phải xác nhận trước khi chốt. Khi đầu vào thay đổi, hệ thống chạy lại quy trình để cập nhật lịch trình.

Dữ liệu cá nhân hoặc bí mật không được gửi cho LLM.

**Nếu LLM sai:** Lịch trình sai có thể vi phạm ngân sách, khung giờ hoặc địa điểm đã chốt, khiến cả nhóm phải chi thêm, trễ lịch hoặc bỏ một hoạt động dự kiến.

**Ví dụ khi LLM sai:** Người dùng cung cấp ảnh menu tám tháng trước với giá 100.000 đồng/người. Nếu LLM dùng giá này như giá hiện tại, lịch có thể được báo vừa ngân sách dù giá thực tế đã tăng lên 140.000 đồng/người.

| Câu hỏi                    | Trả lời                                                                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Ai chịu hậu quả?           | Cả nhóm phải chi thêm; An phải điều chỉnh các khoản còn lại.                                                                                   |
| Thiệt hại bao nhiêu?       | Nhóm vượt 160.000 đồng: `(140.000 - 100.000) x 4`.                                                                                             |
| Có khắc phục được không?   | Có thể đổi quán trước chuyến đi; tiền đã thanh toán hoặc chi phí di chuyển phát sinh thì khó thu hồi.                                          |
| Phát hiện và ngăn thế nào? | Giá thiếu nguồn, ngày, đơn vị hoặc cũ quá sáu tháng phải được đánh dấu chưa xác minh. Người dùng xác nhận giá và tổng chi trước khi chốt lịch. |

**Đánh giá ở PA#4:** Bộ eval tối thiểu 20 ca có đáp án chuẩn; không lịch nào vi phạm yêu cầu đã chốt hoặc dùng giá chưa xác minh được phê duyệt.

## 3. Phạm vi

**Trong phạm vi học kỳ:**

- Một người điều phối lập và chỉnh lịch một hoặc nhiều ngày trong một tỉnh/thành phố tại Việt Nam.
- LLM trích xuất địa điểm từ văn bản, ảnh hoặc link công khai và tạo/chỉnh bản nháp lịch trình.
- API bản đồ xác định địa điểm, giờ mở cửa, tuyến đường và thời gian di chuyển ước tính.
- Logic nghiệp vụ tính ngân sách, giờ đến/rời và kiểm tra dữ liệu bắt buộc; giao diện đồng bộ lịch theo ngày với bản đồ.

**Ngoài phạm vi:** Đặt vé/phòng; tính chi phí máy bay, tàu hoặc xe liên tỉnh; cộng tác nhiều người dùng theo thời gian thực; lịch trình cộng đồng; link yêu cầu đăng nhập hoặc chặn bot; cập nhật giao thông/thời tiết thời gian thực; tối ưu tuyến đường toàn cục.

<div class="page-break"></div>

## 4. Kế hoạch và phân công

Sáu checkpoint bao phủ năm PA chính thức; owner chịu trách nhiệm chính, các thành viên còn lại hỗ trợ và review.

| Checkpoint                           | Target Date  | Key Deliverables                                                                                       | Owner             |
| ------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------ | ----------------- |
| **CP1 - Proposal & Planning**        | W3 (Oct 23)  | Chốt người dùng, vấn đề, LLM feature, hậu quả khi sai, scope, risks, công nghệ và ownership (PA#1).    | Đặng Nghi Văn     |
| **CP2 - System Design**              | W5 (Nov 6)   | Data schema, API contracts, mock itinerary và proof of concept cho API bản đồ.                         | Phạm Chí Bảo Ninh |
| **CP3 - Harness & Core Web**         | W7 (Nov 20)  | Conventions, lint, type checks, automated tests, CI quality gates và tích hợp frontend/backend (PA#2). | Phạm Chí Bảo Ninh |
| **CP4 - Itinerary MVP**              | W8 (Nov 27)  | Tạo/chỉnh lịch với dữ liệu giả lập, kiểm tra thời gian/ngân sách và deploy MVP không phụ thuộc LLM.    | Nguyễn Tiến Luật  |
| **CP5 - LLM Integration**            | W9 (Dec 4)   | Trích xuất địa điểm và tạo/chỉnh lịch bằng LLM, có schema validation và human confirmation (PA#3).     | Nguyễn Tiến Luật  |
| **CP6 - Evaluation & Final Release** | W11 (Dec 18) | Evals, guardrails, red-team (PA#4), observability, final deployment và post-mortem (PA#5).             | Đặng Nghi Văn     |

## 5. Hai rủi ro lớn nhất

**Rủi ro 1 - Lịch không đủ tin cậy:** Nếu LLM thường xuyên tạo lịch vượt ngân sách hoặc khung giờ, tính năng cốt lõi không còn giá trị. **Giảm thiểu:** Logic nghiệp vụ kiểm tra độc lập và trả vi phạm để LLM tạo lại; người dùng xác nhận giá chưa chắc chắn. **Làm ngay:** Xây 20 ca eval theo Mục 2 và đo baseline trong tuần này.

**Rủi ro 2 - Gắn sai địa điểm:** Tên quán trùng nhau có thể làm hệ thống chọn sai chi nhánh, khiến tuyến đường và giờ mở cửa đều sai. **Giảm thiểu:** Giới hạn tìm kiếm theo tỉnh/thành, lưu place ID và yêu cầu người dùng chọn khi có nhiều kết quả phù hợp. **Làm ngay:** Tạo bộ ca gồm địa điểm rõ ràng, trùng tên khác tỉnh, khác chi nhánh và thiếu địa chỉ.

## 6. Lựa chọn công nghệ và chi phí

| Công nghệ               | Lý do chọn                                                                                      |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| React + JavaScript      | Đồng bộ trạng thái giữa bản đồ, danh sách địa điểm và lịch theo ngày.                           |
| Node.js + Express + Zod | Giữ khóa API ở backend, điều phối LLM/API và kiểm tra schema JSON trước khi xử lý.              |
| Google Maps Platform    | Cung cấp các API bản đồ cần thiết để định danh địa điểm, tính thời gian và hiển thị bản đồ.     |
| Gemini 3.5 Flash-Lite   | Nhận đầu vào đa phương thức, hỗ trợ structured output và có chi phí thấp cho tác vụ trích xuất. |

**Chi phí dự kiến cho 1.000 lượt lập lịch: 3,10 USD.** Gemini dùng trung bình 2.000 input token và 1.000 output token mỗi lượt; theo paid tier, 2 triệu input token tốn 0,60 USD và 1 triệu output token tốn 2,50 USD. Google Maps Platform dự kiến **0 USD** vì nhóm đặt quota không vượt hạn mức miễn phí. Chi phí máy chủ chưa được tính.

**Nguồn giá, kiểm tra ngày 20/10/2026:** [Gemini](https://ai.google.dev/gemini-api/docs/pricing); [Google Maps Platform](https://developers.google.com/maps/billing-and-pricing/pricing).
