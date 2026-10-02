import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "brand" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-2xl cursor-pointer";

    const variants = {
      primary:
        "bg-coral text-ink hover:bg-coral-hover shadow-md hover:shadow-coral-glow font-bold",
      brand:
        "bg-brand text-white hover:bg-brand-dark shadow-md hover:shadow-glow font-bold",
      secondary:
        "bg-skymist text-brand hover:bg-brand/10 border border-brand/20 font-semibold",
      outline:
        "border-2 border-ink/15 text-ink hover:bg-ink/5 hover:border-ink/30 font-semibold",
      ghost:
        "text-ink hover:bg-ink/5 font-medium",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-2 space-x-1.5 min-h-[36px]",
      md: "text-sm px-5 py-3 space-x-2 min-h-[44px]",
      lg: "text-base px-7 py-4 space-x-2.5 min-h-[52px] shadow-lg",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center space-x-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Processing...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
