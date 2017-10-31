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

const AliasTable = ({ aliases, classes, deleteAlias }) => {
  const headers = ["Source Email", "Destination Email", "Enabled"];

  return (
    <Table headers={headers}>
      {aliases.length === 0 ? (
        <TableRow>
          <TableCell colSpan={headers.length}>No Aliases</TableCell>
        </TableRow>
      ) : (
        aliases.map(a => (
          <TableRow key={a.id}>
            <TableCell>
              {a.source_username}@{a.source_domain}
            </TableCell>
            <TableCell>
              {a.destination_username}@{a.destination_domain}
            </TableCell>
            <TableCell className={classes.tableCell}>
              {a.enabled}
              <span>
                <IconButton
                  aria-label="Edit"
                  to={`/aliases/${a.id}/edit`}
                  component={Link}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  className={classes.deleteIcon}
                  onClick={deleteAlias(a.id)}
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

export default withStyles(styles)(AliasTable);
