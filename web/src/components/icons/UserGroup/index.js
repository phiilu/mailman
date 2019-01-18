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

export default function UserGroup({
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
    >
      <path
        className={primaryClass}
        d="M12 13a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1 1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3zM7 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm10 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
      />
      <path
        className={secondaryClass}
        d="M12 13a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-3 1h6a3 3 0 0 1 3 3v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3a3 3 0 0 1 3-3z"
      />
    </svg>
  );
}
