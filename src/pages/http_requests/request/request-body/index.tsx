import React, { useState } from "react";
import Content from "./content";
import OPTIONS from "./body_options";
import Header from "./header";

export default function RequestBody() {
	const [selectValue, setSelectValue] = useState(OPTIONS[3]);

	return (
		<div
			style={{
				height: "100%",
			}}
		>
			{/* <div
				style={{
					height: "2.5rem",
				}}
			>
				<Header selectValue={selectValue} setSelectValue={setSelectValue} />
			</div> */}

			<Content option={selectValue} />
		</div>
	);
}
