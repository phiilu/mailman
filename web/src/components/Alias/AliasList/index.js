import React from "react";
import Table, { styles } from "components/util/Table";
import Button from "components/util/Button";
import AddIcon from "components/icons/Add";
import CheckIcon from "components/icons/Check";
import CloseCircleIcon from "components/icons/CloseCircle";
import ArrowThinRightIcon from "components/icons/ArrowThinRight";

export default function AliasList({
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
        <tr>
          <td>
            <CheckIcon green />
            {/* <CloseCircleIcon red /> */}
          </td>
          <td>test@example.org</td>
          <td>
            <ArrowThinRightIcon primary />
          </td>
          <td>florian@example.org</td>
          <td className={styles.action}>
            <span onClick={() => !showCreateAlias && setShowEditAlias(true)}>
              Edit
            </span>
          </td>
        </tr>
        <tr>
          <td>
            {/* <CheckIcon green /> */}
            <CloseCircleIcon red />
          </td>
          <td>google@example.org</td>
          <td>
            <ArrowThinRightIcon primary />
          </td>
          <td>test@gmail.com</td>
          <td className={styles.action}>
            <span onClick={() => !showCreateAlias && setShowEditAlias(true)}>
              Edit
            </span>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
