import Image from 'next/image';

// Logo Piala Dunia 2026 (dipakai kolom juara di bracket).
export default function Trophy({ size = 40 }: { size?: number }) {
  return (
    <Image src="/logo.jpeg" alt="Piala Dunia 2026" width={size} height={size}
      className="inline-block rounded" style={{ width: size, height: 'auto' }} />
  );
}
