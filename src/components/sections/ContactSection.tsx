import { useState, useSyncExternalStore, type FormEvent } from 'react';
import { Mail, Phone, Copy, ExternalLink, MapPin } from 'lucide-react';
import { site } from '@/config/site';
import { draftText, mailtoUrl } from '@/utils/contact';
import type { Translations } from '@/utils/translations';
import { SectionHeader } from '../common/SectionHeader';
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
function PhoneContact({ t }: { t: Translations }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="contact-item">
      <Phone aria-hidden="true" />
      <div>
        <h3>{t.contact.phone}</h3>
        {revealed ? (
          <a href={'tel:' + site.phone}>{site.phoneDisplay}</a>
        ) : (
          <button className="text-button" type="button" onClick={() => setRevealed(true)}>
            {t.contact.reveal}
          </button>
        )}
      </div>
    </div>
  );
}
export function ContactSection({ t }: { t: Translations }) {
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const [draft, setDraft] = useState({ name: '', email: '', message: '' });
  const [prepared, setPrepared] = useState(false);
  const [feedback, setFeedback] = useState('');
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPrepared(true);
    setFeedback('');
  }
  function change(field: keyof typeof draft, value: string) {
    setDraft((previous) => ({ ...previous, [field]: value }));
    setPrepared(false);
    setFeedback('');
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(draftText(draft));
      setFeedback(t.contact.copied);
    } catch {
      setFeedback(t.contact.copyError);
    }
  }
  return (
    <section id="contacto" className="section section-alt">
      <div className="content">
        <SectionHeader title={t.contact.title} subtitle={t.contact.subtitle} />
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <Mail aria-hidden="true" />
              <div>
                <h3>{t.contact.email}</h3>
                <a href={'mailto:' + site.email}>{site.email}</a>
              </div>
            </div>
            <PhoneContact t={t} />
            <div className="contact-item">
              <MapPin aria-hidden="true" />
              <div>
                <h3>{t.location}</h3>
                <p>UTC−3</p>
              </div>
            </div>
            <p className="muted privacy-note">{t.contact.privacy}</p>
          </div>
          <div className="panel">
            <h3>{t.contact.formTitle}</h3>
            <p id="contact-instructions">{t.contact.explanation}</p>
            <form
              onSubmit={prepare}
              aria-describedby="contact-instructions"
              className="contact-form"
            >
              <fieldset disabled={!hydrated}>
                <div>
                  <label htmlFor="contact-name">{t.contact.name}</label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    value={draft.name}
                    onChange={(event) => change('name', event.target.value)}
                    placeholder={t.contact.namePlaceholder}
                    maxLength={100}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email">{t.contact.reply}</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={draft.email}
                    onChange={(event) => change('email', event.target.value)}
                    placeholder={t.contact.emailPlaceholder}
                    maxLength={254}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-message">{t.contact.message}</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={draft.message}
                    onChange={(event) => change('message', event.target.value)}
                    placeholder={t.contact.messagePlaceholder}
                    rows={5}
                    maxLength={2000}
                    required
                  />
                </div>
                <button className="button" type="submit">
                  <Mail size={18} aria-hidden="true" />
                  {t.contact.formTitle}
                </button>
              </fieldset>
            </form>
            {prepared && (
              <div className="draft-result">
                <p role="status">{t.contact.prepared}</p>
                <div className="actions">
                  <a className="button" href={mailtoUrl(site.email, t.contact.subject, draft)}>
                    {t.contact.submit}
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                  <button className="button button-secondary" type="button" onClick={copy}>
                    <Copy size={16} aria-hidden="true" />
                    {t.contact.copy}
                  </button>
                </div>
                <pre className="draft-preview">{draftText(draft)}</pre>
              </div>
            )}
            <p role="status" className="feedback">
              {feedback}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
