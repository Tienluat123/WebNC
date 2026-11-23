# AI Travel Planner

Repository: <https://github.com/Tienluat123/WebNC_Proposal>.

## PA2 status - 2026-11-23

GET /places is implemented with Express and explicitly synthetic fixtures.
The adopted [contract](docs/contract/endpoint.md) defines public access, four
AND-combined filters, signed cursor pagination and RFC 9457 errors.
See the [P1 review](docs/pa2/evidence/p1-review.md) for evidence and remaining work.

Repo đã có checks, CI chạy thật trên PR và protection cho `main`. Phần Luật đã có bằng chứng required check đỏ chặn merge rồi xanh sau khi sửa. Endpoint `GET /places` và HTTP contract tests đã có; bằng chứng deliberate contract break và CI của tag nộp vẫn chờ hoàn thiện.

| Owner    | Scope                                            | Current state                                                                 |
| -------- | ------------------------------------------------ | ----------------------------------------------------------------------------- |
| Nghi Van | #2 Permissions/secrets, #5 contract and endpoint | Implemented; actual model spending-cap evidence pending                       |
| Luat     | #3 commands, #4 required CI/protection           | Verified locally and on PR/branch protection; tag CI pending                  |
| Ninh     | #1 rules, #6 contract tests                      | Rules and HTTP tests added; deliberate contract red-green CI evidence pending |
| All      | #7 AI log and submission                         | Log updated; final score, evidence links and submission packaging pending     |

## Setup and verification

Use Node.js 22.23.2 and npm 10.9.8, as documented in
[backend/README.md](backend/README.md). For server setup, copy .env.example to .env, set PORT and a private CURSOR_SECRET
of at least 32 bytes, then run npm start. Follow the backend instructions to
generate the secret locally; never commit or share its value.

The CI and root setup use Node.js 22.23.2 (`.nvmrc`) and npm 10.9.8. Run:

```sh
nvm install
nvm use
npm ci
npm run lint
npm run format:check
npm run typecheck
npm test
```

Run `npm run check` to execute all four checks in one command.

```text
WebNC/
├── README.md                       # Điểm bắt đầu đọc repo
├── AGENTS.md                       # Khung quy tắc cho assistant
├── PA2.md                          # Hồ sơ bằng chứng PA#2, phần Luật đã điền
├── AI-LOG.md                       # Nhật ký AI PA#2
├── SELF_ASSESSMENT_REPORT.md        # Tự chấm phần Luật, chờ tổng của nhóm
├── package.json                    # Lệnh checks và dependencies công cụ
├── package-lock.json               # Phiên bản dependencies để npm ci tái lập
├── .nvmrc                          # Node.js 22.23.2
├── eslint.config.js                # Lint JavaScript / TypeScript
├── tsconfig.json                   # Typecheck JS/TS và JSX React
├── .prettierrc.json                 # Cấu hình format
├── .prettierignore
├── .env.example
├── .gitignore
├── .github/workflows/
│   └── ci.yml                      # Workflow chạy checks trên PR, main, tag pa2
├── backend/
│   ├── src/
│   └── test/
│       ├── contract/               # Khung tests nhóm sẽ viết
│       └── fixtures/               # Chỗ thêm dữ liệu test
├── frontend/src/
└── docs/
    ├── reference/                  # Tất cả tài liệu gốc của thầy
    │   ├── Contract.md
    │   ├── PA2 Rubric Harness Quality Gate.pdf
    │   ├── PA1 Rubric Proposal and Planning.pdf
    │   ├── AI Travel Planner Project Brief.pdf
    │   └── CSC13114 Advanced Web Application Development.pdf
    ├── contract/
    │   └── endpoint.md             # Contract nhóm tự viết
    ├── pa2/                        # Tài liệu nhóm chuẩn bị cho PA#2
    │   ├── README.md               # Map yêu cầu → file
    │   ├── PERMISSIONS.md          # Khung chính sách quyền
    │   └── evidence/               # Ảnh protection, PR đỏ / xanh và chỉ mục
    ├── pa1/                        # Hồ sơ cũ, một bản proposal duy nhất
    └── project-analysis.md         # Phân tích hướng đồ án đã có
```

Các file cấu hình ở root phục vụ công cụ nhóm chọn, không phải từng file thầy bắt buộc. Rubric chỉ rõ PA2.md ở root; repo cũng giữ AI-LOG.md và SELF_ASSESSMENT_REPORT.md tại đây để dễ tìm và đóng gói. Xem bảng map để biết từng file cần điền gì.

## Setup và checks — Luật, rubric #3

Dùng **Node.js 22.23.2** (theo `.nvmrc`) và **npm 10.9.8**. Với fresh clone, clone URL repository ở trên, vào thư mục `WebNC` và checkout nhánh/tag chứa setup trước khi cài dependencies. Khi review phần Luật trước khi merge vào `main`, dùng nhánh `luat/p1-checks-ci`. Từ thư mục repo đã checkout đúng commit/nhánh cần kiểm tra:

```sh
nvm install
nvm use
npm ci
```

Nếu không dùng nvm, cài đúng Node/npm ở trên trước khi chạy `npm ci`. Khi cài dependencies mới, commit cả `package.json` và `package-lock.json`.

| Check                            | Lệnh local và CI       |
| -------------------------------- | ---------------------- |
| Lint JavaScript / TypeScript     | `npm run lint`         |
| Kiểm tra format, không sửa file  | `npm run format:check` |
| Kiểm tra kiểu JS/TS và JSX React | `npm run typecheck`    |
| Tests bằng Node test runner      | `npm test`             |

Chạy toàn bộ: `npm run check`. Tự sửa format: `npm run format`.

ESLint dùng recommended rules cho JS/TS; warning làm check thất bại. Typecheck bật `strict`, `checkJs`, `noEmit`; hiện kiểm tra cấu hình ESLint và file test khung, đồng thời nhận code JS/TS trong backend và TS/TSX trong frontend khi được thêm. Formatter bỏ qua dependencies, file sinh tự động, file môi trường, tài liệu gốc của thầy và hồ sơ PA1.

**Trạng thái hiện tại:** `backend/test/contract/places.test.js` chạy HTTP contract tests cho `GET /places`. Lần chạy local ngày 2026-11-23 đã qua 35 tests, 0 failed. Kết quả local này chưa thay thế deliberate contract break chạy trong CI cho rubric #6.

## CI và bằng chứng — Luật, rubric #4

[Workflow CI](.github/workflows/ci.yml) có job `checks`: checkout source, chọn Node theo `.nvmrc`, chạy `npm ci` rồi chạy cùng bốn lệnh trong bảng trên. Workflow nhận mọi PR, push vào `main`, push tag `pa2`; có thể chạy thủ công khi workflow đã có trên default branch.

Đã kiểm chứng ngày 21/11/2026 trên [PR #1](https://github.com/Tienluat123/WebNC/pull/1):

| Bằng chứng                                                                                                                                                                            | Kết quả                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [Protection](docs/pa2/evidence/README.md)                                                                                                                                             | `main` yêu cầu PR, bắt buộc `checks` từ GitHub Actions, up-to-date và áp dụng cả admin; tắt force push/xóa nhánh. |
| [Commit đỏ 868f505](https://github.com/Tienluat123/WebNC/commit/868f505b763e424efeae7cc7cfb044e4fe47fcf8), [run đỏ](https://github.com/Tienluat123/WebNC/actions/runs/44906808477)    | Format `package.json` sai; required check thất bại và PR bị chặn merge.                                           |
| [Commit sửa 2b3c61c](https://github.com/Tienluat123/WebNC/commit/2b3c61ce7116cf8d88e892c0896cdc7f213947eb), [run xanh](https://github.com/Tienluat123/WebNC/actions/runs/44907080432) | Khôi phục format; cả bốn checks xanh và PR hết bị chặn.                                                           |

Một bản clone mới từ GitHub tại `2b3c61c` cũng đã chạy `npm ci` và `npm run check` thành công với Node/npm ở trên. Hồ sơ [PA2.md](PA2.md) tập hợp ảnh, link và giới hạn của bằng chứng.

Tiếp tục giữ hai commit đỏ/sửa trong lịch sử; không tái dựng/rebase lịch sử bằng chứng và không push thẳng `main` sau khi bật protection. Khi cả nhóm chốt bài mới tạo/push tag `pa2` rồi bổ sung link CI run của tag vào `PA2.md`.

Bằng chứng cố tình phá **contract** ở mục #6 cần phối hợp Văn/Ninh khi implementation và tests thật đã có; một lỗi lint/format chỉ chứng minh CI ở mục #4.

The 2026-11-23 local rerun passed all 35 service and HTTP contract tests.
This is local verification, not a CI pass. The deliberate contract break remains pending.

## Permissions, secrets and model budget

Assistant actions follow [PERMISSIONS.md](docs/pa2/PERMISSIONS.md).
The backend currently reads only PORT and CURSOR_SECRET; both variable names
have empty values in .env.example. GET /places makes no model calls.

Run `python -X utf8 scripts/audit-secrets.py` for the local heuristic audit.
See [audit results and limitations](docs/pa2/evidence/secrets-audit.md).

The team reports the following model-account configuration:

- Provider: Google Gemini API.
- Project: `travel-planner`.
- Model: `gemini-3.5-flash-lite`.
- Billing: Free tier; no billing account is linked to the project.
- API connectivity: successfully tested by a team member; no key or test output is stored here.
- Paid-spend ceiling: USD 0, enforced continuously by the absence of a linked billing account.
- Configurable project spend-cap feature: not applicable while the project remains on the Free tier.
- Synthetic full-itinerary benchmark: actual Free-tier cost USD 0; paid-tier
  equivalent USD 0.00162885 for one 84-input/1,293-output-token call. See the
  [measurement and limitations](docs/pa2/evidence/model-cost-benchmark.md).

This is an account-side zero paid-spend boundary, not a budget alert and not a
claim that the configurable paid-tier spend-cap control was set. Google documents
the Free-tier billing cap as N/A; API keys inherit the project's billing status.
If a billing account is linked later, the USD 0 boundary no longer applies and
the team must configure a project spend cap before using the key. See the
[Gemini API billing documentation](https://ai.google.dev/gemini-api/docs/billing).
No model key is committed or requested. A redacted account screenshot should
retain the project name, Free-tier badge and no-billing message while hiding the
email address and project identifier. The repository includes that
[redacted account evidence](docs/pa2/evidence/gemini-free-tier-no-billing-2026-11-21.png).

## Project and submission references

- [PA2 assignment map and ownership](docs/pa2/README.md).
- [PA2 submission entry](PA2.md) and [self-assessment](SELF_ASSESSMENT_REPORT.md).
- [AI usage log](AI-LOG.md).
- [PA2 rubric](<docs/reference/PA2 Rubric Harness Quality Gate.pdf>).
- [Lecturer's contract example](docs/reference/Contract.md).
- [Project brief](<docs/reference/AI Travel Planner Project Brief.pdf>).
- [PA1 proposal](docs/pa1/proposal.pdf).
