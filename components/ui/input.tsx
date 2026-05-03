import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white shadow-inner outline-none transition duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/35 focus:border-luxury-champagne/70 focus:ring-2 focus:ring-luxury-champagne/20 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
