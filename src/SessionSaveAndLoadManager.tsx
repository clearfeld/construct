import * as stylex from "@stylexjs/stylex";
import { exists, BaseDirectory, readTextFile } from "@tauri-apps/plugin-fs";
import { useEffect, useState } from "react";
import useRequestStore from "./stores/request_store/index.ts";
import { useNavigate } from "react-router";
import { LoadingSize, LoadingSpinner } from "@controlkit/ui";
import { appDataDir } from "@tauri-apps/api/path";

const session_file = import.meta.env.DEV ? "last_session_dev_mode.json" : "last_session.json";
const roaming_dir = await appDataDir(); // "com.construct.app";

const styles = stylex.create({
	wrapper: {
		backgroundColor: "var(--color-bg)",
		position: "absolute",
		width: "100%",
		height: "calc(100% - var(--navbar-height))",
		zIndex: 1000,
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default function SessionSaveAndLoadManager() {
	const navigate = useNavigate();

	const [loading, setLoading] = useState<boolean>(true);

	const setAllDataFromSessionSave = useRequestStore(
		(state) => state.setAllDataFromSessionSave,
	);
	const setAllEnvironmentsSliceDataFromSessionSave = useRequestStore(
		(state) => state.setAllEnvironmentsSliceDataFromSessionSave,
	);

	const setAllTabbarSliceDataFromSessionSave = useRequestStore(
		(state) => state.setAllTabbarSliceDataFromSessionSave,
	);

	const setAllSidebarSliceDataFromSessionSave = useRequestStore(
		(state) => state.setAllSidebarSliceDataFromSessionSave,
	);

	useEffect(() => {
		SetLocalSessionIfExists();

		// // ctrl+p to test saving without shutdown
		// const handleKeyDown = async (event: KeyboardEvent) => {
		// 	if (event.ctrlKey && event.key === "p") {
		// 		event.preventDefault();
		// 		// AttemptToSaveLocalSession();

		// 		// console.log(location.pathname);
		// 		// console.log(window.location.pathname);
		// 	}
		// };

		// TODO: need to figure this out in case of alt f4 or other types of window close events


		// window.addEventListener("keydown", handleKeyDown);

		// return () => {
		// 	window.removeEventListener("keydown", handleKeyDown);
		// };
	}, []);

	async function SetLocalSessionIfExists() {
		// TODO: https://tauri.app/plugin/file-system/#read
		// probably should use readTextFileLines or Binary data format for session file instead of raw json
		// but its fine for now

		// TODO: create a separate file within appConfig for settings store in the future

		const previous_session_exists = await exists(`${roaming_dir}/${session_file}`, {
			baseDir: BaseDirectory.AppData,
		});

		if (previous_session_exists) {
			const session_json = await readTextFile(`${roaming_dir}/${session_file}`, {
				baseDir: BaseDirectory.AppData,
			});

			if (session_json) {
				console.log("exists");

				// TODO: wrap in try catch block and have some UI if data corrupted or invalid in some way
				const sj = JSON.parse(session_json);

				console.log(sj);

				setAllDataFromSessionSave(sj.request_slice);
				setAllEnvironmentsSliceDataFromSessionSave(sj.environments_slice);
				setAllTabbarSliceDataFromSessionSave(sj.tabbar_slice);
				setAllSidebarSliceDataFromSessionSave(sj.sidebar_slice);

				navigate(sj.meta.url);
			} else {
				console.log("doesnt exists");
			}

			console.log(session_json);
		} else {
			console.log("doesnt exists");
		}

		setLoading(false);
	}

	return (
		<>
			{loading && (
				<div {...stylex.props(styles.wrapper)}>
					<LoadingSpinner size={LoadingSize.LARGE} />
					<p>Checking for local session...</p>
				</div>
			)}
		</>
	);
}
