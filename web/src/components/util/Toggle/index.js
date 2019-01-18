import React from "react";
import Toggle from "react-toggled";

import { tgl, tglIos, tglBtn } from "./Toggle.module.scss";

import classNames from "classnames";

export default function Toggler({ on, onToggle }) {
  return (
    <Toggle on={on} onToggle={onToggle}>
      {({ on, toggle, getTogglerProps }) => {
        return (
          <>
            <input
              type="checkbox"
              checked={on}
              onChange={toggle}
              className={classNames({ [tgl]: true, [tglIos]: true })}
            />{" "}
            <label {...getTogglerProps()} className={tglBtn} />
          </>
        );
      }}
    </Toggle>
  );
}
