import type { StateCreator } from "zustand";
import { invoke } from "@tauri-apps/api/core";
// TODO: AC-81 use v7 when possible
import { v4 as uuidv4 } from "uuid";
import type { LexicalEditor } from "lexical";
import { getVersion } from "@tauri-apps/api/app";

const APP_VERSION = await getVersion();

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
		value: `ConstructRuntime/${APP_VERSION}`,
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

// TODO: create a subset with only fields required
// export type T_Http_Request {
//
// };

export interface RequestSlice {
	getCurrentRequest: () => any;
	setCurrentRequest: (
		id: string,
		name: string,
		url: string,
		method: T_Method,
		autoHeaders: T_Header[],
		headers: T_Header[],
		body: string,
		// cookies: Record<string, string>,
		response: any,
		response_headers: any,
		// response_cookies: any,
	) => any;

	id: string;
	setId: (url: string) => void;
	getId: () => string;

	name: string;
	setName: (url: string) => void;
	getName: () => string;

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
	setResponse: (response: any) => void;
	response_headers: any;
	setResponseHeaders: (response: any) => void;
	response_cookies: any;
	setResponseCookies: (response: any) => void;
	loading: boolean;
	setLoading: (arg: boolean) => void;
	error: string | null;

	// meta
	updated_at: string;
	getUpdatedAt: () => string;
	created_at: string;
	getCreatedAt: () => string;

	getHTTPRequest: () => any;

	setRequestParameters: (
		id: string,
		name: string,
		url: string,
		method: T_Method,
		autoHeaders: T_Header[],
		headers: T_Header[],
		body: string,
		// cookies:
		updated_at: string,
		created_at: string,
	) => void;

	getAllDataForSessionSave: () => any;
	setAllDataFromSessionSave: (rs: any) => any;
}

export const createRequestSlice: StateCreator<
	RequestSlice,
	[],
	[],
	RequestSlice
> = (set, get) => ({
	getCurrentRequest: () => {
		return {
			// req
			id: get().id,
			name: get().name,
			url: get().url,
			method: get().method,
			autoHeaders: get().autoHeaders,
			headers: get().headers,
			body: get().body,
			cookies: get().cookies,

			// res
			response: get().response,
			response_headers: get().response_headers,
			response_cookies: get().response_cookies,

			// meta
			updated_at: get().updated_at,
			created_at: get().created_at,
		};
	},

	setCurrentRequest: (
		id,
		name,
		url,
		method,
		autoHeaders,
		headers,
		body,
		// cookies: Record<string, string>,
		response,
		response_headers,
		// response_cookies: any,
	) => {
		set({
			id,
			name,
			url,
			method,
			autoHeaders,
			headers,
			body,
			// cookies,

			response,
			response_headers,
			// response_cookies,
		});
	},

	id: "",
	setId: (id) => set({ id }),
	getId: () => get().id,

	name: "",
	setName: (name) => set({ name }),
	getName: () => get().name,

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
	setResponse: (response: any) => {
		set({ response: response });
	},
	response_headers: null,
	setResponseHeaders: (headers: any) => {
		set({ response_headers: headers });
	},
	response_cookies: null,
	setResponseCookies: (cookies: any) => {
		set({ response_cookies: cookies });
	},
	loading: false,
	setLoading: (arg: boolean) => set({ loading: arg }),
	error: null,

	// meta
	updated_at: "",
	getUpdatedAt: () => get().updated_at,
	created_at: "",
	getCreatedAt: () => get().created_at,

	getHTTPRequest: () => {
		return {
			url: get().url,
			method: get().method,
			autoHeaders: get().autoHeaders,
			headers: get().headers,
			body: get().body,
			cookies: get().cookies,
		};
	},

	setRequestParameters: (
		id: string,
		name: string,
		url: string,
		method: T_Method,
		autoHeaders: T_Header[],
		headers: T_Header[],
		body: string,
		// cookies:
		updated_at: string,
		created_at: string,
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
			name,
			url,
			method,
			autoHeaders,
			headers,
			body,
			// cookies,

			response: null,
			updated_at,
			created_at,
		});
	},

	getAllDataForSessionSave: () => {
		return {
			id: get().id,
			name: get().name,
			url: get().url,
			method: get().method,
			isAutoHeadersVisible: get().isAutoHeadersVisible,
			autoHeaders: get().autoHeaders,
			headers: get().headers,
			body: get().body,
			cookies: get().cookies,
			response: get().response,
			response_headers: get().response_headers,
			response_cookies: get().response_cookies,
		};
	},

	setAllDataFromSessionSave: (rs: any) => {
		set({
			id: rs.id,
			name: rs.name,
			url: rs.url,
			method: rs.method,
			isAutoHeadersVisible: rs.isAutoHeadersVisible,
			autoHeaders: rs.autoHeaders,
			headers: rs.headers,
			body: rs.body,
			cookies: rs.cookies,
			response: rs.response,
			response_headers: rs.response_headers,
			response_cookies: rs.response_cookies,
		});
	},
});
