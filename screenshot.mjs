import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  
  // Desktop
  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(3000); // extra wait for animations
  await desktopPage.screenshot({ path: 'desktop-screenshot.png', fullPage: true });
  console.log('Desktop screenshot saved');
  
  // Mobile
  const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(3000);
  await mobilePage.screenshot({ path: 'mobile-screenshot.png', fullPage: true });
  console.log('Mobile screenshot saved');

  await browser.close();
})();
