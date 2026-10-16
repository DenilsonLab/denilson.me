import { test, expect } from '@playwright/test';

test('portfolio keeps readable console controls and stable actions across device widths', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 700, 820, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    await page.goto('/');
    const terminal = page.getByRole('button', { name: 'Terminal', exact: true });
    await terminal.click();
    await expect(page.locator('.terminal-command input')).toHaveCSS('font-size', '16px');
    await expect(terminal).toHaveCSS('min-height', '44px');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await expect(page.locator('.denibot-button img')).toHaveCSS('animation-name', 'none');
    if (width === 700)
      await page.locator('.dev-console').screenshot({ path: 'audit/portfolio-tablet-console.png' });
    const primary = page.locator('.devplay-primary');
    await primary.scrollIntoViewIfNeeded();
    await expect(primary).toHaveCSS('transform', 'none');
    await primary.hover();
    await expect(primary).toHaveCSS('transform', 'none');
  }
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    for (const [slug, path] of [
      ['home', '/'],
      ['projects', '/proyectos'],
      ['case', '/proyectos/karuplan'],
      ['profile', '/perfil'],
    ]) {
      await page.goto(path);
      await page.locator('h1').waitFor();
      await page.screenshot({ path: `audit/portfolio-${slug}-${width}.png` });
    }
  }
});

test('production home has dev.play, real language routes, indexable metadata and structured data', async ({
  page,
  request,
}) => {
  for (const path of ['/', '/en']) {
    await page.goto(path);
    await expect(page.locator('.portfolio-site .devplay-hero')).toBeVisible();
    await expect(page.locator('.concept-switcher')).toHaveCount(0);
    await expect(page.locator('meta[name=robots]')).toHaveCount(0);
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
      'href',
      'https://www.denilson.me' + path,
    );
    const schema = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').textContent())!,
    );
    expect(schema['@graph'].some((item: { '@type': string }) => item['@type'] === 'WebSite')).toBe(
      true,
    );
    expect(
      schema['@graph'].find((item: { '@type': string }) => item['@type'] === 'WebPage').url,
    ).toBe('https://www.denilson.me' + path);
    await page
      .getByRole('link', { name: path === '/' ? 'English' : 'Español', exact: true })
      .click();
    await expect(page).toHaveURL('http://127.0.0.1:4173' + (path === '/' ? '/en' : '/'));
  }
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('<loc>https://www.denilson.me/</loc>');
  expect(sitemap).toContain('<loc>https://www.denilson.me/en</loc>');
  expect(sitemap).not.toContain('concept');
});

test('case studies share the production navigation and document confirmed ownership, flow and challenge', async ({
  page,
}) => {
  const resources: string[] = [];
  page.on('request', (request) => resources.push(request.url()));
  for (const slug of ['karuplan', 'qlinnt']) {
    await page.goto('/proyectos/' + slug);
    await expect(page.locator('.portfolio-site')).toBeVisible();
    await expect(page.locator('.case-detail')).toContainText('Desarrollé el proyecto completo');
    await expect(page.locator('.case-journey li')).toHaveCount(3);
    const visit = page.getByRole('link', { name: 'Visitar el sitio', exact: true });
    await visit.hover();
    await expect(visit).toHaveCSS('color', 'rgb(255, 255, 255)');
    await expect(page.locator('.case-challenge')).toContainText(
      slug === 'karuplan' ? 'red social' : 'escaneo',
    );
    if (slug === 'karuplan') await expect(page.locator('.chips')).toContainText('Cloudinary');
    await expect(page.locator('.case-next a')).toHaveAttribute(
      'href',
      '/proyectos/' + (slug === 'karuplan' ? 'qlinnt' : 'accounty'),
    );
  }
  expect(resources.some((url) => /DevPlay-|ConceptSite-|HomeSite-/.test(url))).toBe(false);
  await page.getByRole('link', { name: 'Denilson Arguello', exact: true }).click();
  await expect(page).toHaveURL('http://127.0.0.1:4173/');
  await expect(page.locator('.devplay-hero')).toBeVisible();
});

test('static home and case studies retain production styling and useful navigation without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  for (const path of ['/', '/en', '/proyectos/karuplan', '/en/projects/qlinnt']) {
    await page.goto(path);
    await expect(page.locator('.portfolio-site')).toHaveCSS(
      'background-color',
      'rgb(237, 241, 245)',
    );
    await expect(page.locator('h1')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  await page.goto('/');
  await page.getByLabel('Abrir navegación', { exact: true }).click();
  await expect(page.locator('.mobile-menu')).toBeVisible();
  await page.locator('.mobile-menu').getByRole('link', { name: 'Proyectos', exact: true }).click();
  await expect(page.locator('h1')).toHaveText('Proyectos');
  await context.close();
});
