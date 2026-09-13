import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const distDir = path.resolve(__dirname, '../dist');

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

  test('projects catalog page (/projects) has valid SEO and single h1', async ({ page }) => {
    await page.goto('/projects');

    await expect(page).toHaveTitle(/Projects & Distributed Systems/);

    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc).toBeTruthy();
    expect(desc?.length).toBeLessThanOrEqual(160);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://sureshbhandari.com/projects');

    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Verify project cards are listed
    await expect(page.getByText('Revamp Engine').first()).toBeVisible();
    await expect(page.getByText('Nomad Mind').first()).toBeVisible();
  });

  test('project detail page (/projects/revamp-engine) has valid SEO, structured data, and single h1', async ({ page }) => {
    await page.goto('/projects/revamp-engine');

    await expect(page).toHaveTitle(/Revamp Engine/);

    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc).toBeTruthy();
    expect(desc?.length).toBeLessThanOrEqual(160);
    expect(desc).toContain('Revamp Engine');

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://sureshbhandari.com/projects/revamp-engine');

    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
    expect(ogType).toBe('article');

    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    await expect(page.locator('h1')).toHaveText('Revamp Engine');

    // Verify detail sections exist
    await expect(page.getByText('System Architecture & Data Flow').first()).toBeVisible();
    await expect(page.getByText('The Challenge & Problem').first()).toBeVisible();

    // Verify all images on page have alt
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt?.trim().length).toBeGreaterThan(0);
    }
  });

  test('project detail page (/projects/nomad-mind) renders properly with single h1', async ({ page }) => {
    await page.goto('/projects/nomad-mind');

    await expect(page).toHaveTitle(/Nomad Mind/);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://sureshbhandari.com/projects/nomad-mind');

    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    await expect(page.locator('h1')).toHaveText('Nomad Mind');
  });

  test('dedicated subpages (/experience, /about, /stack, /notes) have valid SEO and single h1', async ({ page }) => {
    const subpages = [
      { path: '/experience', titleMatch: /Experience/ },
      { path: '/about', titleMatch: /About/ },
      { path: '/stack', titleMatch: /Technical Stack/ },
      { path: '/notes', titleMatch: /Engineering Notes/ },
    ];

    for (const sp of subpages) {
      await page.goto(sp.path);
      await expect(page).toHaveTitle(sp.titleMatch);

      const desc = await page.locator('meta[name="description"]').getAttribute('content');
      expect(desc).toBeTruthy();
      expect(desc?.length).toBeLessThanOrEqual(160);

      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBe(`https://sureshbhandari.com${sp.path}`);

      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
    }
  });

  test('engineering note detail page (/notes/queue-is-the-spine) has valid SEO and content', async ({ page }) => {
    await page.goto('/notes/queue-is-the-spine');

    await expect(page).toHaveTitle(/The queue is the spine/);

    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(desc).toBeTruthy();
    expect(desc?.length).toBeLessThanOrEqual(160);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://sureshbhandari.com/notes/queue-is-the-spine');

    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    await expect(page.getByText('Decoupling AI from the Execution Spine').first()).toBeVisible();
  });

  test('sitemap.xml contains all newly added pages and projects', () => {
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

    const expectedUrls = [
      'https://sureshbhandari.com/',
      'https://sureshbhandari.com/projects',
      'https://sureshbhandari.com/projects/revamp-engine',
      'https://sureshbhandari.com/projects/nomad-mind',
      'https://sureshbhandari.com/projects/calcom-contributions',
      'https://sureshbhandari.com/projects/apex-ohol-v8',
      'https://sureshbhandari.com/projects/mcwm-straddle-edge',
      'https://sureshbhandari.com/experience',
      'https://sureshbhandari.com/about',
      'https://sureshbhandari.com/stack',
      'https://sureshbhandari.com/notes',
      'https://sureshbhandari.com/notes/queue-is-the-spine',
    ];

    for (const url of expectedUrls) {
      expect(sitemapContent).toContain(`<loc>${url}</loc>`);
    }
  });

  test('prerendered static HTML files exist in dist', () => {
    const expectedPrerenderedFiles = [
      'projects/index.html',
      'projects/revamp-engine/index.html',
      'projects/nomad-mind/index.html',
      'projects/mcwm-straddle-edge/index.html',
      'experience/index.html',
      'about/index.html',
      'stack/index.html',
      'notes/index.html',
      'notes/queue-is-the-spine/index.html',
    ];

    for (const file of expectedPrerenderedFiles) {
      const filePath = path.join(distDir, file);
      expect(fs.existsSync(filePath), `Expected prerendered ${file} to exist in dist/`).toBe(true);
    }
  });

  test('vision-clothing project renders interactive screen gallery and thumbnails', async ({ page }) => {
    await page.goto('/projects/vision-clothing');

    await expect(page).toHaveTitle(/Vision Clothing/);
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Verify gallery section is displayed
    await expect(page.getByText('Application Screens & User Flow').first()).toBeVisible();

    // Verify thumbnail buttons are rendered
    const thumbButtons = await page.locator('.gallery-thumb-btn').all();
    expect(thumbButtons.length).toBe(7);

    // All images must have non-empty alt text
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt?.trim().length).toBeGreaterThan(0);
    }

    // Click on thumbnail 2 and check active screen label update
    await thumbButtons[1].click();
    await expect(page.getByText('Screen 2 of 7').first()).toBeVisible();
  });

  test('mcwm-straddle-edge project renders interactive gallery and verified SEO', async ({ page }) => {
    await page.goto('/projects/mcwm-straddle-edge');

    await expect(page).toHaveTitle(/StraddleEDGE/);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://sureshbhandari.com/projects/mcwm-straddle-edge');

    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    await expect(page.locator('h1')).toHaveText(/StraddleEDGE/);

    // Verify gallery section is displayed
    await expect(page.getByText('Application Screens & User Flow').first()).toBeVisible();

    // Verify 3 thumbnail buttons are rendered
    const thumbButtons = await page.locator('.gallery-thumb-btn').all();
    expect(thumbButtons.length).toBe(3);

    // All images must have non-empty alt text
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt?.trim().length).toBeGreaterThan(0);
    }

    // Switch between gallery screens
    await thumbButtons[1].click();
    await expect(page.getByText('Screen 2 of 3').first()).toBeVisible();
    await thumbButtons[2].click();
    await expect(page.getByText('Screen 3 of 3').first()).toBeVisible();
  });

  test('apex-ohol-v8 project renders interactive gallery with loaded signals and paper trading', async ({ page }) => {
    await page.goto('/projects/apex-ohol-v8');

    await expect(page).toHaveTitle(/APEX OHOL v8/);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://sureshbhandari.com/projects/apex-ohol-v8');

    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    await expect(page.locator('h1')).toHaveText(/APEX OHOL v8/);

    // Verify gallery section is displayed
    await expect(page.getByText('Application Screens & User Flow').first()).toBeVisible();

    // Verify 3 thumbnail buttons are rendered
    const thumbButtons = await page.locator('.gallery-thumb-btn').all();
    expect(thumbButtons.length).toBe(3);

    // All images must have non-empty alt text
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt?.trim().length).toBeGreaterThan(0);
    }

    // Switch between gallery screens
    await thumbButtons[1].click();
    await expect(page.getByText('Screen 2 of 3').first()).toBeVisible();
    await thumbButtons[2].click();
    await expect(page.getByText('Screen 3 of 3').first()).toBeVisible();
  });

  test('navbar includes projects menu item and navigates to /projects', async ({ page }) => {
    await page.goto('/');

    // Projects menu link is visible in navbar
    const projectsLink = page.locator('.site-nav__links a', { hasText: 'projects' });
    await expect(projectsLink).toBeVisible();

    // Clicking projects menu item navigates to /projects
    await projectsLink.click();
    await expect(page).toHaveURL(/.*\/projects/);
    await expect(page.locator('h1')).toHaveText(/Engineering Projects & Distributed Systems/);
  });

  test('all 14 projects render detail pages with valid single h1 and screenshots', async ({ page }) => {
    const slugs = [
      'revamp-engine',
      'nomad-mind',
      'calcom-contributions',
      'smax-ai-blog',
      'turf-app',
      'tm-nlp-interface',
      'self-hosted-calcom',
      'taiga-stride-ahead',
      'apex-ohol-v8',
      'mcwm-straddle-edge',
      'homeground-hotel-booking',
      'bizassist-platform',
      'smax-bookings-app',
      'vision-clothing',
    ];

    for (const slug of slugs) {
      await page.goto(`/projects/${slug}`);
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);

      // Verify screenshot preview window is present
      const previewImg = page.locator('.preview-window__canvas img');
      await expect(previewImg).toBeVisible();
      const alt = await previewImg.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt?.trim().length).toBeGreaterThan(0);
    }
  });
});

