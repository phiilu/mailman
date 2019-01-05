import React, { useState } from "react";
import AliasList from "components/Alias/AliasList";
import AliasCreate from "components/Alias/AliasCreate";
import AliasEdit from "components/Alias/AliasEdit";
import Content from "components/util/Content";

import classNames from "classnames";
import { row, withForm } from "styles/global.module.scss";

export default function Aliases() {
  const [showCreateAlias, setShowCreateAlias] = useState(true);
  const [showEditAlias, setShowEditAlias] = useState(false);

  return (
    <div>
      <Content>
        <div
          className={classNames({
            [row]: true,
            [withForm]: showCreateAlias || showEditAlias
          })}
        >
          <div className="col">
            <h1>All Aliases</h1>
            <AliasList
              showCreateAlias={showCreateAlias}
              setShowCreateAlias={setShowCreateAlias}
              showEditAlias={showEditAlias}
              setShowEditAlias={setShowEditAlias}
            />
          </div>
          <div className="col">
            {showCreateAlias && (
              <>
                <h1>Create Alias</h1>
                <AliasCreate
                  showCreateAlias={showCreateAlias}
                  setShowCreateAlias={setShowCreateAlias}
                />
              </>
            )}
            {showEditAlias && (
              <>
                <h1>Edit Alias</h1>
                <AliasEdit
                  showEditAlias={showEditAlias}
                  setShowEditAlias={setShowEditAlias}
                />
              </>
            )}
          </div>
        </div>
      </Content>
    </div>
  );
}
