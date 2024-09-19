// src/constants/toggleLabels.ts
export const ToggleLabels = {
  Summary: "Summary",
  Table: "Table",
  CategoryOverview: "Overview",
} as const;

export type ToggleLabelKeys = keyof typeof ToggleLabels;
export type ToggleLabelValues = (typeof ToggleLabels)[ToggleLabelKeys];
