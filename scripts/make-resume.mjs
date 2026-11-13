/**
 * Rebuilds public/Jeffery-Liu-Resume.pdf from resume/resume.html.
 * Edit the HTML, then run: npm run resume
 * (needs Chromium once: npx playwright install chromium)
 */
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(path.join(root, "resume", "resume.html")).href);
await page.evaluate(() => document.fonts.ready);
const out = path.join(root, "public", "Jeffery-Liu-Resume.pdf");
// scale keeps the content on one Letter page; raise it if you remove lines.
await page.pdf({ path: out, format: "Letter", printBackground: true, preferCSSPageSize: true, scale: 0.97 });
await browser.close();
console.log(`Wrote ${out}`);
