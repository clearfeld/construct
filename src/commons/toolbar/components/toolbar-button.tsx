import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";

const styles = stylex.create({
	button: {
		border: "none",
		borderRadius: 0,
		backgroundColor: "transparent",
		boxShadow: "none",
		padding: 0,

		position: "relative",

		width: "100%",
		height: "2.25rem",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		boxSizing: "border-box",

		cursor: "pointer",

		color: "var(--color-sidebar-text)",
		fill: "var(--color-sidebar-text)",

		":hover": {
			color: "var(--color-white)",
			fill: "var(--color-white)",
			backgroundColor: "var(--sidebar-bg-hover)",
		},
	},

	selected: {
		backgroundColor: "var(--sidebar-selected-bg) !important",
		fill: "var(--color-white)",
		color: "var(--color-white)",
	},

	svg_pos_fix: {
		display: "flex",
		height: "100%",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginLeft: "0.125rem",
	},

	selected_border: {
		border: "0.125rem solid var(--sidebar-selected-border)",
		height: "calc(100% - 0.25rem)",
		left: "0px",
		position: "absolute",
	},
});

interface ToolBarButtonProps {
	Svg: ReactNode;
	onClick: () => void;
	isExpanded: boolean;
}

export function ToolBarButton({
	Svg,
	onClick,
	isExpanded,
}: ToolBarButtonProps) {
	console.log(isExpanded);
	return (
		<button
			{...stylex.props(styles.button, isExpanded && styles.selected)}
			onClick={onClick}
		>
			<div {...stylex.props(isExpanded && styles.selected_border)} />

			<div {...stylex.props(styles.svg_pos_fix)}>{Svg}</div>
		</button>
	);
}
