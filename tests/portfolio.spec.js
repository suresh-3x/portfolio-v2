import { test, expect } from '@playwright/test';

test.describe('Portfolio QA Tests', () => {
    const url = 'http://localhost:5173/';

    test('TC-01: Theme Switching', async ({ page }) => {
        await page.goto(url);

        // Open theme picker
        const themeToggle = page.locator('button[aria-label="Theme settings"]');
        await themeToggle.first().click();

        const themes = ['dawn', 'dusk', 'mono-light', 'mono-dark'];

        for (const theme of themes) {
            await page.locator(`button.theme-option-card:has-text("${theme.replace('-', ' ')}")`).click();
            await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
            // Re-open if closed (it closes on selection)
            if (theme !== themes[themes.length - 1]) {
                await themeToggle.first().click();
            }
        }
    });

    test('TC-02: Theme Persistence', async ({ page }) => {
        await page.goto(url);

        // Set to dusk
        await page.locator('button[aria-label="Theme settings"]').first().click();
        await page.locator('button.theme-option-card:has-text("Dusk")').click();

        await page.reload();
        await expect(page.locator('html')).toHaveAttribute('data-theme', 'dusk');
    });

    test('TC-03: Favicon Dynamic Switching', async ({ page }) => {
        await page.goto(url);

        // Check initial favicon (Dawn -> light/black)
        const lightFavicon = page.locator('link[rel="icon"]');
        await expect(lightFavicon).toHaveAttribute('href', '/favicon-light.svg');

        // Switch to Dusk
        const themeToggle = page.locator('button[aria-label="Theme settings"]');
        await themeToggle.first().click();
        await page.locator('button.theme-option-card:has-text("Dusk")').click();

        // Check updated favicon (Dusk -> dark/white)
        const darkFavicon = page.locator('link[rel="icon"]');
        await expect(darkFavicon).toHaveAttribute('href', '/favicon-dark.svg');
    });

    test('TC-05: Mobile Responsiveness', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto(url);

        const burgerMenu = page.locator('button.menu-toggle');
        await expect(burgerMenu).toBeVisible();

        await burgerMenu.click();
        const mobileOverlay = page.locator('.mobile-menu-overlay');
        await expect(mobileOverlay).toHaveClass(/open/);

        const navLink = page.locator('.mobile-nav-link:has-text("Experience")');
        await expect(navLink).toBeVisible();
    });

    test('TC-06 & TC-08: Scroll Behavior & Navbar Offset', async ({ page }) => {
        await page.goto(url);

        // Click on "Experience" link
        await page.locator('nav >> text=Experience').first().click();

        // Wait for smooth scroll
        await page.waitForTimeout(1000);

        const experienceSection = page.locator('#experience');
        const box = await experienceSection.boundingBox();
        const navbar = page.locator('.nav-island');
        const navBox = await navbar.boundingBox();

        // The section should start below the navbar top boundary (or at least not be covered)
        // With scroll-margin-top: 100px and navbar at ~104px, the title should be visible.
        expect(box.y).toBeGreaterThanOrEqual(80); // Ensure it's not tucked too far top
        expect(box.y).toBeLessThanOrEqual(120);   // Ensure it's roughly at the expected 100px offset

        const heading = experienceSection.locator('h2').first();
        await expect(heading).toBeInViewport();

        // Ensure no overlap with the navbar floating island
        // Nav island bottom is roughly y + height
        const navBottom = navBox.y + navBox.height;
        expect(box.y).toBeGreaterThanOrEqual(navBottom - 10); // Small buffer
    });

    test('TC-07: Scroll Position Persistence', async ({ page }) => {
        await page.goto(url);

        // Scroll to middle
        await page.evaluate(() => window.scrollTo(0, 1500));
        const scrollPosBefore = await page.evaluate(() => window.scrollY);

        await page.reload();
        // Some browsers/frameworks need a moment to restore scroll
        await page.waitForTimeout(1000);

        const scrollPosAfter = await page.evaluate(() => window.scrollY);
        // Note: scroll restoration might depend on browser behavior and whether the app handles it.
        // If it fails, it's a bug to report.
        expect(Math.abs(scrollPosAfter - scrollPosBefore)).toBeLessThan(10);
    });
});
