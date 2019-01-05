import React from "react";
import {
  label,
  primaryClass,
  secondaryClass,
  greenClass,
  redClass
} from "./Label.module.scss";

import classNames from "classnames";

export default function Label({ children, primary, secondary, green, red }) {
  let classes = classNames({
    [label]: true,
    [primaryClass]: primary,
    [secondaryClass]: secondary,
    [greenClass]: green,
    [redClass]: red
  });
  return <span className={classes}>{children}</span>;
}
