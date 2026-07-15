import type { TravelMode } from "../../data/travelLocations";

export interface TravelModeStyle {
  label: string;
  strokeClassName: string;
  fillClassName: string;
  dashed?: boolean;
}

/** Centralized travel-mode -> color/label mapping. Colors live in `theme.css` as CSS variables. */
export const TRAVEL_MODE_STYLES: Record<TravelMode, TravelModeStyle> = {
  air: { label: "Air", strokeClassName: "stroke-travel-mode-air", fillClassName: "fill-travel-mode-air" },
  boat: { label: "Boat", strokeClassName: "stroke-travel-mode-boat", fillClassName: "fill-travel-mode-boat" },
  train: { label: "Train", strokeClassName: "stroke-travel-mode-train", fillClassName: "fill-travel-mode-train" },
  automotive: {
    label: "Automotive",
    strokeClassName: "stroke-travel-mode-automotive",
    fillClassName: "fill-travel-mode-automotive",
  },
};

/** Style used when a leg's travel mode hasn't been recorded yet — never guessed. */
export const UNRESOLVED_MODE_STYLE: TravelModeStyle = {
  label: "Not yet recorded",
  strokeClassName: "stroke-travel-mode-unresolved",
  fillClassName: "fill-travel-mode-unresolved",
  dashed: true,
};

export function getTravelModeStyle(mode: TravelMode | undefined): TravelModeStyle {
  return mode ? TRAVEL_MODE_STYLES[mode] : UNRESOLVED_MODE_STYLE;
}

export function getTravelModeLabel(mode: TravelMode | undefined): string {
  return getTravelModeStyle(mode).label;
}
