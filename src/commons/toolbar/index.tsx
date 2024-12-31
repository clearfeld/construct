import { useEffect, useRef, useState } from "react";

import * as stylex from "@stylexjs/stylex";
import { LeftToolbar, type ExpandedTab } from "./left-toolbar.tsx";
import { RightToolbar } from "./right-toolbar.tsx";

const styles = stylex.create({
	wrapper: {
		height: "100%",
		width: "var(--toolbar-width)",

		backgroundColor: "var(--toolbar-bg)",
		position: "relative",
		borderLeft: "0.0625rem solid var(--main-border-color)",

		// TODO: fix this later
		// paddingTop: "0.40625rem",
	},

	sidebar: {
		height: "100%",
		width: "100%",

		backgroundColor: "var(--toolbar-bg)",
		overflow: "auto",
		display: "grid",
		gridTemplateColumns: "var(--toolbar-fixed-width) 1fr",
	},

	resizeHandle: {
		top: "0",
		// TODO: fix this later

		zIndex: 10,
		height: "100%",
		backgroundColor: "transparent",
		width: "0.25rem",
		cursor: "col-resize",
		position: "absolute",
		left: "-0.125rem",
		":hover": {
			backgroundColor: "var(--resizer-color)",
		},
	},

	resizeHandleActive: {
		backgroundColor: "var(--resizer-color)",
	},
});

const MIN_EXPANDED_WIDTH = 16 * 20;
const MIN_EXPANDED_THRESHOLD = MIN_EXPANDED_WIDTH / 2;

function Toolbar() {
	// TODO: need to move this to context or local atom to avoid prop drilling
	const [expandedTab, setExpandedTab] = useState<ExpandedTab | null>(null);
	const prevExpandedTab = useRef<ExpandedTab | null>(null);
	const prevIsExpanded = useRef<boolean>(false);

	const html_style = document.getElementsByTagName("html")[0].style;
	const body = document.getElementsByTagName("body")[0];
	const resizerRef = useRef<HTMLDListElement | null>(null);
	const [resizeInProgress, setResizeInProgress] = useState<boolean>(false);

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
		if (expandedTab) {
			prevExpandedTab.current = expandedTab;
			if (!prevIsExpanded.current) {
				html_style.setProperty("--toolbar-width", `${MIN_EXPANDED_WIDTH}px`);
			}
		}
		prevIsExpanded.current = !!expandedTab;
	}, [expandedTab]);

	function resize(e: MouseEvent) {
		e.preventDefault();
		// const size = e.x;
		const size = body.clientWidth - e.x;

		if (!resizerRef.current) return;
		let curSize = size;
		if (curSize < MIN_EXPANDED_WIDTH && size >= MIN_EXPANDED_THRESHOLD) {
			setExpandedTab(prevExpandedTab.current || "documentation");
			curSize = MIN_EXPANDED_WIDTH;
		} else if (size <= MIN_EXPANDED_THRESHOLD) {
			setExpandedTab(null);
			curSize = 16 * 2.25;
		}
		// console.log(size);
		html_style.setProperty("--toolbar-width", `${Math.min(curSize, 600)}px`);
	}

	const closeTab = () => {
		setExpandedTab(null);
		html_style.setProperty("--toolbar-width", `${16 * 2.25}px`);
	};

	return (
		<div {...stylex.props(styles.wrapper)}>
			<div
				// ref={resizerRef}
				{...stylex.props(
					styles.resizeHandle,
					resizeInProgress && styles.resizeHandleActive,
				)}
			/>

			<div {...stylex.props(styles.sidebar)}>
				<LeftToolbar
					// @ts-ignore
					expandedTab={expandedTab}
					setExpandedTab={setExpandedTab}
				/>
				<RightToolbar expandedTab={expandedTab} onClose={closeTab} />
			</div>
		</div>
	);
}

export default Toolbar;
