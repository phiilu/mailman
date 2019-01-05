import React from "react";
import InputRange from "react-input-range";
import "./slider.scss";
import { inputRangeWrapper } from "./InputRange.module.scss";

export default function InputSlider({
  maxValue,
  minValue,
  formatLabel,
  value,
  step = 1,
  onChange
}) {
  return (
    <div className={inputRangeWrapper}>
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <InputRange
        draggableTrack
        maxValue={maxValue}
        minValue={minValue}
        formatLabel={formatLabel}
        value={value}
        step={step}
        onChange={onChange}
      />
    </div>
  );
}
