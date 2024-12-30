import { useEffect, useRef, useState } from "react";

import * as stylex from "@stylexjs/stylex";
import ResponseTabBar from "./response-tabbar";
import ResponseTab from "./response-tabbar/response-tab";
import Body from "./body";
import Headers from "./header";
import Cookies from "./cookies";
import TestResults from "./test-results";

const styles = stylex.create({
	wrapper: {
		height: "var(--response-height)",
		width: "100%",

		backgroundColor: "var(--bg-color)",
		borderTop: "0.0625rem solid var(--main-border-color)",

		position: "relative",
		display: "grid",
		gridTemplateRows: "0px 1fr",
	},

	section: {
		height: "100%",
		width: "100%",
		flexGrow: 1,

		backgroundColor: "var(--bg-color)",
		overflow: "auto",
	},

	resizeHandle: {
		zIndex: 10,
		width: "100%",
		// backgroundColor: "var(--resizer-color)",
		backgroundColor: "transparent",
		cursor: "row-resize",
		height: "0.25rem",
		":hover": {
			backgroundColor: "var(--resizer-color)",
		},
	},

	resizeHandleActive: {
		backgroundColor: "var(--resizer-color)",
	},

	tabContent: {
		position: "absolute",
		backgroundColor: "#0E0F10",
		//height: "100%",
		width: "100%",
		left: "0",
		// padding: "1rem",
		boxSizing: "border-box",

		overflow: "auto",
		height: "calc(100% - 2.125rem)",
	},
});

const tabs = [
	{
		title: "Body",
		status: "idk",
		amount: -1,
		children: <Body />,
	},

	{
		title: "Cookies",
		status: "",
		amount: -1,
		children: <Cookies />,
	},

	{
		title: "Headers",
		status: "",
		amount: -1,
		children: <Headers />,
	},

	// {
	// 	title: "Test Results",
	// 	status: "",
	// 	amount: -1,
	// 	children: <TestResults />,
	// },
];

function ResponseSection() {
	const html_style = document.getElementsByTagName("html")[0].style;
	const body = document.getElementsByTagName("body")[0];
	const resizerRef = useRef<HTMLDListElement | null>(null);
	const [resizeInProgress, setResizeInProgress] = useState<boolean>(false);
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	useEffect(() => {
		if (resizerRef.current) {
			resizerRef.current.addEventListener("mousedown", () => {
				setResizeInProgress(true);
				html_style.cursor = "row-resize";

				// @ts-ignore
				document.body.style["-webkit-user-select"] = "none"; // not sure if this works on windows
				document.addEventListener("mousemove", resize, false);
				document.addEventListener(
					"mouseup",
					() => {
						setResizeInProgress(false);
						html_style.cursor = "inherit";

						document.removeEventListener("mousemove", resize, false);
						// @ts-ignore
						document.body.style["-webkit-user-select"] = "auto";
					},
					false,
				);
			});
		}
	}, []);

	const topLevelDivRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		if (topLevelDivRef.current) {
			console.log("Top level div height:", topLevelDivRef.current.clientHeight);
			html_style.setProperty(
				"--response-height",
				`${topLevelDivRef.current.clientHeight}px`,
			);
		}
	}, []);

	function resize(e) {
		e.preventDefault();
		if (!resizerRef.current) return;

		// console.log(body.clientHeight, e);
		const footer_height_str = document
			.getElementsByTagName("html")[0]
			.style.getPropertyValue("--footer-height");
		let footer_height = 0;
		if (footer_height_str) {
			footer_height = parseInt(
				footer_height_str.substring(0, footer_height_str.length - 2),
			);
		}
		// console.log(footer_height_str, footer_height_str.substring(0, footer_height_str.length - 2));

		const size = body.clientHeight - footer_height - e.y - 19;
		// console.log(size);
		if (size < 30) {
			return;
		} else if (size > body.clientHeight - 38 - 20) {
			// navbar - tab bar - borders
			return;
		}

		// console.log(size);
		html_style.setProperty("--response-height", `${size}px`);
	}

	return (
		<div {...stylex.props(styles.wrapper)} ref={topLevelDivRef}>
			<div
				ref={resizerRef}
				{...stylex.props(
					styles.resizeHandle,
					resizeInProgress && styles.resizeHandleActive,
				)}
			/>

			<div {...stylex.props(styles.section)}>
				<ResponseTabBar>
					{tabs.map((tab, index) => {
						return (
							<ResponseTab
								key={index}
								active={index === activeTabIndex}
								onClick={() => setActiveTabIndex(index)}
								title={tab.title}
								amount={tab.amount}
								status={tab.status}
							>
								<div {...stylex.props(styles.tabContent)}>{tab.children}</div>
							</ResponseTab>
						);
					})}
				</ResponseTabBar>
			</div>
		</div>
	);
}

export default ResponseSection;
