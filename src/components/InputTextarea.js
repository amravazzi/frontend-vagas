import React from "react";

export function InputTextarea({ value, onChange }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      name="descricao"
      placeholder="Alguma dúvida? Recado?"
      aria-label="Observações"
      aria-labelledby="stickers-obs"
    />
  );
}
