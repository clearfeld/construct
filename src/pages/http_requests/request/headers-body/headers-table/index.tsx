import stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import TableHeaderRow from "./headers-table-header";
// import DragHandle from "../../../../assets/drag-handle.svg?react";
// import TableRow from "./headers-table-row";

const styles = stylex.create({
	table: {
		// width: "100%",
		// height: "100%",
		// backgroundColor: "gray",
	},
});

interface I_HeadersTableProps {
	children?: ReactNode;
}

//todo figure out how to handle having a collection of rows
export default function HeadersTable({ children }: I_HeadersTableProps) {
	return (
		<div {...stylex.props(styles.table)}>
			<TableHeaderRow />
			{children}
		</div>
	);
}
