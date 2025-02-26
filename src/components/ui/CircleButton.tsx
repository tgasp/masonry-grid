import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface CircleButtonBaseProps {
  className?: string;
  title?: string;
}

interface CircleButtonAsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, CircleButtonBaseProps {
  href?: never;
}

interface CircleButtonAsAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement>, CircleButtonBaseProps {
  href: string;
}

type CircleButtonProps = CircleButtonAsButtonProps | CircleButtonAsAnchorProps;

export function CircleButton({ children, className, href, ...props }: CircleButtonProps) {
  const buttonClasses = cn(
    "p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all",
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