import stylex from "@stylexjs/stylex";
import {
	// type ReactNode,
	useState,
} from "react";
// import { useHover } from "../../../../../hooks/use-hover";

const styles = stylex.create({
	table: {
		width: "100%",
		height: "100%",

		//backgroundColor: "gray",
	},

	headerRow: {
		display: "grid",
		gridTemplateColumns: "auto 1fr 1fr",
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
	const [key, setKey] = useState("");
	const [value, setValue] = useState("");
	// const [description, setDescription] = useState("");
	// const [hoverRef, isHovering] = useHover<HTMLDivElement>();

	return (
		<div
			{...stylex.props(styles.headerRow, autoHeaderRow && styles.autoHeader)}
			// ref={hoverRef}
		>
			<div {...stylex.props(styles.borderRight, styles.cell)}>
				{/* <input type="checkbox" /> */}
			</div>

			<div {...stylex.props(styles.borderRight, styles.cell)}>
				<input
					{...stylex.props(styles.input)}
					onChange={(event) => setKey(event.target.value)}
					value={header.key ? header.key : key}
					placeholder="Key"
				/>
			</div>

			<div {...stylex.props(styles.cell)}>
				<input
					{...stylex.props(styles.input)}
					onChange={(event) => setValue(event.target.value)}
					value={header.value ? header.value : value}
					placeholder="Value"
				/>
			</div>

			{/* <div {...stylex.props(styles.cell)}>
                <input
                    {...stylex.props(styles.input)}
                    onChange={(event) => setDescription(event.target.value)}
                    value={header.description ? header.description : description}
                    placeholder="Description"
                />
            </div> */}
		</div>
	);
}
