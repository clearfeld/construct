import * as stylex from "@stylexjs/stylex";
import RequestTabBar from "../request-tabbar";
import RequestTab from "../request-tabbar/request-tab";
import { useState } from "react";
// import ParamsBody from "./params-body";
// import AuthorizationBody from "./authorization-body";
import HeadersBody from "./headers-body";
import RequestBody from "./request-body";
// import ScriptsBody from "./scripts-body";
// import SettingsBody from "./settings-body";
import { RequestRow } from "../request-row";

const styles = stylex.create({
	wrapper: {
		height: "calc(100% - var(--response-height))",
		width: "100%",

		backgroundColor: "var(--bg-color)",

		position: "relative",

		display: "grid",
		gridTemplateRows: "5rem 1fr",
	},

	section: {
		height: "100%",
		width: "100%",
		flexGrow: 1,

		backgroundColor: "var(--bg-color)",
		overflow: "auto",
	},

	tabContent: {
		position: "absolute",
		backgroundColor: "#0E0F10",
		// maxHeight: "5rem",
		height: "calc(100% - 5.75rem)",
		width: "100%",
		left: "0",
		// padding: "1rem",
		boxSizing: "border-box",
	},
});

const tabs = [
	// {
	// 	title: "Params",
	// 	status: "idk",
	// 	amount: -1,
	// 	children: <ParamsBody />,
	// },

	// {
	// 	title: "Authorization",
	// 	status: "",
	// 	amount: 2,
	// 	children: <AuthorizationBody />,
	// },

	{
		title: "Headers",
		status: "",
		amount: -1,
		children: <HeadersBody />,
	},
	{
		title: "Body",
		status: "",
		amount: -1,
		children: <RequestBody />,
	},

	// {
	// 	title: "Scripts",
	// 	status: "",
	// 	amount: -1,
	// 	children: <ScriptsBody />,
	// },

	// {
	//   title: "Test",
	//   status: "",
	//   amount: -1,
	//   children: <TestsBody />,
	// },

	// {
	// 	title: "Settings",
	// 	status: "",
	// 	amount: -1,
	// 	children: <SettingsBody />,
	// },
];

function RequestSection() {
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	return (
		<div {...stylex.props(styles.wrapper)}>
			<RequestRow />

			<div {...stylex.props(styles.section)}>
				<RequestTabBar>
					{tabs.map((tab, index) => {
						return (
							<RequestTab
								title={tab.title}
								amount={tab.amount}
								status={tab.status}
								key={tab.title}
								onClick={() => setActiveTabIndex(index)}
								active={index === activeTabIndex}
							>
								<div {...stylex.props(styles.tabContent)}>{tab.children}</div>
							</RequestTab>
						);
					})}
				</RequestTabBar>
			</div>
		</div>
	);
}

export default RequestSection;
