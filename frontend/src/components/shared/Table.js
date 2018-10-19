import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit * 3,
      overflowX: "auto"
    }
  });

class DataTable extends Component {
  render() {
    const { headers, classes, children } = this.props;
    return (
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map(h => <TableCell key={h}>{h}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </Paper>
    );
  }
}

DataTable.propTypes = {
  headers: PropTypes.array.isRequired
};

export default withStyles(styles)(DataTable);
