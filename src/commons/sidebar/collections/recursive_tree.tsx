import * as stylex from "@stylexjs/stylex";

// import ArrowRightSVG from "../../../assets/arrow-right.svg?react";
// import ArrowDownSVG from "../../../assets/arrow-down.svg?react";
import MoreHorSVG from "../../../assets/more-hor.svg?react";
// import FolderSVG from "../../../assets/folder.svg?react";
// import FavoriteInactiveSVG from "../../../assets/favorite-inactive.svg?react";
// import FavoriteSVG from "../../../assets/favorite.svg?react";
import { autoHeaders, methods } from "@src/stores/request_store/request_slice";
import useRequestStore from "@src/stores/request_store";
import { useState } from "react";
import { useNavigate } from "react-router";

import {
	// Button,
	// ButtonVariants,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	// Label,
} from "@controlkit/ui";

import {
	E_TabStatus,
	E_TabType,
	type T_Tab,
} from "@src/stores/request_store/tabbar_slice";
import CollectionItem from "./collection_item";
import FolderItem from "./folder_item";

const styles = stylex.create({
	row: {
		padding: "0.0625rem 0",

		cursor: "pointer",

		borderLeft: "0.125rem solid transparent",

		// transition: "background-color var(--transition-speed) ease",

		":hover": {
			backgroundColor: "#0E0F10",
		},
	},

	rowActive: {
		backgroundColor: "#1F252D",
		borderLeft: "0.125rem solid #2558BC",
	},
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function ColoredMethod(props: any) {
	let string = props.method;
	let color = "#A6A6A6";

	switch (props.method) {
		case "GET":
			break;
		case "POST":
			break;
		case "PUT":
			break;
		case "PATCH":
			break;
		case "DELETE":
			string = "DEL";
			break;
		case "OPTIONS":
			string = "OPTS";
			break;
		case "HEAD":
			break;
		case "CONNECTION":
			string = "CONN";
			break;
		case "TRACE":
			break;
		default:
			string = props.method.subString(0, 4);
			break;
	}

	for (const method of methods) {
		if (props.method === method.value) {
			color = method.textColor;
			break;
		}
	}

	const style = {
		justifySelf: "center",
		fontSize: "0.625rem",
		color: color,
	};

	return <p style={style}>{string}</p>;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function RecursiveTree(props: any) {
	const navigate = useNavigate();

	// const collection = useRequestStore((state) => state.collection);
	// const setCollection = useRequestStore((state) => state.setCollection);

	// const addFolder = useRequestStore((state) => state.addFolder);
	// const addRequest = useRequestStore((state) => state.addRequest);

	const deleteItem = useRequestStore((state) => state.deleteItem);
	const setRequestParameters = useRequestStore(
		(state) => state.setRequestParameters,
	);

	const getTabs = useRequestStore((state) => state.getTabs);
	const setTabs = useRequestStore((state) => state.setTabs);

	const activeTab = useRequestStore((state) => state.activeTab);
	const setActiveTab = useRequestStore((state) => state.setActiveTab);

	const deleteTabAndMoveToNext = useRequestStore(
		(state) => state.deleteTabAndMoveToNext,
	);

	// const setTabState = useRequestStore((state) => state.setTabState);

	// TODO: remove this when moving the sub comps into their own files
	// const [_isHoveredFolder, setIsHoveredFolder] = useState<boolean>(false);
	const [_isHoveredOther, setIsHoveredOther] = useState<boolean>(false);

	// function updateTargetIfExists(
	// 	nc: any,
	// 	id: string,
	// 	field: string,
	// 	value: any,
	// ) {
	// 	for (let i = 0; i < nc.length; ++i) {
	// 		// console.log("NC", nc[i].id);

	// 		if (nc[i].id === id) {
	// 			nc[i][field] = value;
	// 			// console.log("FOUND", nc[i]);
	// 			return;
	// 		}

	// 		if (nc[i].items) {
	// 			updateTargetIfExists(nc[i].items, id, field, value);
	// 		}
	// 	}
	// }

	// function toggleField(id: string, field: string, value: any) {
	// 	const nc = structuredClone(collection);
	// 	// console.log("START", id, nc);
	// 	updateTargetIfExists(nc, id, field, value);
	// 	// console.log("END", nc);
	// 	setCollection(nc);
	// }

	return (
		<div>
			{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
			{props.data.map((item: any) => {
				if (item.type === "collection") {
					return (
						<CollectionItem key={item.id} item={item} depth={props.depth} />
					);
				}

				if (item.type === "folder") {
					return (
						<FolderItem key={item.id} item={item} depth={props.depth} />
					);
				}

				if (item.type === "http_request") {
					return (
						// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
						<div key={item.id}>
							<div
								{...stylex.props(
									styles.row,
									activeTab === item.id && styles.rowActive,
								)}
							>
								<div
									style={{
										display: "grid",
										gridTemplateColumns: "1fr 1.5rem",
									}}
								>
									{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
									<div
										style={{
											display: "grid",
											gridTemplateColumns: "0.75rem 1.5rem 1fr",
											gap: "0.5rem",
											alignItems: "center",
											padding: "0.125rem 0.5rem",
											marginLeft: `${props.depth * 0.75}rem`,
										}}
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();

											const method = methods.find(
												(m) => m.value === item.method,
											);
											if (!method) return;

											navigate(`/http_request/${item.id}`);

											const tabs = [...getTabs()];

											const tab = tabs.find((t) => t.id === item.id);
											// const status = tab?.status ?? E_TabStatus.NONE;

											if (tab) {
												// setTabState(item.id, status);
												// setTimeout(() => {
												// 	setTabState(item.id, status);
												// 	// setTabState(item.id, E_TabStatus.SAVED);
												// }, 100);

												const method = methods.find(
													(method) => method.value === tab.data.method,
												);

												// TODO: migrate to setCurrentRequest2
												setRequestParameters(
													tab.data.id,
													tab.data.name,
													tab.data.url,
													method ?? methods[0],
													tab.data.autoHeaders ?? autoHeaders, // [], // item.autoHeaders,
													tab.data.headers,
													tab.data.body,
													// item.cookies,
													tab.data.updated_at,
													tab.data.created_at,
												);

												setActiveTab(item.id);

												// return;
											} else {
												setRequestParameters(
													item.id,
													item.name,
													item.url,
													method,
													autoHeaders, // [], // item.autoHeaders,
													item.headers,
													item.body,
													// item.cookies,
													item.updated_at,
													item.created_at,
												);

												const dn = new Date();
												const unixTimestamp = dn.getTime();

												const t: T_Tab = {
													id: item.id,
													status: E_TabStatus.NONE,
													title: item.name,
													type: E_TabType.HTTP_REQUEST,
													requestType: item.method,
													data: {
														id: item.id,
														name: item.name,
														url: item.url,
														method: item.method,
														autoHeaders: item.autoHeaders,
														headers: item.headers,
														body: item.body,

														response: null,
														response_headers: null,

														updated_at: unixTimestamp,
														created_at: unixTimestamp,
													},
												};
												tabs.push(t);
												setTabs(tabs);

												setActiveTab(item.id);
											}
											// 	toggleField(item.id, "open", !item.open);
										}}
										onMouseEnter={(e) => {
											e.preventDefault();
											e.stopPropagation();

											setIsHoveredOther(true);
										}}
										onMouseLeave={(e) => {
											e.preventDefault();
											e.stopPropagation();

											setIsHoveredOther(false);
										}}
									>
										{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
										{/* <div
										onClick={() => {
											toggleField(item.id, "open", !item.open);
										}}
										// biome-ignore lint/a11y/useSemanticElements: <explanation>
										role="button"
										tabIndex={0}
									>
										{item.open ? (
											<ArrowDownSVG width={12} height={12} />
										) : (
											<ArrowRightSVG width={12} height={12} />
										)}
									</div> */}
										<div />

										{/* <FolderSVG width={14} height={14} /> */}

										{/* <p
									style={{
										justifySelf: "center",
										fontSize: "0.625rem",
									}}
								>
									{collection.method}
								</p> */}

										<ColoredMethod method={item.method} />

										<p
											style={{
												color: "#A6A6A6",
												fontSize: "0.875rem",
												textWrap: "nowrap",
												overflow: "hidden",
												textOverflow: "ellipsis",
											}}
										>
											{item.name}
										</p>

										{/* <div /> */}

										{/* {isHoveredOther ? (
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<MoreHorSVG width={16} />
												</DropdownMenuTrigger>
												<DropdownMenuContent align="start">
													<DropdownMenuItem>Documentation</DropdownMenuItem>
													<DropdownMenuItem>Themes</DropdownMenuItem>
													<DropdownMenuItem>GitHub</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										) : (
											<div />
										)} */}

										{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
										{/* <div
										onClick={() => {
											toggleField(item.id, "favorite", !item.favorite);
										}}
										// biome-ignore lint/a11y/useSemanticElements: <explanation>
										role="button"
										tabIndex={0}
									>
										{item.favorite ? (
											<FavoriteSVG width={15} height={15} />
										) : (
											<FavoriteInactiveSVG width={15} height={15} />
										)}
									</div> */}
									</div>

									<div>
										{/* {isHoveredFolder ? ( */}
										{true ? (
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<div
														style={{
															// backgroundColor: "red",
															display: "grid",
															placeItems: "center",
															height: "100%",
															// borderRadius: "0.25rem",
															padding: "0 0.125rem",
															zIndex: 1000,
														}}
													>
														<MoreHorSVG width={16} />
													</div>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													{/* <DropdownMenuItem>Share</DropdownMenuItem> */}
													{/* <DropdownMenuItem>Open In Tab</DropdownMenuItem> */}
													{/* <DropdownMenuItem>Add Example</DropdownMenuItem> */}
													{/* <DropdownMenuItem>View Documentation</DropdownMenuItem> */}
													{/* <DropdownMenuItem>View Info</DropdownMenuItem> */}
													{/* <DropdownMenuItem>Add Pre-Run</DropdownMenuItem> */}
													{/* <DropdownMenuItem>Rename</DropdownMenuItem>
													<DropdownMenuItem>Duplicate</DropdownMenuItem>
													<DropdownMenuItem>Paste</DropdownMenuItem> */}
													<DropdownMenuItem
														onClick={() => {
															deleteItem(item.id);
															const next_tab = deleteTabAndMoveToNext(item.id);
															if (next_tab) {
																if (next_tab.type === E_TabType.HTTP_REQUEST) {
																	navigate(`/http_request/${next_tab.id}`);
																} else if (
																	next_tab.type === E_TabType.ENVIRONMENT
																) {
																	navigate(`/environment/${next_tab.id}`);
																}
															}
														}}
													>
														Delete
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										) : (
											<div />
										)}
									</div>
								</div>
							</div>

							{item.open && (
								<RecursiveTree data={item.items} depth={props.depth + 1} />
							)}
						</div>
					);
				}

				return null;
			})}
		</div>
	);
}
