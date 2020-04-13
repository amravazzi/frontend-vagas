import React from "react";

export function Checkbox({ value, label, isChecked = false, onChange }) {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        value={value}
        checked={isChecked}
        onChange={onChange}
        aria-labelledby="sticker-type"
      />
      <span id={label}>{value}</span>
    </label>
  );
}
