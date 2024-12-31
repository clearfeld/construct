import { useState } from "react";
import stylex from "@stylexjs/stylex";

// import DownArrow from "../../../assets/arrow-down.svg?react";
// import SettingsPage from "../../../assets/settings-page.svg?react";
// import { useOutsideClick } from "../../../hooks/use-outside-click";

const styles = stylex.create({
	wrapper: {
		display: "flex",
		//backgroundColor: "pink",
		//borderRadius: "0.5rem",
		paddingLeft: "0.5rem",
		boxSizing: "border-box",
		gap: "0.5rem",
		//maxWidth: "2rem",
	},

	reset: {
		border: "unset",
		padding: "unset",
		backgroundColor: "unset",
		borderRadius: "unset",
		outline: "unset",
		boxShadow: "unset",
	},

	button: {
		boxSizing: "border-box",
		padding: "0.25rem",
		borderRadius: "0.5rem",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		boxShadow: "none",
	},

	pipe: {
		backgroundColor: "#A6A6A6",
		height: "1rem",
		width: "1px",
		position: "absolute",
		boxSizing: "border-box",
		left: 0,
		marginLeft: "-0.25rem",
	},

	menu: {
		position: "absolute",
		padding: "0.5rem",
		backgroundColor: "#252525",
		borderRadius: "0.5rem",
		top: "100%",
		display: "flex",
		flexDirection: "column",
		boxSizing: "border-box",
		boxShadow: "0.5rem 0.5rem 0.25rem 0rem rgba(0,0,0,0.75)",
		zIndex: 99,
	},

	relativeParent: {
		position: "relative",
	},
});
export default function EnvironmentDropdown() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	// const modalRef = useOutsideClick(() => setIsMenuOpen(!isMenuOpen));

	return (
		<div {...stylex.props(styles.wrapper, styles.relativeParent)}>
			<input placeholder="Environment" {...stylex.props(styles.reset)} />

			<button
				{...stylex.props(styles.reset, styles.button)}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			>
				{/* <DownArrow /> */}
			</button>

			{isMenuOpen && (
				<div
					// ref={modalRef}
					{...stylex.props(styles.menu)}
				>
					menu
				</div>
			)}

			<button
				{...stylex.props(styles.reset, styles.button, styles.relativeParent)}
			>
				{/* <SettingsPage /> */}
				<span {...stylex.props(styles.pipe)} />
			</button>
		</div>
	);
}
