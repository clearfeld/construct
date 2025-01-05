import { useEffect, useRef, useState } from "react";

import * as stylex from "@stylexjs/stylex";
import { SidebarRail } from "./rail.tsx";
import { SidebarContent } from "./content.tsx";
import { E_SidebarSection } from "@src/stores/request_store/sidebar_slice.ts";
import useRequestStore from "@src/stores/request_store/index.ts";

const styles = stylex.create({
	wrapper: {
		height: "100%",
		width: "var(--sidebar-width)",
		position: "relative",

		backgroundColor: "var(--sidebar-bg)",
	},

	sidebar: {
		height: "100%",
		width: "100%",

		backgroundColor: "var(--sidebar-bg)",
		overflow: "auto",
		display: "grid",
		gridTemplateColumns: "var(--sidebar-fixed-width) 1fr",
	},

	resizeHandle: {
		zIndex: 10,
		height: "100%",
		backgroundColor: "transparent",
		position: "absolute",
		width: "0.25rem",
		right: "-0.125rem",
		top: 0,
		cursor: "col-resize",
		":hover": {
			backgroundColor: "var(--resizer-color)",
		},
	},

	resizeHandleActive: {
		backgroundColor: "var(--resizer-color)",
	},
});

const MIN_WIDTH = 16 * 2.25;
const MIN_EXPANDED_WIDTH = 16 * 20;
const MAX_EXPANDED_WIDTH = 16 * 40;
const MIN_EXPANDED_THRESHOLD = MIN_EXPANDED_WIDTH / 2;

function Sidebar() {
	// const [selectedTab, setSelectedTab] = useState<E_SidebarSection | null>(
	// 	E_SidebarSection.COLLECTIONS,
	// );

	const currentSidebarTab = useRequestStore((state) => state.currentSidebarTab);
	const setCurrentSidebarTab = useRequestStore((state) => state.setCurrentSidebarTab);

	const prevSelectedTab = useRef<E_SidebarSection | null>(null);
	const prevSelectedState = useRef<boolean>(false);
	const html_style = document.getElementsByTagName("html")[0].style;
	const resizerRef = useRef<HTMLDivElement | null>(null);
	const [resizeInProgress, setResizeInProgress] = useState<boolean>(false);
	// const body = document.getElementsByTagName("body")[0];

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (resizerRef.current) {
			resizerRef.current.addEventListener("mousedown", (_) => {
				// event
				setResizeInProgress(true);
				html_style.cursor = "col-resize";

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

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (currentSidebarTab) {
			if (!prevSelectedState.current) {
				html_style.setProperty(
					// TODO: move these values out into a constants file instead
					"--sidebar-width",
					`${MIN_EXPANDED_WIDTH}px`,
				);
			}
			prevSelectedTab.current = currentSidebarTab;
		}
		prevSelectedState.current = !!currentSidebarTab;
	}, [currentSidebarTab]);

	function resize(e: MouseEvent) {
		e.preventDefault();
		if (!resizerRef.current) return;
		const size = e.x;
		let curSize = size;
		// body.clientWidth
		// console.log(curSize, body.clientWidth);

		if (curSize < MIN_EXPANDED_WIDTH && curSize > MIN_EXPANDED_THRESHOLD) {
			curSize = MIN_EXPANDED_WIDTH;
			setCurrentSidebarTab(prevSelectedTab.current || E_SidebarSection.COLLECTIONS);
		} else if (curSize <= MIN_EXPANDED_THRESHOLD) {
			curSize = MIN_WIDTH;
			setCurrentSidebarTab(null);
		}
		// console.log(size);
		html_style.setProperty(
			// TODO: move these values out into a constants file instead
			"--sidebar-width",
			`${Math.min(curSize, MAX_EXPANDED_WIDTH)}px`,
		);
	}

	return (
		<div {...stylex.props(styles.wrapper)}>
			<div {...stylex.props(styles.sidebar)}>
				<SidebarRail selectedTab={currentSidebarTab} onSelectTab={setCurrentSidebarTab} />
				<SidebarContent selectedTab={currentSidebarTab} />
			</div>

			<div
				ref={resizerRef}
				{...stylex.props(
					styles.resizeHandle,
					resizeInProgress && styles.resizeHandleActive,
				)}
			/>
		</div>
	);
}

export default Sidebar;
