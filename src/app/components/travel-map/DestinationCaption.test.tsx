import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DestinationCaption } from "./DestinationCaption";
import type { RouteLeg } from "./routeLegs";

const leg: RouteLeg = {
  id: "vienna-2021-out",
  order: 1,
  origin: { id: "villach", name: "Villach", lat: 46.61, lng: 13.85 },
  destination: { id: "vienna", name: "Vienna", lat: 48.21, lng: 16.37 },
  travelMode: undefined,
  direction: "outbound",
  isRelocation: false,
  tripId: "vienna-2021",
  label: "Vienna",
  year: "2021",
};

describe("DestinationCaption", () => {
  it("shows only the destination name and travel mode while a leg is active", () => {
    render(<DestinationCaption activeLeg={leg} />);
    expect(screen.getByText("Vienna")).toBeInTheDocument();
    expect(screen.getByText(/Travel mode: Not yet recorded/)).toBeInTheDocument();
    // Nothing else — no country, year, or progress counter.
    expect(screen.queryByText(/2021/)).not.toBeInTheDocument();
    expect(screen.queryByText(/of \d+/)).not.toBeInTheDocument();
  });

  it("shows the resolved travel mode when known", () => {
    render(<DestinationCaption activeLeg={{ ...leg, travelMode: "boat" }} />);
    expect(screen.getByText(/Travel mode: Boat/)).toBeInTheDocument();
  });

  it("renders nothing when there is no active leg", () => {
    const { container } = render(<DestinationCaption activeLeg={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
