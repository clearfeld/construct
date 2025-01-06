import * as stylex from "@stylexjs/stylex";

// import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
// import {
// 	EnvironmentIdListState,
// 	EnvironmentsState,
// } from "../../../../store/environment/environments.ts";
// import { SelectedEnvironmentState } from "../../../../store/environment/selected-environment.ts";

// import { GlobalEnvironmentButton } from "./global-environment-button.tsx";
import { WorkspaceEnvironmentButton } from "./workspace-environment-button.tsx";
import useRequestStore from "@src/stores/request_store/index.ts";
import type { T_Environment } from "@src/stores/request_store/environments_slice.ts";
import { Button, Divider } from "@controlkit/ui";

const styles = stylex.create({
	container: {
		flex: 1,
	},
	divider: {
		height: "0.0625rem",
		backgroundColor: "var(--sidebar-border)",
		width: "100%",
		marginBottom: "0.25rem",
	},
});

export default function Environments() {
	// const setEnvironment = useSetRecoilState(EnvironmentsState);
	// const environmentIds = useRecoilValue(EnvironmentIdListState);
	// const [selectedEnvironment, setSelectedEnvironment] = useRecoilState(
	// 	SelectedEnvironmentState,
	// );

	const environments = useRequestStore((state) => state.environments);

    const addEmptyDefaultEnvironment = useRequestStore((state) => state.addEmptyDefaultEnvironment);

	// const toggleInUse = (id: string) => {
	// 	setEnvironment((prev) => {
	// 		return prev.map((env) => {
	// 			if (env.id === id) {
	// 				return {
	// 					...env,
	// 					inUse: !env.inUse,
	// 				};
	// 			}
	// 			return {
	// 				...env,
	// 				inUse: false,
	// 			};
	// 		});
	// 	});
	// };

	return (
		<div {...stylex.props(styles.container)}>
            			<div
				style={{
					padding: "0.5rem 0.5rem",
					// display: "grid",
					// gridTemplateColumns: "1fr, 1rem",
					display: "flex",
					gap: "0.5rem",
				}}
			>
				{/* <Input
					style={{
						height: "1.5rem",
					}}
					placeholder="Search..."
				/> */}

				{/* <div>+</div> */}

				<Button
					fullWidth
					style={{
						height: "1.5rem",
					}}
					onClick={() => {
                        addEmptyDefaultEnvironment();
                    }}
				>
					Add Environment
				</Button>
			</div>

			<Divider />

			{/* <GlobalEnvironmentButton
			// onClick={setSelectedEnvironment}
			// active={selectedEnvironment?.name === "global"}
			/>

			<p>vault</p>

			<GlobalEnvironmentButton
			// onClick={setSelectedEnvironment}
			// active={selectedEnvironment?.name === "global"}
			/> */}

			<div {...stylex.props(styles.divider)} />
			{environments.map((env: T_Environment) => {
				return (
					<WorkspaceEnvironmentButton
						//onClick={setSelectedEnvironment}

						// active={selectedEnvironment?.id === id}
						// active={false}
						key={env.id}
						envId={env.id}
                        env={env}
						// toggleInUse={toggleInUse}
						toggleInUse={() => {}}
					/>
				);
			})}
		</div>
	);
}
