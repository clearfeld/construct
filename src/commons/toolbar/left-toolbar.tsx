import * as stylex from "@stylexjs/stylex";

// import CodeSVG from '../../assets/code.svg?react';
// import CommentsSVG from '../../assets/comments.svg?react';
// import DocumentationSVG from '../../assets/documentation.svg?react';
// import InfoSVG from '../../assets/info.svg?react';

// import {ToolBarButton} from "./components/toolbar-button.tsx";
import { memo } from "react";

const styles = stylex.create({
	container: {
		width: "var(--toolbar-fixed-width)",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		paddingTop: "0.5rem",
		rowGap: "0.5rem",
		gridColumn: 1,
	},
});

export type ExpandedTab = "documentation" | "comments" | "code" | "info";

// interface LeftToolbarProps {
//   expandedTab: ExpandedTab | null;
//   setExpandedTab: (tab: ExpandedTab | null) => void;
// }

export const LeftToolbar = memo(
	function LeftToolbar(
		//   {
		//   expandedTab,
		//   setExpandedTab
		// }: LeftToolbarProps
	) {
		return (
			<div {...stylex.props(styles.container)}>
				{/* <ToolBarButton Svg={DocumentationSVG} onClick={() => setExpandedTab('documentation')} isExpanded={expandedTab === 'documentation'}/>
      <ToolBarButton Svg={CommentsSVG} onClick={() => setExpandedTab('comments')} isExpanded={expandedTab === 'comments'}/>
      <ToolBarButton Svg={CodeSVG} onClick={() => setExpandedTab('code')} isExpanded={expandedTab === 'code'}/>
      <ToolBarButton Svg={InfoSVG} onClick={() => setExpandedTab('info')} isExpanded={expandedTab === 'info'}/> */}
			</div>
		);
	},
);
