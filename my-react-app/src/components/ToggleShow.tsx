import React from "react";
import { useToggle } from "./ToggleContext";
import { ToggleLabelValues } from "../constants/toggleLabels";

interface ToggleShowProps {
  label: ToggleLabelValues;
  children: React.ReactNode;
}

export const ToggleShow: React.FC<ToggleShowProps> = ({ label, children }) => {
  const { value } = useToggle(label);

  return <>{value && <div>{children}</div>}</>;
};
