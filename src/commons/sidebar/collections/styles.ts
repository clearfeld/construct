
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
	row: {
		padding: "0.0625rem 0",

		cursor: "pointer",

		borderLeft: "0.125rem solid transparent",

		// transition: "background-color var(--transition-speed) ease",

		":hover": {
			backgroundColor: "#0E0F10",
		},
	},

	rowActive: {
		backgroundColor: "#1F252D",
		borderLeft: "0.125rem solid #2558BC",
	},

	title_input: {
		color: "#A6A6A6",
		fontSize: "0.875rem",
		textWrap: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		fontWeight: "bold",
		backgroundColor: "transparent",
		border: "none",
		outline: "none",
		cursor: "pointer",
	},

	title_input_active: {
		color: "var(--text-color)",
		fontSize: "0.875rem",
		textWrap: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		fontWeight: "bold",
		backgroundColor: "var(--background-sub)",
		border: "0.0625rem solid var(--cds-blue-300)",
		outline: "none",
        width: "100%",
	},
});
