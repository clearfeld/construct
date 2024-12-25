import stylex from "@stylexjs/stylex";
import { type ReactNode, useState } from "react";

// import DragHandle from "../../../../../assets/drag-handle.svg?react";
// import { useHover } from "../../../../../hooks/use-hover";
// import Trashbin from "../../../../../assets/trashbin.svg?react";

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
		position: "relative",
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
	trashbin: {
		cursor: "pointer",
		padding: "0.25rem",
		backgroundColor: {
			":hover": "#292929",
		},
		position: "absolute",
		right: "0",
		marginRight: "0.5rem",
	},
	hidden: {
		opacity: 0,
		pointerEvents: "none",
	},

	shown: {
		opacity: 1,
		pointerEvents: "all",
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
	// const [hoverRef, isHovering] = useHover<HTMLDivElement>();

	return (
		<div
			{...stylex.props(styles.headerRow)}
			// ref={hoverRef}
		>
			<div {...stylex.props(styles.borderRight, styles.cell)}>
				{/* <DragHandle
          {...stylex.props(
            styles.dragHandle,
            isHovering ? styles.shown : styles.hidden
          )}
        /> */}
				<input type="checkbox" />
			</div>

			<div {...stylex.props(styles.borderRight, styles.cell)}>
				<input
					{...stylex.props(styles.input)}
					onChange={(event) => setKey(event.target.value)}
					value={key}
					placeholder="Key"
				/>
			</div>

			<div {...stylex.props(styles.borderRight, styles.cell)}>
				<input
					{...stylex.props(styles.input)}
					onChange={(event) => setValue(event.target.value)}
					value={value}
					placeholder="Value"
				/>
			</div>

			<div {...stylex.props(styles.cell)}>
				<input
					{...stylex.props(styles.input)}
					onChange={(event) => setDescription(event.target.value)}
					value={description}
					placeholder="Description"
				/>
			</div>

			{/* <Trashbin
        {...stylex.props(
          styles.trashbin,
          isHovering ? styles.shown : styles.hidden
        )}
      /> */}
		</div>
	);
}
