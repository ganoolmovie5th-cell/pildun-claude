export default function Crest({ src, alt, size = 24 }: { src: string; alt: string; size?: number }) {
  return (
    // SVG crest kecil dari aset statis — <img> cukup, tak perlu optimasi next/image.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="inline-block object-contain shrink-0"
      style={{ width: size, height: size }}
    />
  );
}
