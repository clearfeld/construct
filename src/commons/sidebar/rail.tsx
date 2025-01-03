import * as stylex from "@stylexjs/stylex";
import type { FC, SVGProps } from "react";

import CollectionsSVG from "../../assets/collection.svg?react";
// import ConnectedSVG from '../../assets/connected.svg?react';
// import DBSVG from '../../assets/db.svg?react';
// import EnvironmentSVG from '../../assets/environment.svg?react';
// import HistorySVG from '../../assets/history.svg?react';
// import HomePNG from '../../assets/home.png';
// import NoteSVG from '../../assets/note.svg?react';
// import TrendSVG from '../../assets/trend.svg?react';
// import { SidebarButton, SidebarButtonPNG } from "./components/sidebar-button.tsx";

const styles = stylex.create({
	container: {
		display: "flex",
		flexDirection: "column",
		borderRight: "0.0625rem solid var(--sidebar-border)",
		boxSizing: "border-box",
		height: "100%",
		gridColumn: 1,
	},

	button: {
		border: "none",
		borderRadius: 0,
		backgroundColor: "transparent",
		boxShadow: "none",
		padding: 0,

		position: "relative",

		width: "100%",
		height: "2.25rem",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		boxSizing: "border-box",

		cursor: "pointer",

		color: "var(--color-sidebar-text)",
		fill: "var(--color-sidebar-text)",

		":hover": {
			color: "var(--color-white)",
			fill: "var(--color-white)",
			backgroundColor: "var(--sidebar-bg-hover)",
		},
	},

	image: {
		height: "1.5rem",
		width: "1.5rem",
	},

	svg_pos_fix: {
		display: "flex",
		height: "100%",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginLeft: "0.125rem",
	},

	selected: {
		backgroundColor: "var(--sidebar-selected-bg) !important",
		// borderLeft: '0.125rem solid var(--sidebar-selected-border)',

		fill: "var(--color-white)",
		color: "var(--color-white)",
	},

	selected_border: {
		border: "0.125rem solid var(--sidebar-selected-border)",
		height: "calc(100% - 0.25rem)",
		left: "0px",
		position: "absolute",
	},
});

export type SidebarTab =
	| "home"
	| "collections"
	| "connected"
	| "db"
	| "environment"
	| "history"
	| "note"
	| "trend";

interface SidebarRailProps {
	selectedTab: SidebarTab | null;
	onSelectTab: (tab: SidebarTab) => void;
}

export function SidebarRail({ selectedTab, onSelectTab }: SidebarRailProps) {
	return (
		<div {...stylex.props(styles.container)}>
			{/* <SidebarButtonPNG src={HomePNG} selected={selectedTab === 'home'} onClick={() => onSelectTab('home')} /> */}

			<div>
				<SidebarButton
					Svg={CollectionsSVG}
					selected={selectedTab === "collections"}
					onClick={() => onSelectTab("collections")}
				/>
				{/* <SidebarButton Svg={CollectionsSVG} selected={selectedTab === 'collections'} onClick={() => onSelectTab('collections')} />
        <SidebarButton Svg={NoteSVG} selected={selectedTab === 'note'} onClick={() => onSelectTab('note')} />
        <SidebarButton Svg={EnvironmentSVG} selected={selectedTab === 'environment'} onClick={() => onSelectTab('environment')} />
        <SidebarButton Svg={DBSVG} selected={selectedTab === 'db'} onClick={() => onSelectTab('db')} />
        <SidebarButton Svg={TrendSVG} selected={selectedTab === 'trend'} onClick={() => onSelectTab('trend')} />
        <SidebarButton Svg={ConnectedSVG} selected={selectedTab === 'connected'} onClick={() => onSelectTab('connected')} />
        <SidebarButton Svg={HistorySVG} selected={selectedTab === 'history'} onClick={() => onSelectTab('history')} /> */}
			</div>
		</div>
	);
}

interface SidebarButton {
	selected: boolean;
	onClick: () => void;
}

interface SidebarButtonProps extends SidebarButton {
	Svg: FC<SVGProps<SVGSVGElement>>;
}

interface SidebarButtonPNGProps extends SidebarButton {
	src: string;
}

export function SidebarButtonPNG({
	src,
	selected,
	onClick,
}: SidebarButtonPNGProps) {
	return (
		<button
			{...stylex.props(styles.button, selected && styles.selected)}
			onClick={onClick}
		>
			{/* biome-ignore lint/a11y/useAltText: <explanation> */}
			<img src={src} alt="bin" {...stylex.props(styles.image)} />
		</button>
	);
}

// export function SidebarButton({
//   Svg,
//   selected,
//   onClick
// }: SidebarButtonProps) {
//   return (
//     <button {...stylex.props(styles.button, selected && styles.selected)} onClick={onClick}>
//       <Svg height='20' width='20'/>
//     </button>
//   )
// }

export function SidebarButton({ Svg, selected, onClick }: SidebarButtonProps) {
	return (
		<button
			{...stylex.props(styles.button, selected && styles.selected)}
			onClick={onClick}
			type="button"
		>
			<div {...stylex.props(selected && styles.selected_border)} />

			<div {...stylex.props(styles.svg_pos_fix)}>
				<Svg height="20" width="18" />
			</div>
		</button>
	);
}
