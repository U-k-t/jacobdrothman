import { useSyncExternalStore } from "react";

type Brand = "a" | "b";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-brand"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Brand {
  return document.documentElement.getAttribute("data-brand") === "b" ? "b" : "a";
}

function getServerSnapshot(): Brand {
  return "a";
}

function useBrand(): Brand {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

interface BrandmarkProps {
  /** Use the short "jdr." form under Brand B instead of the full wordmark. */
  compact?: boolean;
  className?: string;
}

export function Brandmark({ compact = false, className = "" }: BrandmarkProps) {
  const brand = useBrand();

  if (brand === "b") {
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

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <WaypointJIcon className="h-6 w-6 shrink-0" />
      {!compact && <span className="font-medium tracking-tight">Jacob Rothman</span>}
    </span>
  );
}

function WaypointJIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2C7.58 2 4 5.58 4 10c0 5.25 6.5 11.25 7.3 11.96a1 1 0 0 0 1.4 0C13.5 21.25 20 15.25 20 10c0-4.42-3.58-8-8-8Z"
        fill="currentColor"
      />
      <path
        d="M9.8 7.4h3.4M13.2 7.4v5.1c0 1-.8 1.8-1.8 1.8-.75 0-1.4-.45-1.68-1.1"
        stroke="var(--background)"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="1.15" fill="var(--signal)" />
    </svg>
  );
}
