import type { StateCreator } from "zustand";
import { invoke } from "@tauri-apps/api/core";

export interface RequestSlice {
	url: string;
	setUrl: (url: string) => void;

	method: string;
	setMethod: (method: string) => void;

	headers: Record<string, string>;
	setHeaders: (headers: Record<string, string>) => void;

	body: string;
	setBody: (body: string) => void;

	cookies: Record<string, string>;
	setCookies: (cookies: Record<string, string>) => void;

	response: any;
	response_headers: any;
	loading: boolean;
	error: string | null;
	sendRequest: () => Promise<void>;
}

export const createRequestSlice: StateCreator<
	RequestSlice,
	[],
	[],
	RequestSlice
> = (set, get) => ({
	url: "",
	setUrl: (url) => set({ url }),

	method: "GET",
	setMethod: (method) => set({ method }),

	headers: {},
	setHeaders: (headers) => set({ headers }),

	body: "",
	setBody: (body) => set({ body }),

	cookies: {},
	setCookies: (cookies) => set({ cookies }),

	response: null,
	response_headers: null,
	loading: false,
	error: null,
	sendRequest: async () => {
		set({ loading: true });

		const method = get().method;
		const s = get();
		const { url, body, cookies, headers, setResp } = get();

		// set({ loading: true, error: null });

		console.log(method, body, url, cookies, headers, s);


		invoke("http_request", {
			method: method,
			url: "https://jsonplaceholder.typicode.com/posts",
		})
			.then((message) => {
				console.log(message);

				set({ response: message.response_data_string });
				set({ response_headers: message.response_headers });
				set({ loading: false });
				// setResponse(message.response_data_string);
				// set_HTTP_API_Response_Body(message.response_data_string);
				// set_HTTP_API_Response_Headers(message.response_headers);
			})
			.catch((error_message) => {
				console.error(error_message);

				set({ loading: false });

			});

		// return;

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
});
