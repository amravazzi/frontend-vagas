import React from "react";

export function InputNumber({ value, onChange, error, disabled, ariaLabel }) {
  return (
    <input
      className={error ? "error" : ""}
      value={value}
      onChange={onChange}
      disabled={disabled}
      type="text"
      placeholder="0"
      aria-label={ariaLabel + " stickers selecionados"}
      aria-labelledby="sticker-quantity"
      aria-required="true"
      required
    />
  );
}
