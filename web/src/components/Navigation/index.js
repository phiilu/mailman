import React, { Fragment } from "react";
import { Link } from "@reach/router";
import {
  navigation,
  innerNav,
  brand,
  active,
  profile
} from "./Navigation.module.scss";

import UserCircleIcon from "components/icons/UserCircle";
import DoorExitIcon from "components/icons/DoorExit";
import Content from "components/util/Content";

import { useUser } from "lib/hooks";

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent, isPartiallyCurrent, href, location }) => {
      // the object returned here is passed to the
      // anchor element's props

      if (href === "/domains" && location.pathname === "/") {
        return { className: active };
      }

      return isCurrent || isPartiallyCurrent ? { className: active } : {};
    }}
  />
);

export default function Navigation() {
  const { user, logout } = useUser();

  return (
    <nav className={navigation}>
      <Content>
        <div className={innerNav}>
          <NavLink to="/" className={brand}>
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
          </NavLink>
          {user && (
            <Fragment>
              <ul>
                <li>
                  <NavLink to="/domains">Domains</NavLink>
                </li>
                <li>
                  <NavLink to="/accounts">Accounts</NavLink>
                </li>
                <li>
                  <NavLink to="/aliases">Aliases</NavLink>
                </li>
                <li>
                  <NavLink to="/tlspolicies">TLS Policies</NavLink>
                </li>
              </ul>
              <div className={profile}>
                <div>
                  <UserCircleIcon />
                  <span>{user.username}</span>
                </div>
                <DoorExitIcon primary onClick={() => logout()} />
              </div>
            </Fragment>
          )}
        </div>
      </Content>
    </nav>
  );
}
