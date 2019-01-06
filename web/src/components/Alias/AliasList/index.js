import React from "react";
import Table, { styles } from "components/util/Table";
import Button from "components/util/Button";
import AddIcon from "components/icons/Add";
import CheckIcon from "components/icons/Check";
import CloseCircleIcon from "components/icons/CloseCircle";
import ArrowThinRightIcon from "components/icons/ArrowThinRight";

export default function AliasList({
  aliases,
  showCreateAlias,
  setShowCreateAlias,
  showEditAlias,
  setShowEditAlias
}) {
  return (
    <Table>
      <thead>
        <tr>
          <th />
          <th>Source Email</th>
          <th />
          <th>Destination Email</th>
          <th>
            {!showCreateAlias && (
              <Button
                secondary
                disabled={showEditAlias}
                onClick={() => setShowCreateAlias(true)}
              >
                <AddIcon secondary /> Alias
              </Button>
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {aliases.map(alias => (
          <tr key={alias.id}>
            <td>
              {!!alias.enabled ? <CheckIcon green /> : <CloseCircleIcon red />}{" "}
            </td>
            <td>{alias.sourceEmail}</td>
            <td>
              <ArrowThinRightIcon primary />
            </td>
            <td>{alias.destinationEmail}</td>
            <td className={styles.action}>
              <span onClick={() => !showCreateAlias && setShowEditAlias(true)}>
                Edit
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
