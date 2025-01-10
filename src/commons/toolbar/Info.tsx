import * as stylex from "@stylexjs/stylex";
import { Divider, H6, Label } from "@controlkit/ui";
import { memo, useEffect, useState } from "react";
import useRequestStore from "@src/stores/request_store";
// import CloseSVG from '../../assets/close.svg?react';

const styles = stylex.create({
	container: {
		width: "100%",
		height: "100%",
		padding: "0.5rem 0.75rem",
		boxSizing: "border-box",
	},

	header: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},

	closeButton: {
		border: "none",
		backgroundColor: "transparent",
		color: "var(--color-sidebar-text)",
		width: "2rem",
		height: "2rem",
		padding: "0.25rem",
		display: "flex",
		flexDirection: "row",
		boxShadow: "none",
		justifyContent: "center",
		alignItems: "center",
		fill: "var(--color-sidebar-text)",
		":hover": {
			color: "var(--color-white)",
			fill: "var(--color-white)",
		},
	},

	title: {
		fontSize: "1",
		fontWeight: "bold",
		color: "var(--text)",
	},

	divider: {
		margin: "0.5rem 0",
	},

	label: {
		color: "var(--text-sub)",
	},

	text: {
		marginTop: "0.5rem !important",
	},
});

interface InfoProps {
	onClose: () => void;
}

export const Info = memo(function Info({ onClose }: InfoProps) {
	const activeTab = useRequestStore((state) => state.activeTab);
	const getTabs = useRequestStore((state) => state.getTabs);
	const [curTab, setCurTab] = useState();

	const tabs = useRequestStore((state) => state.tabs);

	useEffect(() => {
		const tabs = getTabs();
		const tab = tabs.find((tab) => tab.id === activeTab);
		setCurTab(tab);
	}, [activeTab, tabs]);

	function FormateDateString(date_string: string): string {
		const date = new Date(date_string);

		// console.log(date, date_string);

		if (date.toString() !== "Invalid Date") {
			return date.toLocaleString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
				hour: "numeric",
				minute: "numeric",
				second: "numeric",
			});
		}

		return "";
	}

	return (
		<div {...stylex.props(styles.container)}>
			<div {...stylex.props(styles.header)}>
				<p {...stylex.props(styles.title)}>Info</p>

				{/* <button {...stylex.props(styles.closeButton)} onClick={onClose}>
					<CloseSVG />
				</button> */}
			</div>

			<Divider extend={styles.divider} />

			<div>
				<Label extend={styles.label}>Last saved update at:</Label>

				<p {...stylex.props(styles.text)}>
					{FormateDateString(curTab?.data.updated_at)}
				</p>

				<div
					style={{
						margin: "0.5rem",
					}}
				/>

				<Label extend={styles.label}>Created on:</Label>

				<p {...stylex.props(styles.text)}>
					{FormateDateString(curTab?.data.created_at)}
				</p>

				{/* <p>{JSON.stringify(tab)}</p> */}
			</div>
		</div>
	);
});
