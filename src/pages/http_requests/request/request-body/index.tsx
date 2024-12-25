import React, { useState } from "react";
import Content from "./content";
import OPTIONS from "./body_options";
import Header from "./header";

export default function RequestBody() {
  const [selectValue, setSelectValue] = useState(OPTIONS[0]);

  return (
    <div>
      <Header
        selectValue={selectValue}
        setSelectValue={setSelectValue}
      />
      <Content
        option={selectValue}
      />
    </div>
  );
}
