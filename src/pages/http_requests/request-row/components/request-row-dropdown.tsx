import * as stylex from "@stylexjs/stylex";
import type React from "react";
import { useRef, useState } from "react";
// import ArrowDownRounded from "../../../assets/arrow-down-rounded.svg?react";
// import {useOutsideClick} from "../../../hooks/use-outside-click.tsx";

const styles = stylex.create({
	container: {
		position: "relative",
		borderRadius: "0.25rem",
		paddingLeft: "0.25rem",
	},
	primary: {
		backgroundColor: "var(--color-blue-primary)",
		color: "var(--color-white)",
		fill: "var(--color-white)",
		borderColor: "var(--color-white)",
	},
	secondary: {
		backgroundColor: "var(--background-sub)",
		color: "var(--color-sidebar-text)",
		fill: "var(--color-sidebar-text)",
		borderColor: "var(--color-sidebar-text)",
	},
	selectedButton: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		padding: "0.25rem 0",
		backgroundColor: "inherit",
		borderRadius: "0.25rem",
		height: "1.75rem",
		width: "100%",
		boxShadow: "none",
		borderWidth: 0,
		borderColor: "inherit",
	},
	buttonContent: {
		boxSizing: "border-box",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
		textAlign: "left",
		color: "inherit",
		paddingHorizontal: "0.25rem",
	},
	selectedText: {
		padding: "0.25rem",
		flex: 1,
		textAlign: "left",
	},
	divider: {
		borderLeft: "0.0625rem solid",
		borderColor: "inherit",
		height: "100%",
	},
	arrowContainer: {
		height: "100%",
		width: "1.5rem",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		color: "inherit",
	},
	menu: {
		position: "absolute",
		padding: "0.5rem",
		backgroundColor: "#252525",
		borderRadius: "0.5rem",
		marginTop: "0.25rem",
		display: "flex",
		boxSizing: "border-box",
		boxShadow: "0.5rem 0.5rem 0.25rem 0rem rgba(0,0,0,0.75)",
		zIndex: "var(--dropdown-z-index)",
		right: 0,
	},
});

interface RequestRowDropdownProps {
	children?: React.ReactNode;
	renderButtonContent: () => React.ReactNode;
	variant: "primary" | "secondary";
	onClick: () => void;
}

// @ts-ignore
export function RequestRowDropdown(props: RequestRowDropdownProps) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const buttonRef = useRef(null);
	// const modelRef = useOutsideClick(() => setIsDropdownOpen(false), buttonRef);

	return (
		<div {...stylex.props(styles.container)}>
			<button
				ref={buttonRef}
				{...stylex.props(
					styles.selectedButton,
					props.variant === "primary" && styles.primary,
					props.variant === "secondary" && styles.secondary,
				)}
				onClick={() => {
					setIsDropdownOpen((prev) => !prev);
				}}
			>
				<div {...stylex.props(styles.buttonContent)}>
					{props.renderButtonContent()}
				</div>
				<div {...stylex.props(styles.divider)} />
				<div {...stylex.props(styles.arrowContainer)}>
					{/* <ArrowDownRounded width={16} height={6}/> */}
				</div>
			</button>

			{isDropdownOpen && (
				<div
					// ref={modelRef}
					{...stylex.props(styles.menu)}
				>
					{props.children}
				</div>
			)}
		</div>
	);
}
