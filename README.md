# AI Travel Planner

Repository: <https://github.com/Tienluat123/WebNC>.

Thành viên: Nguyễn Tiến Luật — 23127221; Đặng Nghi Văn — 23127281; Phạm Chí Bảo Ninh — 23127446.

Repo đã có cấu hình checks và workflow CI cho PA#2. Ứng dụng và contract tests còn là khung; workflow chưa có bằng chứng chạy trên GitHub và `main` chưa bật branch protection.

## Bố trí thư mục

```text
WebNC/
├── README.md                       # Điểm bắt đầu đọc repo
├── AGENTS.md                       # Khung quy tắc cho assistant
├── PA2.md                          # Khung hồ sơ nộp PA#2
├── AI-LOG.md                       # Khung nhật ký AI PA#2
├── SELF_ASSESSMENT_REPORT.md        # Khung tự chấm PA#2
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
    │   └── evidence/               # Chỗ lưu bằng chứng thực tế
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

**Giới hạn hiện tại:** `backend/test/contract/endpoint.test.js` chỉ có comment. Node báo file này pass không có nghĩa là đã kiểm tra contract. Ninh cần bổ sung test cases thật theo endpoint của Văn; CI đã có bước chạy `npm test`. Chưa có ứng dụng để chạy dev/build.

## CI và bằng chứng — Luật, rubric #4

[Workflow CI](.github/workflows/ci.yml) có job `checks`: checkout source, chọn Node theo `.nvmrc`, chạy `npm ci` rồi chạy cùng bốn lệnh trong bảng trên. Workflow nhận mọi PR, push vào `main`, push tag `pa2`; có thể chạy thủ công khi workflow đã có trên default branch.

Cấu hình local đã có; kiểm tra GitHub ngày 21/11/2026 chưa thấy PR/CI run của nhánh `luat/p1-checks-ci`, và API branch protection trả `Branch not protected` cho `main`. Để hoàn tất mục #4:

- Push nhánh và mở PR để có CI run thật.
- Bảo vệ `main`, yêu cầu job `checks` thành công trước khi merge, áp dụng cả với admin; từ lúc bật không push thẳng `main`.
- Lưu link PR có check đỏ bị chặn merge, link commit sửa và CI run xanh, cùng ảnh/link cài đặt protection trong [PA2.md](PA2.md).
- Giữ lịch sử đỏ → xanh; không tái dựng/rebase lịch sử bằng chứng sau khi hoàn thành.
- Khi cả nhóm chốt bài, tạo/push tag `pa2` và ghi link CI run của tag vào `PA2.md`.

Bằng chứng cố tình phá **contract** ở mục #6 cần phối hợp Văn/Ninh khi implementation và tests thật đã có; một lỗi lint/format chỉ chứng minh CI ở mục #4.

## Bắt đầu PA#2

- [Map yêu cầu của thầy → khung file](docs/pa2/README.md).
- [Rubric PA#2](<docs/reference/PA2 Rubric Harness Quality Gate.pdf>).
- [Contract mẫu của thầy](docs/reference/Contract.md).
- [Contract của nhóm](docs/contract/endpoint.md).
- [Khung hồ sơ nộp](PA2.md), [nhật ký AI](AI-LOG.md), [tự chấm](SELF_ASSESSMENT_REPORT.md).

TODO (phần permissions/secrets): điền provider/model, spending cap đã cấu hình thật và chi phí một plan.

## Tham khảo thêm

- [Brief AI Travel Planner](<docs/reference/AI Travel Planner Project Brief.pdf>).
- [Đề cương môn](<docs/reference/CSC13114 Advanced Web Application Development.pdf>).
- [Phân tích hướng đồ án](docs/project-analysis.md).
- [Proposal PA#1](docs/pa1/proposal.pdf), [nhật ký PA#1](docs/pa1/AI-LOG.md), [tự chấm PA#1](docs/pa1/SELF_ASSESSMENT_REPORT.md).
