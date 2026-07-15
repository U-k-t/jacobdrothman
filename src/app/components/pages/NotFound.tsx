import { Link } from "react-router";
import { Home } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl mb-4">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1fa2ff] to-[#60b8ff] text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-[#1fa2ff]/25 transition-all"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
