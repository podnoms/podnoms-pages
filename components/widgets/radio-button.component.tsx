import React from "react";

interface IRadioButton {
  label: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const RadioButton: React.FC<IRadioButton> = ({ label, value, onChange }) => {
  return (
    <label className="inline-flex items-center">
      <input
        type="radio"
        className="radio radio-primary"
        checked={value}
        onChange={onChange}
      />
      <span className="ml-2">{label}</span>
    </label>
  );
};
export default RadioButton;
