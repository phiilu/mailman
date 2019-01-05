import React from "react";
import Content from "components/util/Content";
import Stats, { Stat } from "components/util/Stats";
import { well } from "./Header.module.scss";

export default function Header() {
  return (
    <header className={well}>
      <Content>
        <Stats>
          <Stat title={"Domains"}>2</Stat>
          <Stat title={"Users"}>27</Stat>
          <Stat title={"Aliases"}>17</Stat>
          <Stat title={"TLS Policies"}>0</Stat>
        </Stats>
      </Content>
    </header>
  );
}
