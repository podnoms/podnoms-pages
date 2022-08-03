import React from "react";

interface IRadioButton {
  label: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const RadioButton: React.FC<IRadioButton> = ({ label, value, onChange }) => {
  return (
    <label className="cursor-pointer label">
      <span className="label-text">{label}</span>
      <input
        type="radio"
        checked={value}
        onChange={onChange}
        className="radio"
      />
    </label>
  );
};
export default RadioButton;
