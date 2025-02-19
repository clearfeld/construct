import stylex from "@stylexjs/stylex";
// import MoreOptions from "../../../assets/horizontal-ellipsis.svg?react";
import TableRow from "./params-table-row.tsx";
import { Button, Input } from "@controlkit/ui";
// import GitForkSVG from "@assets/git-fork.svg?react";
// import ShareForwardSVG from "@assets/share-forward-line.svg?react";
// import SaveSVG from "@assets/save.svg?react";
// import RequestTabBar from "../../request-tabbar";
import useRequestStore from "@src/stores/request_store/index.ts";
import type { T_ManagedVariable } from "@src/stores/request_store/environments_slice.ts";
import { E_TabStatus } from "@src/stores/request_store/tabbar_slice.ts";
import { useEffect, useRef, useState } from "react";
// import DragHandle from "../../../../../assets/drag-handle.svg?react";

const styles = stylex.create({
	mainWrapper: {
		width: "100%",
		height: "100%",
		backgroundColor: "var(--bg-color)",
		padding: "1rem",
		boxSizing: "border-box",
	},

	wrapper: {
		display: "flex",
		flexDirection: "column",
		// sgap: "4rem",
		height: "100%",
	},

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
		color: "#ABABAB",
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

		//hidden for now
		opacity: 0,
	},

	name_input: {
		backgroundColor: "var(--color-sidebar-bg)",
		border: "1px solid var(--color-sidebar-bg)",
		borderRadius: "0.25rem",
		marginTop: "0.5rem",
		height: "2rem",
		fontSize: "1.875rem",
		width: "fit-content",
		color: "var(--color-text)",
		fontWeight: "bold",
		padding: "0",

		":focus": {
			outline: "none",
			border: "1px solid #3E7CC5",
		},
	},
});

const optionsStyles = stylex.create({
	wrapper: {
		display: "flex",
		alignItems: "center",
		gap: "0.5rem",
		// margin: "1rem",
	},

	options: {
		marginLeft: "auto",
		display: "flex",
		alignItems: "center",
		gap: "1rem",
	},

	button: {
		padding: "0.5rem",
		color: "#787878",
		display: "flex",
		alignItems: "center",
		gap: "0.5rem",
		fontSize: "1rem",
		boxShadow: "unset",
		border: "unset",
		minHeight: "2rem",
		":hover": {
			backgroundColor: "var(--sidebar-selected-bg)",
		},
	},

	forkContainer: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		columnGap: "0.25rem",
		//maxWidth: '50%',
	},

	forkText: {
		color: "var(--color-placeholder)",
		fontSize: "1rem",
	},

	forkSvg: {
		width: "1rem",
		height: "1rem",
		color: "var(--color-placeholder)",
	},
});

interface I_TableOptionsProps {
	title: string;
}
const TableOptions = ({ title }: I_TableOptionsProps) => {
	const [envName, setEnvName] = useState<string>(title);

	// const activeEnvironment = useRequestStore((state) => state.activeEnvironment);
	const getActiveEnvironment = useRequestStore(
		(state) => state.getActiveEnvironment,
	);
	const setTabData = useRequestStore((state) => state.setTabData);

	const setTabState = useRequestStore((state) => state.setTabState);

	// Enabled this if tab should update with input change
	// TODO: decide if sidebar and tabbar should update with none saved changes
	// and if sidebar should also show none saved changes status as well :thinking
	// const setTabTitle = useRequestStore((state) => state.setTabTitle);

	return (
		<div {...stylex.props(optionsStyles.wrapper)}>
			<Input
				extend={styles.name_input}
				value={envName}
				onChange={(e) => {
					setEnvName(e.target.value);

					const ae = getActiveEnvironment();
					if (ae) {
						ae.name = e.target.value;
						// setTabTitle(ae.id, e.target.value);
						setTabData(ae.id, ae);
						setTabState(ae.id, E_TabStatus.MODIFIED);
					}
				}}
				onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
					if (e.key === "Enter") {
						// const ns = structuredClone(getCollection());
						// updateTargetIfExists(ns, getId(), "name", name);
						// setCollection(ns);
						// (e.target as HTMLInputElement).blur();
					}
				}}
			/>

			{/* <div {...stylex.props(optionsStyles.options)}>
				<div {...stylex.props(optionsStyles.forkContainer)}>
					<Button {...stylex.props(optionsStyles.button)}>
						<GitForkSVG {...stylex.props(optionsStyles.forkSvg)} />
						Fork
					</Button>

                    <p {...stylex.props(optionsStyles.forkText)}>|</p>

					<button {...stylex.props(optionsStyles.button)}>0</button>
				</div>

                <Button {...stylex.props(optionsStyles.button)}>
					<ShareForwardSVG {...stylex.props(optionsStyles.forkSvg)} />
					Share
				</Button>

				<Button {...stylex.props(optionsStyles.button)}>
					<SaveSVG {...stylex.props(optionsStyles.forkSvg)} />
				</Button>

				<Button {...stylex.props(optionsStyles.button)}>
					<MoreOptions />
				</Button>
			</div> */}
		</div>
	);
};

export interface I_Row {
	key?: string;
	value?: string;
	description?: string;
}

export default function EnvironmentsPage() {
	const activeEnvironment = useRequestStore((state) => state.activeEnvironment);
	const aeRef = useRef(activeEnvironment);

	const addVariableToActiveEnvironment = useRequestStore(
		(state) => state.addVariableToActiveEnvironment,
	);

	const getActiveEnvironment = useRequestStore(
		(state) => state.getActiveEnvironment,
	);
	const setTabData = useRequestStore((state) => state.setTabData);

	const setTabState = useRequestStore((state) => state.setTabState);

	const saveActiveEnvironmentAndUpdateEnvironmentsList = useRequestStore(
		(state) => state.saveActiveEnvironmentAndUpdateEnvironmentsList,
	);

	useEffect(() => {
		aeRef.current = activeEnvironment;
	}, [activeEnvironment]);

	useEffect(() => {
		SetupShortcuts();

		return () => {
			CleanUpShortcuts();
		};
	}, []);

	async function SetupShortcuts() {
		// console.log("here");

		addEventListener("keydown", SaveEnvironment);
	}

	async function CleanUpShortcuts() {
		removeEventListener("keydown", SaveEnvironment);
	}

	function SaveEnvironment(e: KeyboardEvent) {
		if (e.ctrlKey && e.key === "s") {
			e.preventDefault();
			if (aeRef.current) {
				saveActiveEnvironmentAndUpdateEnvironmentsList();
				// SyncHTTPRequestStateToSidebar();
				setTabState(aeRef.current.id, E_TabStatus.NONE);
			}
		}
	}

	return (
		<div {...stylex.props(styles.mainWrapper)}>
			<div {...stylex.props(styles.wrapper)}>
				<div>
					<TableOptions
						title={activeEnvironment?.name ?? "NO ACTIVE ENVIRONMENT"}
					/>
					<br />

					<div>
						<div {...stylex.props(styles.headerRow)}>
							<div {...stylex.props(styles.cell, styles.borderRight)}>
								{/* <DragHandle {...stylex.props(styles.dragHandle)} /> */}
								{/* <Checkbox /> */}
							</div>

							<div {...stylex.props(styles.cell, styles.borderRight)}>
								<h1 {...stylex.props(styles.header)}>Variable</h1>
							</div>

							{/* <div {...stylex.props(styles.cell, styles.borderRight)}>
								<h1 {...stylex.props(styles.header)}>Type</h1>
							</div> */}

							<div {...stylex.props(styles.cell, styles.borderRight)}>
								<h1 {...stylex.props(styles.header)}>Initial Value</h1>
							</div>

							<div {...stylex.props(styles.cell)}>
								<h1 {...stylex.props(styles.header)}>Current Value</h1>
							</div>
						</div>

						{activeEnvironment?.variables.map((row: T_ManagedVariable) => {
							return (
								<TableRow key={row.id} envId={activeEnvironment.id} vr={row} />
							);
						})}

						<br />

						<Button
							// {...stylex.props(styles.addRowButton)}
							onClick={() => {
								if (activeEnvironment) {
									addVariableToActiveEnvironment();

									const ae = getActiveEnvironment();
									if (ae) {
										setTabData(ae.id, ae);
									}

									setTabState(activeEnvironment.id, E_TabStatus.MODIFIED);
								}
							}}
						>
							Add Row
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
