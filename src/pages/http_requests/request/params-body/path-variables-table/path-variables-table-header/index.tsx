import stylex from "@stylexjs/stylex";
// import DragHandle from "../../../../../assets/drag-handle.svg?react";

const styles = stylex.create({
  table: {
    width: "100%",
    height: "100%",
    //backgroundColor: "gray",
  },

  headerRow: {
    display: "grid",
    gridTemplateColumns: "auto 1fr 1fr 1fr",
    alignItems: "center",
    border: "1px solid #292929",
  },

  header: {
    fontSize: "0.75rem",
    color: "#ABABAB",
    padding: 0,
    margin: 0,
  },

  flexGrow: {
    flexGrow: 1,
  },

  cell: {
    padding: "0.25rem 0.5rem",
    display: "flex",
    alignItems: "center",
  },
  borderRightReset: {
    borderRight: "unset",
  },
  borderRight: {
    borderRight: "1px solid #292929",
  },

  dragHandle: {
    cursor: "pointer",
    padding: "0.25rem 0.5rem",
    backgroundColor: {
      ":hover": "#292929",
    },
  },

  backgroundCompliment: {
    backgroundColor: "#161616",
  },
  hidden: {
    visibility: "hidden",
  },
});

export default function TableHeaderRow() {
  return (
    <div {...stylex.props(styles.headerRow)}>
      <div {...stylex.props(styles.cell, styles.borderRight)}>
        {/* <DragHandle {...stylex.props(styles.dragHandle, styles.hidden)} /> */}
        <input type="checkbox" {...stylex.props(styles.hidden)} />
      </div>

      <div
        {...stylex.props(
          styles.cell,
          styles.flexGrow,
          styles.borderRight,
          styles.backgroundCompliment
        )}>
        <h1 {...stylex.props(styles.header)}>Key</h1>
      </div>

      <div {...stylex.props(styles.cell, styles.flexGrow, styles.borderRight)}>
        <h1 {...stylex.props(styles.header)}>Value</h1>
      </div>

      <div {...stylex.props(styles.cell, styles.flexGrow)}>
        <h1 {...stylex.props(styles.header)}>Description</h1>
      </div>
    </div>
  );
}
