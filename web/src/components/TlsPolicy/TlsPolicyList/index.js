import React from "react";
import Table, { styles } from "components/util/Table";
import Button from "components/util/Button";
import AddIcon from "components/icons/Add";
import Label from "components/util/Label";

export default function TlsPolicyList({
  showCreateTlsPolicy,
  setShowCreateTlsPolicy,
  showEditTlsPolicy,
  setShowEditTlsPolicy
}) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Domain</th>
          <th>Params</th>
          <th>Policy</th>
          <th>
            {!showCreateTlsPolicy && (
              <Button
                secondary
                disabled={showEditTlsPolicy}
                onClick={() => setShowCreateTlsPolicy(true)}
              >
                <AddIcon secondary /> TlsPolicy
              </Button>
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>example.org</td>
          <td className={styles.monospace}>match=.example.org</td>
          <td>
            <Label green>dane</Label>
          </td>
          <td className={styles.action}>
            <span
              onClick={() => !showCreateTlsPolicy && setShowEditTlsPolicy(true)}
            >
              Edit
            </span>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
