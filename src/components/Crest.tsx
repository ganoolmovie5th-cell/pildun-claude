export default function Crest({ src, alt, size = 24 }: { src: string; alt: string; size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="inline-block object-contain shrink-0"
      style={{ width: size, height: size }}
    />
  );
}
