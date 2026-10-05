import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router";
import { Home } from "./Home";

describe("Home page", () => {
  it("does not render the travel map", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    // The travel map's accessible route summary is a reliable fingerprint for "the map mounted".
    expect(
      screen.queryByRole("heading", { name: /travel route, in chronological order/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Replay trips/i)).not.toBeInTheDocument();
  });
});
