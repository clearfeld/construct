import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Navbar from "./commons/navbar";

function App() {
	const [greetMsg, setGreetMsg] = useState("");
	const [name, setName] = useState("");

	async function greet() {
		// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
		setGreetMsg(await invoke("greet", { name }));
	}

	return (
		<>
      <Navbar />

			<main className="container">
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
			</main>
		</>
	);
}

export default App;