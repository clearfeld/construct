import { memo } from "react";
// import { useRecoilValue } from "recoil";
import * as stylex from "@stylexjs/stylex";
// import { EnvironmentButtonProps } from "./type.ts";
// import { GlobalEnvironmentState } from "../../../../store/environment/global-environment.ts";

const styles = stylex.create({
	button: {
		position: "relative",
		border: "none",
		outline: "none",
		backgroundColor: "transparent",
		boxShadow: "none",
		color: "var(--color-sidebar-text)",
		height: "1.75rem",
		width: "100%",
		padding: "0 1.25rem",
		textAlign: "left",
		fontSize: "0.875rem",
		borderRadius: 0,
		display: "flex",
		alignItems: "center",
		columnGap: "0.25rem",
		":hover": {
			backgroundColor: "var(--button-hover-color)",
		},
	},
	activeButton: {
		backgroundColor: "var(--sidebar-selected-bg)",
		color: "var(--color-white)",
		":hover": {
			backgroundColor: "var(--sidebar-selected-bg)",
		},
	},
	activeBorder: {
		border: "0.0625rem solid var(--sidebar-selected-border)",
		height: "calc(100% - 0.25rem)",
		left: "rem",
		position: "absolute",
		zIndex: 1,
	},
	globalButtonContainer: {
		marginVertical: "0.25rem",
		position: "relative",
		display: "flex",
		alignItems: "center",
	},
});

// interface GlobalEnvironmentButtonProps extends EnvironmentButtonProps {}

export const GlobalEnvironmentButton = memo(function GlobalEnvironmentButton(
	// props: GlobalEnvironmentButtonProps,
) {
	// const globalEnv = useRecoilValue(GlobalEnvironmentState);
	// const selectedGlobalEnv = () => {
	// 	props.onClick({
	// 		...globalEnv,
	// 		name: "global",
	// 		id: "",
	// 		inUse: true,
	// 		forkedChildren: [],
	// 	});
	// };

	return (
		<div {...stylex.props(styles.globalButtonContainer)}>
			<div
			// {...stylex.props(props.active && styles.activeBorder)}
			/>
			<button
				{...stylex.props(
					styles.button,
					//	props.active && styles.activeButton
				)}
				// onClick={selectedGlobalEnv}
			>
				Global Environment
			</button>
		</div>
	);
});
