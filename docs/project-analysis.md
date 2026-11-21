# AI Travel Planner — phân tích yêu cầu

**Nhóm:** Nguyễn Tiến Luật — 23127221; Đặng Nghi Văn — 23127281; Phạm Chí Bảo Ninh — 23127446.

**Repository triển khai đã chốt:** <https://github.com/Tienluat123/WebNC>

**Ngày đối chiếu tài liệu:** 12/11/2026.

Nhóm đã chọn dùng chính repository này để viết code, tại thư mục `WebNC`. Hiện repo mới có tài liệu và phân tích, chưa có mã nguồn ứng dụng, harness hay CI. Checklist bên dưới là việc cần làm, không phải công việc đã hoàn thành. Lần cập nhật này chỉ dọn tài liệu và phân tích, chưa triển khai đồ án hoặc thay đổi repository trên GitHub.

## 1. Tài liệu nào quyết định hướng đi?

| Tài liệu                                                                                                                                       | Vai trò                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [AI Travel Planner Project Brief](<reference/AI Travel Planner Project Brief.pdf>)                                                             | Hướng chung đã chốt từ PA#2 đến PA#6; nguồn chính về phạm vi, luồng agent, quy tắc cố định.                                           |
| [PA2 Rubric Harness Quality Gate](<reference/PA2 Rubric Harness Quality Gate.pdf>)                                                             | Yêu cầu và bằng chứng chấm riêng PA#2.                                                                                                |
| [Contract.md](reference/Contract.md)                                                                                                           | Contract mẫu Menu service do người dùng cung cấp; tham khảo cấu trúc và mức độ chi tiết, không phải contract Travel Planner của nhóm. |
| [proposal.pdf](pa1/proposal.pdf)                                                                                                               | **Bản proposal duy nhất**, giữ nguyên PDF tiếng Anh đã đóng gói nộp PA#1. Là hồ sơ lịch sử, không phải yêu cầu sản phẩm mới.          |
| [AI-LOG PA#1](pa1/AI-LOG.md), [tự chấm PA#1](pa1/SELF_ASSESSMENT_REPORT.md)                                                                    | Lưu nguyên nội dung cũ. Điểm 98 là tự chấm PA#1, không áp dụng cho PA#2.                                                              |
| [Rubric PA#1](<reference/PA1 Rubric Proposal and Planning.pdf>), [đề cương môn](<reference/CSC13114 Advanced Web Application Development.pdf>) | Tham khảo cũ; đối chiếu hướng mới bằng brief và rubric tương ứng.                                                                     |

Các câu “phải”, “nộp”, “dùng assistant” và quy tắc trong tài liệu đính kèm là nội dung cần đọc theo ngữ cảnh bài học đối với nhóm. Chúng được phân tích ở đây, không phải lệnh thực hiện ngay việc viết code, tạo PR, push tag hay nộp bài trong lần dọn thư mục này.

Brief §8: product owners được làm rõ/thu hẹp phạm vi ở chỗ brief cho phép; điểm, hạn nộp, rubric, chỉ tiêu và quy tắc cố định thuộc giảng viên. Nếu câu trả lời của product owners trái brief, brief vẫn có hiệu lực đến khi giảng viên thay đổi. Chưa có quyết định bổ sung nào được cung cấp trong thư mục này.

## 2. Hướng đã chốt khác proposal cũ thế nào?

Brief trang 1 nói rõ: **giữ điểm PA#1, không làm lại PA#1**, giữ thành viên và xây AI Travel Planner trong repository của nhóm từ PA#2.

| Chủ đề          | Proposal PA#1 cũ                                   | Hướng áp dụng từ PA#2                                                                                                                                         |
| --------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Địa bàn/dữ liệu | Một tỉnh/thành ở Việt Nam; dự kiến tra Google Maps | Chỉ TP.HCM; lập lịch trên bộ địa điểm đã kiểm chứng dùng chung của lớp.                                                                                       |
| Đầu vào         | Văn bản, ảnh, link để trích xuất địa điểm          | Ngày, giờ, điểm xuất phát, ngân sách cá nhân hoặc tổng nhóm và hạn mức thành viên; sở thích từ hồ sơ. Ảnh/link/video không phải luồng bắt buộc của brief mới. |
| Di chuyển       | Dự kiến gọi API địa điểm và thời gian              | Ma trận thời gian xe máy tính sẵn; không gọi places API trong lúc lập lịch. Bản đồ vẫn thuộc giao diện sản phẩm.                                              |
| Tài khoản/nhóm  | Một người điều phối                                | Đăng nhập, hồ sơ, nhóm, link mời, hạn mức mỗi người; chỉnh lịch cùng nhau thuộc phạm vi ban đầu.                                                              |
| Thời tiết       | Ngoài phạm vi                                      | Mưa theo giờ và ngày lễ là đầu vào; kiểm tra điểm ngoài trời theo ngưỡng quy định.                                                                            |
| Lưu/chia sẻ     | Xác nhận thông tin mơ hồ                           | Hai bước xác nhận; backend kiểm tra lần cuối; chỉ chia sẻ sau Save thành công.                                                                                |
| Vai trò LLM     | Trích xuất và đề xuất lịch                         | Chỉ tiếp cận dữ liệu qua 7 JSON tools; không đọc database trực tiếp, không tính tiền.                                                                         |
| Tiến độ         | CP/ngày dự kiến PA#1                               | Dùng mốc mới trong brief/rubric ở mục 7.                                                                                                                      |

Stack có thể giữ **React + JavaScript, Node.js + Express + Zod** như lựa chọn trước của nhóm; brief không bắt buộc theo stack nhóm tác giả. Đây là phương án kế thừa, chưa triển khai. Tên model và con số 3,10 USD/1.000 lượt trong PA#1 chỉ là ước tính cũ; cần chọn model theo khả năng chạy tools, thử thực tế và ghi model, chi phí mỗi plan, spending cap trong README/AI-LOG của repo triển khai.

## 3. Phần cốt lõi phải thiết kế đúng

Theo brief §3, luồng cần giữ:

1. Nhận ngày, giờ, điểm xuất phát và ngân sách; lấy hồ sơ, tìm địa điểm hợp lệ và menu qua tools.
2. Chấm từng ứng viên **0–10 theo sở thích từng thành viên**, kèm một câu giải thích dựa trên dữ liệu thật.
3. Đề xuất **8–12 địa điểm** và khung buổi trong ngày. Người dùng loại/ghim địa điểm rồi **xác nhận lần 1**.
4. Tạo lịch JSON gồm địa điểm, thời gian, món/vé được chọn; kiểm tra schema trước khi đưa vào validator.
5. Tính chi phí và kiểm tra lịch. Agent sửa tối đa **2 vòng**; toàn luồng tối đa **12 tool calls, 90 giây**. Khi vượt giới hạn, trả bản nháp tốt nhất kèm cảnh báo đỏ; vẫn kiểm tra cuối nếu người dùng Save.
6. Người dùng xem lịch và chi phí, có thể sửa tay, rồi **xác nhận lần 2 bằng Save**. Backend chạy validator lần cuối trước khi chia sẻ cho nhóm.

Bảy tools cố định: `get_profile`, `search_places`, `get_menu`, `get_travel_time`, `get_weather`, `compute_cost`, `validate_plan`. Backend cung cấp tools; tính tiền và validator là code thông thường. Chế độ thủ công dùng cùng dữ liệu và validator để so sánh với agent.

Validator phải phát hiện:

- Địa điểm hoặc món/vé không tồn tại.
- Điểm dừng ngoài giờ mở cửa.
- Khoảng trống giữa hai điểm không đủ thời gian xe máy theo ma trận.
- Chi tiêu vượt ngân sách cá nhân/hạn mức áp dụng hoặc tổng nhóm.
- Điểm ngoài trời khi xác suất mưa **trên 60%**, trong phạm vi dự báo **7 ngày**.

Brief dùng cách diễn đạt “own amount or the lowest cap in the group”; cần hỏi product owners cách áp dụng khi các thành viên chọn món khác nhau. Không tự suy ra chia đều tiền. Trường hợp ngoài 7 ngày dự báo cũng cần làm rõ, không mặc định thiếu dự báo nghĩa là không mưa.

Giữ model key ở backend; chỉ địa điểm và sở thích gửi cho model, không tên/email. Bài quảng cáo không được ảnh hưởng lịch agent. Ghi công OpenStreetMap, Wikimedia, Open-Meteo trong sản phẩm theo brief §6.

| Chỉ tiêu trong brief §3                                   | Mục tiêu                                         |
| --------------------------------------------------------- | ------------------------------------------------ |
| Lịch vượt hạn mức hoặc tổng nhóm sau validator            | 0                                                |
| Tool call đúng cấu trúc                                   | ≥ 80%                                            |
| Thời gian tạo một plan, p90                               | < 60 giây                                        |
| Thời gian đến lịch đã lưu, không vi phạm, so với thủ công | Không quá một nửa; PA#5 so sánh trên 10 requests |

**90 giây là giới hạn dừng; p90 dưới 60 giây là chỉ tiêu đánh giá.** Không tự đánh dấu đạt trước khi có số đo.

## 4. PA#2 cần làm gì trước?

PA#2 chấm nền tảng phát triển và **một endpoint có contract**, chưa đòi hoàn thành toàn bộ sản phẩm hoặc agent thật. Checklist từ rubric dưới đây chưa được thực hiện trong thư mục này.

| Tiêu chí              |    Điểm | Việc cần làm và bằng chứng                                                                                                                                                                                                 |
| --------------------- | ------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rules file            |      15 | File assistant của nhóm thực sự đọc, có 4 mục: stack, commands, conventions, never. Quy tắc cụ thể cho sản phẩm; ít nhất 2 dòng gắn với lỗi đã xảy ra thật qua commit/AI-LOG. Không bịa lịch sử.                           |
| Permissions/secrets   |      10 | Ghi 3 mức allowed / ask first / never; `.env.example` liệt kê mọi biến không có giá trị; bỏ qua `.env`; kiểm tra toàn bộ lịch sử Git. Model key có spending cap, README ghi rõ. Nếu từng lộ khóa: xoay khóa và ghi AI-LOG. |
| Lệnh checks           |      10 | Mỗi loại lint, format check, tests và type check nếu áp dụng có một lệnh; README và CI dùng cùng lệnh. Fresh clone chạy được. JavaScript không bị buộc chuyển TypeScript; giải thích cách kiểm tra kiểu nếu chọn áp dụng.  |
| CI chặn merge         |      20 | CI trên PR; bảo vệ `main`; checks là required. Có PR đỏ thực sự bị chặn và commit sửa xanh; không push thẳng `main` sau khi bật bảo vệ. Workflow xanh/đỏ chưa đủ chứng minh merge bị chặn.                                 |
| Contract một endpoint |      25 | `docs/contract/<endpoint>.md`, theo các mục của `CONTRACT.md` IA#3. Role + ownership, schema/ràng buộc field, mọi error type/status theo RFC 9457, paging/idempotency nếu áp dụng, cách xử lý thay đổi contract.           |
| Contract tests        |      15 | Từng error type, quyền trên dữ liệu người khác, thành công và paging/idempotency nếu áp dụng; kiểm tra nội dung/schema, không chỉ status. Chạy trong required CI; có commit/PR cố tình làm code sai contract khiến CI đỏ.  |
| AI-LOG                |       5 | Tool, phần việc, Changed / Rejected thật và cách phát hiện vấn đề. Log PA#1 không thay công việc PA#2.                                                                                                                     |
| **Tổng**              | **100** | Chỉ tự chấm theo bằng chứng có thật.                                                                                                                                                                                       |

**Đề xuất để nhóm cân nhắc:** `POST /plans/{planId}/save`. Đây là điểm chia sẻ lịch, nối trực tiếp human gate và validator. Contract cần chốt ai được Save, dữ liệu thuộc nhóm nào, Save lặp lại có tạo tác dụng phụ không, lịch sai bị từ chối ra sao, bản lịch thay đổi xử lý thế nào. Quyết định phiên bản, mã lỗi và idempotency cần ghi rõ trước tests; brief chưa ấn định chi tiết đó.

Cách áp dụng [contract mẫu vừa cung cấp](reference/Contract.md):

| Mục trong mẫu                  | Nội dung cần viết cho endpoint Travel Planner                                                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Conventions                 | Quy ước JSON, ID, thời gian, tiền VND nguyên, trường lạ. Chọn và ghi rõ quy ước của nhóm.                                                             |
| 2. Errors                      | Bảng problem types, status, title, điều kiện xảy ra; định dạng lỗi field và thứ tự kiểm tra. Bổ sung lỗi xác thực/quyền và lịch bị validator từ chối. |
| 3. Resources                   | Schema request/response và các trạng thái liên quan của plan; field bắt buộc, kiểu, đơn vị, ví dụ nhất quán.                                          |
| 4. Endpoints                   | Endpoint đã chọn: ai được gọi, ownership, headers, body, phản hồi, mọi nhánh lỗi; idempotency khi Save, tác dụng phụ và xử lý xung đột.               |
| 5. Versions and the legacy API | Cách thay đổi contract tương thích/phá vỡ tương thích. Nếu chưa có legacy API thì ghi rõ, không dựng endpoint cũ chỉ để giống mẫu.                    |

Mẫu mô tả rất cụ thể replay, key đang xử lý, key dùng lại với body khác, thời gian giữ key và thứ tự trả lỗi. Nhóm cần có quyết định rõ tương tự cho Save; các con số/status/header trong Menu service không tự động là yêu cầu Travel Planner. Endpoint Save không phải danh sách nên không cần thêm paging. Mẫu chưa mô tả xác thực/ownership, nhưng rubric PA#2 vẫn yêu cầu nhóm bổ sung.

Có thể xây phần endpoint đủ nhỏ nhưng chạy thật với fixtures và dependency giả lập; PA#2 không cần gọi model thật. Fixtures nên dễ thay bằng dữ liệu lớp. Bộ dữ liệu chung dự kiến ra **27/11**, sau hạn PA#2 **26/11**, nên không đợi dữ liệu này mới làm contract tests.

Trình tự hợp lý:

1. Dùng repo `Tienluat123/WebNC` đã chốt; kiểm tra hiện trạng trên GitHub trước khi thiết lập CI/branch protection.
2. Đọc mẫu [Contract.md](reference/Contract.md), đối chiếu yêu cầu IA#3; thống nhất stack, endpoint, ownership và quyết định còn thiếu.
3. Thiết lập rules, quyền assistant, secrets, lệnh checks; cập nhật từ trải nghiệm thật.
4. Viết contract, code endpoint tối thiểu, contract tests; fake model thay lời gọi thật trong unit tests.
5. Bật CI + bảo vệ `main` sớm; tạo bằng chứng lỗi bị chặn và sửa xanh trong quá trình làm. Không tái dựng/rebase lịch sử sau khi xong để giả bằng chứng.
6. Hoàn thiện tài liệu tiếng Anh, tự chấm có dẫn chứng, kiểm tra fresh clone rồi mới tag/đóng gói.

Hồ sơ nộp PA#2 theo rubric trang 4:

- Repo công khai; tag commit nộp là `pa2`, push tag và có CI run cho tag đó.
- `PA2.md` ở root liên kết repo, branch protection (ảnh được chấp nhận), PR bị chặn, PR/commit chuyển xanh, CI run cho tag, lần cố tình phá contract.
- `PA2.md`, `AI-LOG.md`, `SELF_ASSESSMENT_REPORT.md` viết **tiếng Anh**. README phân tích tiếng Việt này không thay chúng.
- ZIP repository **gồm cả `.git`**, tên `23127221-23127281-23127446_<total>.zip`; `<total>` khớp tổng tự chấm PA#2, không dùng lại 98 của PA#1.
- Báo cáo có từng tiêu chí, điểm tự nhận, bằng chứng và phần chưa làm. Chênh lệch tự chấm bị điều chỉnh theo bảng rubric trang 4; không nhận điểm cho việc chưa có bằng chứng.
- Một thành viên nộp qua tài khoản Google sinh viên của mình. Không dùng lại cách đóng gói PA#1 chỉ gồm ba file.

Đã có contract mẫu Menu service trong `docs/reference/Contract.md`. Chưa có ảnh branch protection, dữ liệu lớp, dev set hoặc spending cap thực tế trong tài liệu được cung cấp; cần bổ sung khi làm từng mốc.

## 5. Phần sản phẩm cần làm ở các mốc sau

| Nhóm tính năng trong brief §4 | Hướng chuẩn bị và mốc                                                                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Địa điểm đã kiểm chứng        | Search theo loại, quận, đang mở cửa, mức giá; chi tiết có mô tả, ảnh, bản đồ, menu. Search dữ liệu chung ở PA#3. Không đưa địa điểm thiếu giờ/menu vào tập ứng viên. |
| Tài khoản/sở thích            | Đăng nhập, hồ sơ sở thích; phục vụ quyền và chấm phù hợp từng người.                                                                                                 |
| Nhóm/ngân sách                | Link mời, tổng ngân sách, hạn mức từng thành viên; nhóm với caps hoạt động ở PA#3.                                                                                   |
| Lịch AI/thủ công              | Cùng dữ liệu, tính tiền, validator; AI thật, hai xác nhận, Save gate ở PA#3. Hoàn thiện manual mode để so sánh PA#5.                                                 |
| Thời tiết/ngày lễ             | Đầu vào agent; quy tắc mưa trong validator; xác định xử lý dữ liệu thiếu/hết hạn.                                                                                    |
| Danh sách cá nhân             | Want-to-go, check-in, bản đồ đã đi; review 1–5 sao chỉ sau check-in. Phạm vi còn lại cho PA#5.                                                                       |
| Chỉnh lịch cùng nhau          | Tránh ghi đè thay đổi; brief chưa bắt buộc kỹ thuật cụ thể, cần chốt hành vi xung đột.                                                                               |
| Report/run log                | Báo đóng cửa/sai giá/quá xa/không hợp; log tools, vòng sửa, vi phạm bị chặn. Chuẩn bị sớm để có dữ liệu eval/vận hành.                                               |
| Bài đăng                      | Moment posts; promotional posts của tài khoản doanh nghiệp cần admin duyệt; likes/comments.                                                                          |
| Tìm bạn đồng hành             | AI match score chỉ cho người đã opt in, có block/report.                                                                                                             |

**Không tự động được bỏ** bài quảng cáo, AI companion score hoặc chỉnh lịch cùng nhau. Thứ tự cắt giảm tác giả đề xuất khi thiếu thời gian là: **promotional posts → AI companion score → editing together**. Muốn thu hẹp cần quyết định product owners công khai và dẫn trong repo; không tự bỏ quy tắc cố định §3.

Brief cho phép code gọi tools theo thứ tự cố định, model chấm địa điểm/đề xuất khung ngày, thuật toán greedy xếp giờ nếu model gọi tools kém. Vẫn phải giữ validator và hai xác nhận.

## 6. Những gì không làm hoặc chưa cần làm

**Ngoài phạm vi sản phẩm theo brief §4:**

- Đặt vé/phòng, thanh toán, chia hóa đơn; chi tiêu chỉ là ước tính.
- Thu tiền quảng cáo; dùng quảng cáo tác động lịch agent.
- Tin nhắn riêng, chat, vị trí thời gian thực, feed cá nhân hóa.
- Địa điểm ngoài TP.HCM, mobile native, chatbot trò chuyện tự do.
- Gọi places API lúc tạo lịch; ảnh/review Google Places; chỉ đường từng chặng; ước tính tiền Grab/xăng.

**Chưa cần hoàn thành ở PA#2:** toàn bộ UI/endpoint, bộ 150 địa điểm tự thu thập, agent thật, tích hợp thời tiết đầy đủ, social features và eval cuối kỳ. Endpoint đã chọn vẫn cần code/tests đủ chứng minh contract và CI, không chỉ bản mô tả.

**Không mang nguyên hướng cũ sang:** nhập TikTok/ảnh/link/video làm trọng tâm, tra Google Places để sinh lịch, mở rộng nhiều tỉnh/thành, dùng checkpoint cũ. Chi phí di chuyển trong ví dụ hậu quả không có nghĩa sản phẩm phải tính giá Grab.

## 7. Mốc mới và phụ thuộc

Các hạn dưới đây từ hai PDF được cung cấp, chưa đối chiếu thông báo Classroom mới hơn. Giờ hạn là **22:00, giờ Việt Nam**.

| Mốc           | Ngày                              | Kết quả                                                                                                                                                     |
| ------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PA#2          | **26/11/2026**                    | Harness, checks, required CI, branch protection, contract/tests một endpoint; bằng chứng và hồ sơ nộp.                                                      |
| Dữ liệu chung | 27/11/2026 theo kế hoạch brief    | Product owners cung cấp 150 địa điểm, giờ theo thứ, vé, indoor/outdoor, nguồn/ngày kiểm tra, 3–8 menu items mỗi nơi, ma trận xe máy.                        |
| Dev set       | Trước buổi 9, 04/12/2026          | Requests có ràng buộc và scorer; nhóm thêm ca riêng. Định dạng CLI chính xác đi cùng dev set.                                                               |
| PA#3          | **10/12/2026**                    | Search, nhóm với caps, agent thật qua tools, hai xác nhận, validator, chặn chia sẻ trước Save.                                                              |
| PA#4          | **17/12/2026**                    | Eval dev set chặn CI; guardrails chịu tấn công; red-team deployment đội giảng viên ghép. Agent chạy từ CLI nhận file requests; held-out set giảng viên giữ. |
| PA#5          | **24/12/2026**                    | Phạm vi còn lại, logs/metrics/traces, deploy công khai, một incident post-mortem, so sánh manual trên 10 requests.                                          |
| PA#6          | Classroom thông báo               | Vấn đáp cá nhân trên code và quyết định của nhóm.                                                                                                           |
| Seminar riêng | 29/11: study; 04, 11, 18/12: live | Nghiên cứu có đo đạc và talk ghi hình theo assignment SEMINAR; không phải tính năng AI Travel Planner.                                                      |

Không tự đặt tiêu chí chi tiết PA#3–PA#6: brief nói rubric từng mốc được đính kèm khi assignment mở.

## 8. Các quyết định nhóm cần chốt

- Repo triển khai đã chốt là `Tienluat123/WebNC`, thư mục local `WebNC`. Còn cần chốt stack, người phụ trách, model; phân công proposal là kế hoạch cũ, cần cập nhật theo khối lượng mới.
- Endpoint PA#2 dựa trên cấu trúc mẫu đã nhận; xác thực, ownership, idempotency, version/conflict của lịch.
- Tính tiền theo thành viên, áp dụng lowest cap, thay cap sau Save; hành vi khi thiếu dự báo, thiếu dữ liệu hoặc không đủ 8 ứng viên hợp lệ.
- Phạm vi có thể thu hẹp và hành vi chỉnh lịch đồng thời. Câu hỏi sản phẩm gửi công khai dưới bài **AI Travel Planner — questions for the product owners**, bắt đầu `#AWAD23KTPM1`, theo brief §8; ghi link quyết định. Lần dọn này chưa gửi câu hỏi thay nhóm.
