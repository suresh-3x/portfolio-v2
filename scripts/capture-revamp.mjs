import { chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../public/images/projects');

// Generate a fresh one-time token
const tokenOutput = execSync(
  '/Users/suresh-3x/real-estate-landing-page-generator/.venv/bin/python -c "import uuid, sqlite3; t = str(uuid.uuid4()); c = sqlite3.connect(\'/Users/suresh-3x/real-estate-landing-page-generator/data/revamp.db\'); c.execute(\'INSERT INTO access_tokens (token) VALUES (?)\', (t,)); c.commit(); print(t)"'
).toString().trim();

console.log('Using fresh token:', tokenOutput);

const chromeExecutable =
  '/Users/suresh-3x/Library/Caches/ms-playwright/chromium-1200/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';

const browser = await chromium.launch({
  executablePath: chromeExecutable,
  headless: true,
});

const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  colorScheme: 'dark',
});

const page = await context.newPage();

console.log('Navigating to login with token...');
await page.goto(`http://127.0.0.1:8085/login?token=${tokenOutput}`, { waitUntil: 'networkidle' });

// Ensure we redirected to the main dashboard
console.log('Current URL after login:', page.url());

// Wait for the pipeline funnel and stats to render
await page.waitForSelector('.funnel', { timeout: 5000 });
await page.waitForSelector('.grid', { timeout: 5000 });
await page.waitForTimeout(1000);

const targetPath = path.join(outputDir, 'revamp-engine.png');
await page.screenshot({ path: targetPath, fullPage: false });
console.log('Successfully captured proper revamp engine screenshot to:', targetPath);

// Also capture leads view
const leadsPage = await context.newPage();
await leadsPage.goto('http://127.0.0.1:8085/leads', { waitUntil: 'networkidle' });
await leadsPage.waitForTimeout(1000);
const leadsTargetPath = path.join(outputDir, 'revamp-engine-leads.png');
await leadsPage.screenshot({ path: leadsTargetPath, fullPage: false });
console.log('Successfully captured revamp engine leads screenshot to:', leadsTargetPath);

// Capture approvals view
const approvalsPage = await context.newPage();
await approvalsPage.goto('http://127.0.0.1:8085/approvals', { waitUntil: 'networkidle' });
await approvalsPage.waitForTimeout(1000);
const approvalsTargetPath = path.join(outputDir, 'revamp-engine-approvals.png');
await approvalsPage.screenshot({ path: approvalsTargetPath, fullPage: false });
console.log('Successfully captured revamp engine approvals screenshot to:', approvalsTargetPath);

// Capture deployments view
const deploymentsPage = await context.newPage();
await deploymentsPage.goto('http://127.0.0.1:8085/deployments', { waitUntil: 'networkidle' });
await deploymentsPage.waitForTimeout(1000);
const deploymentsTargetPath = path.join(outputDir, 'revamp-engine-deployments.png');
await deploymentsPage.screenshot({ path: deploymentsTargetPath, fullPage: false });
console.log('Successfully captured revamp engine deployments screenshot to:', deploymentsTargetPath);

await browser.close();
