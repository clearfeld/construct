// import { v4 as uuidv4 } from "uuid";

import { Button, Divider } from "@controlkit/ui";
import RecursiveTree from "./recursive_tree";
import useRequestStore from "@src/stores/request_store";

import { UpdateHttpRequestTargetIfExists } from "@src/stores/request_store/sidebar_slice";
import { useEffect } from "react";
import { E_TabStatus } from "@src/stores/request_store/tabbar_slice";

export default function Collections() {
	const collection = useRequestStore((state) => state.collection);
	const getCollection = useRequestStore((state) => state.getCollection);

	const addCollection = useRequestStore((state) => state.addCollection);
	const setCollection = useRequestStore((state) => state.setCollection);

	const getTabs = useRequestStore((state) => state.getTabs);
	const setTabs = useRequestStore((state) => state.setTabs);

	const getCurrentRequest = useRequestStore((state) => state.getCurrentRequest);

	const getId = useRequestStore((state) => state.getId);
	const getName = useRequestStore((state) => state.getName);
	const getUrl = useRequestStore((state) => state.getUrl);
	const getMethod = useRequestStore((state) => state.getMethod);
	const getHeaders = useRequestStore((state) => state.getHeaders);
	const getBody = useRequestStore((state) => state.getBody);

	// const getUpdatedAt = useRequestStore((state) => state.getUpdatedAt);
	const getCreatedAt = useRequestStore((state) => state.getCreatedAt);

	const setTabState = useRequestStore((state) => state.setTabState);

	useEffect(() => {
		SetupShortcuts();

		return () => {
			CleanUpShortcuts();
		};
	}, []);

	async function SetupShortcuts() {
		// console.log("here");

		addEventListener("keydown", SaveHTTPRequest);
	}

	async function CleanUpShortcuts() {
		removeEventListener("keydown", SaveHTTPRequest);
	}

	function SaveHTTPRequest(e: KeyboardEvent) {
		if (e.ctrlKey && e.key === "s") {
			e.preventDefault();
			SyncHTTPRequestStateToSidebar();
		}
	}

	function SyncHTTPRequestStateToSidebar() {
		// console.log("Shortcut triggered");

		// TODO: add switch statement for different types of tabs / sidebar items
		// defaulting to HTTP_REQUEST

		const ns = structuredClone(getCollection());
		// debugger;

		const nd = new Date();
		const unixTimestamp = nd.getTime();

		UpdateHttpRequestTargetIfExists(
			ns,
			getId(),
			getName(),
			getUrl(),
			getMethod(),
			getHeaders(),
			getBody(),

			// meta
			unixTimestamp, // getUpdatedAt(),
			getCreatedAt(),
		);

		setCollection(ns);

		const tabs = [...getTabs()];

		const id = getId();
		for (let i = 0; i < tabs.length; ++i) {
			if (tabs[i].id === id) {
				tabs[i].title = getName();
				tabs[i].requestType = getMethod().value;
				tabs[i].status = E_TabStatus.SAVED;

				tabs[i].data = getCurrentRequest();
				tabs[i].data.updated_at = unixTimestamp;

				break;
			}
		}

		setTabs(tabs);

		setTabState(id, E_TabStatus.SAVED);
	}

	return (
		<div>
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
					onClick={addCollection}
				>
					Add Collection
				</Button>
			</div>

			<Divider />

			<div
				style={{
					height:
						"calc(100vh - var(--navbar-height) - var(--footer-height) - 0.125rem - 2rem - 0.5rem)",
					overflowY: "auto",
				}}
			>
				<RecursiveTree data={collection} depth={0} />
			</div>
		</div>
	);
}
