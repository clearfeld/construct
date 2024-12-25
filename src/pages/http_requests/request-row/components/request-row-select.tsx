import * as stylex from "@stylexjs/stylex";
import { useRef, useState } from "react";

import useRequestStore from "@src/stores/request_store";
import type { RequestSlice } from "@src/stores/request_store/request_slice";

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
		padding: "0.25rem 0",
		backgroundColor: "inherit",
		borderRadius: "0.25rem",
		height: "1.75rem",
		width: "100%",
		boxShadow: "none",
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
		position: "absolute",
		display: "flex",
		flexDirection: "column",
		top: "100%",
		left: 0,
		width: "inherit",
		backgroundColor: "inherit",
		borderRadius: "0.25rem",
		zIndex: 100,
	},
	dropdownButton: {
		backgroundColor: "inherit",
		padding: 0,
		textAlign: "left",
		paddingHorizontal: "0.25rem",
	},
});

export interface RequestRowSelectOption {
	value: string;
	label: string;
	textColor: string;
}

interface RequestRowSelectProps {
	options: RequestRowSelectOption[];
	selectedOption: RequestRowSelectOption;
	setSelectedValue: (value: RequestRowSelectOption) => void;
}

// @ts-ignore
export function RequestRowSelect(props: RequestRowSelectProps) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const buttonRef = useRef(null);
	// const modelRef = useOutsideClick(() => setIsDropdownOpen(false), buttonRef);

	const method = useRequestStore((state: RequestSlice) => state.method);
	const { setMethod } = useRequestStore();

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
					style={{ color: props.selectedOption.textColor }}
				>
					{method}
					{/* {props.selectedOption.label} */}
				</p>
				<div {...stylex.props(styles.divider)} />
				<div {...stylex.props(styles.arrowContainer)}>
					{/* <ArrowDownRounded width={16} height={6}/> */}
				</div>
			</button>

			{isDropdownOpen && (
				<div
					// ref={modelRef}
					{...stylex.props(styles.dropdownModal)}
				>
					{props.options.map((option, index) => (
						<button
							key={index}
							onClick={() => {
								// props.setSelectedValue(option);
								setIsDropdownOpen(false);

								setMethod(option.value);
							}}
							{...stylex.props(styles.dropdownButton)}
							style={{ color: option.textColor }}
						>
							{option.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
