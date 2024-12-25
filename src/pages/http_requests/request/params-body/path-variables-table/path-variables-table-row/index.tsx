import stylex from "@stylexjs/stylex";
import React, { type ReactNode, useState } from "react";
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
		borderTop: "unset",
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

	input: {
		margin: "unset",
		padding: "0.25rem",
		backgroundColor: "transparent",
		boxShadow: "unset",
		border: "unset",
		outline: "unset",
		fontSize: "0.75rem",
		width: "100%",
	},

	backgroundCompliment: {
		backgroundColor: "#161616",
	},
	hidden: {
		visibility: "hidden",
	},
});

interface I_CellProps {
	children: ReactNode;
	last?: boolean;
}

export default function TableRow() {
	const [key, setKey] = useState("");
	const [value, setValue] = useState("");
	const [description, setDescription] = useState("");

	return (
		<div {...stylex.props(styles.headerRow)}>
			<div {...stylex.props(styles.borderRight, styles.cell)}>
				{/* <DragHandle {...stylex.props(styles.dragHandle, styles.hidden)} /> */}
				<input type="checkbox" {...stylex.props(styles.hidden)} />
			</div>

			<div
				{...stylex.props(
					styles.borderRight,
					styles.cell,
					styles.backgroundCompliment,
				)}
			>
				<input
					{...stylex.props(styles.input)}
					onChange={(event) => setKey(event.target.value)}
					value={key}
				/>
			</div>

			<div {...stylex.props(styles.borderRight, styles.cell)}>
				<input
					{...stylex.props(styles.input)}
					onChange={(event) => setValue(event.target.value)}
					value={value}
				/>
			</div>

			<div {...stylex.props(styles.cell)}>
				<input
					{...stylex.props(styles.input)}
					onChange={(event) => setDescription(event.target.value)}
					value={description}
				/>
			</div>
		</div>
	);
}
