import * as stylex from "@stylexjs/stylex";
import { platform } from "@tauri-apps/plugin-os";

// backgroundColor: isWindows ? "yellow" : "gray",
// @ts-ignore
import MinimizeSVG from "@assets/mdi_window-minimize.svg?react";
// @ts-ignore
import MaximizeSVG from "@assets/mdi_window-maximize.svg?react";
// @ts-ignore
import CloseSVG from "@assets/mdi_close.svg?react";
import { useEffect, useState } from "react";
// import { Window, currentMonitor } from "@tauri-apps/api/window";

import { getCurrentWindow } from "@tauri-apps/api/window";

// import { useLocation } from "react-router";

// Save session - load is in SessionsSaveAndLoadManager.tsx
// TODO: bring these together after figuring out tauri's way of listening to window close
const session_file = "last_session.json";

import {
	exists,
	BaseDirectory,
	writeTextFile,
	create,
} from "@tauri-apps/plugin-fs";

// import { sqlite_db } from "@src/stores/sqlite";
// console.log(sqlite_db);

// TODO: use stronghold or something better instead of a plaintext store
// import { store } from "../../stores/store_helper";
import MacControls from "./mac_controls";
import useRequestStore from "@src/stores/request_store";
// import { Link } from "react-router-dom";

const styles = stylex.create({
    base: {
        // marginLeft: "320px",
        width: "100vw",
        height: "var(--navbar-height)",

        userSelect: "none",
        display: "flex",
        // justifyContent: "flex-end",
        position: "fixed",
        zIndex: 1000,
        top: "0",
        left: "0",
        // right: 0,

        backgroundColor: "var(--sidebar-color-bg)",
        borderBottom: "1px solid var(--border-color)",
    },
});

const window_styles = stylex.create({
    btn: {
        // backgroundColor: "red",
        // backgroundColor: "var(--navbar-color-bg)",
        width: "3rem",
        // height: "calc(100% - 4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",

        transition: "background-color var(--transition-speed) ease",

        ":hover": {
            backgroundColor: "var(--navbar-color-bg-hover)",
        },
    },

    close_btn: {
        ":hover": {
            backgroundColor: "red !important",
        },
    },
});

// interface I_NavButtonProps {
// 	children: ReactNode;
// }
// function NavButton({ children }: I_NavButtonProps) {
// 	return (
// 		<button {...stylex.props(styles.nav_button)} type="button">
// 			{children}
// 		</button>
// 	);
// }

// const appWindow = new Window("main");

export default function Navbar() {
    // const [curRoute, setCurRoute] = useState<T_NavRoutes>("Tools");
    // const [curRoute, setCurRoute] = useState("Tools");
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [currentPlatform, setCurrentPlatform] = useState<string>("macosx");

    useEffect(() => {
        GetPlat();

        // console.log(store);
        // test_write();
        test_read();
    }, []);

    async function GetPlat() {
        const currentPlatform = await platform();
        // console.log(currentPlatform);
        setCurrentPlatform(currentPlatform);
    }

    // async function test_write() {
    // 	await store.set("some-key", { value: 5 });
    // 	await store.save();
    // }

    async function test_read() {
        // const val = await store.get("some-key");
        // console.log(val);
    }

    useEffect(() => {
        // const appWindow = getCurrentWindow();

        document
            .getElementById("titlebar-minimize")
            ?.addEventListener("click", async () => {
                await getCurrentWindow().minimize();
            });

        document
            .getElementById("titlebar-maximize")
            ?.addEventListener("click", async () => {
                await getCurrentWindow().toggleMaximize();
            });

        document
            .getElementById("titlebar-close")
            ?.addEventListener("click", async () => {

                await AttemptToSaveLocalSession();

                // TODO: UI state showing session save in progress

                await getCurrentWindow().close();
            });
    }, [currentPlatform]);


	const getAllSidebarSliceDataForSessionSave = useRequestStore(
		(state) => state.getAllSidebarSliceDataForSessionSave,
	);

	const getAllTabbarSliceDataForSessionSave = useRequestStore(
		(state) => state.getAllTabbarSliceDataForSessionSave,
	);
    const getAllDataForSessionSave = useRequestStore(
		(state) => state.getAllDataForSessionSave,
	);
    const getAllEnvironmentsSliceDataForSessionSave = useRequestStore(
		(state) => state.getAllEnvironmentsSliceDataForSessionSave,
	);

    // const location = useLocation();

	async function AttemptToSaveLocalSession() {
		const request_slice = getAllDataForSessionSave();
		const environment_slice = getAllEnvironmentsSliceDataForSessionSave();
		const tabbar_slice = getAllTabbarSliceDataForSessionSave();
		const sidebar_slice = getAllSidebarSliceDataForSessionSave();

		console.log("ctrl + p");

		console.log(request_slice);

		const contents = JSON.stringify({
			meta: {
				version: "0.0.1", // save file version
				url: window.location.pathname, // location.pathname,
			},
			request_slice: request_slice,
			environments_slice: environment_slice,
			tabbar_slice: tabbar_slice,
			sidebar_slice: sidebar_slice,
		});

		const previous_session_exists = await exists(session_file, {
			baseDir: BaseDirectory.AppData,
		});

		console.log("Checked if exists");

		if (previous_session_exists) {
			console.log("attempt to write");

			writeTextFile(session_file, contents, {
				baseDir: BaseDirectory.AppData,
			})
				.then((res) => {
					console.log("success?", res);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			console.log("attempt to create");

			// TODO: testing needed for weird initial state of app
			// await mkdir("com.construct.app", {
			// 	baseDir: BaseDirectory.AppData,
			// });

			const file = await create(session_file, {
				baseDir: BaseDirectory.AppData,
			});
			await file.write(new TextEncoder().encode(contents));
			await file.close();
		}
	}

    return (
        <div data-tauri-drag-region {...stylex.props(styles.base)}>
            {currentPlatform === "macos" && <MacControls />}

            <p
                data-tauri-drag-region
                style={{
                    margin: 0,
                    padding: 0,
                    alignContent: "center",
                    marginLeft: "1rem",
                }}
            >
                Construct
            </p>

            <div
                data-tauri-drag-region
                style={{
                    display: "flex",
                    position: "fixed",
                    height: "36px",
                    right: 0,
                    // alignItems: "center",
                    borderBottom: "1px solid var(--color-border)",
                }}
            >
                {/* <Link
					to={"/settings"}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="20"
						width="20"
						viewBox="0 0 24 24"
						fill="white"
					>
						<path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 3.311L4.5 7.65311V16.3469L12 20.689L19.5 16.3469V7.65311L12 3.311ZM12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"></path>
					</svg>
				</Link> */}

                {(currentPlatform === "windows" ||
                    currentPlatform === "linux") && (
                    <>
                        <div
                            className="titlebar-button"
                            id="titlebar-minimize"
                            {...stylex.props(window_styles.btn)}
                        >
                            <MinimizeSVG />
                        </div>

                        <div
                            className="titlebar-button"
                            id="titlebar-maximize"
                            {...stylex.props(window_styles.btn)}
                        >
                            <MaximizeSVG />
                        </div>

                        <div
                            className="titlebar-button"
                            id="titlebar-close"
                            {...stylex.props(
                                window_styles.btn,
                                window_styles.close_btn,
                            )}
                        >
                            <CloseSVG />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
