import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-white text-zinc-950 shadow-[0_0_34px_rgba(246,246,247,0.18)] hover:bg-zinc-200",
        secondary:
          "border border-white/15 bg-white/[0.06] text-white backdrop-blur-xl hover:border-white/55 hover:bg-white/[0.1]",
        ghost:
          "text-zinc-200 hover:bg-white/[0.08] hover:text-white",
      },
      size: {
        default: "min-h-11 px-5",
        lg: "min-h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
