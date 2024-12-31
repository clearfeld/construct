import type { ReactNode } from "react";
import stylex from "@stylexjs/stylex";

// import GlobeLock from "../../../assets/globe-lock.svg?react";
// import SaveIcon from "../../../assets/save.svg?react";
// import MoreOptions from "../../../assets/horizontal-ellipsis.svg?react";

const styles = stylex.create({
	wrapper: {
		display: "flex",
		backgroundColor: "#181818",
		borderTop: "1px solid var(--secondary-border-color)",
		borderBottom: "1px solid var(--secondary-border-color)",
	},

	rightSection: {
		display: "flex",
		alignItems: "center",
		boxSizing: "border-box",
		padding: "0.5rem 1rem",
		gap: "1rem",
		backgroundColor: "#0E0F10",
		marginLeft: "auto",
		borderLeft: "1px solid var(--secondary-border-color)",
	},

	infoPair: {
		display: "flex",
		alignItems: "center",
		gap: "0.25rem",
		fontSize: "0.75rem",
	},

	button: {
		padding: "0",
		color: "#787878",
		display: "flex",
		alignItems: "center",
		gap: "0.5rem",
		fontSize: "0.75rem",
		boxShadow: "unset",
		border: "unset",
	},
	//need to add variants
	value: {
		color: "#006699",
	},
});

interface I_RequestTabBar {
	children: ReactNode;
	hideRightSegment: boolean;
}

// interface I_InfoPairProps {
// 	title: string;
// 	value: string;
// }

// const InfoPair = ({ title, value }: I_InfoPairProps) => {
// 	return (
// 		<div {...stylex.props(styles.infoPair)}>
// 			<p>{title}:</p>
// 			<p {...stylex.props(styles.value)}>{value}</p>
// 		</div>
// 	);
// };

export default function ResponseTabBar(props: I_RequestTabBar) {
	return (
		<div {...stylex.props(styles.wrapper)}>
			{props.children}

			{props.hideRightSegment && (
				<div {...stylex.props(styles.rightSection)}>
					{/* <GlobeLock />
        <InfoPair title="Status" value="200 OK"></InfoPair>
        <InfoPair title="Time" value="52 ms"></InfoPair>
        <InfoPair title="Size" value="1.13 kb"></InfoPair> */}

					<button {...stylex.props(styles.button)}>
						{/* <SaveIcon /> Save as example */}
					</button>

					<button {...stylex.props(styles.button)}>
						{/* <MoreOptions /> */}
					</button>
				</div>
			)}
		</div>
	);
}
