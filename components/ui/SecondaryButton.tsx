import Link from "next/link";
import { Button } from "@/components/ui/button";

type SecondaryButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function SecondaryButton({
  href,
  children,
  className,
  type = "button",
  disabled,
  onClick
}: SecondaryButtonProps) {
  if (href) {
    return (
      <Button asChild variant="glass" size="lg" className={className}>
        <Link href={href}>{children}</Link>
      </Button>
    );
  }

  return (
    <Button
      type={type}
      variant="glass"
      size="lg"
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
