import React from "react";
import classNames from "classnames";

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
}

export function Button({ onClick, children, className }: ButtonProps) {
  const defaultStyles =
    "shadow-md rounded-md px-4 py-2 border-b-4 hover:border-b-zinc-200 hover:text-zinc-300 ";

  return (
    <button className={classNames(defaultStyles, className)} onClick={onClick}>
      {children}
    </button>
  );
}
