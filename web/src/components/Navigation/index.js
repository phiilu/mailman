import React from "react";
import { Link } from "@reach/router";
import { navigation, innerNav, brand } from "./Navigation.module.scss";

import Content from "components/util/Content";

export default function Navigation() {
  return (
    <nav className={navigation}>
      <Content>
        <div className={innerNav}>
          <Link to="/" className={brand}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
          </Link>
          <ul>
            <li>
              <Link to="/domains">Domains</Link>
            </li>
            <li>
              <Link to="/accounts">Accounts</Link>
            </li>
            <li>
              <Link to="/aliases">Aliases</Link>
            </li>
            <li>
              <Link to="/tlspolicies">TLS Policies</Link>
            </li>
          </ul>
        </div>
      </Content>
    </nav>
  );
}
