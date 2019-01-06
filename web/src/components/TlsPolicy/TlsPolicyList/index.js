import React from "react";
import Table, { styles } from "components/util/Table";
import Button from "components/util/Button";
import AddIcon from "components/icons/Add";
import Label from "components/util/Label";

export default function TlsPolicyList({
  tlsPolicies,
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
                <AddIcon secondary /> TLS Policy
              </Button>
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {tlsPolicies.map(tlsPolicy => (
          <tr key={tlsPolicy.id}>
            <td>{tlsPolicy.domain}</td>
            <td className={styles.monospace}>{tlsPolicy.params}</td>
            <td>
              <Label green>{tlsPolicy.policy}</Label>
            </td>
            <td className={styles.action}>
              <span
                onClick={() =>
                  !showCreateTlsPolicy && setShowEditTlsPolicy(true)
                }
              >
                Edit
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
