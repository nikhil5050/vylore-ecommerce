import Image from "next/image";

export function StagePoster() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="relative h-[46%] w-[70%] max-w-[420px]">
        <Image
          src="/animationimg1.png"
          alt="Vylore 18K gold bangle with emerald-cut diamonds"
          fill
          sizes="420px"
          className="object-contain mix-blend-multiply"
          priority
        />
      </div>
    </div>
  );
}
