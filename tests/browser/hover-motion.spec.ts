import { test, expect } from '@playwright/test';

test('secondary project buttons keep a light background and dark text on hover and keyboard focus', async ({
  page,
}) => {
  for (const path of ['/proyectos/karuplan', '/en/projects/karuplan']) {
    await page.goto(path);
    const button = page.locator('.case-detail .button-secondary');
    await button.hover();
    await expect(button).toHaveCSS('background-color', 'rgb(223, 230, 250)');
    await expect(button).toHaveCSS('color', 'rgb(23, 33, 52)');
    await expect(button).toHaveCSS('filter', 'none');
    if (path.startsWith('/en'))
      await page.screenshot({ path: 'audit/karuplan-contact-hover-en.png' });
    await button.focus();
    await page.mouse.move(0, 0);
    await expect(button).toBeFocused();
    await expect(button).toHaveCSS('background-color', 'rgb(223, 230, 250)');
    await expect(button).toHaveCSS('color', 'rgb(23, 33, 52)');
  }
});

test('motion is available by default without a switch and honors the device preference', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  for (const path of ['/', '/en', '/conceptos', '/conceptos/orbita']) {
    await page.goto(path);
    await expect(page.locator('.motion-control')).toHaveCount(0);
    const animated = page.locator(
      path.endsWith('orbita') ? '.nucleus-ring' : '.denibot-button img',
    );
    await expect(animated).toHaveCSS(
      'animation-name',
      path.endsWith('orbita') ? 'nucleus-turn' : /bot-hello/,
    );
    if (!path.endsWith('orbita')) {
      // Animate the visual without moving its clickable target.
      await expect(page.locator('.denibot-button')).toHaveCSS('animation-name', 'none');
      await page
        .getByRole('button', {
          name: path === '/en' ? 'Talk to Deni.bot' : 'Hablar con Deni.bot',
          exact: true,
        })
        .click();
      await expect(page.locator('.denibot-response')).toContainText('coffee');
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(animated).toHaveCSS('animation-name', 'none');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await expect(animated).not.toHaveCSS('animation-name', 'none');
  }
});
