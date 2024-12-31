import { useEffect, useRef, useState } from "react";

import * as stylex from "@stylexjs/stylex";
import { TopFooter } from "./top-footer.tsx";
import { BottomFooter } from "./bottom-footer.tsx";
import { MiddleContent } from "./middle-content.tsx";

const styles = stylex.create({
	wrapper: {
		height: "var(--footer-height)",
		width: "100%",

		backgroundColor: "var(--footer-bg)",
		borderTop: "0.0625rem solid var(--main-border-color)",

		display: "grid",
		gridTemplateRows: "1fr",
		containerType: "inline-size",
		containerName: "footer",
		position: "relative",
	},

	footer: {
		height: "1.25rem",
		width: "100%",
		flexGrow: 1,

		backgroundColor: "var(--sidebar-bg)",
		overflow: "auto",

		display: "flex",
		flexDirection: "row",
		borderTop: "0.0625rem solid var(--main-border-color)",
	},

	expandedFooter: {
		flexDirection: "column",
		height: "100%",
	},

	resizeHandle: {
		zIndex: 10,
		width: "100%",
		backgroundColor: "transparent",
		position: "absolute",
		height: "0.25rem",
		top: "-0.125rem",

		// cursor: "row-resize",

		// ":hover": {
		// 	backgroundColor: "var(--resizer-color)",
		// },
	},

	resizeHandleActive: {
		backgroundColor: "var(--resizer-color)",
	},

	topRow: {
		display: "flex",
		flexDirection: "row",
		columnGap: "0.5rem",
		flex: 1,
		paddingLeft: "0.5rem",
	},

	bottomRow: {
		display: "flex",
		flexDirection: "row",
		columnGap: "0.5rem",
		flex: 1,
		justifyContent: "flex-end",
		paddingRight: "0.5rem",
	},

	middleRow: {
		display: "flex",
		flexDirection: "row",
		flex: 1,
	},
});

const MIN_EXPANDED_HEIGHT = 16 * 10;
const EXPANDED_THRESHOLD = MIN_EXPANDED_HEIGHT / 2;

function Footer() {
	const html_style = document.getElementsByTagName("html")[0].style;
	const body = document.getElementsByTagName("body")[0];
	const resizerRef = useRef<HTMLDListElement | null>(null);
	const [resizeInProgress, setResizeInProgress] = useState<boolean>(false);

	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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

	function resize(e: MouseEvent) {
		e.preventDefault();
		// console.log(body.clientHeight, e);
		const size = body.clientHeight - e.y;
		if (!resizerRef.current) return;
		let curSize = size;
		if (curSize < MIN_EXPANDED_HEIGHT && size >= EXPANDED_THRESHOLD) {
			setIsExpanded(true);
			curSize = MIN_EXPANDED_HEIGHT;
		} else if (size <= EXPANDED_THRESHOLD) {
			setIsExpanded(false);
			curSize = 20;
		}
		html_style.setProperty(
			"--footer-height",
			`${Math.min(curSize, body.clientHeight - 48 - 2)}px`,
		);
	}

	return (
		<div {...stylex.props(styles.wrapper)}>
			<div
				// ref={resizerRef as any}
				{...stylex.props(
					styles.resizeHandle,
					resizeInProgress && styles.resizeHandleActive,
				)}
			/>

			<div
				{...stylex.props(styles.footer, isExpanded && styles.expandedFooter)}
			>
				<TopFooter isExpanded={isExpanded} />
				<MiddleContent isExpanded={isExpanded} />
				<BottomFooter isExpanded={isExpanded} />
			</div>
		</div>
	);
}

export default Footer;
