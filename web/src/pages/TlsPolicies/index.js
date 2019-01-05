import React, { useState } from "react";
import TlsPolicyList from "components/TlsPolicy/TlsPolicyList";
import TlsPolicyCreate from "components/TlsPolicy/TlsPolicyCreate";
import TlsPolicyEdit from "components/TlsPolicy/TlsPolicyEdit";
import Content from "components/util/Content";

import classNames from "classnames";
import { row, withForm } from "styles/global.module.scss";

export default function TlsPolicys() {
  const [showCreateTlsPolicy, setShowCreateTlsPolicy] = useState(true);
  const [showEditTlsPolicy, setShowEditTlsPolicy] = useState(false);

  return (
    <div>
      <Content>
        <div
          className={classNames({
            [row]: true,
            [withForm]: showCreateTlsPolicy || showEditTlsPolicy
          })}
        >
          <div className="col">
            <h1>All TlsPolicys</h1>
            <TlsPolicyList
              showCreateTlsPolicy={showCreateTlsPolicy}
              setShowCreateTlsPolicy={setShowCreateTlsPolicy}
              showEditTlsPolicy={showEditTlsPolicy}
              setShowEditTlsPolicy={setShowEditTlsPolicy}
            />
          </div>
          <div className="col">
            {showCreateTlsPolicy && (
              <>
                <h1>Create TlsPolicy</h1>
                <TlsPolicyCreate
                  showCreateTlsPolicy={showCreateTlsPolicy}
                  setShowCreateTlsPolicy={setShowCreateTlsPolicy}
                />
              </>
            )}
            {showEditTlsPolicy && (
              <>
                <h1>Edit TlsPolicy</h1>
                <TlsPolicyEdit
                  showEditTlsPolicy={showEditTlsPolicy}
                  setShowEditTlsPolicy={setShowEditTlsPolicy}
                />
              </>
            )}
          </div>
        </div>
      </Content>
    </div>
  );
}
