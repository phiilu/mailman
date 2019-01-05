import React from "react";
import {
  icon,
  defaultSecondary,
  primarySecondary,
  secondarySecondary
} from "../colors.module.scss";

export default function Add({ primary, secondary, ...props }) {
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
      <path
        className={secondaryClass}
        fillRule="evenodd"
        d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"
      />
    </svg>
  );
}
