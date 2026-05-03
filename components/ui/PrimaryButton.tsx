import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type PrimaryButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function PrimaryButton({
  href,
  children,
  className,
  type = "button",
  disabled,
  onClick
}: PrimaryButtonProps) {
  const content = (
    <>
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </>
  );

  if (href) {
    return (
      <Button asChild variant="accent" size="lg" className={className}>
        <Link href={href}>{content}</Link>
      </Button>
    );
  }

  return (
    <Button
      type={type}
      variant="accent"
      size="lg"
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </Button>
  );
}
