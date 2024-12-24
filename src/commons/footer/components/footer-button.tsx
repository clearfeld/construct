import type { ComponentProps, FC, SVGProps } from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
	button: {
		border: "none",
		backgroundColor: "transparent",
		color: "var(--color-sidebar-text)",
		display: "flex",
		flexDirection: "row",
		boxShadow: "none",
		height: "1rem",
		padding: 0,
		justifyContent: "center",
		fill: "var(--color-sidebar-text)",
		":hover": {
			color: "var(--color-white)",
			fill: "var(--color-white)",
		},
	},
	svg: {
		fill: "inherit",
		height: "0.75rem",
		width: "0.75rem",
	},
	text: {
		color: "inherit",
		fontSize: "0.625rem",
		marginLeft: "0.25rem",
		textWrap: "nowrap",
		// not sure why this is not working
		"@media (max-width: 768px)": {
			display: "none",
		},
	},
});

interface FooterButtonProps extends ComponentProps<"button"> {
	Svg: FC<SVGProps<SVGSVGElement>>;
	text?: string;
}

export function FooterButton({ Svg, text, ...props }: FooterButtonProps) {
	return (
		<button {...stylex.props(styles.button)} {...props}>
			<Svg {...stylex.props(styles.svg)} fill="#fff" />
			<p {...stylex.props(styles.text)}>{text}</p>
		</button>
	);
}
