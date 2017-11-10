import React from "react";
import { withStyles } from "material-ui/styles";
import { TableCell, TableRow } from "material-ui/Table";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import EditIcon from "material-ui-icons/Edit";
import SendIcon from "material-ui-icons/Send";
import { Link } from "react-router-dom";
import bytes from "bytes";
import Tooltip from "material-ui/Tooltip";
import classnames from "classnames";

import Table from "../components/shared/Table";

const styles = theme => ({
  deleteIcon: {
    color: "#FF6347"
  },
  emailCell: {
    display: "flex",
    alignItems: "center",
    "& > span": {
      marginRight: "10px"
    }
  },
  sendIcon: {
    color: theme.palette.primary[500]
  },
  disabledCell: {
    background: "#eee",
    textDecoration: "line-through"
  }
});

const humanReadableDataUnits = unit => {
  if (unit === 0) {
    return "∞";
  } else {
    return bytes(unit, {
      unitSeparator: " ",
      thousandsSeparator: "."
    });
  }
};

const AccountTable = ({ accounts, classes, deleteAccount }) => {
  const headers = ["Email", "Quota", ""];
  return (
    <Table headers={headers}>
      {accounts.length === 0 ? (
        <TableRow>
          <TableCell colSpan={headers.length}>No Accounts</TableCell>
        </TableRow>
      ) : (
        accounts.map(a => (
          <TableRow
            key={a.id}
            className={classnames({
              [classes.disabledCell]: a.enabled === "0"
            })}
          >
            <TableCell>
              <div className={classes.emailCell}>
                <span>
                  {a.username}@{a.domain}
                </span>
                {a.sendonly === "1" && (
                  <Tooltip title="sendonly" placement="right">
                    <SendIcon className={classes.sendIcon} />
                  </Tooltip>
                )}
              </div>
            </TableCell>
            <TableCell>{humanReadableDataUnits(a.quota)}</TableCell>
            <TableCell>
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
        ))
      )}
    </Table>
  );
};

export default withStyles(styles)(AccountTable);
