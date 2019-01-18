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

export default function UserAdd({ primary, secondary, green, red, ...props }) {
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
    >
      <path className={primaryClass} d="M9 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
      <path
        className={secondaryClass}
        d="M17 9V7a1 1 0 0 1 2 0v2h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2h-2a1 1 0 0 1 0-2h2zm-1 10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"
      />
    </svg>
  );
}
