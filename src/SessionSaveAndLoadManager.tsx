import {
	exists,
	BaseDirectory,
	readTextFile,
} from "@tauri-apps/plugin-fs";
import { useEffect } from "react";
import useRequestStore from "./stores/request_store/index.ts";
import { useNavigate } from "react-router";

// TODO: have different file for local and prod version of app
const session_file = "last_session.json";

// import { listen } from "@tauri-apps/api/event";

export default function SessionSaveAndLoadManager() {
	const navigate = useNavigate();

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

		// // TODO: need to figure this out in case of alt f4 or other types of window close events
		// // listen("tauri://close-requested", async (event) => {
		// // 	await AttemptToSaveLocalSession();
		// // });

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

		const previous_session_exists = await exists(session_file, {
			baseDir: BaseDirectory.AppData,
		});

		if (previous_session_exists) {
			const session_json = await readTextFile(session_file, {
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
	}

	return <></>;
}

