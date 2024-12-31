import { Checkbox } from "@controlkit/ui";
import useRequestStore from "@src/stores/request_store";
import stylex from "@stylexjs/stylex";
// import { type ReactNode, useState } from "react";

// import DragHandle from "../../../../../assets/drag-handle.svg?react";
// import Trashbin from "../../../../../assets/trashbin.svg?react";
// import { useHover } from "../../../../../hooks/use-hover";

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

	autoHeader: {
		backgroundColor: "#161616",
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
		color: "var(--color-text)",
	},

	hidden: {
		opacity: 0,
		pointerEvents: "none",
	},

	shown: {
		opacity: 1,
		pointerEvents: "all",
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
});

interface I_TableRowProps {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	header: any;
	autoHeaderRow?: boolean;
}

export default function TableRow({ header, autoHeaderRow }: I_TableRowProps) {
	// const [hoverRef, isHovering] = useHover<HTMLDivElement>();

	const { setAutoHeader } = useRequestStore();
	const { setHeader } = useRequestStore();

	return (
		<div
			{...stylex.props(styles.headerRow, autoHeaderRow && styles.autoHeader)}
			// ref={hoverRef}
		>
			<div {...stylex.props(styles.borderRight, styles.cell)}>
				{/* <DragHandle
          {...stylex.props(
            styles.dragHandle,
            isHovering ? styles.shown : styles.hidden
          )}
        /> */}
				{/* <input type="checkbox" /> */}

				<Checkbox
					checked={header.enabled}
					disabled={header.auto && true}
					// onCheckedChange={(checked: boolean) => setHeaders(checked)}
					onCheckedChange={(checked: boolean) => {
						if (autoHeaderRow) {
							const ns = { ...header };
							ns.enabled = checked;
							setAutoHeader(ns);
						} else {
							const ns = { ...header };
							ns.enabled = checked;
							setHeader(ns);
						}
					}}
				/>
			</div>

			<div {...stylex.props(styles.borderRight, styles.cell)}>
				<input
					{...stylex.props(styles.input)}
					onChange={(event) => {
						if (autoHeaderRow) return;

						const ns = { ...header };
						ns.key = event.target.value;
						setHeader(ns);
					}}
					value={header.key}
					placeholder="Key"
				/>
			</div>

			<div {...stylex.props(styles.borderRight, styles.cell)}>
				<input
					{...stylex.props(styles.input)}
					onChange={(event) => {
						if (autoHeaderRow) return;

						const ns = { ...header };
						ns.value = event.target.value;
						setHeader(ns);
					}}
					value={header.value}
					placeholder="Value"
				/>
			</div>

			<div {...stylex.props(styles.cell)}>
				<input
					{...stylex.props(styles.input)}
					onChange={(event) => {
						if (autoHeaderRow) return;

						const ns = { ...header };
						ns.description = event.target.value;
						setHeader(ns);
					}}
					value={header.description}
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
