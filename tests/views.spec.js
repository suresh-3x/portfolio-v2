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

test('navbar menu links always open detailed pages from homepage and subpages', async ({ page }) => {
  await page.goto('/');

  // On homepage, clicking "about" opens /about (not /#about)
  const aboutLink = page.locator('.site-nav__links a', { hasText: 'about' });
  await expect(aboutLink).toHaveAttribute('href', '/about');
  await aboutLink.click();
  await expect(page).toHaveURL(/.*\/about/);
  await expect(page.locator('h1')).toHaveText(/About Suresh Bhandari/);

  // From /about, clicking "projects" opens /projects
  const projectsLink = page.locator('.site-nav__links a', { hasText: 'projects' });
  await expect(projectsLink).toHaveAttribute('href', '/projects');
  await projectsLink.click();
  await expect(page).toHaveURL(/.*\/projects/);
  await expect(page.locator('h1')).toHaveText(/Engineering Projects & Distributed Systems/);

  // From /projects, clicking "about" opens /about
  await page.locator('.site-nav__links a', { hasText: 'about' }).click();
  await expect(page).toHaveURL(/.*\/about/);
  await expect(page.locator('h1')).toHaveText(/About Suresh Bhandari/);

  // From /about, clicking "experience" opens /experience
  const expLink = page.locator('.site-nav__links a', { hasText: 'experience' });
  await expect(expLink).toHaveAttribute('href', '/experience');
  await expLink.click();
  await expect(page).toHaveURL(/.*\/experience/);
  await expect(page.locator('h1')).toHaveText(/Engineering Experience & Career History/);

  // From /experience, clicking "stack" opens /stack
  const stackLink = page.locator('.site-nav__links a', { hasText: 'stack' });
  await expect(stackLink).toHaveAttribute('href', '/stack');
  await stackLink.click();
  await expect(page).toHaveURL(/.*\/stack/);
  await expect(page.locator('h1')).toHaveText(/Technical Stack & Architectural Skills/);

  // From /stack, clicking "notes" opens /notes
  const notesLink = page.locator('.site-nav__links a', { hasText: 'notes' });
  await expect(notesLink).toHaveAttribute('href', '/notes');
  await notesLink.click();
  await expect(page).toHaveURL(/.*\/notes/);
  await expect(page.locator('h1')).toHaveText(/Engineering Notes & Systems Architecture/);
});

test('homepage sections contain buttons linking to detailed pages in both views', async ({ page }) => {
  for (const v of ['terminal', 'paper']) {
    await page.goto(`/?view=${v}`);

    // About section has link to /about
    const aboutBtn = page.locator('#about a[href="/about"]');
    await expect(aboutBtn).toBeVisible();

    // Work section has link to /projects
    const workBtn = page.locator('#work a[href="/projects"]');
    await expect(workBtn).toBeVisible();

    // Experience section has link to /experience
    const expBtn = page.locator('#experience a[href="/experience"]');
    await expect(expBtn).toBeVisible();

    // Stack section has link to /stack
    const stackBtn = page.locator('#stack a[href="/stack"]');
    await expect(stackBtn).toBeVisible();

    // Notes section has link to /notes
    const notesBtn = page.locator('#notes a[href="/notes"]');
    await expect(notesBtn).toBeVisible();
  }
});

test('homepage renders exactly 2 rows (4 projects) in both views', async ({ page }) => {
  for (const v of ['terminal', 'paper']) {
    await page.goto(`/?view=${v}`);
    const cardSelector = v === 'terminal' ? '#work .t-card' : '#work .p-sysitem';
    const cards = page.locator(cardSelector);
    await expect(cards).toHaveCount(4);
  }
});

