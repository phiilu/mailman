import React from "react";
import { Link } from "@reach/router";
import isEqual from "lodash/isEqual";

import Table, { styles } from "components/util/Table";
import Button from "components/util/Button";
import AddIcon from "components/icons/Add";
import UserGroupIcon from "components/icons/UserGroup";
import UserAddIcon from "components/icons/UserAdd";
import EditIcon from "components/icons/Edit";
import DeleteIcon from "components/icons/Delete";
import Pagination from "components/Pagination";

function DomanList({
  domains,
  showCreateDomain,
  deleteDomain,
  showEditDomainHideCeateDomain,
  showCreateDomainHideEditDomain,
  pagination,
  setPage
}) {
  const handleEditClick = id => {
    showEditDomainHideCeateDomain(id);
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
    <div>
      <Table>
        <thead>
          <tr>
            <th>URL</th>
            <th className={styles.numberCell}>Accounts</th>
            <th>
              <Button secondary onClick={showCreateDomainHideEditDomain}>
                <AddIcon secondary /> Domain
              </Button>
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
                  <Link to={`/accounts/${domain.domain}`}>
                    <UserGroupIcon green />
                  </Link>
                </span>
                <span>
                  <Link to={`/accounts/${domain.domain}`}>
                    <UserAddIcon green />
                  </Link>
                </span>
                <span onClick={() => handleEditClick(domain.id)}>
                  <EditIcon primary />
                </span>
                <span onClick={() => handleDeleteDomain(domain.id)}>
                  <DeleteIcon red />{" "}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        lastPage={pagination.lastPage}
        currentPage={pagination.currentPage}
        setPage={setPage}
      />
    </div>
  );
}

export default React.memo(DomanList, isEqual);
