import React, { useState } from "react";
import classNames from "classnames";

import DomainList from "components/Domain/DomainList";
import DomainEdit from "components/Domain/DomainEdit";
import DomainCreate from "components/Domain/DomainCreate";

import Content from "components/util/Content";
import Stats, { Stat } from "components/util/Stats";

import { home, well, row, withForm } from "./Home.module.scss";

export default function Home() {
  const [showCreateDomain, setShowCreateDomain] = useState(false);
  const [showEditDomain, setShowEditDomain] = useState(false);

  return (
    <div className={home}>
      <div className={well}>
        <Content>
          <Stats>
            <Stat title={"Domains"}>2</Stat>
            <Stat title={"Users"}>27</Stat>
            <Stat title={"Aliases"}>17</Stat>
          </Stats>
        </Content>
      </div>
      <Content>
        <div
          className={classNames({
            [row]: true,
            [withForm]: showCreateDomain || showEditDomain
          })}
        >
          <div className="col">
            <h1>All Domains</h1>
            <DomainList
              showCreateDomain={showCreateDomain}
              setShowCreateDomain={setShowCreateDomain}
              showEditDomain={showEditDomain}
              setShowEditDomain={setShowEditDomain}
            />
          </div>
          <div className="col">
            {showCreateDomain && (
              <>
                <h1>Create Domain</h1>{" "}
                <DomainCreate setShowCreateDomain={setShowCreateDomain} />{" "}
              </>
            )}
            {showEditDomain && (
              <>
                <h1>Edit Domain</h1>{" "}
                <DomainEdit setShowEditDomain={setShowEditDomain} />
              </>
            )}
          </div>
        </div>
      </Content>
    </div>
  );
}
