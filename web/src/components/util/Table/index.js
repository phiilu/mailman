import React from "react";
import * as tableStyles from "./Table.module.scss";

export const styles = { ...tableStyles };

export default function Table({ children }) {
  return <table className={styles.table}>{children}</table>;
}
