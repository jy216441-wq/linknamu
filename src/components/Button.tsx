import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "solid" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  solid: "bg-sky-500 text-white hover:bg-sky-600",
  outline: "border border-sky-500 text-sky-500 hover:bg-sky-50",
};

export default function Button({ variant = "solid", className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`flex min-h-11 w-full items-center justify-center rounded-lg text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${className}`}
    />
  );
}
