import { renderToString } from 'react-dom/server';
import { Site } from './Site';
import { getPage, pagePaths, conceptPaths } from './utils/routes';
import { ConceptSite } from './concepts/ConceptSite';
import { HomeSite } from './HomeSite';
export { pagePaths, conceptPaths };
export function render(path: string) {
  const page = getPage(path);
  return {
    html: renderToString(
      page.kind === 'concept' ? (
        <ConceptSite page={page} />
      ) : page.kind === 'home' ? (
        <HomeSite page={page} />
      ) : (
        <Site path={path} />
      ),
    ),
    page,
  };
}
export { site } from './config/site';
