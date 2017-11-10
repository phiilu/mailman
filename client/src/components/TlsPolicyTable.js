import React from "react";
import { withStyles } from "material-ui/styles";
import { TableCell, TableRow } from "material-ui/Table";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import EditIcon from "material-ui-icons/Edit";
import { Link } from "react-router-dom";

import Table from "../components/shared/Table";

const styles = {
  deleteIcon: {
    color: "#FF6347"
  }
};

const TlsPolicyTable = ({ tlspolicies, classes, deleteTlsPolicy }) => {
  const headers = ["Domain", "Params", "Policy", ""];

  return (
    <Table headers={headers}>
      {tlspolicies.length === 0 ? (
        <TableRow>
          <TableCell colSpan={headers.length}>No TLS Policies</TableCell>
        </TableRow>
      ) : (
        tlspolicies.map(t => (
          <TableRow key={t.id}>
            <TableCell>{t.domain}</TableCell>
            <TableCell>{t.params}</TableCell>
            <TableCell>{t.policy}</TableCell>
            <TableCell>
              <span>
                <IconButton
                  aria-label="Edit"
                  to={`/tlspolicies/${t.id}/edit`}
                  component={Link}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  className={classes.deleteIcon}
                  onClick={deleteTlsPolicy(t.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </span>
            </TableCell>
          </TableRow>
        ))
      )}
    </Table>
  );
};

export default withStyles(styles)(TlsPolicyTable);
