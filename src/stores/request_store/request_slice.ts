import type { StateCreator } from "zustand";
import { invoke } from "@tauri-apps/api/core";
// TODO: AC-81 use v7 when possible
import { v4 as uuidv4 } from "uuid";
import type { LexicalEditor } from "lexical";

export type T_Method = {
	value: string;
	textColor: string;
};

export const methods: T_Method[] = [
	{
		value: "GET",
		textColor: "#4CAB61",
		// textColor: "var(--cds-green-400)",
	},

	{
		value: "POST",
		textColor: "#D68323",
		// textColor: "var(--cds-blue-400)",
	},

	{
		value: "PUT",
		textColor: "#2E8ABE",
		// textColor: "var(--cds-purple-700)",
	},

	{
		value: "PATCH",
		textColor: "#7FC27E",
		// textColor: "var(--cds-yellow-500)",
	},

	{
		value: "DELETE",
		textColor: "#CA3939",
		// textColor: "var(--cds-red-500)",
	},

	{
		value: "HEAD",
		textColor: "var(--cds-blue-600)",
	},

	{
		value: "OPTIONS",
		textColor: "var(--cds-green-600)",
	},
];

export const autoHeaders = [
	// Fixed

	// TODO:
	// {
	// 	id: uuidv4(),
	// 	auto: true,
	// 	enabled: true,
	// 	key: "Authorization",
	// 	value: "",
	// 	description: "",
	// },

	{
		id: uuidv4(),
		auto: true,
		enabled: true,
		key: "Construct-Token",
		value: "<calculated when request is sent>",
		description: "",
	},

	// TODO: make editable

	{
		id: uuidv4(),
		// auto: false,
		auto: true,
		enabled: true,
		key: "User-Agent",
		value: "ConstructRuntime/0.0.1",
		description: "",
	},

	{
		id: uuidv4(),
		// auto: false,
		auto: true,
		enabled: true,
		key: "Accept",
		value: "*/*",
		description: "",
	},

	{
		id: uuidv4(),
		// auto: false,
		auto: true,
		enabled: true,
		key: "Accept-Encoding",
		// TODO:
		// value: "gzip, deflate, br",
		value: "gzip, deflate",
		description: "",
	},

	// TODO:
	// {
	// 	id: uuidv4(),
	// 	auto: true,
	// 	enabled: true,
	// 	key: "Connection",
	// 	value: "keep-alive",
	// 	description: "",
	// },
];

export type T_Header = {
	id: string;
	auto: boolean;
	enabled: boolean;
	key: string;
	value: string;
	description: string;
};

export interface RequestSlice {
	id: string;
	setId: (url: string) => void;
	getId: () => string;

	url: string;
	setUrl: (url: string) => void;
	getUrl: () => string;

	urlEditorRef: LexicalEditor | null;
	setUrlEditorRef: (ref: LexicalEditor) => void;

	method: T_Method;
	setMethod: (method: T_Method) => void;
	getMethod: () => T_Method;

	// Authorization TODO:

	isAutoHeadersVisible: boolean;
	setIsAutoHeadersVisible: (arg: boolean) => void;

	autoHeaders: T_Header[];
	setAutoHeaders: (headers: T_Header[]) => void;
	setAutoHeader: (header: T_Header) => void;

	headers: T_Header[];
	setHeaders: (headers: T_Header[]) => void;
	setHeader: (header: T_Header) => void;
	getHeaders: () => T_Header[];

	body: string;
	setBody: (body: string) => void;
	getBody: () => string;

	cookies: Record<string, string>;
	setCookies: (cookies: Record<string, string>) => void;

	response: any;
	response_headers: any;
	response_cookies: any;
	loading: boolean;
	error: string | null;
	sendRequest: () => Promise<void>;

	setRequestParameters: (
		url: string,
		method: T_Method,
		autoHeaders: T_Header[],
		headers: T_Header[],
		body: string,
		// cookies:
	) => void;
}

export const createRequestSlice: StateCreator<
	RequestSlice,
	[],
	[],
	RequestSlice
> = (set, get) => ({
	id: "",
	setId: (id) => set({ id }),
	getId: () => get().id,

	url: "",
	setUrl: (url) => set({ url }),
	getUrl: () => get().url,

	urlEditorRef: null,
	setUrlEditorRef: (ref: LexicalEditor) => set({ urlEditorRef: ref }),

	method: methods[0],
	setMethod: (method) => set({ method }),
	getMethod: () => get().method,

	isAutoHeadersVisible: false,
	setIsAutoHeadersVisible: (isAutoHeadersVisible) =>
		set({ isAutoHeadersVisible }),

	autoHeaders: autoHeaders,
	setAutoHeaders: (headers: T_Header[]) => set({ headers }),
	setAutoHeader: (header: T_Header) => {
		const ns = [...get().autoHeaders];

		const index = ns.findIndex((h) => h.id === header.id);
		if (index !== -1) {
			ns[index] = header;
		}

		set({ autoHeaders: ns });
	},

	headers: [],
	setHeaders: (headers: T_Header[]) => set({ headers }),
	setHeader: (header: T_Header) => {
		const ns = [...get().headers];

		const index = ns.findIndex((h) => h.id === header.id);
		if (index !== -1) {
			ns[index] = header;
		}

		set({ headers: ns });
	},
	getHeaders: () => get().headers,

	body: "",
	setBody: (body) => set({ body }),
	getBody: () => get().body,

	cookies: {},
	setCookies: (cookies) => set({ cookies }),

	response: null,
	response_headers: null,
	response_cookies: null,
	loading: false,
	error: null,
	sendRequest: async () => {
		set({ loading: true });

		const method = get().method;
		const s = get();
		const { url, body, cookies, autoHeaders, headers } = get();

		// set({ loading: true, error: null });

		console.log(method, body, url, cookies, autoHeaders, headers, s);

		const filtered_headers = headers
			.filter((h) => h.enabled)
			.map((h) => `${h.key}: ${h.value}`)
			.join(", ");

		// return;

		invoke("http_request", {
			method: method.value,
			headers: filtered_headers,
			url: url,
			body: body,
			cookies: "",
		})
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			.then((message: any) => {
				console.log(message);

				set({ response: message.response_data_string });
				set({ response_headers: message.response_headers });
				set({ response_cookies: message.response_cookies });
				set({ loading: false });

				// setResponse(message.response_data_string);
				// set_HTTP_API_Response_Body(message.response_data_string);
				// set_HTTP_API_Response_Headers(message.response_headers);
			})
			.catch((error_message) => {
				console.error(error_message);

				set({ loading: false });
			});

		// try {
		// 	const response = await fetch(url, {
		// 		method,
		// 		headers: {
		// 			...headers,
		// 			Cookie: Object.entries(cookies)
		// 				.map(([key, value]) => `${key}=${value}`)
		// 				.join("; "),
		// 		},
		// 		body: method !== "GET" ? body : undefined,
		// 	});
		// 	const responseData = await response.json();
		// 	set({ response: responseData, loading: false });
		// } catch (error) {
		// 	set({ error: error.message, loading: false });
		// }
	},

	setRequestParameters: (
		id: string,
		url: string,
		method: T_Method,
		autoHeaders: T_Header[],
		headers: T_Header[],
		body: string,
		// cookies:
	) => {
		const uef = get().urlEditorRef;
		if (uef) {
			// Marko: lexical is so disgusting to use...
			const default_editor_text_state = {
				root: {
					children: [
						{
							children: [
								{
									detail: 0,
									format: 0,
									mode: "normal",
									style: "",
									text: url,
									type: "text",
									version: 1,
								},
							],
							direction: "ltr",
							format: "",
							indent: 0,
							type: "paragraph",
							version: 1,
							textFormat: 0,
							textStyle: "",
						},
					],
					direction: "ltr",
					format: "",
					indent: 0,
					type: "root",
					version: 1,
				},
			};

			uef.setEditorState(
				uef.parseEditorState(JSON.stringify(default_editor_text_state)),
			);
		}

		set({
			id,
			url,
			method,
			autoHeaders,
			headers,
			body,
			// cookies,

			response: null,
		});
	},
});
