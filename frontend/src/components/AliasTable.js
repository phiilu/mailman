import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import classnames from "classnames";

import Table from "../components/shared/Table";

const styles = {
  deleteIcon: {
    color: "#FF6347"
  },
  disabledCell: {
    background: "#eee",
    textDecoration: "line-through"
  }
};

const AliasTable = ({ aliases, classes, deleteAlias }) => {
  const headers = ["Source Email", "Destination Email", ""];

  return (
    <Table headers={headers}>
      {aliases.length === 0 ? (
        <TableRow>
          <TableCell colSpan={headers.length}>No Aliases</TableCell>
        </TableRow>
      ) : (
        aliases.map(a => (
          <TableRow
            key={a.id}
            className={classnames({
              [classes.disabledCell]: a.enabled === "0"
            })}
          >
            <TableCell>
              {a.source_username}@{a.source_domain}
            </TableCell>
            <TableCell className={classes.tableCell}>
              {a.destination_username}@{a.destination_domain}
            </TableCell>
            <TableCell>
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
