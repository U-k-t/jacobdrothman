import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { BrandSwitcher } from "./dev/BrandSwitcher";
import { BrandSwitcher } from "./dev/BrandSwitcher";

export function Root() {
  const { pathname, hash } = useLocation();

  // Scroll to the anchor on hash links, otherwise to the top on route change.
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {import.meta.env.DEV && <BrandSwitcher />}
      {import.meta.env.DEV && <BrandSwitcher />}
    </div>
  );
}
