import * as stylex from '@stylexjs/stylex';
// import {FooterButton} from "./components/footer-button.tsx";
// import SidebarSVG from '../../assets/sidebar.svg?react';
// import CheckMarkSVG from '../../assets/check-mark.svg?react';
// import SearchSVG from '../../assets/search.svg?react';
// import TerminalSVG from '../../assets/terminal.svg?react';

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: '0.5rem',
    flex: 1,
    paddingLeft: '0.5rem',
    height: '1rem',
    maxHeight: '1rem',
  }
})

interface TopFooterProps {
  isExpanded: boolean;
}

// @ts-ignore
export function TopFooter(props: TopFooterProps) {
  return (
    <div {...stylex.props(styles.container)}>
      {/* <FooterButton Svg={SidebarSVG}/>
      <FooterButton Svg={CheckMarkSVG} text='Online'/>
      <FooterButton Svg={SearchSVG} text='Find and Replace'/>
      <FooterButton Svg={TerminalSVG} text='Console'/> */}
    </div>
  );
}
