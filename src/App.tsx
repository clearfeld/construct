import * as stylex from "@stylexjs/stylex";
import { Routes, Route, Outlet } from "react-router";

import "./App.css";

import "./updater.tsx";
import SessionSaveAndLoadManager from "./SessionSaveAndLoadManager.tsx";

import { H5 } from "@controlkit/ui";

import Navbar from "./commons/navbar";
import Sidebar from "./commons/sidebar";
import Footer from "./commons/footer";

import TabBar from "./commons/tabbar/index.tsx";
import Toolbar from "./commons/toolbar";

import HttpRequestsPage from "./pages/http_requests";
import EnvironmentsPage from "./pages/environments/index.tsx";

const styles = stylex.create({
	container: {
		height:
			"calc(100vh - var(--navbar-height) - var(--footer-height) - 0.125rem)",

		// TODO: AC-80 create dev vs prod toggle for testing
		// backgroundColor: "purple",
		backgroundColor: "var(--background-main)",
		display: "flex",
	},

	content_width: {
		width: "calc(100% - var(--sidebar-width))",
	},

	details_container: {
		display: "flex",
		height: "calc(100% - var(--tabbar-height))",
	},

	request_container: {
		width: "calc(100% - var(--toolbar-width))",
		// width: "calc(100%)",
	},
});

function App() {
	// const [greetMsg, setGreetMsg] = useState("");
	// const [name, setName] = useState("");

	// async function greet() {
	// 	// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
	// 	setGreetMsg(await invoke("greet", { name }));
	// }

	return (
		<Routes>
			<Route
				path="/"
				element={
					<div>
						<div
							style={{
								height: "var(--navbar-height)",
							}}
						>
							<Navbar />
						</div>

						<SessionSaveAndLoadManager />

						<Outlet />

						{/* <main className="container">
					<h1>Welcome to Tauri + React</h1>

					<p>Click on the Tauri, Vite, and React logos to learn more.</p>

					<form
						className="row"
						onSubmit={(e) => {
							e.preventDefault();
							greet();
						}}
					>
						<input
							id="greet-input"
							onChange={(e) => setName(e.currentTarget.value)}
							placeholder="Enter a name..."
						/>
						<button type="submit">Greet</button>
					</form>
					<p>{greetMsg}</p>
				</main> */}

						<div
						// style={{
						// 	height: "var(--footer-height)",
						// }}
						>
							<Footer />
						</div>
					</div>
				}
			>
				<Route
					index
					element={
						<div {...stylex.props(styles.container)}>
							<Sidebar />

							<div {...stylex.props(styles.content_width)}>
								{/* <TabBar /> */}

								<div {...stylex.props(styles.details_container)}>
									<div {...stylex.props(styles.request_container)}>
										<div
											style={{
												display: "flex",
												justifyContent: "center",
												width: "100%",
												height: "100%",
												alignItems: "center",
												textAlign: "center",
											}}
										>
											<H5>Create a collection to get Started.</H5>
										</div>
									</div>

									{/* <Toolbar /> */}
								</div>
							</div>
						</div>
					}
				/>

				<Route
					path="/http_request/:id"
					element={
						<div {...stylex.props(styles.container)}>
							<Sidebar />

							<div {...stylex.props(styles.content_width)}>
								<TabBar />

								<div {...stylex.props(styles.details_container)}>
									<div {...stylex.props(styles.request_container)}>
										<HttpRequestsPage />
									</div>

									<Toolbar />
								</div>
							</div>
						</div>
					}
				/>

				<Route
					path="/environment/:id"
					element={
						<div {...stylex.props(styles.container)}>
							<Sidebar />

							<div {...stylex.props(styles.content_width)}>
								<TabBar />

								<div {...stylex.props(styles.details_container)}>
									<div
										// {...stylex.props(styles.request_container)}
										style={{
											width: "100%",
										}}
									>
										<EnvironmentsPage />
									</div>

									{/* <Toolbar /> */}
								</div>
							</div>
						</div>
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;
