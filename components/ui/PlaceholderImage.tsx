import React from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

interface PlaceholderImageProps {
  src?: string;
  alt: string;
  caption?: string;
  aspectRatio?: string;
  className?: string;
  objectPosition?: string;
}

export function PlaceholderImage({
  src,
  alt,
  caption,
  className = "",
  objectPosition = "object-center",
}: PlaceholderImageProps) {
  if (src && src.trim().length > 0 && !src.includes("placeholder")) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`object-cover ${objectPosition} ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative w-full h-full min-h-[140px] bg-skymist/70 border border-brand/15 rounded-2xl p-4 flex flex-col items-center justify-center text-center select-none overflow-hidden ${className}`}
    >
      <div className="w-9 h-9 rounded-full bg-white shadow-xs flex items-center justify-center text-brand mb-2">
        <Camera className="w-4 h-4" />
      </div>
      <span className="text-[11px] font-bold text-ink tracking-tight mb-1">
        {alt}
      </span>
      {caption && (
        <span className="text-[10px] text-ink-muted leading-tight max-w-[220px] italic">
          &ldquo;{caption}&rdquo;
        </span>
      )}
    </div>
  );
}
