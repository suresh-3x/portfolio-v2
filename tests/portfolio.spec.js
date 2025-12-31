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

        // Check if #experience is in viewport
        const experienceSection = page.locator('#experience');
        const box = await experienceSection.boundingBox();

        // Navbar height is roughly 60-80px + 1.5rem top. 
        // We want to ensure the top of the section is not hidden behind the navbar.
        // The navbar is at top: 1.5rem (~24px).
        // Let's check if the section target is above or below the navbar bottom.

        const navbar = page.locator('.nav-island');
        const navBox = await navbar.boundingBox();

        // The section top should ideally be below the navbar bottom or at the very least visible.
        expect(box.y).toBeGreaterThanOrEqual(0);
        // More accurately: if the navbar is fixed, and it overlaps, the box.y would be < navBox.height + navBox.y
        // But since it's a "nav-island" with margin, we check if the content starts below the island or if it's fine.
        // Actually, one way to test overlap is to check if the <h2> within the section is visible.
        const heading = experienceSection.locator('h2').first();
        await expect(heading).toBeInViewport();
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
