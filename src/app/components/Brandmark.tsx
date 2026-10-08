interface BrandmarkProps {
  /** Use the short "jdr." form instead of the full wordmark. */
  compact?: boolean;
  className?: string;
}

export function Brandmark({ compact = false, className = "" }: BrandmarkProps) {
  return (
    <span
      className={`font-display tracking-tight lowercase ${className}`}
      style={{ letterSpacing: "-0.015em" }}
    >
      {compact ? "jdr" : "jacob rothman"}
      <span className="text-signal">.</span>
    </span>
  );
}
