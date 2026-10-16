import { Component, type ReactNode } from 'react';
import { site } from '@/config/site';
import { homePath } from '@/utils/routes';
import type { Language } from '@/utils/translations';

export class ErrorBoundary extends Component<
  { children: ReactNode; language: Language },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    const spanish = this.props.language === 'es';
    return (
      <main className="section">
        <div className="content not-found">
          <h1>{spanish ? 'No se pudo mostrar esta página' : 'This page could not be displayed'}</h1>
          <p>
            {spanish
              ? 'Puedes volver al inicio o escribirme directamente.'
              : 'You can return home or email me directly.'}
          </p>
          <div className="actions">
            <a className="button" href={homePath(this.props.language)}>
              {spanish ? 'Volver al inicio' : 'Back to home'}
            </a>
            <a href={'mailto:' + site.email}>{site.email}</a>
          </div>
        </div>
      </main>
    );
  }
}
