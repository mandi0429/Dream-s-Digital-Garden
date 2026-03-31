import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "glass" | "solid" | "ghost";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "glass", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-body text-sm font-medium transition-transform duration-200 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-50",
          variant === "glass" &&
            "liquid-glass-strong px-5 py-3 text-white hover:-translate-y-0.5",
          variant === "solid" &&
            "bg-white px-5 py-3 text-black hover:-translate-y-0.5",
          variant === "ghost" &&
            "px-2 py-2 text-white/80 hover:text-white",
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
