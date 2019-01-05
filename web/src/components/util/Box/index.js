import React from "react";
import { box, boxTitle, boxContent } from "./Box.module.scss";
import CloseCircleIcon from "components/icons/CloseCircle";

export default function Box({ title, className = "", children, onClose }) {
  return (
    <div className={[className, box].join(" ")}>
      {onClose && <CloseCircleIcon onClick={onClose} />}
      {title && (
        <div className={boxTitle}>
          <h1>{title}</h1>
        </div>
      )}
      <div className={boxContent}>{children}</div>
    </div>
  );
}
