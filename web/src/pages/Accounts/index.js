import React, { useState } from "react";
import AccountList from "components/Account/AccountList";
import AccountCreate from "components/Account/AccountCreate";
import AccountEdit from "components/Account/AccountEdit";
import Content from "components/util/Content";

import classNames from "classnames";
import { row, withForm } from "styles/global.module.scss";

export default function Accounts() {
  const [showCreateAccount, setShowCreateAccount] = useState(true);
  const [showEditAccount, setShowEditAccount] = useState(false);

  return (
    <div>
      <Content>
        <div
          className={classNames({
            [row]: true,
            [withForm]: showCreateAccount || showEditAccount
          })}
        >
          <div className="col">
            <h1>All Accounts</h1>
            <AccountList
              showCreateAccount={showCreateAccount}
              setShowCreateAccount={setShowCreateAccount}
              showEditAccount={showEditAccount}
              setShowEditAccount={setShowEditAccount}
            />
          </div>
          <div className="col">
            {showCreateAccount && (
              <>
                <h1>Create Account</h1>
                <AccountCreate
                  showCreateAccount={showCreateAccount}
                  setShowCreateAccount={setShowCreateAccount}
                />
              </>
            )}
            {showEditAccount && (
              <>
                <h1>Edit Account</h1>
                <AccountEdit
                  showEditAccount={showEditAccount}
                  setShowEditAccount={setShowEditAccount}
                />
              </>
            )}
          </div>
        </div>
      </Content>
    </div>
  );
}
