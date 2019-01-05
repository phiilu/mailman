import React from "react";
import { stats, stat, statName, statNumber } from "./Stats.module.scss";

export function Stat({ title, children }) {
  return (
    <div className={stat}>
      <span className={statName}>{title}</span>
      <span className={statNumber}>{children}</span>
    </div>
  );
}

export default function Stats({ children }) {
  return <div className={stats}>{children}</div>;
}
