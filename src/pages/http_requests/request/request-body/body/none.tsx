import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  wrapper: {
    width: "100%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center"
  },
  message: {
    position: "absolute",
    lineHeight: "21.79px",
    fontSize: "16px",
    color: "#787878",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
});

const DEFAULT_STRING = "This request does not have a body";

export default function None() {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <h1 {...stylex.props(styles.message)}>
        {DEFAULT_STRING}
      </h1>
    </div>
  )
}