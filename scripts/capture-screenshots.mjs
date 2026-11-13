/**
 * Retakes the featured-project screenshots from the live demos at double
 * resolution, all with the same window size, so they are sharp and match.
 *
 *   npx playwright install chromium   (first time only)
 *   npm run screenshots               (all three)
 *   npm run screenshots -- kairo      (just one: kairo | linguaflow | notes)
 *
 * Output: public/projects/*.png at 2400 x 1600 (3:2).
 * Each capture stops with an error instead of saving a broken screenshot.
 */
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const out = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "projects");
const VIEWPORT = { width: 1200, height: 800 };
const only = process.argv[2];

async function withPage(fn) {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 2 });
    await fn(page);
  } finally {
    await browser.close();
  }
}

const shot = (page, name) => page.screenshot({ path: path.join(out, name), animations: "disabled" });

/** Kairo: ask to delete a calendar block and capture the approval card. */
async function kairo(page) {
  await page.goto("https://kairo-hazel.vercel.app/app", { waitUntil: "domcontentloaded" });
  // The free backend sleeps when idle and can take a minute to wake.
  const input = page.getByPlaceholder(/Ask Kairo/);
  await input.waitFor({ timeout: 120_000 });
  const send = async (text) => {
    await input.fill(text);
    await input.press("Enter");
  };
  await send("What's on my schedule this afternoon?");
  await page.waitForTimeout(12_000);
  await send("Delete my deep work block tomorrow");
  await page.getByText(/action required/i).waitFor({ timeout: 60_000 });
  await page.getByRole("button", { name: /Approve/ }).waitFor();
  await shot(page, "kairo-approval-gate.png");
}

/** LinguaFlow: same flow as the project's own demo script. */
async function linguaflow(page) {
  await page.goto("https://linguaflow-demo.vercel.app", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /English/ }).click();
  await page.getByRole("link", { name: "Study", exact: true }).click();
  await page.waitForURL("**/study");
  await page.getByRole("button", { name: /Work/ }).click();
  await page.getByText("The committee reviewed the proposal.", { exact: true }).click();
  await page.getByRole("button", { name: "Practice this one" }).click();
  await page.locator(".study-scene").click();
  await page.locator(".study-inner.flipped").waitFor();
  await page.waitForTimeout(500);
  await page.getByPlaceholder("Ask a question about this card…").fill('Why does the passive answer use "was reviewed"?');
  await page.getByRole("button", { name: "Ask", exact: true }).click();
  await page.getByText(/Study reference:/).waitFor({ timeout: 90_000 });
  // Put the answer card and the reference in view together.
  await page.getByText(/Study reference:/).scrollIntoViewIfNeeded();
  await shot(page, "linguaflow-study-helper.png");
}

/** Structured Notes Model: the two-result chart, drawn from figures/structured-notes-two-results.html. */
async function notes(page) {
  await page.setViewportSize({ width: 1000, height: 667 });
  await page.goto(new URL("../figures/structured-notes-two-results.html", import.meta.url).href);
  await page.evaluate(() => document.fonts.ready);
  await shot(page, "structured-notes-two-results.png");
}

const jobs = { kairo, linguaflow, notes };
for (const [name, job] of Object.entries(jobs)) {
  if (only && only !== name) continue;
  try {
    await withPage(job);
    console.log(`Captured ${name}`);
  } catch (err) {
    console.error(`Skipped ${name}: ${err.message.split("\n")[0]}`);
    process.exitCode = 1;
  }
}
