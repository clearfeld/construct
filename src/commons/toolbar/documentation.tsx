import * as stylex from '@stylexjs/stylex';
import {memo} from "react";
// import CloseSVG from '../../assets/close.svg?react';

const styles = stylex.create({
  container: {
    width: '100%',
    height: '100%',
    padding: '0.5rem 0.75rem',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: '1rem',
    color: 'var(--color-sidebar-text)',
    margin: 0,
  },
  closeButton: {
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
  }
})

interface DocumentationProps {
  onClose: () => void
}

export const Documentation = memo(function Documentation({
  onClose,
}: DocumentationProps) {
  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.header)}>
        <h2 {...stylex.props(styles.headerText)}>
          Documentation
        </h2>
        <button {...stylex.props(styles.closeButton)} onClick={onClose}>
          {/* <CloseSVG /> */}
        </button>
      </div>
    </div>
  )
})
