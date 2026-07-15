import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RouteSummary } from "./RouteSummary";
import type { RouteLeg } from "./routeLegs";

const legs: RouteLeg[] = [
  {
    id: "ensenada-2006-out",
    order: 1,
    origin: { id: "lax", name: "Los Angeles (LAX)", lat: 33.94, lng: -118.4 },
    destination: { id: "ensenada", name: "Ensenada", lat: 31.87, lng: -116.62 },
    travelMode: undefined,
    direction: "outbound",
    isRelocation: false,
    tripId: "ensenada-2006",
    label: "Ensenada",
    year: "2006",
  },
  {
    id: "ensenada-2006-return",
    order: 2,
    origin: { id: "ensenada", name: "Ensenada", lat: 31.87, lng: -116.62 },
    destination: { id: "lax", name: "Los Angeles (LAX)", lat: 33.94, lng: -118.4 },
    travelMode: undefined,
    direction: "return",
    isRelocation: false,
    tripId: "ensenada-2006",
    label: "Returned to Los Angeles (LAX)",
    year: "2006",
  },
];

describe("RouteSummary", () => {
  it("lists every leg in order for screen readers, including travel mode", () => {
    render(<RouteSummary legs={legs} />);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0].textContent).toContain("Ensenada");
    expect(items[0].textContent).toContain("Not yet recorded");
    expect(items[1].textContent).toContain("Returned");
  });

  it("handles an empty leg list without crashing", () => {
    render(<RouteSummary legs={[]} />);
    expect(screen.getByText("No trips to show yet.")).toBeInTheDocument();
  });
});
