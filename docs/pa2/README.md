# PA#2 — phân công và hướng dẫn

Đã rà với [rubric gốc](<../reference/PA2 Rubric Harness Quality Gate.pdf>), trang 1–4, và [contract mẫu](../reference/Contract.md). Hạn trong rubric: **22:00 ngày 26/11/2026**.

Current status (2026-11-21): the P1 permissions policy, adopted GET /places contract,
Express implementation and 31 tests exist. The latest service run passed 27 tests;
HTTP re-verification is blocked by the current environment. Provider/model and
spending-cap evidence remain pending. The detailed guidance below includes the
original scaffold inventory; use the [current P1 review](evidence/p1-review.md),
[root README](../../README.md) and actual files for completion status.
Checks/CI and final Rules/submission work remain with their assigned owners.

## Quyết định

- **Stack:** frontend [React + TS](https://react.dev/learn) / backend [Express](https://expressjs.com/) / runtime (Node.js + phiên bản, dùng giống nhau ở local và CI).
- **Checks:** lint (ESLint) / format Prettier / tests node:test / typecheck (tsc cho TypeScript).
- **Endpoint (P1):** GET /places : a list, so it pages. Say what a filter it cannot read returns.

## Phân công theo rubric

| Người    | Mục rubric phụ trách                                          | Phạm vi                                                                                                      |
| -------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Nghi Văn | [#2 Permissions/secrets](#rubric-2), [#5 Contract](#rubric-5) | Contract và code **một endpoint PA#2**; chính sách quyền, env/secrets, audit history và spending cap.        |
| Luật     | [#3 Commands](#rubric-3), [#4 CI](#rubric-4)                  | Cấu hình checks, hướng dẫn setup, CI/protection và bằng chứng PR đỏ → xanh.                                  |
| Ninh     | [#1 Rules](#rubric-1), [#6 Contract tests](#rubric-6)         | Tổng hợp AGENTS từ quy ước/lỗi thật của nhóm; viết fixtures/tests; phối hợp P1 tạo lần phá contract rồi sửa. |
| Cả ba    | [#7 AI-LOG](#rubric-7), [hồ sơ nộp](#submission)              | Mỗi người ghi log, link bằng chứng và tự chấm các mục mình làm; review chung trước khi nộp.                  |

Commit: gắn tag pa2.
Mỗi task là mội nhánh: /p1

<details>
<summary>Chi tiết rubric và hướng dẫn điền từng file</summary>

<a id="rubric-1"></a>

## 1. Rules file — 15 điểm, rubric trang 1

**File chính: [AGENTS.md](../../AGENTS.md). Tên này đúng.** Rubric cho chọn một trong AGENTS.md, CLAUDE.md, .cursor/rules hoặc .github/copilot-instructions.md, tùy công cụ nhóm dùng. Không cần tạo đủ cả bốn.

AGENTS.md chứa các quy tắc assistant phải theo khi làm trong repo. Đây là nơi điền quyết định hiện hành, không phải nhật ký sử dụng AI và không phải chỗ chép lại rubric.

| Mục trong AGENTS.md | Bạn cần điền                                                                           | Khi nào nội dung đủ cụ thể?                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Stack               | Ngôn ngữ, framework, runtime và công nghệ nhóm thực sự chọn.                           | Đọc vào biết dự án dùng gì; không tự gán model/database chưa chốt.                                                                               |
| Commands            | Các lệnh setup, lint, format check, type check nếu áp dụng, tests.                     | Lệnh tồn tại và chạy được; khớp package.json, README và CI.                                                                                      |
| Conventions         | Quy ước nhóm: đặt tên, cấu trúc code, xử lý lỗi, cách viết tests và thay đổi contract. | Ngắn, cụ thể với repo; tránh chỉ ghi “code sạch”.                                                                                                |
| Never               | Những điều cấm liên quan sản phẩm.                                                     | Rubric nêu ví dụ: không model key trong browser bundle; không gọi model thật trong unit tests; không sửa test/eval/validator chỉ để checks xanh. |

Thầy yêu cầu **ít nhất hai dòng quy tắc truy được về điều đã sai thật**, qua commit hoặc một entry trong AI-LOG. Khi gặp lỗi thật: ghi diễn biến trong AI-LOG; thêm quy tắc rút ra trong AGENTS và dẫn tới entry/commit. Không tự viết hai sự cố giả để điền cho đủ.

**Vì sao từng có AI-LOG ở dòng số 1?** Nó chỉ là nguồn chứng minh cho quy tắc, không phải Rules file thứ hai. File được chấm chính ở mục 1 vẫn là AGENTS.md; AI-LOG được chấm riêng ở mục 7. Khung hiện có đúng bốn mục nhưng còn TODO; nhóm phải review và điền quy tắc thật.

<a id="rubric-2"></a>

## 2. Permissions và secrets — 10 điểm, rubric trang 2

| File / nơi thao tác                | Vai trò                                                                              | Điền hoặc làm gì?                                                                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| [PERMISSIONS.md](PERMISSIONS.md)   | Chính sách quyền assistant. Tên/path do repo chọn, thầy không bắt buộc file tên này. | Điền ba dòng Allowed / Ask first / Never bằng hành động cụ thể của nhóm. AGENTS dẫn tới file này để người dùng biết chính sách ở đâu. |
| [.env.example](../../.env.example) | Danh sách biến môi trường cần có. Tên được rubric nêu rõ.                            | Khi code cần biến nào, thêm tên biến đó với giá trị trống, dạng TEN_BIEN=. Hiện chỉ có comment, chưa phải danh sách biến đầy đủ.      |
| [.gitignore](../../.gitignore)     | Quy tắc không đưa file local vào Git.                                                | Đã có .env và .env.\* cùng ngoại lệ cho .env.example. Cập nhật nếu có đường dẫn nhạy cảm khác; không thêm khóa vào file này.          |
| [README.md](../../README.md)       | Hướng dẫn chung và thông tin spending cap.                                           | Điền provider/model nhóm dùng và spending cap đã cấu hình thật; brief còn yêu cầu ghi chi phí một plan.                               |
| Provider console và lịch sử Git    | Bằng chứng thực tế, không thay bằng một file TODO.                                   | Thiết lập cap ở provider; kiểm tra toàn bộ history. Nếu lộ khóa thì xoay khóa và ghi AI-LOG.                                          |

PERMISSIONS trả lời “assistant được tự làm gì / cần hỏi gì / không được làm gì”. Never trong AGENTS tập trung quy tắc phát triển sản phẩm. Hai phần có thể liên kết nhau; không cần chép nguyên văn một chính sách vào cả hai file. Nhóm cũng có thể gộp quyền vào Rules file nếu muốn ngắn hơn; rubric không bắt buộc tách riêng.

<a id="rubric-3"></a>

## 3. Một lệnh cho mỗi check — 10 điểm, rubric trang 2

Thầy yêu cầu hành vi chạy được, không bắt buộc ESLint, Prettier, npm hoặc TypeScript. Các file sau là khung theo hướng JavaScript của repo:

| File                                       | Vai trò                                                               | Bạn điền ở đâu / có bắt buộc không?                                                                                                                                        |
| ------------------------------------------ | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [package.json](../../package.json)         | Manifest và chỗ khai báo lệnh nếu dùng Node/npm.                      | Điền scripts cho từng check, dependencies/devDependencies phù hợp. scripts hiện rỗng. private: true chỉ ngăn publish package lên npm, không làm GitHub repo thành private. |
| [eslint.config.js](../../eslint.config.js) | Cấu hình lint nếu chọn ESLint.                                        | Điền cấu hình thật và nối vào script lint. Hiện chỉ có comment. Không phải tên file thầy quy định.                                                                         |
| [.prettierrc.json](../../.prettierrc.json) | Quy tắc format nếu chọn Prettier.                                     | Điền tùy chọn khi cần; {} không có tùy chỉnh. Cài formatter và thêm format-check script mới có check chạy được.                                                            |
| [.prettierignore](../../.prettierignore)   | Các file formatter bỏ qua.                                            | Tùy chọn; chỉ cần nếu có file không muốn format. Đây không phải file bảo vệ secrets.                                                                                       |
| [jsconfig.json](../../jsconfig.json)       | Cấu hình dự án JavaScript / kiểm tra kiểu khi chọn giải pháp phù hợp. | Tùy chọn. {} không bật typecheck. Nếu chọn TypeScript checkJs, phải thêm cấu hình và lệnh CLI thực sự kiểm tra code. Chỉ có file này không đạt tiêu chí type check.        |
| [README.md](../../README.md)               | Hướng dẫn để người khác chạy từ fresh clone.                          | Điền phiên bản runtime, setup và từng lệnh check chính xác. AGENTS và CI dùng lại các lệnh đó.                                                                             |

Không cần điền một câu “đã pass” vào config. Config là dữ liệu/code của công cụ; kết quả và bằng chứng ghi ở hồ sơ nộp. Nếu đổi stack/tool thì đổi hoặc bỏ config không còn dùng; không giữ chỉ để giống map.

package-lock.json chưa có là phù hợp với trạng thái chưa cài dependencies. Nếu chọn npm, để npm sinh lockfile khi cài; không tự tạo một lockfile rỗng.

<a id="rubric-4"></a>

## 4. CI thật sự chặn merge — 20 điểm, rubric trang 2

| File / nơi thao tác                                      | Vai trò                                                        | Bạn cần điền / cấu hình                                                                                                                  |
| -------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [ci.yml.example](../../.github/workflows/ci.yml.example) | Ghi chú để xây GitHub Actions workflow; tên file do repo chọn. | Điền workflow hợp lệ, chạy các lệnh của mục 3 trên PR; sau đó đổi thành ci.yml hoặc tên .yml/.yaml phù hợp. .example hiện không chạy CI. |
| GitHub branch protection / ruleset                       | Cài đặt remote, không nằm trong YAML.                          | Bảo vệ main, đặt checks là required; từ đó không push thẳng main.                                                                        |
| [evidence/](evidence/README.md)                          | Chỗ lưu ảnh/tệp bằng chứng nếu cần; đường dẫn tùy chọn.        | Ảnh protection được chấp nhận. PR và CI run nên dẫn link thật. README trong thư mục này chỉ là ghi chú, không phải bằng chứng.           |
| [PA2.md](../../PA2.md)                                   | Điểm tập hợp link để thầy kiểm tra.                            | Điền PR đỏ bị chặn, commit/PR sửa xanh và ảnh/link protection.                                                                           |

Có workflow đỏ chưa đủ: phải chứng minh checks là required nên không merge được. Không tái dựng/rebase lịch sử sau khi hoàn thành để làm bằng chứng.

<a id="rubric-5"></a>

## 5. Contract một endpoint — 25 điểm, rubric trang 2–3

**File chính: [docs/contract/endpoint.md](../contract/endpoint.md).** Thầy quy định pattern docs/contract/<endpoint>.md; endpoint chỉ là tên giữ chỗ. Chọn endpoint rồi đặt tên mô tả phù hợp. Không bắt buộc chọn Save và cũng chưa chốt prefix /v1.

[docs/reference/Contract.md](../reference/Contract.md) là mẫu Menu service của thầy, giữ để đọc. Bạn viết nội dung của nhóm trong docs/contract/, không điền bài vào file mẫu.

| Mục trong contract nhóm        | Bạn cần viết                                                                                                                       |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| 1. Conventions                 | Quy ước định dạng dữ liệu, ID, đơn vị và field.                                                                                    |
| 2. Errors                      | Mọi error type, HTTP status và điều kiện xảy ra, theo problem details RFC 9457.                                                    |
| 3. Resources                   | Schema request/response, kiểu và ràng buộc từng field, ví dụ nhất quán.                                                            |
| 4. Endpoints                   | Method/path, role, ownership: ai được thao tác dữ liệu của ai; success, lỗi, paging nếu là danh sách, idempotency nếu tạo/publish. |
| 5. Versions and the legacy API | Cách thay đổi contract và tương thích. Nếu chưa có legacy API thì ghi rõ, không cần dựng một API cũ cho giống mẫu.                 |

Không chỉ viết “đã đăng nhập”; phải rõ quyền trên dữ liệu. Đích là người lạ có thể viết client từ contract mà không cần hỏi nhóm. Khung hiện chưa đủ làm điều đó.

<a id="rubric-6"></a>

## 6. Contract tests có tác dụng — 15 điểm, rubric trang 3

| File / nơi code                                                                 | Vai trò                                                                 | Bạn cần viết                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [places.test.js](../../backend/test/contract/places.test.js)                | File tests của endpoint, tên/path do repo chọn.                         | Đổi tên theo endpoint; viết tests chạy request thật tới implementation: success, từng error type, ownership và paging/idempotency nếu áp dụng. Kiểm tra nội dung/schema chứ không chỉ status. Hiện toàn bộ chỉ là comment. |
| [backend/test/fixtures/](../../backend/test/fixtures/README.md)                 | Dữ liệu đầu vào và kết quả tham chiếu cho tests; cách tổ chức tùy chọn. | Thêm fixtures khi biết schema. README chỉ hướng dẫn, không phải dataset hay test.                                                                                                                                          |
| [backend/src/](../../backend/src/)                                              | Nơi sẽ chứa implementation endpoint theo bố trí repo.                   | Hiện chỉ có .gitkeep. Cần code endpoint và phần xử lý liên quan để tests thật sự kiểm tra hành vi; rubric không quy định bắt buộc tên file app.js/router.js.                                                               |
| [CI template](../../.github/workflows/ci.yml.example) và [PA2.md](../../PA2.md) | Chạy tests và dẫn bằng chứng.                                           | Đưa tests vào required CI; tạo một commit/PR làm implementation sai contract khiến tests đỏ, rồi sửa code và dẫn link.                                                                                                     |

Chỉ có contract Markdown và comment tests là chưa đủ. Cần chọn test runner/dependencies và lệnh chạy. Không dùng việc file còn TODO hay thiếu setup làm bằng chứng “cố tình phá contract”.

<a id="rubric-7"></a>

## 7. Nhật ký AI — 5 điểm, rubric trang 3–4

**File chính: [AI-LOG.md](../../AI-LOG.md). Tên AI-LOG.md đúng theo mục 7 của rubric.** Nó ghi chuyện đã xảy ra khi dùng assistant, khác với quy tắc phải tuân thủ trong AGENTS.

Mỗi entry điền vào mẫu có sẵn:

| Trường   | Bạn ghi gì?                                                                                   |
| -------- | --------------------------------------------------------------------------------------------- |
| Date     | Ngày làm việc thực tế.                                                                        |
| Tool     | Công cụ AI thực sự dùng.                                                                      |
| Used for | Dùng cho phần việc cụ thể nào.                                                                |
| Changed  | AI đề xuất gì, nhóm đã sửa gì, vì sao.                                                        |
| Rejected | Nhóm từ chối đề xuất nào, vì sao. Không ghi chung chung “không phù hợp”.                      |
| Evidence | File/commit/CI run liên quan khi có, nhất là nếu entry được dùng để chứng minh quy tắc mục 1. |

Thầy chấm tool/phần việc và Changed / Rejected có thật. Date và Evidence là cách khung này giúp truy vết; không phải tên trường bắt buộc của rubric. Không chép ví dụ thành sự cố của nhóm. Hiện root AI-LOG vẫn là mẫu; log trong docs/pa1/ là của lần nộp cũ.

<a id="submission"></a>

## Hồ sơ nộp và README gốc

| File                                                         | Điền gì?                                                                                          | Tên / vị trí                                                             |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [PA2.md](../../PA2.md)                                       | Repo, protection, PR bị chặn, PR/commit xanh lại, CI run cho tag pa2, deliberate contract break.  | Rubric chỉ rõ file này ở root.                                           |
| [SELF_ASSESSMENT_REPORT.md](../../SELF_ASSESSMENT_REPORT.md) | Điểm tự nhận từng tiêu chí, bằng chứng cụ thể, tổng và phần chưa làm. Điền sau khi có bằng chứng. | Tên được yêu cầu; phải có trong ZIP. Repo giữ ở root để dễ tìm/đóng gói. |
| [AI-LOG.md](../../AI-LOG.md)                                 | Nhật ký ở mục 7.                                                                                  | Tên được rubric nêu; repo giữ ở root để phân biệt log PA#1.              |
| [README.md](../../README.md)                                 | Setup/check commands, spending cap; thông tin model/chi phí theo brief.                           | Hướng dẫn chính, dùng chung cho nhiều tiêu chí. Không thay thế PA2.md.   |

PA2.md, AI-LOG.md và SELF_ASSESSMENT_REPORT.md viết tiếng Anh. docs/pa2/README.md hiện tại là hướng dẫn tiếng Việt, không thay ba file đó.

Repo phải public; tag commit nộp là pa2 và push tag; ZIP gồm repo và .git, tên `23127221-23127281-23127446_<total>.zip`. Tổng khớp tự chấm. Một người nộp qua Google sinh viên; xem bảng honesty adjustment trong rubric trước khi chấm.

</details>
