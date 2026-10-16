import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('console handle rotates with pointer capture, settles, resets and supports keyboard', async ({
  page,
}) => {
  await page.goto('/');
  const handle = page.getByRole('button', {
    name: 'Arrástrame: usa las flechas para girar la consola',
  });
  await expect(handle).toBeEnabled();
  const box = (await handle.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 100, box.y + box.height / 2, { steps: 8 });
  await expect(page.locator('.console-device')).toHaveAttribute('data-dragging', 'true');
  await page.mouse.up();
  await expect(page.locator('.console-device')).not.toHaveAttribute('data-dragging');
  const range = page.getByRole('slider', { name: 'Girar consola', exact: true });
  expect(Number(await range.inputValue())).toBeGreaterThan(-13);
  expect(Number(await range.inputValue())).toBeLessThanOrEqual(25);
  await expect(page.locator('.denibot')).toHaveAttribute('data-mood', 'thinking');
  await handle.focus();
  await page.keyboard.press('Home');
  await expect(range).toHaveValue('-25');
  await page.keyboard.press('ArrowRight');
  await expect(range).toHaveValue('-23');
  await page.keyboard.press('End');
  await expect(range).toHaveValue('25');
  await page.getByRole('button', { name: 'Centrar', exact: true }).click();
  await expect(range).toHaveValue('0');
});

test('touch drag cancellation preserves vertical scrolling and reduced motion skips momentum', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  await page.goto('/');
  const handle = page.locator('.console-grip');
  await expect(handle).toBeEnabled();
  await handle.scrollIntoViewIfNeeded();
  await expect(handle).toHaveCSS('touch-action', 'pan-y pinch-zoom');
  const box = (await handle.boundingBox())!;
  const cdp = await context.newCDPSession(page);
  const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [point] });
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchMove',
    touchPoints: [{ x: point.x - 90, y: point.y }],
  });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect(page.locator('.console-device')).not.toHaveAttribute('data-dragging');
  const range = page.getByRole('slider', { name: 'Girar consola', exact: true });
  await expect(range).toHaveValue('-25');
  // A vertical gesture belongs to the browser; pointercancel must release our drag state.
  await page.getByRole('button', { name: 'Centrar', exact: true }).click();
  await handle.scrollIntoViewIfNeeded();
  const next = (await handle.boundingBox())!;
  const start = { x: next.x + next.width / 2, y: next.y + next.height / 2 };
  const before = await page.evaluate(() => scrollY);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [start] });
  for (const dy of [25, 60, 110])
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: start.x, y: start.y - dy }],
    });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before);
  await expect(page.locator('.console-device')).not.toHaveAttribute('data-dragging');
  await expect(range).toHaveValue('0');
  await context.close();
});

test('professional home removes games and exposes contribution in both languages', async ({
  page,
}) => {
  for (const path of ['/', '/en']) {
    await page.goto(path);
    await expect(
      page.locator('.memory-machine, .bug-hunt, .devplay-remix, .devplay-gallery'),
    ).toHaveCount(0);
    await expect(page.locator('a[href="#arcade"]')).toHaveCount(0);
    await expect(page.locator('.project-contribution')).toHaveCount(2);
    await expect(page.locator('.project-contribution').first()).toContainText(
      path === '/' ? 'Desarrollé el proyecto completo' : 'I developed the entire project',
    );
    await expect(page.locator('.console-channels button')).toHaveCount(2);
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
  }
});

test('project hoods disclose real case content with keyboard and touch', async ({ page }) => {
  await page.goto('/');
  const trigger = page
    .getByRole('button', { name: 'Ver problema y solución', exact: true })
    .first();
  await expect(trigger).toBeEnabled();
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#peek-karuplan')).toBeVisible();
  await expect(page.locator('#peek-karuplan')).toContainText('Decidir qué cocinar');
  await expect(page.locator('.project-karuplan .project-contribution')).toContainText(
    'Desarrollé el proyecto completo',
  );
  await page.getByRole('button', { name: 'Ocultar detalles', exact: true }).press('Enter');
  await expect(page.locator('#peek-karuplan')).toBeHidden();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Ver problema y solución', exact: true }).nth(1).click();
  await expect(page.locator('#peek-qlinnt')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.locator('.project-qlinnt .project-stage')).toHaveAttribute(
    'href',
    '/proyectos/qlinnt',
  );
});
