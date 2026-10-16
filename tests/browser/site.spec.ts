import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const paths = [
  '/',
  '/en',
  '/proyectos',
  '/en/projects',
  '/perfil',
  '/en/profile',
  ...['accounty', 'invoicegen-pro', 'karuplan', 'qlinnt'].flatMap((slug) => [
    '/proyectos/' + slug,
    '/en/projects/' + slug,
  ]),
];
test('every public page has static content, matching canonical, language alternatives and no accessibility violations', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute(
      'lang',
      path.startsWith('/en') ? 'en' : 'es',
    );
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
      'href',
      'https://www.denilson.me' + path,
    );
    await expect(page.locator('link[hreflang=es]')).toHaveCount(1);
    await expect(page.locator('link[hreflang=en]')).toHaveCount(1);
    expect(await response!.text()).not.toContain('<!--app-html-->');
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
      path,
    ).toEqual([]);
  }
  expect(errors).toEqual([]);
});
test('layout fits phone, tablet and desktop widths', async ({ page }) => {
  for (const width of [320, 390, 768, 820, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      String(width),
    ).toBe(true);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (
    let y = 0;
    y < (await page.locator('body').evaluate((body) => body.scrollHeight));
    y += 600
  ) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(100);
  }
  await expect
    .poll(() =>
      page
        .locator('img')
        .evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0)),
    )
    .toBe(true);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: 'audit/after-desktop.png', fullPage: true });
});
test('contact prepares a draft without claiming delivery, retaining text and revealed phone', async ({
  page,
}) => {
  await page.goto('/#contacto');
  await page.getByRole('button', { name: 'Mostrar teléfono' }).click();
  const outbound: string[] = [];
  page.on('request', (request) => outbound.push(request.url()));
  await page.getByLabel('Tu nombre', { exact: true }).fill('Ana & José');
  await page.getByLabel('Tu correo', { exact: true }).fill('ana@example.com');
  await page
    .getByLabel('Qué necesitas', { exact: true })
    .fill('Necesito integrar un catálogo. ¿Conversamos?');
  await expect(page.locator('a[href^="tel:"]')).toBeVisible();
  await page.getByRole('button', { name: 'Prepara tu consulta', exact: true }).click();
  const link = page.getByRole('link', { name: 'Abrir mi aplicación de correo' });
  await expect(link).toBeVisible();
  const mailto = new URL((await link.getAttribute('href'))!);
  expect(mailto.pathname).toBe('hello@denilson.me');
  expect(mailto.searchParams.get('body')).toContain('Ana & José');
  await expect(
    page.getByRole('status').filter({ hasText: 'todavía no se ha enviado' }),
  ).toBeVisible();
  await expect(page.getByLabel('Qué necesitas', { exact: true })).toHaveValue(
    'Necesito integrar un catálogo. ¿Conversamos?',
  );
  expect(outbound.filter((url) => /^https?:/.test(url))).toEqual([]);
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
});
test('language switch preserves the current project and filters work', async ({ page }) => {
  await page.goto('/proyectos/accounty');
  await page
    .getByRole('link', { name: 'English', exact: true })
    .filter({ visible: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/en\/projects\/accounty$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.goto('/proyectos');
  await page.getByLabel('Filtrar por tecnología').selectOption('PostgreSQL');
  await expect(page.locator('.project-card')).toHaveCount(1);
  await expect(page.locator('.project-card h2')).toHaveText('Accounty');
  await page.getByLabel('Filtrar por tecnología').selectOption('');
  await expect(page.locator('.project-card')).toHaveCount(4);
});
test('mobile disclosure supports navigation and Escape without dialog warnings', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByLabel('Abrir navegación').click();
  await expect(page.locator('details')).toHaveAttribute('open', '');
  await page.locator('.mobile-menu').getByRole('link', { name: 'Proyectos', exact: true }).click();
  await expect(page.locator('details')).not.toHaveAttribute('open', '');
  await page.getByLabel('Abrir navegación').click();
  await page.keyboard.press('Escape');
  await expect(page.locator('details')).not.toHaveAttribute('open', '');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: 'audit/after-mobile.png' });
});
test('static pages remain readable and navigable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/en/projects');
  await expect(page.locator('h1')).toHaveText('Projects');
  await page.locator('.project-card h2 a').filter({ hasText: 'Accounty' }).click();
  await expect(page.locator('h1')).toHaveText('Accounty');
  await expect(page.locator('main')).toContainText('private');
  await page.goto('/#contacto');
  await expect(page.locator('#contact-name')).toBeDisabled();
  await expect(page.locator('.contact-info a[href="mailto:hello@denilson.me"]')).toBeVisible();
  await context.close();
});
test('404 and missing assets use genuine error responses; manifest assets have image MIME types', async ({
  request,
}) => {
  for (const path of ['/not-a-real-page', '/missing.png']) {
    const response = await request.get(path);
    expect(response.status()).toBe(404);
    expect(await response.text()).toContain('noindex,follow');
  }
  const manifest = await (await request.get('/site.webmanifest')).json();
  expect(manifest.name).not.toBe('');
  for (const icon of manifest.icons) {
    const response = await request.get(icon.src);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toMatch(/^image\//);
  }
  const response = await request.get('/');
  expect(response.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(response.headers()['x-content-type-options']).toBe('nosniff');
});
