import * as stylex from "@stylexjs/stylex";
import { SidebarTab } from "./rail.tsx";
// import { SidebarSearchRow } from "./components/sidebar-search-row.tsx";
// import { CollectionTreeView } from "./components/collection-tree-view.tsx";
// import data from "./components/collection-data.json";
// import { EnvironmentList } from "./components/environment-list";

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
			{/* <SidebarSearchRow />

			{selectedTab === "collections" && (
				<CollectionTreeView data={data as any} />
			)}

			{selectedTab === "environment" && <EnvironmentList />} */}
		</div>
	);
}
