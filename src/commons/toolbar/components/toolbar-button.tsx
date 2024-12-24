import * as stylex from '@stylexjs/stylex';
import type {FC, SVGProps} from "react";

const styles = stylex.create({
  button: {
    border: 'none',
    backgroundColor: 'transparent',
    color: 'var(--color-sidebar-text)',
    width: '2rem',
    height: '2rem',
    padding: '0.25rem',
    display: 'flex',
    flexDirection: 'row',
    boxShadow: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    fill: 'var(--color-sidebar-text)',
    ':hover': {
      color: 'var(--color-white)',
      fill: 'var(--color-white)'
    }
  },
  selected: {
    color: 'var(--color-white)',
    fill: 'var(--color-white)',
    backgroundColor: 'var(--color-sidebar-text)',
  }
})

interface ToolBarButtonProps {
  Svg: FC<SVGProps<SVGSVGElement>>,
  onClick: () => void;
  isExpanded: boolean;
}

export function ToolBarButton ({Svg, onClick, isExpanded}: ToolBarButtonProps) {
  console.log(isExpanded);
  return (
    <button onClick={onClick} {...stylex.props(styles.button, isExpanded && styles.selected)}>
      <Svg height='20' width='20'/>
    </button>
  );
}
