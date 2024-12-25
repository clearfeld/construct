import React from "react";
import { SelectOption } from "@components/select";
import * as stylex from '@stylexjs/stylex';

import {
  Raw, GraphQL, None
} from "./body";

const styles = stylex.create({
  wrapper: {
    display: "flex",
    height: "35vh",
    minHeight: "35vh",
    maxHeight: "100vh"
  }
});

interface ContentProps {
  option: SelectOption
}

function getBodyContent(option: SelectOption) {
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

export default function Content(props: ContentProps) {
  const bodyContent = getBodyContent(props.option);
  return (
    <div {...stylex.props(styles.wrapper)}>
      {bodyContent}
    </div>
  )
}