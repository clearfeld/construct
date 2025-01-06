import * as stylex from "@stylexjs/stylex";
import useRequestStore from "@src/stores/request_store";

import DownArrow from "../../../assets/arrow-down.svg?react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@controlkit/ui";

import ArrowCheckCircleActiveSVG from "../../../assets/enabled-arrow-circle-active.svg?react";
// import ArrowCheckCircleHoverSVG from "../../../assets/enabled-arrow-circle-hover.svg?react";

const styles = stylex.create({
	wrapper: {
		display: "flex",
		boxSizing: "border-box",
		gap: "0.5rem",
		padding: 0,
		margin: 0,
		width: "12rem",
		height: "100%",
	},

	env_text_main: {
		textOverflow: "ellipsis",
		overflow: "hidden",
		textWrap: "nowrap",
		width: "calc(100% - 1rem)",
	},

	trigger_wrapper: {
		display: "flex",
		alignItems: "center",
		justifyItems: "center",
		justifyContent: "space-between",
		padding: "0 0.5rem",
		cursor: "pointer",
		width: "100%",

		transition: "background-color var(--transition-speed) ease",

		":hover": {
			backgroundColor: "var(--cds-gray-200)",
		},
	},

	menu_content: {
		width: "20rem",
	},

	no_env: {
		color: "var(--text-sub)",
	},

	item: {
		display: "flex",
		gap: "0.5rem",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		paddingRight: "0.25rem",
	},

	borderActive: {
		// borderLeft: "0.125rem solid blue",
		borderLeft: "0.125rem solid transparent",
	},
});

export default function EnvironmentDropdown() {
	const environments = useRequestStore((state) => state.environments);

	const enabledEnvironment = useRequestStore(
		(state) => state.enabledEnvironment,
	);
	const setEnabledEnvironmentDetails = useRequestStore(
		(state) => state.setEnabledEnvironmentDetails,
	);

	const currentlyEnabledEnvironment =
		enabledEnvironment === null
			? null
			: environments.find((env) => env.id === enabledEnvironment?.env_id);

	return (
		<div {...stylex.props(styles.wrapper)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div {...stylex.props(styles.trigger_wrapper)}>
						<div {...stylex.props(styles.env_text_main)}>
							{currentlyEnabledEnvironment === null ? (
								<span>No Environment</span>
							) : (
								<span>{currentlyEnabledEnvironment?.name}</span>
							)}
						</div>

						<DownArrow />
					</div>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" extend={styles.menu_content}>
					<DropdownMenuItem
						onClick={() => {
							setEnabledEnvironmentDetails(null);
						}}
						extend={[styles.no_env, styles.borderActive]}
					>
						<div {...stylex.props(styles.item)}>
							<span>No Environment</span>

							{enabledEnvironment === null && <ArrowCheckCircleActiveSVG />}
						</div>
					</DropdownMenuItem>

					{environments.map((env) => {
						return (
							<DropdownMenuItem
								key={env.id}
								onClick={() => {
									setEnabledEnvironmentDetails({
										env_id: env.id,
										stage_id: null, // env.stages[0].id,
									});
								}}
								extend={styles.borderActive}
							>
								<div {...stylex.props(styles.item)}>
									<span>{env.name}</span>

									{enabledEnvironment?.env_id === env.id && (
										<ArrowCheckCircleActiveSVG />
									)}
								</div>
							</DropdownMenuItem>
						);
					})}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
