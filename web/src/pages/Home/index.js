import React, { useState } from "react";
import classNames from "classnames";

import DomainList from "components/Domain/DomainList";
import DomainEdit from "components/Domain/DomainEdit";
import DomainCreate from "components/Domain/DomainCreate";

import Content from "components/util/Content";

import { home } from "./Home.module.scss";
import { row, withForm } from "styles/global.module.scss";

export default function Home() {
  const [showCreateDomain, setShowCreateDomain] = useState(true);
  const [showEditDomain, setShowEditDomain] = useState(false);

  return (
    <div className={home}>
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
                <h1>Create Domain</h1>
                <DomainCreate setShowCreateDomain={setShowCreateDomain} />
              </>
            )}
            {showEditDomain && (
              <>
                <h1>Edit Domain</h1>
                <DomainEdit setShowEditDomain={setShowEditDomain} />
              </>
            )}
          </div>
        </div>
      </Content>
    </div>
  );
}
