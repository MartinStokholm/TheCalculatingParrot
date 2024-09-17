import React, { createContext, useContext, useState } from "react";

interface ToggleContextProps {
  toggles: { [key: string]: boolean };
  setToggle: (key: string, value: boolean) => void;
}

const ToggleContext = createContext<ToggleContextProps | undefined>(undefined);

export const ToggleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toggles, setToggles] = useState<{ [key: string]: boolean }>({});

  const setToggle = (key: string, value: boolean) => {
    setToggles((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ToggleContext.Provider value={{ toggles, setToggle }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggle = (key: string) => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error("useToggle must be used within a ToggleProvider");
  }
  const { toggles, setToggle } = context;
  const value = toggles[key] ?? false;
  const toggle = () => setToggle(key, !value);
  return { value, toggle };
};
