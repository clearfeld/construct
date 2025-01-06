import stylex from "@stylexjs/stylex";
import { useState } from "react";
// import DragHandle from "../../../../../assets/drag-handle.svg?react";
// import { useHover } from "../../../../../hooks/use-hover";
// import Trashbin from "../../../../../assets/trashbin.svg?react";
import { Checkbox } from "@controlkit/ui";

import type { ReactNode } from "react";
import type { T_ManagedVariable } from "@src/stores/request_store/environments_slice";
import useRequestStore from "@src/stores/request_store";
import { E_TabStatus } from "@src/stores/request_store/tabbar_slice";
// import DownArrow from "../../../../../assets/arrow-down.svg?react";
// import { useOutsideClick } from "../../../../../hooks/use-outside-click";

// TODO: need to parse request contents using environment variable names

const styles = stylex.create({
	table: {
		width: "100%",
		height: "100%",

		//backgroundColor: "gray",
	},

	headerRow: {
		display: "grid",
		gridTemplateColumns: "3rem 1fr 1fr 1fr",
		alignItems: "center",
		border: "0.0625rem solid #292929",
		borderTop: "unset",
		position: "relative",
	},

	header: {
		fontSize: "0.75rem",
		color: "var(--table-header)",
		padding: 0,
		margin: 0,
	},

	cell: {
		padding: "0.25rem 0.5rem",
		display: "flex",
		alignItems: "center",
		flexGrow: 1,
	},
	borderRightReset: {
		borderRight: "unset",
	},
	borderRight: {
		borderRight: "0.0625rem solid #292929",
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

	// button: {
	// 	backgroundColor: "transparent",
	// 	":hover": {
	// 		backgroundColor: "var(--button-hover-color)",
	// 	},
	// 	alignItems: "start",
	// 	display: "flex",
	// 	boxShadow: "none",
	// 	border: "none",
	// },

	parent: {
		position: "relative",
		width: "100%",
	},

	button: {
		backgroundColor: "transparent",
		cursor: "pointer",
		gap: "0.5rem",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		boxShadow: "none",
		fontSize: "0.75rem",
		padding: "0rem",
		width: "100%",
		border: "transparent",
		//border: {
		//  ":hover": "transparent",
		//},
	},

	menu: {
		position: "absolute",
		//padding: "0.5rem",
		backgroundColor: "#252525",
		//borderRadius: "0.5rem",
		width: "100%",
		marginTop: "0.25rem",
		display: "flex",
		flexDirection: "column",
		boxSizing: "border-box",
		boxShadow: "0.5rem 0.5rem 0.25rem 0rem rgba(0,0,0,0.75)",
		fontSize: "0.75rem",
		zIndex: "1",
	},

	filled: {
		backgroundColor: "#252525",
	},

	pipe: {
		height: "1rem",
		flexGrow: 1,
		borderLeft: "0.0625rem solid #A6A6A6",
	},
});

interface I_TableRowProps {
	envId: string;
	vr: T_ManagedVariable;
}

export default function TableRow(props: I_TableRowProps) {
	// const [variable, setVariable] = useState("");
	// const [type, setType] = useState("default");
	// const [initialValue, setInitialValue] = useState("");
	// const [currentValue, setCurrentValue] = useState("");

	// const [hoverRef, isHovering] = useHover<HTMLDivElement>();

	const getActiveEnvironment = useRequestStore(
		(state) => state.getActiveEnvironment,
	);

	const updateVariableFieldInActiveEnvironment = useRequestStore(
		(state) => state.updateVariableFieldInActiveEnvironment,
	);

	const setTabState = useRequestStore((state) => state.setTabState);

	const setTabData = useRequestStore((state) => state.setTabData);

	return (
		<div
			{...stylex.props(styles.headerRow)}
			// ref={hoverRef}
		>
			<div {...stylex.props(styles.borderRight, styles.cell)}>
				{/* <DragHandle
					{...stylex.props(
						styles.dragHandle,
						isHovering ? styles.shown : styles.hidden,
					)}
				/> */}

				<Checkbox
					checked={props.vr.enabled}
					onCheckedChange={(checked) => {
						updateVariableFieldInActiveEnvironment(
							props.vr.id,
							"enabled",
							checked,
						);

						const ae = getActiveEnvironment();
						if (ae) {
							setTabData(props.envId, ae);
						}

						setTabState(props.envId, E_TabStatus.MODIFIED);
					}}
				/>
			</div>

			<div {...stylex.props(styles.borderRight, styles.cell)}>
				<input
					{...stylex.props(styles.input)}
					onChange={(event) => {
						updateVariableFieldInActiveEnvironment(
							props.vr.id,
							"key",
							event.target.value,
						);

						const ae = getActiveEnvironment();
						if (ae) {
							setTabData(props.envId, ae);
						}

						setTabState(props.envId, E_TabStatus.MODIFIED);
					}}
					value={props.vr.key}
					placeholder="Variable"
				/>
			</div>

			{/* <div {...stylex.props(styles.borderRight, styles.cell)}>
				<TypeValueDropdown title={type}>
					<button
						{...stylex.props(styles.button)}
						onClick={(event) => setType("default")}
					>
						Default
					</button>
					<button
						{...stylex.props(styles.button)}
						onClick={(event) => setType("secret")}
					>
						Secret
					</button>
				</TypeValueDropdown>
			</div> */}

			<div {...stylex.props(styles.borderRight, styles.cell)}>
				<input
					// type={type === "secret" ? "password" : ""}
					{...stylex.props(styles.input)}
					onChange={(event) => {
						updateVariableFieldInActiveEnvironment(
							props.vr.id,
							"initial_value",
							event.target.value,
						);

						const ae = getActiveEnvironment();
						if (ae) {
							setTabData(props.envId, ae);
						}

						setTabState(props.envId, E_TabStatus.MODIFIED);
					}}
					value={props.vr.initial_value}
					placeholder="Initial Value"
				/>
			</div>

			<div {...stylex.props(styles.cell)}>
				<input
					// type={type === "secret" ? "password" : ""}
					{...stylex.props(styles.input)}
					onChange={(event) => {
						updateVariableFieldInActiveEnvironment(
							props.vr.id,
							"current_value",
							event.target.value,
						);

						const ae = getActiveEnvironment();
						if(ae) {
							setTabData(props.envId, ae);
						}

						setTabState(props.envId, E_TabStatus.MODIFIED);
					}}
					value={props.vr.current_value}
					placeholder="Current Value"
				/>
			</div>

			{/* <Trashbin
				{...stylex.props(
					styles.trashbin,
					// isHovering ? styles.shown : styles.hidden,
				)}
			/> */}
		</div>
	);
}

// TODO: Check with aaron what he did with this stuff
interface I_TypeValueDropdownProps {
	children?: ReactNode;
	title: string;
	variant?: "filled";
}

export function TypeValueDropdown({
	children,
	title,
	variant,
}: I_TypeValueDropdownProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	// const modalRef = useOutsideClick(() => setIsMenuOpen(!isMenuOpen));

	return (
		<div {...stylex.props(styles.parent)}>
			<button
				{...stylex.props(styles.button, variant === "filled" && styles.filled)}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			>
				<span>{title}</span>
				{variant === "filled" && <span {...stylex.props(styles.pipe)}></span>}
				{/* <DownArrow /> */}
			</button>

			{isMenuOpen && (
				<div
					// ref={modalRef}
					{...stylex.props(styles.menu)}
				>
					{children}
				</div>
			)}
		</div>
	);
}
