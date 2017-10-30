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

const DomainTable = ({ domains, classes, deleteDomain }) => {
  const headers = ["Domain"];

  return (
    <Table headers={headers}>
      {domains.map(d => (
        <TableRow key={d.id}>
          <TableCell className={classes.tableCell}>
            {d.domain}
            <span>
              <IconButton
                aria-label="Edit"
                to={`/domains/${d.id}/edit`}
                component={Link}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="Delete"
                className={classes.deleteIcon}
                onClick={deleteDomain(d.id)}
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

export default withStyles(styles)(DomainTable);
