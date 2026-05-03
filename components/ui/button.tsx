import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-luxury-platinum text-luxury-main shadow-glow hover:-translate-y-0.5 hover:bg-white",
        accent:
          "bg-gradient-to-r from-luxury-champagne via-[#D9BF82] to-luxury-platinum text-luxury-main shadow-glow hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(200,169,106,0.24)]",
        glass:
          "border border-white/10 bg-white/5 text-luxury-platinum backdrop-blur-xl hover:-translate-y-0.5 hover:border-luxury-champagne/45 hover:bg-white/10",
        ghost: "text-luxury-platinum/80 hover:bg-white/10 hover:text-white"
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
