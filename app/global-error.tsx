"use client";

import React from "react";
import Link from "next/link";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-ink flex items-center justify-center min-h-screen p-6 font-sans">
        <div className="max-w-md w-full text-center space-y-4 p-8 rounded-3xl border border-ink/10 bg-skymist/30 shadow-lg">
          <h1 className="font-display font-bold text-2xl text-ink">Something went wrong</h1>
          <p className="text-xs text-ink-muted">A critical error occurred. Please try reloading the page.</p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => reset()}
              className="bg-brand text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs"
            >
              Reload Page
            </button>
            <Link
              href="/"
              className="bg-white text-ink text-xs font-bold px-4 py-2.5 rounded-xl border border-ink/15"
            >
              Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
