import * as stylex from "@stylexjs/stylex";

import Tab
// , { type RequestType, type Status }
from "./tab";

import { useRef, useState } from "react";
// import LeftArrow from "../../assets/arrow-left-notail.svg?react";
// import RightArrow from "../../assets/arrow-right-notail.svg?react";
// import Plus from "../../assets/plus.svg?react";
// import DownArrow from "../../assets/arrow-down.svg?react";
import EnvironmentDropdown from "./environment-dropdown";

const styles = stylex.create({
	wrapper: {
		//height: "fit-content",
		width: "100%",
		display: "flex",
		boxSizing: "border-box",
		alignItems: "center",
		backgroundColor: "var(--tabbar-bg)",
		borderBottom: "0.0625rem solid var(--main-border-color)",
		//overflow: "auto",
	},

	button: {
		backgroundColor: "transparent",
		boxShadow: "none",
		padding: "0.25rem 0.5rem",
		width: "2rem",
		height: "1.5rem",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},

	tabsList: {
		display: "flex",
		overflow: "hidden",
		scrollBehavior: "smooth",
	},

	optionsRow: {
		display: "flex",
		borderLeft: "1px solid #A6A6A6",
		borderRight: "1px solid #A6A6A6",
	},

	rightBorder: {
		borderRight: "1px solid #A6A6A6",
	},
});

const testTabs = [
	{
    status: "UNSAVED",
		title: "U GET",
		requestType: "GET",
	},

  {
		status: "SAVED",
		title: "S GET",
		requestType: "GET",
	},

  {
		status: "MODIFIED",
		title: "M GET",
		requestType: "GET",
	},

	{
		status: "UNSAVED",
		title: "U PUT",
		requestType: "PUT",
	},
];

function TabBar() {
	const [activeIndex, setActiveIndex] = useState(-1);
	const scrollRef = useRef<HTMLDivElement>(null);

	const scroll = (scrollOffset: number) => {
		if (scrollRef.current) {
			scrollRef.current.scrollLeft += scrollOffset;
		}
	};

	return (
		<div {...stylex.props(styles.wrapper)}>
			<div {...stylex.props(styles.rightBorder)}>
				<button {...stylex.props(styles.button)} onClick={() => scroll(-80)}>
					{/* <LeftArrow /> */}
				</button>
			</div>

			<div {...stylex.props(styles.tabsList)} ref={scrollRef}>
				{testTabs.map((tab, index) => {
					return (
						<Tab
							key={`${tab.title}-${index}`}
							// status={tab.status}
							title={tab.title}
							// requestType={tab.requestType}
							onClick={() => setActiveIndex(index)}
							active={index === activeIndex}
						/>
					);
				})}
			</div>

			<div {...stylex.props(styles.optionsRow)}>
				<button {...stylex.props(styles.button)} onClick={() => scroll(80)}>
					{/* <RightArrow /> */}
				</button>
				<button {...stylex.props(styles.button)}>{/* <Plus /> */}</button>
				<button {...stylex.props(styles.button)}>{/* <DownArrow /> */}</button>
			</div>

			<EnvironmentDropdown />
		</div>
	);
}

export default TabBar;
