# PA#2 — phân công và hướng dẫn

Đã rà với [rubric gốc](<../reference/PA2 Rubric Harness Quality Gate.pdf>), trang 1–4, và [contract mẫu](../reference/Contract.md). Hạn trong rubric: **22:00 ngày 26/11/2026**.

Current status (2026-11-26): remote tag `pa2` is at `39c66e5` with
[successful CI](https://github.com/Tienluat123/WebNC/actions/runs/45651154508).
The documentation review remains local pending publication and a matching final tag.
See [final review](evidence/final-review.md). Submission links are in [PA2.md](../../PA2.md)
and scores in [SELF_ASSESSMENT_REPORT.md](../../SELF_ASSESSMENT_REPORT.md). The P1 permissions policy, adopted GET /places contract,
Express implementation and executable HTTP contract tests exist. The latest local
`npm test` run passed all 35 tests, including the HTTP contract tests. The team reports Google Gemini API
and `gemini-3.5-flash-lite`; the Free-tier project has no billing account. It has
no configured spending cap; these are separate facts and the missing cap is
disclosed in the self-assessment. Redacted no-billing evidence is included.
The detailed guidance below includes the
original scaffold inventory, kept as the team's working notes.

Repo đã có checks, required CI và bằng chứng PR đỏ → xanh cho phần Luật. Endpoint
PA2 hiện là `GET /places`, với implementation, contract Markdown và HTTP contract
tests; implementation và test data đều dùng synthetic/public catalogue. Có file và
có test không đồng nghĩa endpoint đã chứng minh mọi ownership scenario. Ghi chú dưới
đây phân biệt yêu cầu của thầy với cách nhóm chọn tổ chức repo.

## Quyết định

- **Stack:** frontend [React + TS](https://react.dev/learn) / backend [Express](https://expressjs.com/) / runtime Node.js 22.23.2 / npm 10.9.8 (local và CI dùng cùng phiên bản, xem `.nvmrc`).
- **Checks:** lint (ESLint) / format Prettier / tests node:test / typecheck (tsc cho TypeScript).
- **Endpoint (P1):** GET /places : a list, so it pages. Say what a filter it cannot read returns.

## Phân công theo rubric

| Người    | Mục rubric phụ trách                                          | Phạm vi                                                                                                                                             |
| -------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nghi Văn | [#2 Permissions/secrets](#rubric-2), [#5 Contract](#rubric-5) | Contract và code **một endpoint PA#2**; chính sách quyền, env/secrets, audit history và spending cap.                                               |
| Luật     | [#3 Commands](#rubric-3), [#4 CI](#rubric-4)                  | Cấu hình checks, hướng dẫn setup, CI/protection và bằng chứng PR đỏ → xanh.                                                                         |
| Ninh     | [#1 Rules](#rubric-1), [#6 Contract tests](#rubric-6)         | Duy trì AGENTS theo quy ước/entry thật của nhóm; viết HTTP contract tests cho `GET /places`; tạo fixture và chứng minh lần phá/sửa contract qua CI. |
| Cả ba    | [#7 AI-LOG](#rubric-7), [hồ sơ nộp](#submission)              | Mỗi người ghi log, link bằng chứng và tự chấm các mục mình làm; review chung trước khi nộp.                                                         |

Commit: gắn tag pa2.
Nhánh cho phần permissions/secrets và GET /places: `pa2-permissions-places`.
Commit nộp cuối của cả nhóm: gắn tag pa2; remote tag đã ở `39c66e5`, bản rà mới chưa publish.
Mỗi task nên có một nhánh riêng.

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

**Vì sao từng có AI-LOG ở dòng số 1?** Nó chỉ là nguồn chứng minh cho quy tắc, không phải Rules file thứ hai. File được chấm chính ở mục 1 vẫn là AGENTS.md; AI-LOG được chấm riêng ở mục 7. AGENTS phải phản ánh stack, lệnh, convention và cấm thật của repo; chưa có entry/sự cố thật không được biến thành bằng chứng.

<a id="rubric-2"></a>

## 2. Permissions và secrets — 10 điểm, rubric trang 2

| File / nơi thao tác                | Vai trò                                                                              | Điền hoặc làm gì?                                                                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [PERMISSIONS.md](PERMISSIONS.md)   | Chính sách quyền assistant. Tên/path do repo chọn, thầy không bắt buộc file tên này. | Điền ba dòng Allowed / Ask first / Never bằng hành động cụ thể của nhóm. AGENTS dẫn tới file này để người dùng biết chính sách ở đâu.      |
| [.env.example](../../.env.example) | Danh sách biến môi trường cần có. Tên được rubric nêu rõ.                            | Thêm biến với giá trị trống khi runtime thật sử dụng nó; không commit giá trị. Trạng thái hiện tại xem [.env.example](../../.env.example). |
| [.gitignore](../../.gitignore)     | Quy tắc không đưa file local vào Git.                                                | Đã có .env và .env.\* cùng ngoại lệ cho .env.example. Cập nhật nếu có đường dẫn nhạy cảm khác; không thêm khóa vào file này.               |
| [README.md](../../README.md)       | Hướng dẫn chung và thông tin spending cap.                                           | Điền provider/model nhóm dùng và spending cap đã cấu hình thật; brief còn yêu cầu ghi chi phí một plan.                                    |
| Provider console và lịch sử Git    | Bằng chứng thực tế, không thay bằng một file TODO.                                   | Thiết lập cap ở provider; kiểm tra toàn bộ history. Nếu lộ khóa thì xoay khóa và ghi AI-LOG.                                               |

PERMISSIONS trả lời “assistant được tự làm gì / cần hỏi gì / không được làm gì”. Never trong AGENTS tập trung quy tắc phát triển sản phẩm. Hai phần có thể liên kết nhau; không cần chép nguyên văn một chính sách vào cả hai file. Nhóm cũng có thể gộp quyền vào Rules file nếu muốn ngắn hơn; rubric không bắt buộc tách riêng.

<a id="rubric-3"></a>

## 3. Một lệnh cho mỗi check — 10 điểm, rubric trang 2

**Luật phụ trách. Đã kiểm chứng trên local, bản clone mới từ GitHub tại `2b3c61c` và CI thật.** Hướng dẫn chạy nằm ở [README gốc](../../README.md#setup-và-checks--luật-rubric-3).

Rubric mức 9–10 yêu cầu lint, format check, typecheck (nếu áp dụng), tests đều có một lệnh được ghi rõ; local và CI dùng cùng lệnh; fresh clone làm theo README phải xanh.

| File                                                                                 | Phần đã cấu hình                                                                                                                          |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [package.json](../../package.json)                                                   | `lint`, `format:check`, `typecheck`, `test`; `check` chạy tổng hợp và `format` sửa định dạng.                                             |
| [package-lock.json](../../package-lock.json)                                         | Lockfile do npm sinh; setup local/CI dùng `npm ci`.                                                                                       |
| [.nvmrc](../../.nvmrc)                                                               | Node.js 22.23.2; package khai báo npm 10 và `packageManager` npm 10.9.8.                                                                  |
| [eslint.config.js](../../eslint.config.js)                                           | Recommended rules cho JS/TS, globals theo backend/frontend; warning làm lệnh lỗi.                                                         |
| [.prettierrc.json](../../.prettierrc.json), [.prettierignore](../../.prettierignore) | Single quotes/trailing commas; bỏ qua file sinh tự động, môi trường, tài liệu gốc và hồ sơ PA1.                                           |
| [tsconfig.json](../../tsconfig.json)                                                 | Thay `jsconfig.json` rỗng; bật `allowJs`, `checkJs`, `noEmit` và JSX React; không ép toàn bộ JavaScript sang strict TypeScript migration. |
| [README.md](../../README.md)                                                         | Phiên bản runtime, setup và đúng bốn lệnh mà CI chạy.                                                                                     |

```sh
npm run lint
npm run format:check
npm run typecheck
npm test
```

**Điểm cần phối hợp:** HTTP contract tests kiểm tra `GET /places` qua server thật; clone sạch tại `39c66e5` đã qua đủ bốn checks và 35 tests ngày 2026-11-26. Ninh cần giữ test cases khớp contract và phối hợp Văn để có deliberate contract-break trong CI. Lệnh tests trong AGENTS, package.json, README và workflow phải đồng nhất.

Không cần điền câu “đã pass” vào config. Kết quả và link bằng chứng ghi trong hồ sơ nộp khi đã thực hiện thật.

<a id="rubric-4"></a>

## 4. CI thật sự chặn merge — 20 điểm, rubric trang 2

**Luật phụ trách. Đã có bằng chứng protection và PR đỏ bị chặn → commit sửa xanh ngày 21/11/2026.** Hồ sơ ở [PA2.md](../../PA2.md), ảnh và kiểm chứng ở [evidence/README.md](evidence/README.md).

| File / nơi thao tác                                                                                                                                                 | Trạng thái                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ci.yml](../../.github/workflows/ci.yml)                                                                                                                            | Job `checks` chạy `npm ci` và đúng bốn lệnh mục #3. [Run xanh](https://github.com/Tienluat123/WebNC/actions/runs/44907080432) đã chạy đủ các bước.                                                                                                                        |
| GitHub branch protection                                                                                                                                            | `main` yêu cầu PR và required check `checks` từ GitHub Actions, strict up-to-date, áp dụng admin; không cho force push/xóa nhánh. Đã đối chiếu rule lưu thật qua API.                                                                                                     |
| [Ảnh protection](evidence/main-protection-01.png), [required checks/admin](evidence/main-protection-02.png), [force push/deletion](evidence/main-protection-03.png) | Ảnh người dùng cung cấp, lưu nguyên bản.                                                                                                                                                                                                                                  |
| [PR #1](https://github.com/Tienluat123/WebNC/pull/1)                                                                                                                | [Commit đỏ 868f505](https://github.com/Tienluat123/WebNC/commit/868f505b763e424efeae7cc7cfb044e4fe47fcf8) làm format check lỗi và merge bị chặn; [ảnh đỏ](evidence/pr-1-required-check-red.png), [run đỏ](https://github.com/Tienluat123/WebNC/actions/runs/44906808477). |
| Commit sửa / CI xanh                                                                                                                                                | [2b3c61c](https://github.com/Tienluat123/WebNC/commit/2b3c61ce7116cf8d88e892c0896cdc7f213947eb) khôi phục format; [run xanh](https://github.com/Tienluat123/WebNC/actions/runs/44907080432), [ảnh merge được bật lại](evidence/pr-1-required-check-green.png).            |
| [PA2.md](../../PA2.md)                                                                                                                                              | Đã có link phần Luật. Tag nộp cần dời sang commit cuối; deliberate contract break chưa chạy trên PR CI.                                                                                                                                                                   |

Hai commit demo chỉ thay đổi thụt dòng trong `package.json`, không sửa tests hay validator rules. Giữ lịch sử đỏ → xanh; không squash/rebase để dựng lại bằng chứng sau khi hoàn thành. Không push thẳng `main` kể từ lúc bật protection.

Tag `pa2` đang ở `e2834b6`; phải dời sang commit cuối rồi ghi link run vào PA2.md. **Deliberate contract break** ở mục #6 (`297d44d` đỏ, `531967f` xanh) mới kiểm chứng ở local, chưa có run CI trên PR; lỗi format của mục #4 không thay cho bằng chứng này.

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

Theo contract hiện có, [GET /places](../../docs/contract/endpoint.md) là endpoint
dùng cho rubric #5. Chỉ ra chính sách public/shared catalogue, không có owned
resource, các filter, paging, cursor, problem details và không có request body.

Không chỉ viết “đã đăng nhập”; phải rõ quyền trên dữ liệu. Đích là người lạ có thể viết client từ contract mà không cần hỏi nhóm. Contract hiện đã nêu public ownership, nhưng mức ownership-test có thể chưa đủ cho yêu cầu riêng về owned data của rubric.

<a id="rubric-6"></a>

## 6. Contract tests có tác dụng — 15 điểm, rubric trang 3

| File / nơi code                                                                          | Vai trò                                   | Bạn cần viết                                                                                                                                                                                               |
| ---------------------------------------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [places.test.js](../../backend/test/contract/places.test.js)                             | HTTP contract tests cho `GET /places`.    | Viết request thật tới implementation; kiểm tra success schema, public fields, filter AND, validation, cursor binding/expiry, 500 redaction, Authorization independence và rejection của private selectors. |
| [backend/test/fixtures/](../../backend/test/fixtures/README.md)                          | Dữ liệu synthetic và hướng dẫn fixture.   | Mở rộng fixture khi contract cần case mới; tên/id phải vẫn synthetic và không mô tả real place như đã xác minh.                                                                                            |
| [backend/src/app.js](../../backend/src/app.js), [places.js](../../backend/src/places.js) | Implementation HTTP/service cho endpoint. | Không thay implementation để ép test qua. Hành vi phải khớp [contract](../../docs/contract/endpoint.md), kể cả paging và problem details.                                                                  |
| [CI workflow](../../.github/workflows/ci.yml) và [PA2.md](../../PA2.md)                  | Chạy tests và dẫn bằng chứng.             | Đưa tests vào required CI; tạo một commit/PR làm implementation sai contract khiến tests đỏ, rồi sửa code và dẫn link.                                                                                     |

Contract Markdown và HTTP contract tests cùng tồn tại. Phạm vi rubric cần gồm:

- success path và response shape;
- mọi error type trong contract, với đúng HTTP status và RFC 9457 problem fields;
- ownership rule: request tới dữ liệu người khác phải có đúng status mà contract đặt ra.
  Với `GET /places` public hiện tại, tests chỉ chứng minh public/shared data,
  từ chối user selectors và không lộ private fields; không tự khẳng định đó là
  một owned-resource denial;
- paging hoặc idempotency nếu endpoint là list hoặc create/publish;
- kiểm tra nội dung/schema và ràng buộc field, không chỉ status code.

Tests phải chạy trong required CI. Sau đó giữ một commit/PR riêng cố ý làm
implementation sai contract để CI đỏ, rồi commit sửa riêng để CI xanh. Không sửa
test hay validator trong commit đỏ để làm nó pass.

Đã có bằng chứng deliberate contract break trên local:
`297d44d` trả `201` thay cho `200` ở `GET /places`, làm 3/35 tests đỏ (32 pass);
`531967f` khôi phục `200` và làm 35/35 tests xanh. Không test hay validator
nào bị thay đổi. Theo rubric, chứng cứ local chưa đủ cho 13-15 điểm. Cần tạo PR và ghi lại
commit đỏ/sửa dưới dạng required CI run đỏ/xanh thật trên GitHub. Nếu không
bổ sung owned-resource case, team nên tự chấm criterion 6 trong band 8-12.

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

Thầy chấm tool/phần việc và Changed / Rejected có thật. Date và Evidence là cách khung này giúp truy vết; không phải tên trường bắt buộc của rubric. Không chép ví dụ thành sự cố của nhóm. Root AI-LOG đã có entry cho Commands/CI, permissions, endpoint và contract tests; lượt rà cuối được ghi thêm theo kết quả thực tế. Log trong docs/pa1/ là của lần nộp cũ.

<a id="submission"></a>

## Hồ sơ nộp và README gốc

| File                                                         | Điền gì?                                                                                          | Tên / vị trí                                                             |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [PA2.md](../../PA2.md)                                       | Repo, protection, PR bị chặn, PR/commit xanh lại, CI run cho tag pa2, deliberate contract break.  | Rubric chỉ rõ file này ở root.                                           |
| [SELF_ASSESSMENT_REPORT.md](../../SELF_ASSESSMENT_REPORT.md) | Điểm tự nhận từng tiêu chí, bằng chứng cụ thể, tổng và phần chưa làm. Điền sau khi có bằng chứng. | Tên được yêu cầu; phải có trong ZIP. Repo giữ ở root để dễ tìm/đóng gói. |
| [AI-LOG.md](../../AI-LOG.md)                                 | Nhật ký ở mục 7.                                                                                  | Tên được rubric nêu; repo giữ ở root để phân biệt log PA#1.              |
| [README.md](../../README.md)                                 | Setup/check commands, spending cap; thông tin model/chi phí theo brief.                           | Hướng dẫn chính, dùng chung cho nhiều tiêu chí. Không thay thế PA2.md.   |

PA2.md, AI-LOG.md và SELF_ASSESSMENT_REPORT.md viết tiếng Anh. docs/pa2/README.md hiện tại là hướng dẫn tiếng Việt, không thay ba file đó.

Repo phải public; tag commit nộp là pa2 và push tag; ZIP gồm repo và .git (kèm tag `pa2`), không gồm `node_modules` và `.env`, tên `23127221-23127281-23127446_<final-total>.zip`; bản nộp hiện tại là `23127221-23127281-23127446_95.zip`. Tổng khớp SELF_ASSESSMENT_REPORT.md. Trước khi nộp: giải nén, `git checkout --detach refs/tags/pa2`, `npm ci`, `npm run check`. Một người nộp qua Google sinh viên; xem bảng honesty adjustment trong rubric trước khi chấm.

</details>
