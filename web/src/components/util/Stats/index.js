import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { stats, stat, statName, statNumber } from "./Stats.module.scss";

export function Stat({ title, children }) {
  const [endCount, setEndCount] = useState(0);

  useEffect(
    () => {
      setEndCount(children);
    },
    [children]
  );

  return (
    <div className={stat}>
      <span className={statName}>{title}</span>
      <span className={statNumber}>
        <CountUp delay={1} duration={2} start={endCount} end={children} />
      </span>
    </div>
  );
}

export default function Stats({ children }) {
  return <div className={stats}>{children}</div>;
}
