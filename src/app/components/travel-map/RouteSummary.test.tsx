import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RouteSummary } from "./RouteSummary";
import type { RouteLeg } from "./routeLegs";

const legs: RouteLeg[] = [
  {
    id: "ensenada-2006-leg-0",
    order: 1,
    origin: { id: "southern-california", name: "Southern California", country: "United States", lat: 33.94, lng: -118.4 },
    destination: { id: "ensenada", name: "Ensenada", country: "Mexico", lat: 31.87, lng: -116.62 },
    travelMode: undefined,
    direction: "outbound",
    isRelocation: false,
    journeyId: "ensenada-2006",
    label: "Ensenada",
    year: 2006,
  },
  {
    id: "ensenada-2006-return",
    order: 2,
    origin: { id: "ensenada", name: "Ensenada", country: "Mexico", lat: 31.87, lng: -116.62 },
    destination: { id: "southern-california", name: "Southern California", country: "United States", lat: 33.94, lng: -118.4 },
    travelMode: undefined,
    direction: "return",
    isRelocation: false,
    journeyId: "ensenada-2006",
    label: "Returned to Southern California",
    year: 2006,
  },
  {
    id: "villach-2021-leg-0",
    order: 3,
    origin: { id: "southern-california", name: "Southern California", country: "United States", lat: 33.94, lng: -118.4 },
    destination: { id: "villach", name: "Villach", country: "Austria", lat: 46.61, lng: 13.85 },
    travelMode: undefined,
    direction: "outbound",
    isRelocation: true,
    journeyId: "villach-2021",
    label: "Villach",
    year: 2021,
  },
];

describe("RouteSummary", () => {
  it("lists every leg in order for screen readers, including the date and travel mode", () => {
    render(<RouteSummary legs={legs} />);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[0].textContent).toContain("Ensenada");
    expect(items[0].textContent).toContain("2006");
    expect(items[0].textContent).toContain("Not yet recorded");
    expect(items[1].textContent).toContain("Returned");
  });

  it("describes a one-way relocation leg distinctly from a round-trip leg", () => {
    render(<RouteSummary legs={legs} />);
    const items = screen.getAllByRole("listitem");
    expect(items[2].textContent).toContain("Moved from Southern California to Villach");
  });

  it("handles an empty leg list without crashing", () => {
    render(<RouteSummary legs={[]} />);
    expect(screen.getByText("No journeys to show yet.")).toBeInTheDocument();
  });
});
