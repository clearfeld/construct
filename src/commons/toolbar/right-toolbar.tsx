import * as stylex from "@stylexjs/stylex";
import { memo } from "react";
import { Documentation } from "./documentation.tsx";
import { Comments } from "./comments.tsx";
import { Code } from "./code.tsx";
import { Info } from "./Info.tsx";
import { E_ToolbarHTTPRequestSections } from "@src/stores/request_store/toolbar_slice.ts";

const styles = stylex.create({
	container: {
		gridColumn: 2,
	},
});

interface RightToolbarProps {
	expandedTab: E_ToolbarHTTPRequestSections | null;
	onClose: () => void;
}

export const RightToolbar = memo(function RightToolbar({
	expandedTab,
	onClose,
}: RightToolbarProps) {
	const renderComponent = () => {
		switch (expandedTab) {
			case E_ToolbarHTTPRequestSections.DOCUMENTATION:
				return <Documentation onClose={onClose} />;
			case E_ToolbarHTTPRequestSections.COMMENTS:
				return <Comments onClose={onClose} />;
			case E_ToolbarHTTPRequestSections.CODE:
				return <Code onClose={onClose} />;
			case E_ToolbarHTTPRequestSections.INFO:
				return (
					<Info
					// onClose={onClose}
					/>
				);
			default:
				return null;
		}
	};
	return <div {...stylex.props(styles.container)}>{renderComponent()}</div>;
});
