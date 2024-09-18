import React from "react";
import { useToggle } from "./ToggleContext";
import { ToggleLabelValues } from "../../constants/toggleLabels";

interface ToggleMenuProps {
  labels: ToggleLabelValues[];
}

export const ToggleMenu: React.FC<ToggleMenuProps> = ({ labels }) => {
  return (
    <div className="flex flex-col min-w-full bg-slate-300 p-2 rounded-t-lg px-4">
      <div className="flex justify-between">
        {labels.map((label) => (
          <ToggleButton key={label} label={label} />
        ))}
      </div>
    </div>
  );
};

const ToggleButton: React.FC<{ label: ToggleLabelValues }> = ({ label }) => {
  const { value, toggle } = useToggle(label);

  return (
    <div className="flex flex-col items-start gap-2">
      <label htmlFor={`toggle-${label}`} className="text-lg font-light">
        {label}
      </label>
      <input
        id={`toggle-${label}`}
        type="checkbox"
        className="border-4 mr-2 toggle toggle-success"
        checked={value}
        onChange={toggle}
      />
    </div>
  );
};
