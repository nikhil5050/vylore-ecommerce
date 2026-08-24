import Image from "next/image";

export function StagePoster() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="relative h-[46%] w-[70%] max-w-[420px]">
        <Image
          src="/ring.png"
          alt="Vylore sterling silver open ring with leaf-branch motif"
          fill
          sizes="420px"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
