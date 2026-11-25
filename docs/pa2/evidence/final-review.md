# PA2 submission review — 2026-11-26

Reviewed source: branch `pa2` at `39c66e5fdd9478cd52c0057ae064758052773154`,
plus the documentation changes from this review. This review uses the supplied
[rubric PDF](<../../reference/PA2 Rubric Harness Quality Gate.pdf>), pages 1–5,
and [lecturer's contract example](../../reference/Contract.md).
The deadline in the rubric is **2026-11-26 at 22:00**.

## Merging the saved PA2.md edits

The saved edit contained only two editorial changes: replace the personal
criteria 3–4 status with a team-neutral status, and remove the owner name from
that section. Both are appropriate for the combined submission. The latest
upstream status already describes the whole team's work, so that newer status
was kept and corrected against current evidence. The owner line was removed;
the full team remains credited at the top of PA2.md. The original stash is
retained as a backup. Applying the entire old file would discard newer evidence.

## Assessment

| Criterion                   |     Max |  Claim | Review and evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------- | ------: | -----: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rules file                  |      15 |     15 | [AGENTS.md](../../../AGENTS.md) has the four required sections and product-specific prohibitions. The format incident and deliberate HTTP-status break link two concrete rules to real commits. The claim is at the top of the 13–15 band; concise wording and team review remain the lecturer's judgment.                                                                                                                                                           |
| Permissions and secrets     |      10 |      8 | [Three permission tiers](../PERMISSIONS.md), blank env variable names, ignore rules and [history audit](secrets-audit.md) are present. The team reports no billing and no configured spending cap; the capped-key requirement is unmet. Do not claim 9–10.                                                                                                                                                                                                           |
| One command for every check |      10 |     10 | README, package scripts and CI agree. A separate fresh local clone at `39c66e5` passed `npm ci` and `npm run check` on Node 22.23.2 / npm 10.9.8: lint, format check, typecheck and 35/35 tests.                                                                                                                                                                                                                                                                     |
| CI that blocks a merge      |      20 |     20 | [PR #1](https://github.com/Tienluat123/WebNC/pull/1), [red run](https://github.com/Tienluat123/WebNC/actions/runs/44906808477), [green run](https://github.com/Tienluat123/WebNC/actions/runs/44907080432) and original screenshots demonstrate the gate. Current GitHub API protection still requires `checks`, strict up-to-date status and admin enforcement; force push and deletion are disabled. `main` remains `fd93b68`, matching the pre-protection commit. |
| Endpoint contract           |      25 |     25 | [GET /places](../../contract/endpoint.md) contains the five example sections, explicit public access/ownership, field rules, all three problem types, cursor paging and compatibility policy. The rubric explicitly permits this endpoint. No ownership or response behavior was changed during this review.                                                                                                                                                         |
| Contract tests that bite    |      15 |     12 | [HTTP tests](../../../backend/test/contract/places.test.js) and service tests cover more than status alone, all three application error types and paging. Tests run in CI. The deliberate 201 response and its 200 restoration exist as separate implementation-only commits, but no CI run on the red commit was found. The public catalogue has no other-user owned-resource denial. Keep the 8–12 band.                                                           |
| AI log                      |       5 |      5 | [AI-LOG.md](../../../AI-LOG.md) records tools, tasks, actual changes, rejected approaches and evidence, including this review. Earlier incomplete attempts remain documented.                                                                                                                                                                                                                                                                                        |
| **Total**                   | **100** | **95** | **15 + 8 + 10 + 20 + 25 + 12 + 5.** This is a defensible upper-band self-assessment, not a guaranteed grade.                                                                                                                                                                                                                                                                                                                                                         |

The ownership interpretation may affect the lecturer's mark, especially criterion 6.
The documented gaps already explain why 100 is not claimed. No private-resource
feature, paid model call or rewritten evidence history was introduced to gain points.

## Verified external evidence

Read-only GitHub API checks on 2026-11-26 confirmed:

- The repository is public. `main` is still `fd93b68` and is protected.
- Remote annotated tag `pa2` has tag-object SHA
  `14a597b98aea4e886835cf350718262a5ed1d390` and resolves to commit
  `39c66e5fdd9478cd52c0057ae064758052773154`.
- [Tag run 45651154508](https://github.com/Tienluat123/WebNC/actions/runs/45651154508)
  has event `push`, head branch/tag `pa2`, the exact commit above and a successful
  `checks` job, including installation and all four checks.
- PR #1 is still open. No PR for `pa2-contract-break-demonstration` and no CI red
  run for `297d44d` were found. Existing local red/green evidence is not CI evidence.

These checks do not validate the team's provider-side account or spending state.
The dated screenshot and benchmark remain team-supplied evidence; this review
made no model call and changed no billing setting.

## Verification and packaging gate

- Fresh clone: `/private/tmp/webnc-pa2-fresh-20261126`, cloned without reusing the
  working tree or its dependencies. `npm ci` and `npm run check` exited 0 at
  `39c66e5`, with 35 tests passed, 0 failed and 0 skipped.
- After merging the review edits, `npm run check` also exited 0 in the working
  checkout: all four checks passed and 35/35 tests passed. All 181 local file-link
  targets checked in the submission documents exist, and the assessment sums to 95.
- [Secrets audit](secrets-audit.md) includes PDF text extraction and reports its
  exact scope and exclusions. No detected credential exposure is claimed beyond
  that heuristic scope.
- At the start of this review, the local tag was stale: `refs/tags/pa2` resolves to `b50355d`, while the
  then-current local branch `refs/heads/pa2` and remote tag resolve to `39c66e5`. The equal branch
  and tag names make bare `pa2` ambiguous in Git revision commands.
- This documentation review is newer than the verified remote tag. Publish the
  selected final commit, synchronize the local and remote submission tag, and
  verify successful tag CI on that exact commit before producing the final ZIP.
  These external writes require authorization under [the permission policy](../PERMISSIONS.md).
- ZIP name: `23127221-23127281-23127446_95.zip`. Include the tracked repository
  files and `.git` with the actual history and correct tag. Exclude local secrets,
  dependencies, temporary files and repository-local credentials/hooks if present.
  A GitHub source ZIP or `git archive` alone omits `.git` and does not meet the rubric.
- After extraction, run `git checkout --detach refs/tags/pa2`, verify the SHA
  against the remote tag and successful CI, then `npm ci` and `npm run check`.
  The extracted files must match the tagged tree. One team member uploads the ZIP
  using the student Google account specified by the rubric.

No final ZIP is marked ready and no tag, remote branch or protection setting was
changed by this review. A new contract-break CI demonstration would be additional
external work; it is not required to keep the disclosed 95-point self-assessment.
