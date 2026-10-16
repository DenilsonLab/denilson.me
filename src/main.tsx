import { createRoot, hydrateRoot } from 'react-dom/client';
import { ErrorBoundary } from './components/ErrorBoundary';
import { getPage } from './utils/routes';
import './index.css';
const root = document.getElementById('root');
if (!root) throw new Error('Missing application root');
const page = getPage(window.location.pathname);
document.documentElement.lang = page.language;
async function start() {
  const content =
    page.kind === 'concept'
      ? await import('./concepts/ConceptSite').then(({ ConceptSite }) => (
          <ConceptSite page={page} />
        ))
      : page.kind === 'home'
        ? await import('./HomeSite').then(({ HomeSite }) => <HomeSite page={page} />)
        : await import('./Site').then(({ Site }) => <Site path={window.location.pathname} />);
  const app = <ErrorBoundary language={page.language}>{content}</ErrorBoundary>;
  if (root!.dataset.prerendered === 'true') hydrateRoot(root!, app);
  else createRoot(root!).render(app);
}
void start();
