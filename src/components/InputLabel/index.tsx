import React from "react";

interface IInputLabel {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

export default function InputLabel({
  label,
  name,
  type,
  placeholder,
}: IInputLabel) {
  return (
    <div
      style={{ maxHeight: "48px" }}
      className="form-control w-full max-w-xs max-h-12"
    >
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        style={{ maxHeight: "48px" }}
        className="input input-bordered w-full max-w-xs max-h-12"
      />
    </div>
  );
}
