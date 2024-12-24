import stylex from "@stylexjs/stylex";
import React, { type MouseEventHandler } from "react";
// import { useHover } from "../../../hooks/use-hover";
// import CloseX from "../../../assets/close-x.svg?react";

interface I_TabProps {
	status?: Status;
	active?: boolean;
	title?: string;
	requestType?: RequestType;
	onClick?: MouseEventHandler;
}

export type Status = "SAVED" | "UNSAVED" | "MODIFIED";

export type RequestType = "GET" | "POST" | "PUT";

const styles = stylex.create({
	tab: {
		display: "flex",
		alignItems: "center",
		gap: "0.5rem",
		padding: "0rem 0.5rem",
		boxSizing: "border-box",
		minWidth: "fit-content",
		height: "100%",
		cursor: "pointer",
		//borderLeft: "1px solid #A6A6A6",
		borderRight: "1px solid #292929",
		borderTop: "1px solid transparent",
	},

	requestType: {
		color: "#3E7CC5",
		fontSize: "14px",
	},
	active: {
		backgroundColor: "#0E0F10",
		borderTop: "1px solid #13539F",
	},

	statusCircle: {
		width: "0.75rem",
		height: "0.75rem",
		backgroundColor: "pink",
		borderRadius: "50%",
	},

	title: {
		fontSize: "14px",
		overflow: "hidden",
		textOverflow: "ellipsis",
		textWrap: "nowrap",
		maxWidth: "7rem",
		color: "#787878",
	},

	titleActive: {
		color: "white",
	},
	closeButton: {
		height: "16px",
		width: "16px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer",
	},
});

const requestTypeStyles = stylex.create({
	get: {},
	post: {},
});
export default function Tab({
	active,
	status,
	title,
	requestType,
	onClick,
}: I_TabProps) {
	// const [hoverRef, isHovering] = useHover<HTMLDivElement>();

	return (
		<div
			onClick={onClick}
			// ref={hoverRef}
			{...stylex.props(styles.tab, active && styles.active)}
		>
			<p {...stylex.props(styles.requestType)}>{requestType}</p>
			<p {...stylex.props(styles.title, active && styles.titleActive)}>
				{title}
			</p>
			<span {...stylex.props(styles.statusCircle)}></span>
			<div {...stylex.props(styles.closeButton)}>
				{/* {isHovering && <CloseX />} */}
			</div>
		</div>
	);
}
