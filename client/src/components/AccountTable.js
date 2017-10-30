import React from "react";
import { withStyles } from "material-ui/styles";
import { TableCell, TableRow } from "material-ui/Table";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import EditIcon from "material-ui-icons/Edit";
import { Link } from "react-router-dom";

import Table from "../components/shared/Table";

const styles = {
  tableCell: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  deleteIcon: {
    color: "#FF6347"
  }
};

const AccountTable = ({ accounts, classes, deleteAccount }) => {
  const headers = ["Email", "Quota", "Enabled", "Sendonly"];
  return (
    <Table headers={headers}>
      {accounts.map(a => (
        <TableRow key={a.id}>
          <TableCell>
            {a.username}@{a.domain}
          </TableCell>
          <TableCell>{a.quota}</TableCell>
          <TableCell>{a.enabled}</TableCell>
          <TableCell className={classes.tableCell}>
            {a.sendonly}
            <span>
              <IconButton
                aria-label="Edit"
                to={`/accounts/${a.id}/edit`}
                component={Link}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="Delete"
                className={classes.deleteIcon}
                onClick={deleteAccount(a.id)}
              >
                <DeleteIcon />
              </IconButton>
            </span>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
};

export default withStyles(styles)(AccountTable);
