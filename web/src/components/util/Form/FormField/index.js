import React from "react";
import { formField } from "./FormField.module.scss";

export default function FormField({ children }) {
  return <div className={formField}>{children}</div>;
}
