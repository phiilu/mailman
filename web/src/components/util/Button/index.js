import React from "react";
import {
  button,
  primary as primaryColor,
  secondary as secondaryColor,
  disabled as disabledColor
} from "./Button.module.scss";

import classNames from "classnames";

export default function Button({
  primary,
  secondary,
  disabled,
  children,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={classNames({
        [button]: true,
        [primaryColor]: primary,
        [secondaryColor]: secondary,
        [disabledColor]: disabled
      })}
      {...props}
    >
      {children}
    </button>
  );
}
