import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const paths = ['/conceptos', '/conceptos/orbita', '/en/concepts', '/en/concepts/orbit'];

test('artwork opens in a keyboard-accessible viewer, restores focus and uses responsive local images', async ({
  page,
}) => {
  for (const path of ['/conceptos/orbita', '/en/concepts/orbit']) {
    await page.goto(path);
    const english = path.startsWith('/en');
    const trigger = page.getByRole('button', {
      name: english ? 'Enlarge illustration' : 'Ampliar ilustración',
    });
    await expect(page.locator('.artwork-image')).toHaveAttribute('srcset', /640w.*960w.*1440w/);
    await expect(trigger).toBeEnabled();
    await trigger.focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('img')).toBeVisible();
    await expect(
      page.getByRole('button', { name: english ? 'Close illustration' : 'Cerrar ilustración' }),
    ).toBeFocused();
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
    await trigger.click();
    await page
      .getByRole('button', { name: english ? 'Close illustration' : 'Cerrar ilustración' })
      .click();
    await expect(dialog).not.toBeVisible();
    expect(
      await page
        .locator('.artwork-image')
        .evaluate((img) => (img as HTMLImageElement).naturalWidth),
    ).toBeGreaterThan(0);
  }
});

test('concepts render in both languages with no console or accessibility errors', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute(
      'lang',
      path.startsWith('/en') ? 'en' : 'es',
    );
    await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', 'noindex,follow');
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
      path,
    ).toEqual([]);
  }
  expect(errors).toEqual([]);
});

test('3D console supports keyboard rotation, safe commands and visual channels', async ({
  page,
}) => {
  await page.goto('/conceptos');
  const rotation = page.getByRole('slider', { name: 'Girar consola' });
  await expect(rotation).toBeEnabled();
  await rotation.focus();
  await page.keyboard.press('Home');
  await expect(rotation).toHaveValue('-25');
  await expect(page.locator('.console-device')).toHaveAttribute('style', /-25deg/);
  await page.getByRole('button', { name: 'Centrar', exact: true }).click();
  await expect(rotation).toHaveValue('0');
  await page.getByRole('button', { name: 'Terminal', exact: true }).click();
  const input = page.getByRole('textbox', { name: 'Comando', exact: true });
  for (const command of ['help', 'projects', 'coffee', '<img src=x onerror=alert(1)>']) {
    await input.fill(command);
    await page.getByRole('button', { name: 'Ejecutar comando', exact: true }).click();
    await expect(page.getByRole('log')).toContainText(
      command === 'projects'
        ? 'Karuplan'
        : command === 'coffee'
          ? 'Café virtual'
          : command === 'help'
            ? 'Comandos:'
            : 'Ese comando no existe',
    );
  }
  await expect(page.locator('.terminal-output img')).toHaveCount(0);
  await page.getByRole('button', { name: 'Proyectos', exact: true }).click();
  await expect(page.locator('.console-products .console-capture img')).toBeVisible();
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
});

test('orbit signals update project detail, discoveries and view from keyboard', async ({
  page,
}) => {
  await page.goto('/conceptos/orbita');
  for (const [index, name] of ['Karuplan', 'Qlinnt', 'Accounty', 'InvoiceGen Pro'].entries()) {
    const button = page.getByRole('button', { name: 'SEÑAL 0' + (index + 1) + ': ' + name });
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#signal-detail h3')).toHaveText(name);
    if (index > 1) await expect(page.locator('.private-signal-art')).toBeVisible();
  }
  await expect(page.locator('.signal-count b')).toHaveText('04');
  const node = page.locator('.node-0');
  const before = await node.getAttribute('style');
  await page.getByRole('button', { name: 'Separar órbitas' }).click();
  await expect(page.getByRole('button', { name: 'Reunir órbitas' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  expect(await node.getAttribute('style')).not.toBe(before);
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
});

test('concepts fit mobile, tablet and desktop, respect reduced motion and load images', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const path of paths) {
    for (const width of [320, 390, 700, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width === 700 ? 600 : 900 });
      await page.goto(path);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        path + ' ' + width,
      ).toBe(true);
      await expect(page.locator('h1')).toBeVisible();
      if (width === 700 && path === '/conceptos') {
        await page.locator('.console-device').scrollIntoViewIfNeeded();
        await expect(page.locator('.console-device')).toBeInViewport({
          ratio: 0.5,
        });
        await page.screenshot({ path: 'audit/concept-workshop-panel.png' });
      }
    }
  }
  for (const path of ['/conceptos', '/conceptos/orbita']) {
    await page.goto(path);
    await expect(page.locator('.motion-control')).toHaveCount(0);
    expect(
      await page
        .locator('.concept-site')
        .evaluate((root) =>
          [...root.querySelectorAll('*')].every(
            (element) => getComputedStyle(element).animationName === 'none',
          ),
        ),
    ).toBe(true);
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (element) =>
              (element as HTMLImageElement).complete &&
              (element as HTMLImageElement).naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    await expect
      .poll(() =>
        page
          .locator('img')
          .evaluateAll((images) =>
            images.every((image) => image.complete && image.naturalWidth > 0),
          ),
      )
      .toBe(true);
    await page.evaluate(() => window.scrollTo(0, 0));
    const name = path.endsWith('orbita') ? 'orbit' : 'workshop';
    await page.screenshot({ path: 'audit/concept-' + name + '-desktop.png', fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: 'audit/concept-' + name + '-mobile.png', fullPage: true });
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
      path + ' mobile',
    ).toEqual([]);
    await page.setViewportSize({ width: 1440, height: 900 });
  }
});

test('proposals have styled static content and working project links without JavaScript', async ({
  browser,
  request,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const path of ['/conceptos', '/conceptos/orbita']) {
    await page.goto(path);
    await expect(page.locator('.concept-noscript')).toBeVisible();
    expect(
      await page
        .locator('.concept-site')
        .evaluate((element) => getComputedStyle(element).fontFamily),
    ).toMatch(/Bricolage|Space Grotesk/);
    await expect(page.locator('a[href="mailto:hello@denilson.me"]')).toBeVisible();
    await page.locator('main a[href="/proyectos/karuplan"]').first().click();
    await expect(page.locator('h1')).toHaveText('Karuplan');
  }
  expect(await (await request.get('/sitemap.xml')).text()).not.toContain('/conceptos');
  await context.close();
});

test('the main site uses dev.play without loading the Orbit proposal and language navigation preserves the concept', async ({
  page,
}) => {
  const resources: string[] = [];
  page.on('request', (request) => resources.push(request.url()));
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Mostrar teléfono' })).toBeAttached();
  await expect(page.locator('.portfolio-site .devplay-hero')).toBeVisible();
  expect(resources.some((url) => /ConceptSite-/.test(url))).toBe(false);
  for (const path of ['/conceptos', '/conceptos/orbita']) {
    await page.goto(path);
    await page.getByRole('link', { name: 'English', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page).toHaveURL(
      path.endsWith('orbita') ? /\/en\/concepts\/orbit$/ : /\/en\/concepts$/,
    );
    await page.getByRole('link', { name: 'Español', exact: true }).click();
    await expect(page).toHaveURL('http://127.0.0.1:4173' + path);
    await page.keyboard.press('Tab');
    // Explicitly check the keyboard-only skip link in its focused state, too.
    await page.getByRole('link', { name: 'Saltar al contenido' }).focus();
    await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeInViewport();
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
  }
});
