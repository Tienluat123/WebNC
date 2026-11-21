# PA#2 — phân công và hướng dẫn

Đã rà với [rubric gốc](<../reference/PA2 Rubric Harness Quality Gate.pdf>), trang 1–4, và [contract mẫu](../reference/Contract.md). Hạn trong rubric: **22:00 ngày 26/11/2026**.

Repo đã có cấu hình checks và workflow CI cho phần Luật; ứng dụng và contract tests còn là khung. Có file không đồng nghĩa đã đạt điểm. Ghi chú dưới đây phân biệt yêu cầu của thầy với cách nhóm chọn tổ chức repo.

## Quyết định

- **Stack:** frontend [React + TS](https://react.dev/learn) / backend [Express](https://expressjs.com/) / runtime Node.js 22.23.2 / npm 10.9.8 (local và CI dùng cùng phiên bản, xem `.nvmrc`).
- **Checks:** lint (ESLint) / format Prettier / tests node:test / typecheck (tsc cho TypeScript).
- **Endpoint (P1):** GET /places : a list, so it pages. Say what a filter it cannot read returns.

## Phân công theo rubric

| Người    | Mục rubric phụ trách                                          | Phạm vi                                                                                                      |
| -------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Nghi Văn | [#2 Permissions/secrets](#rubric-2), [#5 Contract](#rubric-5) | Contract và code **một endpoint PA#2**; chính sách quyền, env/secrets, audit history và spending cap.        |
| Luật     | [#3 Commands](#rubric-3), [#4 CI](#rubric-4)                  | Cấu hình checks, hướng dẫn setup, CI/protection và bằng chứng PR đỏ → xanh.                                  |
| Ninh     | [#1 Rules](#rubric-1), [#6 Contract tests](#rubric-6)         | Tổng hợp AGENTS từ quy ước/lỗi thật của nhóm; viết fixtures/tests; phối hợp P1 tạo lần phá contract rồi sửa. |
| Cả ba    | [#7 AI-LOG](#rubric-7), [hồ sơ nộp](#submission)              | Mỗi người ghi log, link bằng chứng và tự chấm các mục mình làm; review chung trước khi nộp.                  |

Commit nộp cuối của cả nhóm: gắn tag pa2; chưa gắn tag cho nhánh đang làm.
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

**Luật phụ trách. Đã có cấu hình và lệnh local; cần kiểm chứng lại từ fresh clone của commit đã push và trên CI thật.** Hướng dẫn chạy nằm ở [README gốc](../../README.md#setup-và-checks--luật-rubric-3).

Rubric mức 9–10 yêu cầu lint, format check, typecheck (nếu áp dụng), tests đều có một lệnh được ghi rõ; local và CI dùng cùng lệnh; fresh clone làm theo README phải xanh.

| File                                                                                 | Phần đã cấu hình                                                                                |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| [package.json](../../package.json)                                                   | `lint`, `format:check`, `typecheck`, `test`; `check` chạy tổng hợp và `format` sửa định dạng.   |
| [package-lock.json](../../package-lock.json)                                         | Lockfile do npm sinh; setup local/CI dùng `npm ci`.                                             |
| [.nvmrc](../../.nvmrc)                                                               | Node.js 22.23.2; package khai báo npm 10 và `packageManager` npm 10.9.8.                        |
| [eslint.config.js](../../eslint.config.js)                                           | Recommended rules cho JS/TS, globals theo backend/frontend; warning làm lệnh lỗi.               |
| [.prettierrc.json](../../.prettierrc.json), [.prettierignore](../../.prettierignore) | Single quotes/trailing commas; bỏ qua file sinh tự động, môi trường, tài liệu gốc và hồ sơ PA1. |
| [tsconfig.json](../../tsconfig.json)                                                 | Thay `jsconfig.json` rỗng; bật `strict`, `allowJs`, `checkJs`, `noEmit` và JSX React.           |
| [README.md](../../README.md)                                                         | Phiên bản runtime, setup và đúng bốn lệnh mà CI chạy.                                           |

```sh
npm run lint
npm run format:check
npm run typecheck
npm test
```

**Điểm cần phối hợp:** Node test runner hiện chỉ chạy file contract test chứa comment. Chưa có assertion kiểm tra endpoint; Ninh cần bổ sung tests thật theo contract/implementation của Văn. Kết quả runner xanh hiện chỉ xác nhận công cụ chạy được. Phần Commands trong AGENTS còn TODO, cần Ninh đồng bộ với các lệnh trên khi hoàn thiện Rules.

Không cần điền câu “đã pass” vào config. Kết quả và link bằng chứng ghi trong hồ sơ nộp khi đã thực hiện thật.

<a id="rubric-4"></a>

## 4. CI thật sự chặn merge — 20 điểm, rubric trang 2

**Luật phụ trách. Có workflow; chưa đủ bằng chứng hoàn thành tiêu chí.** Kiểm tra GitHub ngày 21/11/2026: chưa có PR/CI run cho nhánh `luat/p1-checks-ci`; API branch protection của `main` trả `404 Branch not protected`.

| File / nơi thao tác                      | Trạng thái và việc còn làm                                                                                                                  |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [ci.yml](../../.github/workflows/ci.yml) | Đã thay file `.example`; job `checks` chạy `npm ci` và cùng bốn lệnh mục #3 trên mọi PR, push main/tag pa2. Chưa có run remote để xác nhận. |
| GitHub branch protection / ruleset       | Cần bảo vệ `main`, bắt buộc job `checks`, áp dụng cả admin và không push thẳng main sau khi bật. YAML tự nó không bật protection.           |
| [evidence/](evidence/README.md)          | Khi thực hiện thật, có thể lưu ảnh protection và PR đỏ bị chặn ở đây; hiện chưa có ảnh bằng chứng.                                          |
| [PA2.md](../../PA2.md)                   | Cần link thật đến cài đặt/ảnh protection, PR đỏ bị chặn, commit sửa/CI xanh và CI run của tag nộp. Hiện vẫn là TODO.                        |

Để hướng tới mức 17–20 điểm, cần chứng minh đủ:

1. Workflow chạy trên PR và job `checks` đã được đặt required cho `main`.
2. Một commit khiến check đỏ; PR thực sự bị chặn merge vì required check đó. Lưu link PR, CI run đỏ và ảnh trạng thái bị chặn.
3. Một commit mới sửa lỗi khiến CI xanh. Lưu link commit và run xanh; không sửa tests/validator chỉ để làm check pass.
4. Không push thẳng main sau khi protection bật; không tái dựng/rebase lịch sử bằng chứng sau khi hoàn thành.
5. Khi nhóm chốt commit nộp, push tag `pa2` để workflow chạy trên tag và dẫn link run trong PA2.md.

Một lần lint/format đỏ → xanh chứng minh mục #4. **Deliberate contract break** là bằng chứng riêng của mục #6: phối hợp Văn/Ninh khi endpoint và test thật đã tồn tại. Không dùng thiếu setup hoặc file test khung làm lần phá contract.

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

| File / nơi code                                                         | Vai trò                                                                 | Bạn cần viết                                                                                                                                                                                                               |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [endpoint.test.js](../../backend/test/contract/endpoint.test.js)        | File tests của endpoint, tên/path do repo chọn.                         | Đổi tên theo endpoint; viết tests chạy request thật tới implementation: success, từng error type, ownership và paging/idempotency nếu áp dụng. Kiểm tra nội dung/schema chứ không chỉ status. Hiện toàn bộ chỉ là comment. |
| [backend/test/fixtures/](../../backend/test/fixtures/README.md)         | Dữ liệu đầu vào và kết quả tham chiếu cho tests; cách tổ chức tùy chọn. | Thêm fixtures khi biết schema. README chỉ hướng dẫn, không phải dataset hay test.                                                                                                                                          |
| [backend/src/](../../backend/src/)                                      | Nơi sẽ chứa implementation endpoint theo bố trí repo.                   | Hiện chỉ có .gitkeep. Cần code endpoint và phần xử lý liên quan để tests thật sự kiểm tra hành vi; rubric không quy định bắt buộc tên file app.js/router.js.                                                               |
| [CI workflow](../../.github/workflows/ci.yml) và [PA2.md](../../PA2.md) | Chạy tests và dẫn bằng chứng.                                           | Đưa tests vào required CI; tạo một commit/PR làm implementation sai contract khiến tests đỏ, rồi sửa code và dẫn link.                                                                                                     |

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
