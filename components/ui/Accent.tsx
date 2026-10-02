import React from "react";
import { cn } from "@/lib/utils";

interface AccentProps {
  children: React.ReactNode;
  underline?: boolean;
  className?: string;
}

export function Accent({ children, underline = false, className }: AccentProps) {
  return (
    <span className={cn("relative inline-block font-accent italic text-brand text-[1.08em] font-normal", className)}>
      <span>{children}</span>
      {underline && (
        <svg
          className="absolute -bottom-[6px] left-0 w-full h-[6px] text-coral pointer-events-none"
          viewBox="0 0 100 8"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M 2 5 Q 50 1, 98 5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      )}
    </span>
  );
}
