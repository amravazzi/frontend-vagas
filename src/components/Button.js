import React from "react";

export function Button({
  onClick,
  ariaLabel,
  disabled,
  type = "button",
  children
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
