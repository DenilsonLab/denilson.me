import { brandMarkPath } from '@/config/brand';

export function MakerMark({ className = '' }: { className?: string }) {
  return (
    <svg className={'maker-mark ' + className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d={brandMarkPath} fill="currentColor" />
    </svg>
  );
}
