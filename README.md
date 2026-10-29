# StudyLens Online

A new React/Vinext website for PDF-to-study-guide learning, hosted through Sites.

## Experience

- PDF.js extracts selectable text in the browser. Upload limit: 10 MB, 500 pages.
- Select up to 5 pages / 12,000 characters for a focused guide.
- Server-side Gemini generation produces detailed explanations, takeaways, defined terms, MCQs and citations.
- A second model pass checks source support. Exact quotation/page checks reject fabricated citations.
- Notes, quick revision, interactive quizzes, mistake review, source passages and Markdown exports.
- A clearly labeled prepared example demonstrates the reader without pretending to be live AI.

## Configuration

Configure `GEMINI_API_KEY` as a Sites runtime secret. Optional `GEMINI_MODEL` defaults to `gemini-3.5-flash-lite`. Keep the Google project on its Free tier to avoid enabling paid usage. No API key is sent to the browser. Until configured, generation reports service unavailable and the example reader remains usable.

## Verification

`node --experimental-strip-types --test tests/*.test.mjs`

`npx tsc --noEmit`

Build and deploy using the Sites helper workflow. Do not deploy the older Python project to this Worker host.

## Limits

AI checks cannot guarantee truth. Model review may share generator errors. Source documents can be wrong; original evidence is available for checking. Images, scans and diagrams are not interpreted. No uploaded documents or guides are persistently stored by the application. Selected text is sent to Google Gemini on explicit generation. Free-tier content may be used to improve Google AI; avoid sensitive documents. Free-tier availability and quotas are controlled by Google.

Public-demo protection: D1 stores aggregate generation counters (no documents or visitor identifiers). An atomic SQL reservation allows at most 2 requests per UTC minute and 30 per UTC day across all visitors. Failed attempts count. Limits bound request volume, not currency spend or provider quotas. The Google project should remain on its Free tier. Generation fails closed if the database is unavailable. The prepared example remains accessible without generation quota.

For local development, apply the SQL migrations to your local D1 database before testing generation; deployed migrations are applied by Sites. The hosting manifest requires the DB binding.

PDF.js 4.10.38 assets are vendored from cdnjs and retain their embedded Apache-2.0 copyright/license notices.
