import stylex from "@stylexjs/stylex";
import React from "react";
// import DragHandle from "../../../../assets/drag-handle.svg?react";
import TableHeaderRow from "./path-variables-table-header";
import TableRow from "./path-variables-table-row";

const styles = stylex.create({
  table: {
    width: "100%",
    height: "100%",
    //backgroundColor: "gray",
  },
});

//todo figure out how to handle having a collection of rows
export default function PathVariablesTable() {
  return (
    <div {...stylex.props(styles.table)}>
      <TableHeaderRow />
      <TableRow />
    </div>
  );
}
