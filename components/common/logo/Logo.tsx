import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/images/logo.png"
        alt="LarnGear Technology"
        width={220}
        height={60}
        priority
        className="h-12 w-auto object-contain"
      />
    </div>
  );
}
