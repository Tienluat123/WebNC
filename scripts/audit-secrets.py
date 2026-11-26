"""Read-only heuristic audit of locally reachable Git blobs and non-ignored files.

Print locations and rule names only; never print a matching credential value.
Run from the repository root with Python 3: python scripts/audit-secrets.py
This is a review aid, not a guarantee that every possible secret is detected.
"""

import io
import json
import pathlib
import re
import subprocess
import sys
import zipfile


def git(*args):
    return subprocess.check_output(["git", *args])


RULES = {
    "private-key": rb"-----BEGIN (?:RSA |EC |OPENSSH |DSA |ENCRYPTED )?PRIVATE KEY-----",
    "aws-access-key": rb"\b(?:AKIA|ASIA)[A-Z0-9]{16}\b",
    "github-token": rb"\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b",
    "provider-api-key": rb"\b(?:sk-(?:proj-|ant-api\d+-)?[A-Za-z0-9_-]{20,}|AIza[A-Za-z0-9_-]{30,}|gsk_[A-Za-z0-9]{30,})\b",
    "slack-token": rb"\bxox[baprs]-[A-Za-z0-9-]{15,}\b",
    "credential-in-url": rb"\b(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?|redis|https?)://[^\s/:]+:[^\s/@]+@",
    "jwt": rb"\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b",
    "literal-secret-assignment": rb'''(?i)\b(?:[a-z_]*api[_-]?key|cursor[_-]?secret|cursorSecret|secret|password|access[_-]?token|auth[_-]?token)\b["']?\s*[:=]\s*["']([^"'\r\n]{8,})["']''',
}
COMPILED = {name: re.compile(pattern) for name, pattern in RULES.items()}


def inspect_data(data):
    """Inspect bytes plus readable PDF/Office text when available."""
    chunks = [data]
    if data.startswith(b"%PDF"):
        try:
            import pymupdf
            with pymupdf.open(stream=data, filetype="pdf") as doc:
                chunks.extend(page.get_text().encode("utf-8") for page in doc)
        except ImportError:
            incomplete.add("PDF text extraction unavailable (install PyMuPDF)")
        except Exception:
            incomplete.add("At least one PDF could not be extracted")
    if data.startswith(b"PK\x03\x04"):
        try:
            with zipfile.ZipFile(io.BytesIO(data)) as archive:
                for item in archive.infolist():
                    if item.filename.endswith((".xml", ".txt", ".json", ".js", ".ts", ".env")):
                        if item.file_size > 10_000_000:
                            incomplete.add("Archive member over 10 MB was skipped")
                        else:
                            chunks.append(archive.read(item))
        except zipfile.BadZipFile:
            incomplete.add("At least one ZIP could not be extracted")
    found = set()
    for chunk in chunks:
        for name, pattern in COMPILED.items():
            for match in pattern.finditer(chunk):
                # Only explicit, readable synthetic test labels are allowlisted.
                if name == "literal-secret-assignment" and match.group(1).startswith(b"synthetic-"):
                    synthetic.add(name)
                    continue
                found.add(name)
    return sorted(found)


incomplete = set()
synthetic = set()
objects = git("rev-list", "--objects", "--all", "HEAD").decode("utf-8").splitlines()
findings = []
blob_count = 0
for row in objects:
    oid, _, path = row.partition(" ")
    if git("cat-file", "-t", oid).strip() != b"blob":
        continue
    blob_count += 1
    rules = inspect_data(git("cat-file", "blob", oid))
    if rules:
        findings.append({"scope": "history", "blob": oid, "path": path, "rules": rules})

files = git("ls-files", "--cached", "--others", "--exclude-standard", "-z").decode("utf-8").split("\0")
working_count = 0
for name in sorted(set(files)):
    path = pathlib.Path(name)
    if not name or not path.is_file():
        continue
    working_count += 1
    rules = inspect_data(path.read_bytes())
    if rules:
        findings.append({"scope": "working-tree", "path": name, "rules": rules})

committed_env = []
for commit in git("rev-list", "--all", "HEAD").decode().splitlines():
    for name in git("ls-tree", "-r", "--name-only", commit).decode("utf-8").splitlines():
        base = pathlib.PurePosixPath(name).name
        if (base == ".env" or base.startswith(".env.")) and base != ".env.example":
            committed_env.append({"commit": commit, "path": name})

env_names = []
for line in pathlib.Path(".env.example").read_text(encoding="utf-8").splitlines():
    if not line or line.startswith("#"):
        continue
    key, sep, value = line.partition("=")
    if not sep or value:
        findings.append({"scope": "working-tree", "path": ".env.example", "rules": ["nonempty-or-invalid-env-example"]})
    env_names.append(key)

result = {
    "head": git("rev-parse", "HEAD").decode().strip(),
    "reachable_commits": len(git("rev-list", "--all", "HEAD").splitlines()),
    "unique_history_blobs": blob_count,
    "working_files": working_count,
    "findings": findings,
    "committed_env_paths": committed_env,
    "env_example_names": env_names,
    "env_ignored": subprocess.run(["git", "check-ignore", "--no-index", "-q", ".env"]).returncode == 0,
    "synthetic_test_assignments_allowlisted": bool(synthetic),
    "incomplete": sorted(incomplete),
    "limits": "Heuristic patterns; all locally reachable refs and HEAD only. No fetch, reflog/unreachable-object scan, ignored local-secret scan, OCR or external provider validation.",
}
print(json.dumps(result, indent=2))
sys.exit(1 if findings or committed_env or incomplete or not result["env_ignored"] else 0)
