// import { SelectOption } from "@components/select";
// import * as stylex from '@stylexjs/stylex';

import {
  Raw, GraphQL, None
} from "./body";

// const styles = stylex.create({
//   wrapper: {
//     display: "flex",
//     // height: "100%",
//     minHeight: "35vh",
//     maxHeight: "100vh",
//   }
// });

// interface ContentProps {
//   option: SelectOption
// }

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function getBodyContent(option: any
  // SelectOption
) {
  switch(option.value) {
    case "none":
      return <None />;
    case "form_data":
    case "url_encoded":
    case "raw":
      return <Raw />;
    case "graphql":
      return <GraphQL />;
    default:
      return null;
  }
}

export default function Content(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  props: any // ContentProps
) {
  const bodyContent = getBodyContent(props.option);

  return (
    <>
      {bodyContent}
    </>
  )
}