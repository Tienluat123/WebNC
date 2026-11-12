# AI Travel Planner

Repository: <https://github.com/Tienluat123/WebNC>.

Thành viên: Nguyễn Tiến Luật — 23127221; Đặng Nghi Văn — 23127281; Phạm Chí Bảo Ninh — 23127446.

Repo hiện chỉ có khung file và ghi chú yêu cầu PA#2. Chưa có checks, CI hoặc tính năng ứng dụng chạy được.

## Bố trí thư mục

```text
WebNC/
├── README.md                       # Điểm bắt đầu đọc repo
├── AGENTS.md                       # Khung quy tắc cho assistant
├── PA2.md                          # Khung hồ sơ nộp PA#2
├── AI-LOG.md                       # Khung nhật ký AI PA#2
├── SELF_ASSESSMENT_REPORT.md        # Khung tự chấm PA#2
├── package.json                    # Khung package và lệnh chạy
├── eslint.config.js                # Khung lint
├── jsconfig.json                   # Khung kiểm tra kiểu JavaScript
├── .prettierrc.json                 # Khung format
├── .prettierignore
├── .env.example
├── .gitignore
├── .github/workflows/
│   └── ci.yml.example              # Khung CI chưa hoạt động
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

Các file cấu hình ở root là khung cho công cụ dự kiến, không phải từng file thầy bắt buộc. Rubric chỉ rõ PA2.md ở root; repo cũng giữ AI-LOG.md và SELF_ASSESSMENT_REPORT.md tại đây để dễ tìm và đóng gói. Xem bảng map để biết từng file cần điền gì.

## Bắt đầu PA#2

- [Map yêu cầu của thầy → khung file](docs/pa2/README.md).
- [Rubric PA#2](<docs/reference/PA2 Rubric Harness Quality Gate.pdf>).
- [Contract mẫu của thầy](docs/reference/Contract.md).
- [Contract của nhóm](docs/contract/endpoint.md).
- [Khung hồ sơ nộp](PA2.md), [nhật ký AI](AI-LOG.md), [tự chấm](SELF_ASSESSMENT_REPORT.md).

TODO: điền lệnh setup và checks, model, spending cap, chi phí một plan. Lệnh checks trong README phải giống CI.

## Tham khảo thêm

- [Brief AI Travel Planner](<docs/reference/AI Travel Planner Project Brief.pdf>).
- [Đề cương môn](<docs/reference/CSC13114 Advanced Web Application Development.pdf>).
- [Phân tích hướng đồ án](docs/project-analysis.md).
- [Proposal PA#1](docs/pa1/proposal.pdf), [nhật ký PA#1](docs/pa1/AI-LOG.md), [tự chấm PA#1](docs/pa1/SELF_ASSESSMENT_REPORT.md).
