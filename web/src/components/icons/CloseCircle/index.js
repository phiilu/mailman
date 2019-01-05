import React from "react";
import {
  icon,
  defaultPrimary,
  defaultSecondary,
  primaryPrimary,
  primarySecondary,
  secondaryPrimary,
  secondarySecondary
} from "../colors.module.scss";

export default function CloseCircle({ primary, secondary, ...props }) {
  let primaryClass = `${defaultPrimary} ${primary &&
    primaryPrimary} ${secondary && secondaryPrimary}`.replace("undefined ", "");
  let secondaryClass = `${defaultSecondary} ${primary &&
    primarySecondary} ${secondary && secondarySecondary}`.replace(
    "undefined ",
    ""
  );

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
        d="M13.41 12l2.83 2.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 1 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12z"
      />
    </svg>
  );
}
