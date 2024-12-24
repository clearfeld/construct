import * as stylex from '@stylexjs/stylex';
import {memo} from "react";
import type {ExpandedTab} from "./left-toolbar.tsx";
import {Documentation} from "./documentation.tsx";
import {Comments} from "./comments.tsx";
import {Code} from "./code.tsx";
import {Info} from "./Info.tsx";

const styles = stylex.create({
  container: {
    gridColumn: 2,
  }
})

interface RightToolbarProps {
  expandedTab: ExpandedTab | null;
  onClose: () => void;
}

export const RightToolbar = memo(function RightToolbar({
  expandedTab,
  onClose,
}: RightToolbarProps) {

  const renderComponent = () => {
    switch (expandedTab) {
      case 'documentation':
        return <Documentation onClose={onClose}/>
      case 'comments':
        return <Comments onClose={onClose}/>
      case 'code':
        return <Code onClose={onClose}/>
      case 'info':
        return <Info onClose={onClose}/>
      default:
        return null;
    }

  }
  return (
    <div {...stylex.props(styles.container)}>
      {renderComponent()}
    </div>
  )
})
