import React from "react";
import {
  icon,
  primaryPrimary,
  primarySecondary,
  secondaryPrimary,
  secondarySecondary
} from "../colors.module.scss";

export default function AddCircle({ primary, secondary, ...props }) {
  let primaryClass = `${primary && primaryPrimary} ${secondary &&
    secondaryPrimary}`.replace("undefined ", "");
  let secondaryClass = `${primary && primarySecondary} ${secondary &&
    secondarySecondary}`.replace("undefined ", "");

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`${icon} icon-add-circle`}
      {...props}
    >
      <circle cx="12" cy="12" r="10" className={primaryClass} />
      <path
        className={secondaryClass}
        d="M13 11h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4z"
      />
    </svg>
  );
}
