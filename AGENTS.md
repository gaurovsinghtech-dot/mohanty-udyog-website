<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

After testing, always end your response with one clear line:
"RESULT: VERIFIED — Phase [N] complete" 
or
"RESULT: ERRORS FOUND — Phase [N] needs fixes"
This makes it unambiguous for a human or another agent reading the chat
to know whether to advance or fix.

Before starting any work, always read TEST_REPORT.md first.
- If the current phase shows "## Errors found", fix only those issues,
  update TEST_REPORT.md with "## Fixes applied", and stop — wait for
  re-testing.
- If the current phase shows "## Verified", immediately start the next
  phase in the Phase plan without waiting for further instruction from
  the user. Update TEST_REPORT.md with "## Ready for testing" when that
  phase is done.
- If TEST_REPORT.md shows no entry yet for the current phase, build it
  and add "## Ready for testing" when done.
- Continue this pattern automatically through all 10 phases unless you
  hit an error you cannot resolve after 3 attempts — in that case, stop
  and clearly flag what's blocking you instead of guessing further.