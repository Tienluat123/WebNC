# AI Travel Planner

Repository: <https://github.com/Tienluat123/WebNC>.

Thành viên: Nguyễn Tiến Luật — 23127221; Đặng Nghi Văn — 23127281; Phạm Chí Bảo Ninh — 23127446.

Repo đã có checks, CI chạy thật trên PR và protection cho `main`. Phần Luật đã có bằng chứng required check đỏ chặn merge rồi xanh sau khi sửa. Ứng dụng và contract tests còn là khung; bằng chứng phá contract và CI của tag nộp vẫn chờ nhóm hoàn thiện.

## Bố trí thư mục

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

**Giới hạn hiện tại:** `backend/test/contract/endpoint.test.js` chỉ có comment. Node báo file này pass không có nghĩa là đã kiểm tra contract. Ninh cần bổ sung test cases thật theo endpoint của Văn; CI đã có bước chạy `npm test`. Chưa có ứng dụng để chạy dev/build.

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
