import React, { type ReactNode, useState } from "react";

import stylex from "@stylexjs/stylex";

const styles = stylex.create({
	wrapper: {
		display: "flex",
		backgroundColor: "#181818",
		borderTop: "1px solid var(--secondary-border-color)",
		borderBottom: "1px solid var(--secondary-border-color)",
		paddingRight: "0.5rem",
	},

	cookies: {
		color: "#006699",
		fontWeight: "bold",
		fontSize: "0.75rem",
		marginLeft: "auto",
		cursor: "pointer",
		display: "flex",
		alignItems: "center",
	},
});

interface I_RequestTabBar {
	children: ReactNode;
}

export default function RequestTabBar({ children }: I_RequestTabBar) {
	return (
		<div {...stylex.props(styles.wrapper)}>
			{children}

      {/* {tabs.map((tab, index) => {
				return (
					<RequestTab
						title={tab.title}
						amount={tab.amount}
						status={tab.status}
						key={index}
						onClick={() => setActiveTabIndex(index)}
						active={index === activeTabIndex}
					/>
				);
			})} */}

			<div {...stylex.props(styles.cookies)}>Cookies</div>
		</div>
	);
}
