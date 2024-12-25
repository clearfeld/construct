import stylex from "@stylexjs/stylex";
import React, { type MouseEventHandler, type ReactNode } from "react";

interface I_TabProps {
  active?: boolean;
  title?: string;
  amount?: number;
  status?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler;
}

const styles = stylex.create({
  tab: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.25rem 1rem",
    boxSizing: "border-box",
    height: "100%",
    cursor: "pointer",
    //borderLeft: "1px solid #A6A6A6",
    borderRight: "1px solid #292929",
    borderTop: "1px solid transparent",
  },

  active: {
    backgroundColor: "#0E0F10",
    borderTop: "1px solid #13539F",
    color: "white",
  },

  statusCircle: {
    width: "0.75rem",
    height: "0.75rem",
    backgroundColor: "#006699",
    borderRadius: "50%",
  },

  title: {
    fontSize: "14px",
    color: "#787878",
  },

  titleActive: {
    color: "unset",
  },

  amount: {
    color: "#006699",
  },

  tabContent: {
    height: "100%",
    width: "100%",
    backgroundColor: "palegoldenrod",
  },
});

export default function RequestTab({
  active,
  amount,
  title,
  status,
  children,
  onClick,
}: I_TabProps) {
  return (
    <div>
      <div
        onClick={onClick}
        {...stylex.props(styles.tab, active && styles.active)}>
        <p {...stylex.props(styles.title, active && styles.titleActive)}>
          {title}
        </p>
        {amount && amount > 1 && (
          <span {...stylex.props(styles.amount)}>{amount}</span>
        )}
        {status && <span {...stylex.props(styles.statusCircle)} />}
      </div>
      {active && children}
    </div>
  );
}
