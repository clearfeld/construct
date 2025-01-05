import { memo, useState } from "react";
// import { useRecoilValue } from "recoil";
import * as stylex from "@stylexjs/stylex";
import type {
	T_ActiveEnvironment,
	T_Environment,
} from "@src/stores/request_store/environments_slice";
import useRequestStore from "@src/stores/request_store";
import { useNavigate } from "react-router";
import {
	E_TabStatus,
	E_TabType,
	type T_Tab,
} from "@src/stores/request_store/tabbar_slice";
// import GitForkSVG from "@assets/git-fork.svg?react";
// import { CheckIcon } from "./checkbox-icon.tsx";
// import { EnvironmentById } from "../../../../store/environment/environments.ts";
// import { EnvironmentButtonProps } from "./type.ts";
// import { EnvironmentDropdownButton } from "./environment-dropdown-button.tsx";

// import ArrowCheckCircleHoverSVG from "../../../assets/enabled-arrow-circle-hover.svg?react";
// import ArrowCheckCircleActiveSVG from "../../../assets/enabled-arrow-circle-active.svg?react";

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
		cursor: "pointer",

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

	inactiveBorder: {
		border: "0.125rem solid transparent",
	},

	activeBorder: {
		border: "0.125rem solid var(--sidebar-selected-border)",
		// height: "calc(100% - 0.25rem)",
		backgroundColor: "#1F252D",
		height: "1.5rem",
		// left: "rem",
		// position: "absolute",
		// zIndex: 1,
	},

	buttonContainer: {
		position: "relative",
		marginBottom: "0.0625rem",
		display: "flex",
		alignItems: "center",
	},

	leftRow: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		boxSizing: "border-box",
		columnGap: "0.25rem",
		flex: 1,
		minWidth: 0,
	},

	rightRow: {
		display: "none",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		backgroundColor: "transparent",
	},

	showRightRow: {
		display: "flex",
	},

	buttonText: {
		minWidth: 0,
		color: "inherit",
		textOverflow: "ellipsis",
		overflow: "hidden",
		whiteSpace: "nowrap",
	},

	forkContainer: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		columnGap: "0.25rem",
		maxWidth: "50%",
	},

	forkText: {
		color: "var(--color-placeholder)",
		fontSize: "0.625rem",
	},

	forkSvg: {
		width: "0.625rem",
		height: "0.625rem",
		color: "var(--color-placeholder)",
	},

	sideButton: {
		backgroundColor: "transparent",
		border: "none",
		height: "1.5rem",
		width: "1.5rem",
		borderRadius: "0.25rem",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		boxShadow: "none",
		color: "var(--color-sidebar-text)",

		":hover": {
			backgroundColor: "var(--sidebar-selected-bg)",
		},
	},

	ellipsisSvg: {
		width: "1rem",
		height: "1rem",
	},
});

interface WorkspaceEnvironmentButtonProps {
	// extends EnvironmentButtonProps
	envId: string;
	env: T_Environment;
	toggleInUse: (id: string) => void;
}

export const WorkspaceEnvironmentButton = memo(
	function WorkspaceEnvironmentButton(props: WorkspaceEnvironmentButtonProps) {
		const navigate = useNavigate();

		const activeEnvirontmnet = useRequestStore(
			(state) => state.activeEnvironment,
		);

		const getTabs = useRequestStore((state) => state.getTabs);
		const setTabs = useRequestStore((state) => state.setTabs);
		const setActiveTab = useRequestStore((state) => state.setActiveTab);

		const getActiveEnvironmentDetails = useRequestStore(
			(state) => state.getActiveEnvironmentDetails,
		);
		const setActiveEnvironmentDetails = useRequestStore(
			(state) => state.setActiveEnvironmentDetails,
		);

		const setActiveEnvironment = useRequestStore(
			(state) => state.setActiveEnvironment,
		);
		const getActiveEnvironmentInEnvironments = useRequestStore(
			(state) => state.getActiveEnvironmentInEnvironments,
		);

		const [isHovering, setIsHovering] = useState(false);
		const [isDropdownOpen, setIsDropdownOpen] = useState(false);

		const getEnvironmentById = useRequestStore(
			(state) => state.getEnvironmentById,
		);

		return (
			<div {...stylex.props(styles.buttonContainer)}>
				<div
					{...stylex.props(
						styles.inactiveBorder,
						activeEnvirontmnet?.id === props.env.id && styles.activeBorder,
					)}
				/>
				<div
					onMouseEnter={() => setIsHovering(true)}
					onMouseLeave={() => setIsHovering(false)}
					{...stylex.props(
						styles.button,
						activeEnvirontmnet?.id === props.env.id && styles.activeButton,
					)}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();

						const id = props.env.id;
						navigate(`/environment/${id}`);

						const tabs = [...getTabs()];

						const tab = tabs.find((t) => t.id === id);
						// const status = tab?.status ?? E_TabStatus.NONE;

						const aed = getActiveEnvironmentDetails();

						// let activeEnvironment = null;

						if (aed === null) {
							const aed_c: T_ActiveEnvironment = {
								env_id: props.env.id,
								stage_id: null,
							};
							setActiveEnvironmentDetails(aed_c);

							const target_env = getEnvironmentById(props.env.id);

							if (target_env) {
								setActiveEnvironment(target_env);
							}
						} else {
							aed.env_id = props.env.id;
							setActiveEnvironmentDetails(aed);

							if (tab) {
								if (Object.keys(tab.data).length === 0) {
									const target_env = getEnvironmentById(props.env.id);
									if (target_env) {
										setActiveEnvironment(target_env);
									}
								} else {
									setActiveEnvironment(tab.data);
								}
							} else {

								const target_env = getEnvironmentById(props.env.id);

								if (target_env) {
									setActiveEnvironment(target_env);
								}
							}
						}

						// setActiveEnvironment(getActiveEnvironmentInEnvironments());
						// const activeEnvironment = getActiveEnvironmentInEnvironments();

						// const activeEnvironment = getActiveEnvironmentInEnvironments();

						// if (activeEnvironment) {
						// // 	tab.data = structuredClone(activeEnvironment);
						// 	 setActiveEnvironment(activeEnvironment);
						// // 	// setActiveEnvironment(activeEnvironment);
						// // } else {

						// setActiveTab(activeEnvironment.id);
						// }

						if (tab) {
							setTabs(tabs);
							setActiveTab(id);
						} else {
							const t: T_Tab = {
								id: id,
								status: E_TabStatus.NONE,
								title: props.env.name,
								type: E_TabType.ENVIRONMENT,
								requestType: "",
								data: {},
							};
							tabs.push(t);
							setTabs(tabs);
							setActiveTab(id);
						}

						// props.onClick(environment);
					}}
				>
					<div {...stylex.props(styles.leftRow)}>
						<p {...stylex.props(styles.buttonText)}>{props.env.name}</p>

						{/* {environment.forkedFrom && ( */}
						<div {...stylex.props(styles.forkContainer)}>
							<p {...stylex.props(styles.buttonText, styles.forkText)}>
								{/* {environment.forkedFrom.forkedName} */}
							</p>

							{/* <GitForkSVG {...stylex.props(styles.forkSvg)} /> */}
						</div>
						{/* )} */}
					</div>

					<div
						{...stylex.props(
							styles.rightRow,
							styles.showRightRow,
							// (isHovering || isDropdownOpen) && styles.showRightRow,
						)}
					>
						<button
							{...stylex.props(styles.sideButton)}
							onClick={(e) => {
								e.stopPropagation();
								// props.toggleInUse(environment.id);
							}}
						>
							{/* <CheckIcon envId={environment.id} /> */}

							{/* <ArrowCheckCircleHoverSVG />
							<ArrowCheckCircleActiveSVG /> */}
						</button>

						{/* <EnvironmentDropdownButton setOpen={setIsDropdownOpen}>
							<p style={{ width: "10rem" }}>dropdown</p>
						</EnvironmentDropdownButton> */}
					</div>
				</div>
			</div>
		);
	},
);
