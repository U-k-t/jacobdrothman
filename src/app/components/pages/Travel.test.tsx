import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Travel } from "./Travel";

describe("Travel page", () => {
  it("renders successfully with the travel map included", () => {
    render(<Travel />);

    expect(screen.getByRole("heading", { name: "Travel Adventures" })).toBeInTheDocument();
    // The accessible route summary (always rendered by TravelMap) proves the map mounted.
    expect(screen.getByRole("heading", { name: /travel route, in chronological order/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /replay travel animation/i })).toBeInTheDocument();
    // Before the map has scrolled into view (the test env's IntersectionObserver stub never
    // fires), the accessible status announcement should already reference Southern California —
    // present in the DOM for screen readers, but visually hidden (sr-only), not a visible caption.
    const status = screen.getByText("Southern California");
    expect(status).toBeInTheDocument();
    expect(status).toHaveClass("sr-only");
    // No stale LAX/LA/Los Angeles label should remain anywhere on the page.
    expect(screen.queryByText("LAX")).not.toBeInTheDocument();
    expect(screen.queryByText("Los Angeles")).not.toBeInTheDocument();
  });

  it("does not render the transportation-mode legend", () => {
    render(<Travel />);
    for (const label of ["Air", "Train", "Boat", "Automotive"]) {
      expect(screen.queryByText(label)).not.toBeInTheDocument();
    }
  });

  it("does not render a visible destination-name or month/year caption", () => {
    render(<Travel />);
    // The only place a destination/date pairing may legitimately appear as visible text is
    // inside the always-present, visually-hidden route summary and the year-grouped chip list —
    // there should be no separate visible status line above/below the map.
    const visibleCaptionCandidates = screen.queryAllByText("Kauai");
    for (const node of visibleCaptionCandidates) {
      const isInsideChipList = node.closest("span")?.className.includes("bg-accent");
      const isSrOnly = node.closest(".sr-only") !== null;
      expect(isInsideChipList || isSrOnly).toBe(true);
    }
  });

  it("shows the complete route immediately for prefers-reduced-motion, without auto-animating", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })) as unknown as typeof window.matchMedia;

    render(<Travel />);

    // The route summary is always present regardless of motion preference.
    const items = screen.getAllByRole("listitem");
    expect(items.some((item) => item.textContent?.includes("to Southern California"))).toBe(true);
    // The static reduced-motion state stays readable without the legend or a visible caption.
    for (const label of ["Air", "Train", "Boat", "Automotive"]) {
      expect(screen.queryByText(label)).not.toBeInTheDocument();
    }
  });

  it("gives the map an enlarged, low-padding container now that the legend and caption are gone", () => {
    const { container } = render(<Travel />);
    const mapContainer = container.querySelector('[class*="border-\\[\\#1fa2ff\\]\\/20"]');
    expect(mapContainer).toBeInTheDocument();
    expect(mapContainer?.className).toContain("p-4");
    expect(mapContainer?.className).not.toContain("p-8");
  });
});
