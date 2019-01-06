import React, { Fragment, useState, useRef, useEffect } from "react";
import "./Loading.scss";

export default function Loading() {
  const [spinner, setSpinner] = useState(<Fragment />);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    setTimeout(() => {
      mounted.current &&
        setSpinner(
          <div className="spinner-wrapper">
            <div className="spinner">
              <div className="double-bounce1" />
              <div className="double-bounce2" />
            </div>
            <h1>Loading ...</h1>
          </div>
        );
    }, 100);

    return () => (mounted.current = false);
  }, []);

  return spinner;
}
