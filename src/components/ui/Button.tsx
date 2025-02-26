import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface ButtonBaseProps {
  variant?: "primary" | "outlined";
  className?: string;
}

interface ButtonAsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonBaseProps {
  href?: never;
}

interface ButtonAsAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement>, ButtonBaseProps {
  href: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

const variantClasses = {
  primary: "bg-primary text-white hover:bg-primary-hover shadow-md hover:shadow-lg",
  outlined: "border border-gray-300 text-gray-700 hover:bg-gray-50",
};

export function Button({ variant = "primary", children, className, href, ...props }: ButtonProps) {
  const buttonClasses = cn(
    "inline-flex items-center px-4 py-2 rounded-lg transition-all",
    variantClasses[variant],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={buttonClasses}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}