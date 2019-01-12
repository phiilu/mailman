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

export default function Delete({ primary, secondary, green, red, ...props }) {
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
      <path
        className={primaryClass}
        d="M5.23 3h13.54a2 2 0 0 1 1.98 2.22l-1.55 14A2 2 0 0 1 17.2 21H6.79a2 2 0 0 1-1.99-1.78l-1.55-14A2 2 0 0 1 5.23 3z"
      />
      <path
        className={secondaryClass}
        d="M10.59 14l-2.3-2.3a1 1 0 0 1 1.42-1.4L12 12.58l2.3-2.3a1 1 0 0 1 1.4 1.42L13.42 14l2.3 2.3a1 1 0 0 1-1.42 1.4L12 15.42l-2.3 2.3a1 1 0 1 1-1.4-1.42L10.58 14zM4 3h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5c0-1.1.9-2 2-2z"
      />
    </svg>
  );
}
