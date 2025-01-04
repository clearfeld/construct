import * as stylex from "@stylexjs/stylex";
import { useRef, useState } from "react";

import useRequestStore from "@src/stores/request_store";
import {
	methods,
	type RequestSlice,
} from "@src/stores/request_store/request_slice";
import { E_TabStatus } from "@src/stores/request_store/tabbar_slice";

// import ArrowDownRounded from "../../../assets/arrow-down-rounded.svg?react";
// import {useOutsideClick} from "../../../hooks/use-outside-click.tsx";

const styles = stylex.create({
	container: {
		position: "relative",
		width: "8rem",
		backgroundColor: "var(--background-sub)",
		borderRadius: "0.25rem",
	},

	selectedButton: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "inherit",
		borderRadius: "0.25rem",
		height: "1.75rem",
		width: "100%",
		boxShadow: "none",
		border: "0.0625rem solid var(--cds-gray-200)",

		padding: "0.25rem 0.25rem",

		cursor: "pointer",

		":hover": {
			backgroundColor: "var(--cds-gray-200)",
		},
	},

	selectedText: {
		padding: "0.25rem",
		flex: 1,
		textAlign: "left",
	},

	divider: {
		backgroundColor: "var(--color-gray)",
		width: "0.0625rem",
		height: "100%",
	},

	arrowContainer: {
		height: "100%",
		width: "1.5rem",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		color: "var(--color-gray)",
	},

	dropdownModal: {
		marginTop: "0.25rem",
		position: "absolute",
		display: "flex",
		flexDirection: "column",
		top: "100%",
		left: 0,
		width: "inherit",
		backgroundColor: "inherit",
		borderRadius: "0.25rem",
		zIndex: 100,
		border: "0.0625rem solid var(--cds-gray-200)",
	},

	dropdownButton: {
		border: "none",
		backgroundColor: "inherit",
		// padding: 0,
		padding: "0.5rem 0.25rem",
		textAlign: "left",

		cursor: "pointer",

		":hover": {
			backgroundColor: "var(--cds-gray-200)",
		},
	},
});

// @ts-ignore
export function RequestRowSelect() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const buttonRef = useRef(null);
	// const modelRef = useOutsideClick(() => setIsDropdownOpen(false), buttonRef);

	const method = useRequestStore((state: RequestSlice) => state.method);
	const { setMethod } = useRequestStore();

	// TODO: create a generic function to set dirty state for tab instead of copying and pasting this everywhere for prototype
	const setTabState = useRequestStore((state) => state.setTabState);
	const getId = useRequestStore((state) => state.getId);
	const setTabDataField = useRequestStore((state) => state.setTabDataField);

	return (
		<div {...stylex.props(styles.container)}>
			<button
				ref={buttonRef}
				{...stylex.props(styles.selectedButton)}
				onClick={() => {
					setIsDropdownOpen((prev) => !prev);
				}}
			>
				<p
					{...stylex.props(styles.selectedText)}
					style={{ color: method.textColor }}
				>
					{method.value}
					{/* {props.selectedOption.label} */}
				</p>
				{/* <div {...stylex.props(styles.divider)} />
				<div {...stylex.props(styles.arrowContainer)}> */}
				{/* <ArrowDownRounded width={16} height={6}/> */}
				{/* </div> */}
			</button>

			{isDropdownOpen && (
				<div
					// ref={modelRef}
					{...stylex.props(styles.dropdownModal)}
				>
					{methods.map((option, index) => (
						<button
							key={index}
							onClick={() => {
								// props.setSelectedValue(option);
								setIsDropdownOpen(false);
								setMethod(option);

								setTabDataField(getId(), "method", option);
								// TODO: check if same method is being set
								setTabState(getId(), E_TabStatus.MODIFIED);
							}}
							{...stylex.props(styles.dropdownButton)}
							style={{ color: option.textColor }}
						>
							{option.value}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
