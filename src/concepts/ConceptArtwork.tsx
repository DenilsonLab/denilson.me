import { useId, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import type { ConceptCopy } from './content';
import { useInteractive } from './useInteractive';

export function ConceptArtwork({
  kind,
  t,
  className = '',
  priority = true,
}: {
  kind: 'workshop' | 'orbit';
  t: ConceptCopy;
  className?: string;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ready = useInteractive();
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  const name = kind === 'workshop' ? 'code-garden' : 'orbit-sculpture';
  const alt = kind === 'workshop' ? t.workshopArtAlt : t.orbitArtAlt;
  const src = '/concepts/' + name;
  return (
    <figure className={'concept-artwork ' + className}>
      <img
        className="artwork-image"
        src={src + '-960.webp'}
        srcSet={`${src}-640.webp 640w, ${src}-960.webp 960w, ${src}-1440.webp 1440w`}
        sizes={kind === 'workshop' ? '(max-width: 760px) 100vw, 58vw' : '100vw'}
        width={kind === 'workshop' ? 1536 : 1586}
        height={kind === 'workshop' ? 1024 : 992}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        {...(priority ? { fetchpriority: 'high' } : {})}
      />
      <figcaption className="artwork-caption">
        <span>
          0{kind === 'workshop' ? '1' : '2'} / {t.artStudy}
        </span>
        <span>{t.artCredit}</span>
      </figcaption>
      <button
        className="artwork-open"
        disabled={!ready}
        aria-label={t.zoomArt}
        aria-haspopup="dialog"
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
      >
        <Maximize2 size={15} aria-hidden="true" />
        <span>{t.zoom}</span>
      </button>
      <dialog
        className="artwork-dialog"
        ref={dialog}
        aria-labelledby={id}
        onClose={() => setOpen(false)}
      >
        <div className="artwork-dialog-header">
          <p id={id}>
            {t.artStudy} / {kind === 'workshop' ? 'dev.play' : 'Órbita'}
          </p>
          <button aria-label={t.closeArt} onClick={() => dialog.current?.close()}>
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        {open ? (
          <img
            src={src + '-1440.webp'}
            width={kind === 'workshop' ? 1536 : 1586}
            height={kind === 'workshop' ? 1024 : 992}
            alt={alt}
          />
        ) : null}
        <p className="artwork-dialog-credit">{t.artCredit}</p>
      </dialog>
    </figure>
  );
}
