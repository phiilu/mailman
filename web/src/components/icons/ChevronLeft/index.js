import React from "react";
import {
  icon,
  defaultPrimary,
  primaryPrimary,
  primarySecondary,
  defaultSecondary,
  secondaryPrimary,
  secondarySecondary,
  greenPrimary,
  greenSecondary,
  redPrimary,
  redSecondary
} from "../colors.module.scss";

import classNames from "classnames";

export default function ChevronRight({
  primary,
  secondary,
  green,
  red,
  ...props
}) {
  let primaryClass = classNames({
    [defaultPrimary]: !primary && !secondary && !green && !red,
    [primaryPrimary]: primary,
    [secondaryPrimary]: secondary,
    [greenPrimary]: green,
    [redPrimary]: red
  });
  let secondaryClass = classNames({
    [defaultSecondary]: !primary && !secondary && !green && !red,
    [primarySecondary]: primary,
    [secondarySecondary]: secondary,
    [greenSecondary]: green,
    [redSecondary]: red
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={icon}
      {...props}
    >
      <circle cx="12" cy="12" r="10" className={primaryClass} />
      <path
        className={secondaryClass}
        d="M13.7 15.3a1 1 0 0 1-1.4 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.4 1.4L10.42 12l3.3 3.3z"
      />
    </svg>
  );
}
