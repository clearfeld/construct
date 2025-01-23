import useRequestStore from "@src/stores/request_store";
import * as stylex from "@stylexjs/stylex";

import RecursiveTree from "./recursive_tree";

import { useRef, useState } from "react";

import ArrowRightSVG from "../../../assets/arrow-right.svg?react";
import ArrowDownSVG from "../../../assets/arrow-down.svg?react";
import MoreHorSVG from "../../../assets/more-hor.svg?react";

import {
	Button,
	ButtonVariants,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Label,
} from "@controlkit/ui";

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

	title_input: {
		color: "#A6A6A6",
		fontSize: "0.875rem",
		textWrap: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		fontWeight: "bold",
		backgroundColor: "transparent",
		border: "none",
		outline: "none",
		cursor: "pointer",
	},

	title_input_active: {
		color: "var(--text-color)",
		fontSize: "0.875rem",
		textWrap: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		fontWeight: "bold",
		backgroundColor: "var(--background-sub)",
		border: "0.0625rem solid var(--cds-blue-300)",
		outline: "none",
	},
});

export default function CollectionItem(props: any) {
	const item = props.item;
	const original_name = useRef<string>(item.name);

	const collection = useRequestStore((state) => state.collection);
	const setCollection = useRequestStore((state) => state.setCollection);

	const addFolder = useRequestStore((state) => state.addFolder);
	const addRequest = useRequestStore((state) => state.addRequest);
	const deleteItem = useRequestStore((state) => state.deleteItem);

	const [_isHoveredFolder, setIsHoveredFolder] = useState<boolean>(false);
	const [_isHoveredOther, setIsHoveredOther] = useState<boolean>(false);

	const [renaming, setRenaming] = useState<boolean>(false);

	function updateTargetIfExists(
		nc: any,
		id: string,
		field: string,
		value: any,
	) {
		for (let i = 0; i < nc.length; ++i) {
			// console.log("NC", nc[i].id);

			if (nc[i].id === id) {
				nc[i][field] = value;
				// console.log("FOUND", nc[i]);
				return;
			}

			if (nc[i].items) {
				updateTargetIfExists(nc[i].items, id, field, value);
			}
		}
	}

	function toggleField(id: string, field: string, value: any) {
		const nc = structuredClone(collection);
		// console.log("START", id, nc);
		updateTargetIfExists(nc, id, field, value);
		// console.log("END", nc);
		setCollection(nc);
	}

	return (
		<div>
			<div {...stylex.props(styles.row)}>
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
							gridTemplateColumns: "0.75rem 1fr",
							gap: "0.5rem",
							alignItems: "center",
							padding: "0.125rem 0.5rem",
							marginLeft: `${props.depth * 0.75}rem`,
						}}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();

							toggleField(item.id, "open", !item.open);
						}}
						onMouseEnter={(e) => {
							e.preventDefault();
							e.stopPropagation();

							setIsHoveredFolder(true);
						}}
						onMouseLeave={(e) => {
							e.preventDefault();
							e.stopPropagation();

							setIsHoveredFolder(false);
						}}
					>
						{/* <ArrowRightSVG width={8} height={12} /> */}
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<div
						// onClick={() => {
						// 	toggleField(item.id, "open", !item.open);
						// }}
						// // biome-ignore lint/a11y/useSemanticElements: <explanation>
						// role="button"
						// tabIndex={0}
						>
							{item.open ? (
								<ArrowDownSVG width={12} height={12} />
							) : (
								<ArrowRightSVG width={12} height={12} />
							)}
						</div>

						{/* <FolderSVG width={14} height={14} /> */}

						{renaming ? (
							<input
								{...stylex.props(styles.title_input_active)}
								value={item.name}
								onChange={(e) => {
									toggleField(item.id, "name", e.target.value);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										setRenaming(false);
										return;
									}

									if (e.key === "Escape") {
										toggleField(item.id, "name", original_name.current);
										setRenaming(false);
									}
								}}
							/>
						) : (
							<p {...stylex.props(styles.title_input)}>{item.name}</p>
						)}
					</div>

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

					<div>
						{/* {isHoveredFolder ? ( */}
						{/* {true ? ( */}
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
								<DropdownMenuItem
									onClick={() => {
										setRenaming(true);
									}}
								>
									Rename
								</DropdownMenuItem>

								<DropdownMenuItem
									onClick={() => {
										addRequest(item.id);
									}}
								>
									Add Request
								</DropdownMenuItem>

								<DropdownMenuItem
									onClick={() => {
										addFolder(item.id);
									}}
								>
									Add Folder
								</DropdownMenuItem>

								{/* <DropdownMenuItem>Rename</DropdownMenuItem>
													<DropdownMenuItem>Duplicate</DropdownMenuItem>
													<DropdownMenuItem>Paste</DropdownMenuItem> */}

								<DropdownMenuItem
									onClick={() => {
										deleteItem(item.id);
									}}
								>
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						{/* ) : (
										 	<div />
										 )} */}
					</div>
				</div>
			</div>

			{item.open && (
				// biome-ignore lint/complexity/noUselessFragments: <explanation>
				<>
					{item.items.length > 0 ? (
						<RecursiveTree data={item.items} depth={props.depth + 1} />
					) : (
						<div
							style={{
								marginLeft: `${props.depth * 0.75}rem`,
							}}
						>
							<Label
								style={{
									marginLeft: "1rem",
									fontSize: "0.75rem",
									color: "var(--text-sub)",
								}}
							>
								This collection is empty. To start:
							</Label>

							<Button
								variant={ButtonVariants.LINK}
								onClick={() => {
									addRequest(item.id);
								}}
							>
								Add a request
							</Button>
						</div>
					)}
				</>
			)}

			{/* {collection.items.map((item) => {
								return (

									<div
										key={item.id}
										style={{
											display: "grid",
											gridTemplateColumns: "0.5rem 1rem 1fr 1rem 1rem",
											gap: "0.5rem",
											alignItems: "center",
											padding: "0.125rem 0.5rem",
										}}
									>
										<ArrowRightSVG width={8} height={12} />
										<FolderSVG width={14} height={14} />

										<p
											style={{
												color: "#A6A6A6",
												fontSize: "0.875rem",
												textWrap: "nowrap",
												overflow: "hidden",
												textOverflow: "ellipsis",
											}}
										>
											Search Search S
										</p>

										<FavoriteSVG width={15} height={15} />
										<MoreHorSVG
											width={16}
											style={{
												top: "0.125rem",
												position: "relative",
											}}
										/>
									</div>
								);
							})} */}
		</div>
	);
}
