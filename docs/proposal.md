# Proposal and Planning — PA#1

**Tên dự án:** Quản lý lịch trình đi du lịch

**Thành viên:** Nguyễn Tiến Luật – 23127221; Đăng Nghi Văn – 23127281; Phạm Chí Bảo Ninh – 23127446.

**Repository:** https://github.com/Tienluat123/WebNC_Proposal

## 1. Người dùng và vấn đề

**Người dùng:** Người ít đi chơi nhưng có nhu cầu; người thường đi chơi nhưng thiếu kế hoạch nên gặp khó khăn về đường đi, chi phí; người chọn điểm đến theo xu hướng, cảm hứng hoặc muốn tìm nơi tương tự địa điểm quen thuộc nhưng chưa biết cách tìm; người cần lập nhiều lịch trình trong thời gian ngắn như ban quản lý du lịch; và nhóm đi chơi có các kế hoạch, mong muốn mâu thuẫn nhau.

**Tình huống minh họa (giả định):** Bạn A phụ trách chuyến đi cuối tuần cho nhóm bốn người, ngân sách 500.000 đồng/người nhưng mỗi người muốn ghé nơi khác nhau. Bạn A đang ghép link/ảnh, tra bản đồ và tính chi phí thủ công; khi yêu cầu đổi, phải tính lại lịch.

**Vấn đề chính:** Người lập lịch khó tạo và điều chỉnh nhanh một lịch trình thống nhất đáp ứng nhu cầu, thời gian và ngân sách. Chuẩn bị chưa kỹ dễ vượt chi phí/thời gian; yêu cầu mâu thuẫn khiến việc thống nhất lâu; tính toán quãng đường, thời tiết, phương tiện cho chuyến đi dài tốn công; sự cố dọc đường đòi hỏi cập nhật theo thời gian thực.

## 2. Tính năng LLM và hậu quả khi sai

**Tính năng LLM cốt lõi:** tạo/chỉnh lịch từ ảnh/chữ/link, lịch mẫu và ràng buộc, trả JSON địa điểm, thứ tự, thời gian, chi phí. Chỉ gửi nội dung đã bỏ dữ liệu cá nhân/bí mật; giới hạn token/lượt gọi, kiểm tra ràng buộc và xác nhận khi mơ hồ. Ba tính năng liên kết:

- **Chat chuyển đầu vào thành địa điểm:** Nhận ảnh, văn bản, link YouTube/TikTok…; LLM tìm địa điểm, thêm vào danh sách và đánh dấu trên bản đồ; hỏi lại khi mơ hồ.
- **Lọc và sắp xếp lịch trình:** Chọn một hoặc nhiều tiêu chí như đường ngắn nhất, mức chi phí…; AI sắp xếp địa điểm, cập nhật danh sách và tuyến trên bản đồ theo thời gian thực.
- **Đăng tải, xem và cá nhân hóa lịch trình:** Sản phẩm đầy đủ cho phép đăng lịch lên mạng để người khác xem, tham khảo và dùng AI chỉnh lại. Trong học kỳ, dùng mock data thay bài đăng; chức năng đăng/tìm kiếm trên server ngoài phạm vi.

**Hậu quả nếu AI gợi ý sai (giả định):** Nhóm bốn người có ngân sách 500.000 đồng/người, nhưng AI tạo lịch tốn 620.000 đồng/người. Nếu nhóm làm theo mà không phát hiện lỗi, mỗi người phải chi thêm 120.000 đồng, cả nhóm vượt ngân sách **480.000 đồng**. Nếu AI nhận nhầm địa điểm, nhóm có thể đi sai đường và mất thời gian. Lịch sai có thể sửa trước chuyến đi; tiền và thời gian đã bỏ ra thì khó lấy lại.

**Kiểm tra ở PA#4 (dự kiến):** Dùng 10 ca kiểm thử ràng buộc và bộ địa điểm đã xác minh; đếm số lịch vi phạm vẫn được chấp nhận và số địa điểm nhận diện sai.

## 3. Phạm vi

**Sẽ làm trong học kỳ:**

- Phân tích đầu vào ảnh, văn bản, link để xác định địa điểm và đánh dấu trên bản đồ.
- Sắp xếp danh sách địa điểm và hiển thị tuyến đường trên bản đồ theo yêu cầu, bộ lọc của người dùng.
- Phân tích lịch trình mẫu giả lập bài đăng của người dùng khác (mock data), chỉnh sửa theo yêu cầu hiện tại.
- Cập nhật danh sách và tuyến đường theo thời gian thực khi người dùng thay đổi yêu cầu.

**Không làm trong học kỳ:** Chức năng đăng lịch trình lên server để người khác tham khảo; chức năng tìm kiếm lịch trình do người khác đăng. Nguồn lịch trình tham khảo được cung cấp bằng mock data.

**Nếu còn thời gian:** cải thiện đầu vào ảnh và link video, tối ưu tuyến đường nâng cao theo nhiều tiêu chí, cải thiện hiệu năng. Ưu tiên chức năng cốt lõi, kiểm tra tính hợp lệ và độ tin cậy trước các cải tiến tùy chọn.

<!-- PAGE_BREAK -->

## 4. Kế hoạch và phân công

**Phân công:** A – Nguyễn Tiến Luật: phát triển LLM; B – Đăng Nghi Văn: backend, dữ liệu, định tuyến; C – Phạm Chí Bảo Ninh: frontend, kiểm tra chất lượng, triển khai. Mỗi mốc có một owner, các thành viên khác hỗ trợ.

**Mỗi người 2 task. Ngày dưới đây là hạn nội bộ do nhóm tự đặt.**

| Task | Công việc và đầu ra                                                                                      | Phụ trách         | Hạn nội bộ |
| ---- | -------------------------------------------------------------------------------------------------------- | ----------------- | ---------- |
| 1    | Proposal tối đa 2 trang, repo, tự chấm và AI-LOG (PA#1 – Đề xuất và kế hoạch).                           | Đăng Nghi Văn     | 22/10/2026 |
| 2    | Quy ước dự án, lint, tests và CI thực sự chặn merge khi lỗi (PA#2 – Harness và quality gates).           | Phạm Chí Bảo Ninh | 05/11/2026 |
| 3    | Prototype LLM backend chạy thật, truy xuất lịch mẫu; có eval cơ bản, hạn mức và xác nhận (PA#3).         | Nguyễn Tiến Luật  | 19/11/2026 |
| 4    | Bộ eval, guardrails, xác nhận đúng chỗ và báo cáo kiểm thử đối kháng từ nhóm khác (PA#4).                | Đăng Nghi Văn     | 03/12/2026 |
| 5    | Bản cuối chạy được, có logs/metrics/traces và một báo cáo phân tích sự cố (PA#5 – Hoàn thiện, vận hành). | Nguyễn Tiến Luật  | 17/12/2026 |
| 6    | Chuẩn bị câu hỏi về code/quyết định dự án; cả ba tự tham gia vấn đáp cá nhân (PA#6).                     | Phạm Chí Bảo Ninh | 31/12/2026 |

## 5. Hai rủi ro lớn nhất

**Rủi ro 1 – AI tạo lịch trình không khả thi:** LLM có thể vi phạm ngân sách, thời gian hoặc tuyến đường, khiến chuyến đi không khả thi và lãng phí tiền, thời gian. **Giảm thiểu:** chuẩn hóa đầu ra bằng JSON; dùng logic độc lập xác thực ngân sách, lịch trình và thời gian di chuyển; từ chối hoặc yêu cầu tạo lại lịch không hợp lệ. **Hành động ngay:** xây 10 trường hợp kiểm thử có ràng buộc hợp lệ và xung đột để đánh giá tính khả thi.

**Rủi ro 2 – Nhận diện địa điểm sai hoặc mơ hồ:** LLM có thể nhầm địa điểm, đánh dấu sai vị trí và tạo tuyến đường sai. **Giảm thiểu:** xác minh bằng Geocoding API, yêu cầu xác nhận khi mơ hồ và dùng dữ liệu mẫu đã kiểm chứng nếu API không khả dụng. **Hành động ngay:** xây bộ dữ liệu kiểm thử với địa điểm đã xác minh, gồm rõ ràng, trùng tên và thiếu thông tin; kiểm tra nhận diện và geocoding. Chấp nhận kết quả hợp lệ; yêu cầu xác nhận hoặc từ chối kết quả mơ hồ/không xác minh được.

## 6. Lựa chọn công nghệ và chi phí

**Công nghệ đề xuất:** giữ React + JavaScript; model, stack còn lại và chi phí chưa được nhóm chốt.

| Công nghệ dự kiến             | Lý do gắn với dự án                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------ |
| React + JavaScript            | Xây giao diện chat, bộ lọc và trạng thái chung để danh sách/bản đồ đồng bộ.          |
| Node.js + Express + Zod       | Điều phối LLM/API, giữ khóa phía server, kiểm tra JSON và ràng buộc lịch trình.      |
| Leaflet + OpenRouteService    | Hiển thị bản đồ; geocoding xác minh vị trí, Directions tính tuyến và thời gian [2].  |
| JSON mẫu                      | Giả lập bài đăng lịch trình để LLM phân tích và cá nhân hóa, phù hợp phạm vi học kỳ. |
| Google: gemini-3.5-flash-lite | Xử lý chữ/ảnh, diễn giải yêu cầu và xuất JSON có cấu trúc [1].                       |

**Ví dụ chi phí, chưa chốt ngân sách:** theo Standard [1], 0,30 USD/triệu token vào và 2,50 USD/triệu token ra (gồm suy luận). Giả định 1.000 lượt gọi × (2.000 token vào + 1.000 token ra): **3,10 USD**, chỉ tính LLM; chưa gồm API bản đồ/hạ tầng.

**Nguồn kiểm tra ngày 18/10/2026:** [1] [Gemini: model](https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash-lite), [bảng giá](https://ai.google.dev/gemini-api/docs/pricing). [2] [OpenRouteService: dịch vụ và truy cập miễn phí](https://openrouteservice.org/services/).
