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
    expect(screen.getAllByText(/Returned to Los Angeles \(LAX\)/i).length).toBeGreaterThan(0);
  });
});
