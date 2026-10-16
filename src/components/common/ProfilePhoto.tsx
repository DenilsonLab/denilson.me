export function ProfilePhoto({ className = '' }: { className?: string }) {
  return (
    <img
      className={className}
      src="/profile-160.webp"
      srcSet="/profile-80.webp 80w, /profile-160.webp 160w, /profile-224.webp 224w"
      sizes="(min-width: 1280px) 112px, 40px"
      width="112"
      height="112"
      alt="Denilson Arguello"
      decoding="async"
    />
  );
}
