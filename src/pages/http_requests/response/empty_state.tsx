import useRequestStore from "@src/stores/request_store";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
	wrapper: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		textAlign: "center",
		justifyContent: "center",
	},
});

function EmptyResponseState() {
	const error = useRequestStore((state) => state.error);

	return (
		<div {...stylex.props(styles.wrapper)}>
			{error === null ? (
				<p>Enter the URL and click send to get a response.</p>
			) : (
				<p>{error}</p>
			)}
			{/* <p>All your cookies and their associated domains will appear here.</p> */}
		</div>
	);
}

export default EmptyResponseState;
