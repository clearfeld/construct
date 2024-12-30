import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		display: "flex",
		flex: 1,
	},

	text: {
		color: "var(--color-sidebar-text)",
		fontSize: "0.625rem",
		lineHeight: "1rem",
		textAlign: "center",
		margin: 0,
		textWrap: "nowrap",
        userSelect: "none",
	},
});

interface MiddleContentProps {
	isExpanded: boolean;
}

// @ts-ignore
export function MiddleContent({ isExpanded }: MiddleContentProps) {
	return (
		<div {...stylex.props(styles.container)}>
			<p {...stylex.props(styles.text)}>
				{/* CC / V */}
				Construct
			</p>
		</div>
	);
}
