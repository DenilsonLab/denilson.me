import ProjectsPage from './components/ProjectsPage';
import { ProjectPage } from './components/ProjectPage';
import { ProfilePage } from './components/ProfilePage';
import NotFound from './components/NotFound';
import { CreativeLayout } from './layout/CreativeLayout';
import { getPage } from './utils/routes';
export function Site({ path }: { path: string }) {
  const page = getPage(path);
  return (
    <CreativeLayout page={page}>
      {page.kind === 'projects' && <ProjectsPage language={page.language} />}
      {page.kind === 'project' && page.project && (
        <ProjectPage project={page.project} language={page.language} />
      )}
      {page.kind === 'profile' && <ProfilePage language={page.language} />}
      {page.kind === 'notFound' && <NotFound />}
    </CreativeLayout>
  );
}
