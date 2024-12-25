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

function TestResults() {
    return (
        <div
            {...stylex.props(styles.wrapper)}
        >
            <p>No Tests</p>
        </div >
    );
}

export default TestResults;