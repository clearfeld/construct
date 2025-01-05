import * as stylex from "@stylexjs/stylex";

import Collections from "./collections/index.tsx";

import Environments from "./environment";
import { E_SidebarSection } from "@src/stores/request_store/sidebar_slice.ts";
// import { SidebarSearchRow } from "./components/sidebar-search-row.tsx";

const styles = stylex.create({
	container: {
		gridColumn: 2,
		overflow: "hidden",
	},
});

interface SidebarContentProps {
	selectedTab: E_SidebarSection | null;
}

export function SidebarContent({ selectedTab }: SidebarContentProps) {
	return (
		<div {...stylex.props(styles.container)}>
			{/* <SidebarSearchRow /> */}

			{selectedTab === E_SidebarSection.COLLECTIONS && <Collections />}

			{selectedTab === E_SidebarSection.ENVIRONMENT && <Environments />}
		</div>
	);
}
