import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const docPath = resolve(process.cwd(), 'docs', 'browser-support.md');
const content = readFileSync(docPath, 'utf8');

const requiredRows = [
  'Chrome / Chromium',
  'Firefox',
  'Safari',
  'Edge',
  'Mobile browsers',
];

const missingRows = requiredRows.filter((row) => !content.includes(`| ${row} |`));
if (missingRows.length > 0) {
  console.error(`Browser support matrix is missing required rows: ${missingRows.join(', ')}`);
  process.exit(1);
}

const reviewedMatch = content.match(/Last Reviewed:\s*(\d{4}-\d{2}-\d{2})/);
if (!reviewedMatch) {
  console.error('Missing "Last Reviewed: YYYY-MM-DD" in docs/browser-support.md');
  process.exit(1);
}

const reviewedDate = new Date(`${reviewedMatch[1]}T00:00:00Z`);
if (Number.isNaN(reviewedDate.getTime())) {
  console.error('Invalid Last Reviewed date format in docs/browser-support.md');
  process.exit(1);
}

const now = new Date();
const daysSinceReview = Math.floor((now.getTime() - reviewedDate.getTime()) / (1000 * 60 * 60 * 24));
const maxAgeDays = 120;

if (daysSinceReview > maxAgeDays) {
  console.error(
    `Browser support matrix is stale (${daysSinceReview} days old). Update Last Reviewed date and validate matrix.`,
  );
  process.exit(1);
}

console.log(`Browser support matrix check passed (${daysSinceReview} days since last review).`);
