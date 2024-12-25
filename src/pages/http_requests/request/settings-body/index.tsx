import React, { useState } from "react";

import { Checkbox, Switch } from "@controlkit/ui";

export default function SettingsBody() {
	const [toggleState, setToggleState] = useState(false);
	const [isChecked, setIsChecked] = useState<boolean>(false);

	return (
		<div>
			<p>Settings</p>

			<Checkbox
				isChecked={isChecked}
				onClick={() => {
					setIsChecked(!isChecked);
				}}
			/>

			<Switch
				// isToggled={toggleState}
				onClick={() => {
					setToggleState(!toggleState);
				}}
			/>
		</div>
	);
}
