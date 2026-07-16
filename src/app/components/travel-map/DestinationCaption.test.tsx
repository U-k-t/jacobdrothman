import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DestinationCaption } from "./DestinationCaption";
import type { RouteLeg } from "./routeLegs";

const leg: RouteLeg = {
  id: "vienna-2021-leg-0",
  order: 1,
  origin: { id: "villach", name: "Villach", country: "Austria", lat: 46.61, lng: 13.85 },
  destination: { id: "vienna", name: "Vienna", country: "Austria", lat: 48.21, lng: 16.37 },
  travelMode: undefined,
  direction: "outbound",
  isRelocation: false,
  journeyId: "vienna-2021",
  label: "Vienna",
  year: 2021,
};

describe("DestinationCaption", () => {
  it("is visually hidden (sr-only) — movement is communicated through the map, not visible text", () => {
    const { container } = render(<DestinationCaption activeLeg={leg} />);
    const region = container.querySelector("p");
    expect(region).toHaveClass("sr-only");
  });

  it("announces the destination name, date, and travel mode while a leg is active, for screen readers", () => {
    render(<DestinationCaption activeLeg={leg} />);
    expect(screen.getByText(/Vienna/)).toBeInTheDocument();
    expect(screen.getByText(/2021/)).toBeInTheDocument();
    expect(screen.getByText(/travel mode: Not yet recorded/)).toBeInTheDocument();
  });

  it("shows a real month alongside the year when known", () => {
    render(<DestinationCaption activeLeg={{ ...leg, month: 3 }} />);
    expect(screen.getByText(/March 2021/)).toBeInTheDocument();
  });

  it("never fabricates a month when only the year is known", () => {
    render(<DestinationCaption activeLeg={leg} />);
    expect(screen.queryByText(/January|February|March|April|May|June|July|August|September|October|November|December/)).not.toBeInTheDocument();
  });

  it("shows the resolved travel mode when known", () => {
    render(<DestinationCaption activeLeg={{ ...leg, travelMode: "boat" }} />);
    expect(screen.getByText(/travel mode: Boat/)).toBeInTheDocument();
  });

  it("uses aria-live so the announcement updates as the animation progresses", () => {
    const { container } = render(<DestinationCaption activeLeg={leg} />);
    expect(container.querySelector("[aria-live='polite']")).toBeInTheDocument();
  });

  it("announces the starting location before the first leg begins, without a date", () => {
    const { container } = render(<DestinationCaption activeLeg={null} initialLocationName="Southern California" />);
    expect(screen.getByText("Southern California")).toBeInTheDocument();
    expect(screen.queryByText(/Travel mode/)).not.toBeInTheDocument();
    expect(container.querySelector("p")).toHaveClass("sr-only");
  });

  it("renders nothing once complete (no active leg, no initial location)", () => {
    const { container } = render(<DestinationCaption activeLeg={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
