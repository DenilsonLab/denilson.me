import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('console shows real project screenshots and links to their case studies in both languages', async ({
  page,
}) => {
  for (const path of ['/', '/en']) {
    await page.goto(path);
    const consoleView = page.locator('.console-products');
    for (const [name, slug] of [
      ['Karuplan', 'karuplan'],
      ['Qlinnt', 'qlinnt'],
    ]) {
      await consoleView.getByRole('button', { name, exact: true }).click();
      await expect(consoleView.locator('img')).toHaveAttribute(
        'src',
        `/projects/${slug}-cover.webp`,
      );
      await expect(consoleView.locator('a')).toHaveAttribute(
        'href',
        `${path === '/' ? '/proyectos/' : '/en/projects/'}${slug}`,
      );
    }
    await expect(page.locator('.project-demo')).toHaveCount(0);
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
    await consoleView.locator('a').click();
    await expect(page.locator('.case-detail')).toBeVisible();
    await expect(page.locator('.project-demo, .case-experience')).toHaveCount(0);
  }
});

test('identity and case study evidence at desktop and mobile sizes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const [slug, path] of [
      ['home', '/'],
      ['karuplan', '/proyectos/karuplan'],
      ['qlinnt', '/en/projects/qlinnt'],
      ['profile', '/perfil'],
    ]) {
      await page.goto(path);
      await expect(page.locator('h1')).toBeVisible();
      await page.addStyleTag({
        content:
          '.portfolio-site .devplay-scenes > section, .portfolio-site .portfolio-contact { content-visibility: visible !important; }',
      });
      for (const img of await page.locator('img').all()) {
        await img.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            img.evaluate(
              (element) =>
                (element as HTMLImageElement).complete &&
                (element as HTMLImageElement).naturalWidth > 0,
            ),
          )
          .toBe(true);
      }
      await page.evaluate(async () => {
        await document.fonts.ready;
        window.scrollTo(0, 0);
      });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      await expect(page.locator('.concept-brand .maker-mark path')).toHaveAttribute(
        'fill',
        'currentColor',
      );
      await page.screenshot({ path: `.impeccable/review/${slug}-${width}.png`, fullPage: true });
      if (slug === 'home') {
        await page
          .locator('.devplay-hero')
          .screenshot({ path: `.impeccable/review/hero-${width}.png` });
        await page
          .locator('.editorial-projects')
          .screenshot({ path: `.impeccable/review/projects-${width}.png` });
      }
    }
  }
});
