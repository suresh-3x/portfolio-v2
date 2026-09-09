import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

test.describe('SEO and Meta Verification', () => {
  test('has accurate title and meta description within recommended length', async ({ page }) => {
    await page.goto('/');

    // Title verification
    await expect(page).toHaveTitle('Suresh Bhandari | Senior Backend & AI Engineer');

    // Meta description verification
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description?.length).toBeLessThanOrEqual(160);
    expect(description).toContain('Senior Backend');
    expect(description).toContain('FastAPI');
  });

  test('has canonical url and robots directive', async ({ page }) => {
    await page.goto('/');

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://sureshbhandari.com/');

    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robots).toContain('index');
    expect(robots).toContain('follow');
  });

  test('has complete Open Graph metadata', async ({ page }) => {
    await page.goto('/');

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');

    expect(ogTitle).toContain('Suresh Bhandari');
    expect(ogDesc).toBeTruthy();
    expect(ogImage).toBe('https://sureshbhandari.com/og-image.png');
    expect(ogUrl).toBe('https://sureshbhandari.com/');
    expect(ogType).toBe('profile');
  });

  test('has Twitter card metadata', async ({ page }) => {
    await page.goto('/');

    const twCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    const twTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');
    const twImage = await page.locator('meta[name="twitter:image"]').getAttribute('content');

    expect(twCard).toBe('summary_large_image');
    expect(twTitle).toContain('Suresh Bhandari');
    expect(twImage).toBe('https://sureshbhandari.com/og-image.png');
  });

  test('has valid Schema.org JSON-LD structured data', async ({ page }) => {
    await page.goto('/');

    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
    expect(jsonLdScripts.length).toBeGreaterThanOrEqual(1);

    let foundPerson = false;
    let foundWebSite = false;

    for (const script of jsonLdScripts) {
      const text = await script.textContent();
      if (!text) continue;
      const data = JSON.parse(text);

      if (data['@graph']) {
        for (const item of data['@graph']) {
          if (item['@type'] === 'Person') foundPerson = true;
          if (item['@type'] === 'WebSite') foundWebSite = true;
        }
      } else if (data['@type'] === 'Person') {
        foundPerson = true;
      }
    }

    expect(foundPerson).toBe(true);
    expect(foundWebSite).toBe(true);
  });

  test('has exactly one h1 heading', async ({ page }) => {
    for (const v of ['terminal', 'paper']) {
      await page.goto(`/?view=${v}`);
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
    }
  });

  test('all project images have alt attributes', async ({ page }) => {
    for (const v of ['terminal', 'paper']) {
      await page.goto(`/?view=${v}`);
      const images = await page.locator('img').all();
      for (const img of images) {
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy();
        expect(alt?.trim().length).toBeGreaterThan(0);
      }
    }
  });

  test('static assets exist in public folder', () => {
    const requiredFiles = [
      'robots.txt',
      'sitemap.xml',
      'site.webmanifest',
      'og-image.png',
      'apple-touch-icon.png',
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(publicDir, file);
      expect(fs.existsSync(filePath), `Expected ${file} to exist in public/`).toBe(true);
    }
  });
});
