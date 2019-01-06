import React from "react";
import { Link } from "@reach/router";
import isEqual from "lodash/isEqual";

import Table, { styles } from "components/util/Table";
import Button from "components/util/Button";
import AddIcon from "components/icons/Add";

function DomanList({
  domains,
  showCreateDomain,
  setShowCreateDomain,
  showEditDomain,
  setShowEditDomain,
  deleteDomain,
  setEditDomainId
}) {
  const handleEditClick = id => {
    if (!showCreateDomain) {
      setShowEditDomain(true);
      setEditDomainId(id);
    }
  };

  const handleDeleteDomain = async id => {
    try {
      await deleteDomain({ variables: { id } });
    } catch (error) {
      console.log(error);
      // Todo
    }
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>URL</th>
          <th className={styles.numberCell}>Accounts</th>
          <th>
            {!showCreateDomain && (
              <Button
                secondary
                disabled={showEditDomain}
                onClick={() => setShowCreateDomain(true)}
              >
                <AddIcon secondary /> Domain
              </Button>
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {domains.map(domain => (
          <tr key={domain.id}>
            <td>{domain.domain}</td>
            <td className={styles.numberCell}>{domain.accounts.count}</td>
            <td className={styles.action}>
              <span>
                <Link to={`/accounts/${domain.domain}`}>Show Accounts</Link>
              </span>
              <span>
                <Link to={`/accounts/${domain.domain}`}>Add Account</Link>
              </span>
              <span onClick={() => handleEditClick(domain.id)}>Edit</span>
              <span onClick={() => handleDeleteDomain(domain.id)}>Delete</span>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default React.memo(DomanList, isEqual);
