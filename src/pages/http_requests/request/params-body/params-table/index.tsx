import stylex from "@stylexjs/stylex";
import React, { type ReactNode } from "react";
// import DragHandle from "../../../../assets/drag-handle.svg?react";
import TableHeaderRow from "./params-table-header";
import TableRow from "./params-table-row";

const styles = stylex.create({
  table: {
    width: "100%",
    height: "100%",
    //backgroundColor: "gray",
  },
});

interface I_ParamsTableProps {
  children: ReactNode;
}

export default function ParamsTable({ children }: I_ParamsTableProps) {
  return (
    <div {...stylex.props(styles.table)}>
      <TableHeaderRow />
      {children}
    </div>
  );
}
