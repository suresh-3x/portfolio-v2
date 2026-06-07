import { test, expect } from '@playwright/test';

test('defaults to terminal view, no flash', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-view', 'terminal');
});

test('view switch flips layout and persists', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'paper', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-view', 'paper');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-view', 'paper');
});

test('deep link ?view=paper works', async ({ page }) => {
  await page.goto('/?view=paper');
  await expect(page.locator('html')).toHaveAttribute('data-view', 'paper');
});

test('command palette opens and switches view', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Meta+k');
  const dialog = page.getByRole('dialog', { name: 'Command palette' });
  await expect(dialog).toBeVisible();
  await page.getByPlaceholder('Type a command or search...').fill('paper');
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('data-view', 'paper');
});

test('key content + metrics present in both views', async ({ page }) => {
  for (const v of ['terminal', 'paper']) {
    await page.goto(`/?view=${v}`);
    await expect(page.getByText('Revamp Engine').first()).toBeVisible();
    await expect(page.getByText('T-Systems', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('10K', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('5M+', { exact: false }).first()).toBeVisible();
  }
});

test('no em or en dashes in rendered text', async ({ page }) => {
  for (const v of ['terminal', 'paper']) {
    await page.goto(`/?view=${v}`);
    const text = await page.locator('#main').innerText();
    expect(text).not.toMatch(/[–—]/);
  }
});
