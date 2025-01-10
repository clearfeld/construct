import * as stylex from "@stylexjs/stylex";

// import CodeSVG from '../../assets/code.svg?react';
// import CommentsSVG from '../../assets/comments.svg?react';
// import DocumentationSVG from '../../assets/documentation.svg?react';
// import DocumentationSVG from "../../assets/documentation.svg?react";
import InfoSVG from "../../assets/info.svg?react";

import { ToolBarButton } from "./components/toolbar-button.tsx";
import { memo } from "react";
import { E_ToolbarHTTPRequestSections } from "@src/stores/request_store/toolbar_slice.ts";

const styles = stylex.create({
	container: {
		display: "flex",
		flexDirection: "column",
		borderRight: "0.0625rem solid var(--sidebar-border)",
		boxSizing: "border-box",
		height: "100%",
		gridColumn: 1,
	},

	image: {
		height: "1.25rem",
		width: "1.125rem",
	},
});

interface LeftToolbarProps {
	expandedTab: E_ToolbarHTTPRequestSections | null;
	setExpandedTab: (tab: E_ToolbarHTTPRequestSections | null) => void;
}

export const LeftToolbar = memo(function LeftToolbar({
	expandedTab,
	setExpandedTab,
}: LeftToolbarProps) {
	return (
		<div {...stylex.props(styles.container)}>
			<ToolBarButton
				Svg={<InfoSVG {...stylex.props(styles.image)} />}
				onClick={() => setExpandedTab(E_ToolbarHTTPRequestSections.INFO)}
				isExpanded={expandedTab === E_ToolbarHTTPRequestSections.INFO}
			/>

			{/*
      <ToolBarButton Svg={CommentsSVG} onClick={() => setExpandedTab('comments')} isExpanded={expandedTab === 'comments'}/>
      <ToolBarButton Svg={CodeSVG} onClick={() => setExpandedTab('code')} isExpanded={expandedTab === 'code'}/>
      <ToolBarButton Svg={InfoSVG} onClick={() => setExpandedTab('info')} isExpanded={expandedTab === 'info'}/> */}
		</div>
	);
});
