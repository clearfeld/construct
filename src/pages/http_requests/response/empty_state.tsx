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
    return (
        <div
            {...stylex.props(styles.wrapper)}
        >
            <p>Enter the URL and click send to get a response.</p>
            {/* <p>All your cookies and their associated domains will appear here.</p> */}
        </div >
    );
}

export default EmptyResponseState;