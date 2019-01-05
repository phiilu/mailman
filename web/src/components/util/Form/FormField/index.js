import React from "react";
import { formField, inlineField } from "./FormField.module.scss";

import classNames from "classnames";

export default function FormField({ inline, children }) {
  let classes = classNames({ [formField]: true, [inlineField]: inline });
  return <div className={classes}>{children}</div>;
}
