import React from "react";
import Table, { styles } from "components/util/Table";
import Button from "components/util/Button";
import AddIcon from "components/icons/Add";

export default function DomanList({
  showCreateDomain,
  setShowCreateDomain,
  showEditDomain,
  setShowEditDomain
}) {
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
        <tr>
          <td>example.org</td>
          <td className={styles.numberCell}>2</td>
          <td className={styles.action}>
            <span>Add Account</span>
            <span onClick={() => !showCreateDomain && setShowEditDomain(true)}>
              Edit
            </span>
          </td>
        </tr>
        <tr>
          <td>kapfenberger.me</td>
          <td className={styles.numberCell}>4</td>
          <td className={styles.action}>
            <span>Add Account</span>
            <span onClick={() => !showCreateDomain && setShowEditDomain(true)}>
              Edit
            </span>
          </td>
        </tr>
        <tr>
          <td>steinnacher.at</td>
          <td className={styles.numberCell}>4</td>
          <td className={styles.action}>
            <span>Add Account</span>
            <span onClick={() => !showCreateDomain && setShowEditDomain(true)}>
              Edit
            </span>
          </td>
        </tr>
        <tr>
          <td>stadtkino-hainfeld.at</td>
          <td className={styles.numberCell}>1</td>
          <td className={styles.action}>
            <span>Add Account</span>
            <span onClick={() => !showCreateDomain && setShowEditDomain(true)}>
              Edit
            </span>
          </td>
        </tr>
        <tr>
          <td>mpfilms.at</td>
          <td className={styles.numberCell}>0</td>
          <td className={styles.action}>
            <span>Add Account</span>
            <span onClick={() => !showCreateDomain && setShowEditDomain(true)}>
              Edit
            </span>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
