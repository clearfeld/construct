import * as stylex from "@stylexjs/stylex";
import type { SidebarTab } from "./rail.tsx";

import Collections from "./collections/index.tsx";

import Environments from "./environment";
// import { SidebarSearchRow } from "./components/sidebar-search-row.tsx";

const styles = stylex.create({
	container: {
		gridColumn: 2,
		overflow: "hidden",
	},
});

interface SidebarContentProps {
	selectedTab: SidebarTab | null;
}

export function SidebarContent({ selectedTab }: SidebarContentProps) {
	return (
		<div {...stylex.props(styles.container)}>
			{/* <SidebarSearchRow /> */}

			{selectedTab === "collections" && <Collections />}

			{selectedTab === "environment" && <Environments />}
		</div>
	);
}
