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
  redSecondary,
  rotate90
} from "../colors.module.scss";

import classNames from "classnames";

export default function Send({ primary, secondary, green, red, ...props }) {
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
      className={classNames({ [icon]: true, [rotate90]: true })}
      {...props}
    >
      <path
        className={primaryClass}
        d="M12 20.1L3.4 21.9a1 1 0 0 1-1.3-1.36l9-18a1 1 0 0 1 1.8 0l9 18a1 1 0 0 1-1.3 1.36L12 20.1z"
      />
      <path
        className={secondaryClass}
        d="M12 2c.36 0 .71.18.9.55l9 18a1 1 0 0 1-1.3 1.36L12 20.1V2z"
      />
    </svg>
  );
}
