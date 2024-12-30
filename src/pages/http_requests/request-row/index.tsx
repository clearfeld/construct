import * as stylex from "@stylexjs/stylex";
import {
	RequestRowSelect,
	RequestRowSelectOption,
} from "./components/request-row-select.tsx";
import { useState } from "react";
import { RequestRowUrlInput } from "./components/request-row-url-input.tsx";
import { RequestRowDropdown } from "./components/request-row-dropdown.tsx";
// import SaveSVG from "@assets/save.svg?react";
import React from "react";

import { invoke } from "@tauri-apps/api/core";
import { Button } from "@controlkit/ui";
import useRequestStore from "@src/stores/request_store";

// import { useSetRecoilState } from 'recoil';
// import { HTTP_API_Response_Body_StateData } from "@store/http-api-request-and-response/response-body.ts";
// import { HTTP_API_Response_Headers_StateData } from "@store/http-api-request-and-response/response-headers.ts";

const styles = stylex.create({
	container: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: "var(--color-sidebar-bg)",
	},

	requestUrlSection: {
		flex: 1,
		height: "2.25rem",
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: "0.5rem",
		paddingVertical: "0.25rem",
		columnGap: "0.25rem",
		boxSizing: "border-box",
	},

	folderPathContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: "0.5rem",
		boxSizing: "border-box",
		paddingHorizontal: "0.5rem",
		paddingVertical: "0.25rem",
	},

	path: {
		color: "var(--color-sidebar-text)",
		cursor: "pointer",
		":hover": {
			color: "var(--color-white)",
			opacity: 0.8,
		},
		fontSize: "0.875rem",
	},

	lastPath: {
		color: "var(--color-white)",
		fontSize: "0.875rem",
	},

	httpMethodTextColor: {
		color: "#3E7CC5",
		fontSize: "0.875rem",
	},
});

interface RequestRowProps {}

// const options: RequestRowSelectOption[] = [

const path = ["collection 1", "folder 1", "folder 2", "folder 3", "request 1"];

// @ts-ignore
export function RequestRow(props: RequestRowProps) {

	const { sendRequest } = useRequestStore();

	// http api requests
	// const set_HTTP_API_Response_Body = useSetRecoilState(
	// 	HTTP_API_Response_Body_StateData,
	// );
	// const set_HTTP_API_Response_Headers = useSetRecoilState(
	// 	HTTP_API_Response_Headers_StateData,
	// );

	// web socket

	// graphql

	// protobuf

	// etc...

	return (
		<div {...stylex.props(styles.container)}>
			{/* <div {...stylex.props(styles.folderPathContainer)}>
				<p {...stylex.props(styles.httpMethodTextColor)}>HTTP</p>
				{path.map((folder, index) => {
					return (
						<React.Fragment key={index}>
							<p
								key={index}
								{...stylex.props(
									index !== path.length - 1 ? styles.path : styles.lastPath,
								)}
							>
								{folder}
							</p>
							{index !== path.length - 1 && <p> / </p>}
						</React.Fragment>
					);
				})}
			</div> */}

			<br />

			<div {...stylex.props(styles.requestUrlSection)}>
				<RequestRowSelect />

				<RequestRowUrlInput />

				<Button
					onClick={(e) => {
						sendRequest();
					}}
				>
					Send
				</Button>

				{/* <RequestRowDropdown
					renderButtonContent={() => (
						<p
							style={{ width: "5rem", color: "inherit" }}
							// onClick={() => {
							// 	console.log("here");

							// 	invoke("api_request", {
							// 		method: selectedMethodOption.value,
							// 		url: "https://jsonplaceholder.typicode.com/posts",
							// 	})
							// 		.then((message) => {
							// 			console.log(message);

							// 			set_HTTP_API_Response_Body(message.response_data_string);
							// 			set_HTTP_API_Response_Headers(message.response_headers);
							// 		})
							// 		.catch((error_message) => {
							// 			console.error(error_message);
							// 		});
							// }}
						>
							title
						</p>
					)}
					variant={"primary"}
					onClick={() => {}}
				>
					<p style={{ width: "10rem" }}>Save and Download</p>
				</RequestRowDropdown> */}

				{/* <RequestRowDropdown
					renderButtonContent={() => (
						// <SaveSVG />
						<div />
					)}
					variant={"secondary"}
					onClick={() => {}}
				>
					<p style={{ width: "10rem" }}>Save and Download</p>
				</RequestRowDropdown> */}
			</div>

			<br />
		</div>
	);
}
