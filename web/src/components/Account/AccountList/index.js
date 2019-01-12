import React from "react";
import { Link } from "@reach/router";
import Table, { styles } from "components/util/Table";
import Button from "components/util/Button";
import AddIcon from "components/icons/Add";
import CheckIcon from "components/icons/Check";
import CloseCircleIcon from "components/icons/CloseCircle";
import SendIcon from "components/icons/Send";

import formatDataUnit from "lib/formatDataUnit";

export default function AccountList({
  accounts,
  showCreateAccountHideEditAccount,
  showEditAccountHideCeateAccount
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
            <Button secondary onClick={showCreateAccountHideEditAccount}>
              <AddIcon secondary /> Account
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>
        {accounts.map(account => (
          <tr key={account.id}>
            <td>
              {!!account.enabled ? (
                <CheckIcon green />
              ) : (
                <CloseCircleIcon red />
              )}
            </td>
            <td>{account.email}</td>
            <td>{!!account.sendonly && <SendIcon primary />}</td>
            <td className={styles.numberCell}>
              {formatDataUnit(account.quota)}
            </td>
            <td className={styles.action}>
              <span>
                <Link to={`/aliases/${account.email}`}>Aliases</Link>
              </span>
              <span onClick={showEditAccountHideCeateAccount}>Edit</span>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
