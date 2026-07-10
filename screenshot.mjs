import { chromium } from 'playwright';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 1080 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000); // let animations settle
  
  const destDir = '/Users/suresh-3x/.gemini/antigravity-cli/brain/e7a2379f-0d8c-493d-8ca2-cae78108aba5';
  
  await page.screenshot({ path: path.join(destDir, 'terminal_theme.png'), fullPage: true });
  console.log('Terminal theme screenshot saved to artifacts.');

  // Switch to Paper theme
  await page.click('button:has-text("paper")');
  await page.waitForTimeout(1000);

  await page.screenshot({ path: path.join(destDir, 'paper_theme.png'), fullPage: true });
  console.log('Paper theme screenshot saved to artifacts.');

  await browser.close();
})();
