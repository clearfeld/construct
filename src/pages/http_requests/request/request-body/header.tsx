import React, { useState } from "react";
import * as stylex from '@stylexjs/stylex';
// import Select, { SelectOption } from "@components/select";

import OPTIONS from "./body_options";

const styles = stylex.create({
  wrapper: {
    marginTop: "0.5em",
    marginBottom: "0.5em",
    marginLeft: "0.5em",
    // height: "2.5rem",
  }
});

interface HeaderProps {
  // selectValue: SelectOption,
  // setSelectValue: (value: SelectOption) => void,

  selectValue: any,
  setSelectValue: (value: any) => void,
}

export default function Header(props: HeaderProps) {
  return (
    <div {...stylex.props(styles.wrapper)}>
      {/* <Select
        options={OPTIONS}
        value={props.selectValue}
        onChange={props.setSelectValue}
      /> */}
    </div>
  )
}