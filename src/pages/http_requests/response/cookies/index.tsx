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

function Cookies() {
    return (
        <div
            {...stylex.props(styles.wrapper)}
        >
            <p>No cookies received from the server</p>
            <p>All your cookies and their associated domains will appear here.</p>
        </div >
    );
}

export default Cookies;