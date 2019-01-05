import React, { Fragment } from "react";
import { content } from "./Content.module.scss";

export default function Content({ children, ...props }) {
  return (
    <div className={content}>
      <Fragment>{children}</Fragment>
    </div>
  );
}
