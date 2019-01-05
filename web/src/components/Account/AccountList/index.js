import React from "react";
import Table, { styles } from "components/util/Table";
import Button from "components/util/Button";
import AddIcon from "components/icons/Add";
import CheckIcon from "components/icons/Check";
import CloseCircleIcon from "components/icons/CloseCircle";
import SendIcon from "components/icons/Send";

export default function AccountList({
  showCreateAccount,
  setShowCreateAccount,
  showEditAccount,
  setShowEditAccount
}) {
  return (
    <Table>
      <thead>
        <tr>
          <th />
          <th>Email</th>
          <th />
          <th className={styles.numberCell}>Quota</th>
          <th>
            {!showCreateAccount && (
              <Button
                secondary
                disabled={showEditAccount}
                onClick={() => setShowCreateAccount(true)}
              >
                <AddIcon secondary /> Account
              </Button>
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <CheckIcon green />
            {/* <CloseCircleIcon red /> */}
          </td>
          <td>florian@example.org</td>
          <td />
          <td className={styles.numberCell}>2 GB</td>
          <td className={styles.action}>
            <span>Aliases</span>
            <span
              onClick={() => !showCreateAccount && setShowEditAccount(true)}
            >
              Edit
            </span>
          </td>
        </tr>
        <tr>
          <td>
            {/* <CheckIcon green /> */}
            <CloseCircleIcon red />
          </td>
          <td>test@example.org</td>
          <td>
            <SendIcon />
          </td>
          <td className={styles.numberCell}>200 MB</td>
          <td className={styles.action}>
            <span>Aliases</span>
            <span
              onClick={() => !showCreateAccount && setShowEditAccount(true)}
            >
              Edit
            </span>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
