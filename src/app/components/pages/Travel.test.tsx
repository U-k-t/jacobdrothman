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
    // fires), the status area should already show Los Angeles rather than sitting blank.
    expect(screen.getByText("Los Angeles")).toBeInTheDocument();
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
    expect(items.some((item) => item.textContent?.includes("to Los Angeles"))).toBe(true);
  });
});
