import {
	autoHeaders,
	methods,
	type T_Method,
} from "@src/stores/request_store/request_slice";
import stylex from "@stylexjs/stylex";
import {
	useState,
	// 	, type MouseEventHandler
} from "react";
// import { useHover } from "../../../hooks/use-hover";
import CloseX from "../../../assets/mdi_close.svg?react";
import { Button } from "@controlkit/ui";
import { E_TabStatus, E_TabType } from "@src/stores/request_store/tabbar_slice";
import useRequestStore from "@src/stores/request_store";
import { useNavigate } from "react-router";
import type { T_ActiveEnvironment } from "@src/stores/request_store/environments_slice";
import EnvironmentSVG from "../../../assets/environment.svg?react";

interface I_TabProps {
	id: string;
	status: Status;
	title: string;
	tabType: E_TabType;
	requestType: string;
}

export type Status = "SAVED" | "UNSAVED" | "MODIFIED";

// TODO: move this to store and standardize base request types
export type RequestType = "GET" | "POST" | "PUT";

const styles = stylex.create({
	tab: {
		display: "grid",
		gridTemplateColumns: "auto 1fr 1rem",
		alignItems: "center",

		gap: "1rem",
		padding: "0rem 0.5rem",
		boxSizing: "border-box",

		width: "12rem",
		cursor: "pointer",

		borderTop: "0.3125rem solid transparent",

		transition: "background-color var(--transition-speed) ease",

		":hover": {
			backgroundColor: "#0E0F10",
		},
	},

	requestType: {
		color: "white",
		fontSize: "14px",
	},

	active: {
		backgroundColor: "#0E0F10",
		borderTop: "0.3125rem solid #13539F",
	},

	statusCircle: {
		marginTop: "-0.125rem",
		minWidth: "0.625rem",
		minHeight: "0.625rem",
		maxWidth: "0.625rem",
		maxHeight: "0.625rem",
		backgroundColor: "#D99E45",
		borderRadius: "50%",
	},

	statusCircleSaved: {
		marginTop: "-0.125rem",
		minWidth: "0.625rem",
		minHeight: "0.625rem",
		maxWidth: "0.625rem",
		maxHeight: "0.625rem",
		backgroundColor: "var(--cds-green-300)",
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
		padding: "0.25rem",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer",
		backgroundColor: "transparent",

		transition: "background-color var(--transition-speed) ease",

		":hover": {
			backgroundColor: "#28292A",
		},
	},

	environment_icon: {
		width: "1rem",
		height: "1.125rem",
	},
});

export default function Tab({
	id,
	status,
	title,
	tabType,
	requestType,
}: I_TabProps) {
	const navigate = useNavigate();

	const activeTab = useRequestStore((state) => state.activeTab);
	const setActiveTab = useRequestStore((state) => state.setActiveTab);

	const getTabs = useRequestStore((state) => state.getTabs);
	const setTabs = useRequestStore((state) => state.setTabs);

	const setCurrentRequest = useRequestStore((state) => state.setCurrentRequest);

	// const setTabState = useRequestStore((state) => state.setTabState);
	// const getId = useRequestStore((state) => state.getId);

	let shortRequestString: string = requestType;
	switch (requestType) {
		case "GET":
			break;
		case "POST":
			break;
		case "PUT":
			break;
		case "PATCH":
			break;
		case "DELETE":
			shortRequestString = "DEL";
			break;
		case "OPTIONS":
			shortRequestString = "OPTS";
			break;
		case "HEAD":
			break;
		case "CONNECTION":
			shortRequestString = "CONN";
			break;
		case "TRACE":
			break;
		default:
			shortRequestString = requestType.substring(0, 4);
			break;
	}

	const color =
		methods.find((method) => method.value === requestType)?.textColor ??
		"white";

	const [isHovering, setIsHovering] = useState<boolean>(false);

	const setActiveEnvironmentDetails = useRequestStore(
		(state) => state.setActiveEnvironmentDetails,
	);
	const getActiveEnvironmentDetails = useRequestStore(
		(state) => state.getActiveEnvironmentDetails,
	);
	const setActiveEnvironment = useRequestStore(
		(state) => state.setActiveEnvironment,
	);
	const getActiveEnvironmentInEnvironments = useRequestStore(
		(state) => state.getActiveEnvironmentInEnvironments,
	);
	const setTabData = useRequestStore((state) => state.setTabData);

	const getEnvironmentById = useRequestStore(
		(state) => state.getEnvironmentById,
	);

	return (
		<div
			onClick={(_e: React.MouseEvent<HTMLDivElement>) => {
				setActiveTab(id);

				const tabs = [...getTabs()];
				const tab = tabs.find((tab) => tab.id === id);
				const data = tab.data;

				// TODO: create separate comps for each tab type instead
				if (tab.type === E_TabType.ENVIRONMENT) {
					navigate(`/environment/${id}`);

					const aed = getActiveEnvironmentDetails();
					if (aed === null) {
						const aed_c: T_ActiveEnvironment = {
							env_id: id,
							stage_id: null,
						};
						setActiveEnvironmentDetails(aed_c);

						const target_env = getEnvironmentById(id);

						if (target_env) {
							setActiveEnvironment(target_env);
						}
					} else {
						aed.env_id = id;
						setActiveEnvironmentDetails(aed);

						if (tab) {
							if (Object.keys(tab.data).length === 0) {
								const target_env = getEnvironmentById(id);
								if (target_env) {
									setActiveEnvironment(target_env);
								}
							} else {
								setActiveEnvironment(tab.data);
							}
						} else {
							const target_env = getEnvironmentById(id);

							if (target_env) {
								setActiveEnvironment(target_env);
							}
						}
					}

					// const activeEnvironment = getActiveEnvironmentInEnvironments();
					// if (activeEnvironment) {
					// 	data = structuredClone(activeEnvironment);
					// 	// setActiveEnvironment(activeEnvironment);
					// }

					// setActiveEnvironment(data);

					// setTabData(id, activeEnvironment);

					// setActiveEnvironment(getActiveEnvironmentInEnvironments());

					setActiveTab(id);

					return;
				}

				navigate(`/http_request/${id}`);

				let method: T_Method = methods[0];
				if (typeof data.method === "string") {
					method = methods.find((m) => m.value === data.method) ?? methods[0];
				} else if (data.method) {
					method =
						methods.find((m) => m.value === data.method.value) ?? methods[0];
				}

				console.log(data, method);

				setCurrentRequest(
					data.id,
					data.name,
					data.url,
					method,
					data.autoHeaders ?? autoHeaders,
					data.headers,
					data.body,
					data.response,
					data.response_headers,
				);

				// TODO: remove saved state doesn't add anything and makes a lot of UI require a lot of extra logic
				for (const tab of tabs) {
					if (tab.status === E_TabStatus.SAVED) {
						tab.status = E_TabStatus.NONE;
					}
				}

				setTabs(tabs);
			}}
			{...stylex.props(styles.tab, activeTab === id && styles.active)}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			{/* TODO: add more state details to activeTab  */}
			{tabType === E_TabType.ENVIRONMENT && (
				<div
					{...stylex.props(styles.environment_icon)}
					style={{
						color,
					}}
				>
					<EnvironmentSVG width={"1rem"} height={"1rem"} />
				</div>
			)}

			{tabType === E_TabType.HTTP_REQUEST && (
				<p
					{...stylex.props(styles.requestType)}
					style={{
						color,
					}}
				>
					{shortRequestString}
				</p>
			)}

			<p
				{...stylex.props(styles.title, activeTab === id && styles.titleActive)}
			>
				{title}
			</p>

			<div
				style={{
					display: "flex",
				}}
			>
				{!isHovering ? (
					<>
						{status === E_TabStatus.MODIFIED && (
							<span {...stylex.props(styles.statusCircle)} />
						)}

						{status === E_TabStatus.SAVED && (
							<span {...stylex.props(styles.statusCircleSaved)} />
						)}
					</>
				) : (
					<Button
						extend={styles.closeButton}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();

							const tabs = [...getTabs()];

							const tabIndex = tabs.findIndex((tab) => tab.id === id);
							if (tabIndex !== -1) {
								tabs.splice(tabIndex, 1);
							}

							setTabs(tabs);
							if (tabs.length > 0) {
								setActiveTab(tabs[tabs.length - 1].id);
							}
						}}
					>
						<CloseX />
					</Button>
				)}
			</div>
		</div>
	);
}
