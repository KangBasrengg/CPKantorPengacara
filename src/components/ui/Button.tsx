import Link from "next/link";
import { type LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}

const variantClasses = {
  primary:
    "bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-950 shadow-sm",
  secondary:
    "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300",
  outline:
    "border border-neutral-300 text-neutral-800 hover:bg-neutral-50 active:bg-neutral-100",
  ghost:
    "text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200",
  white:
    "bg-white text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 shadow-md border border-neutral-200 font-semibold",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs font-semibold gap-1.5 rounded-lg",
  md: "px-5 py-2.5 text-sm font-semibold gap-2 rounded-lg",
  lg: "px-6 py-3 text-base font-semibold gap-2.5 rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  href,
  external = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `
    inline-flex items-center justify-center font-medium
    transition-all duration-150
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim();

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon className="w-4 h-4 shrink-0 text-current" />}
      <span className="text-current">{children}</span>
      {Icon && iconPosition === "right" && <Icon className="w-4 h-4 shrink-0 text-current" />}
    </>
  );

  if (href) {
    if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          className={classes}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
