import * as stylex from '@stylexjs/stylex';
// import CollectionsSVG from '../../assets/collections.svg?react';
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
    display: 'flex',
    flexDirection: 'column',
    borderRight: '0.0625rem solid var(--sidebar-border)',
    boxSizing: 'border-box',
    height: '100%',
    gridColumn: 1
  }
})

export type SidebarTab = 'home' | 'collections' | 'connected' | 'db' | 'environment' | 'history' | 'note' | 'trend';

interface SidebarRailProps {
  selectedTab: SidebarTab | null;
  onSelectTab: (tab: SidebarTab) => void;
}

export function SidebarRail({
  selectedTab,
  onSelectTab,
}: SidebarRailProps) {
  return (
    <div {...stylex.props(styles.container)}>
      {/* <SidebarButtonPNG src={HomePNG} selected={selectedTab === 'home'} onClick={() => onSelectTab('home')} /> */}

      <div>
        {/* <SidebarButton Svg={CollectionsSVG} selected={selectedTab === 'collections'} onClick={() => onSelectTab('collections')} />
        <SidebarButton Svg={NoteSVG} selected={selectedTab === 'note'} onClick={() => onSelectTab('note')} />
        <SidebarButton Svg={EnvironmentSVG} selected={selectedTab === 'environment'} onClick={() => onSelectTab('environment')} />
        <SidebarButton Svg={DBSVG} selected={selectedTab === 'db'} onClick={() => onSelectTab('db')} />
        <SidebarButton Svg={TrendSVG} selected={selectedTab === 'trend'} onClick={() => onSelectTab('trend')} />
        <SidebarButton Svg={ConnectedSVG} selected={selectedTab === 'connected'} onClick={() => onSelectTab('connected')} />
        <SidebarButton Svg={HistorySVG} selected={selectedTab === 'history'} onClick={() => onSelectTab('history')} /> */}
      </div>
    </div>
  )
}
