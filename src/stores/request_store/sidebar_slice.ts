import type { StateCreator } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type { T_Header, T_Method } from "./request_slice";

export enum E_SidebarSection {
	HOME = "HOME",
	COLLECTIONS = "COLLECTIONS",
	CONNECTED = "CONNECTED",
	DB = "DB",
	ENVIRONMENT = "ENVIRONMENT",
	HISTORY = "HISTORY",
	NOTE = "NOTE",
	TREND = "TREND",
}

export interface SidebarSlice {
	currentSidebarTab: E_SidebarSection | null;
	setCurrentSidebarTab: (tab: E_SidebarSection | null) => void;

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	collection: any[];
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	setCollection: (collection: any[]) => void;
	getCollection: () => any[];

	addCollection: () => void;
	addFolder: (collection_id: string) => void;
	addRequest: (collection_id: string) => void;

	deleteItem: (id: string) => void;

	getAllSidebarSliceDataForSessionSave: () => any;
	setAllSidebarSliceDataFromSessionSave: (ss: any) => any;
}

export const createSidebarSlice: StateCreator<
	SidebarSlice,
	[],
	[],
	SidebarSlice
> = (set, get) => ({
	currentSidebarTab: E_SidebarSection.COLLECTIONS,
	setCurrentSidebarTab: (tab: E_SidebarSection | null) => {
		set({ currentSidebarTab: tab });
	},

	collection: [], // test_data,
	setCollection: (collection) => set({ collection }),
	getCollection: () => get().collection,

	addCollection: () => {
		const ns = structuredClone(get().collection);

		const dn = new Date();
		const unixTimestamp = dn.getTime();

		ns.push({
			id: uuidv4(),
			type: "collection",
			favorite: false,
			name: "New Collection",
			open: true,
			items: [],

			updated_at: unixTimestamp,
			created_at: unixTimestamp,
		});

		set({ collection: ns });
	},

	addFolder: (collection_id: string) => {
		const ns = structuredClone(get().collection);

		const dn = new Date();
		const unixTimestamp = dn.getTime();

		addToTargetIfExists(ns, collection_id, {
			id: uuidv4(),
			type: "folder",
			favorite: false,
			name: "New Folder",
			open: true,
			items: [],

			updated_at: unixTimestamp,
			created_at: unixTimestamp,
		});

		set({ collection: ns });
	},

	addRequest: (id: string) => {
		const ns = structuredClone(get().collection);

		const dn = new Date();
		const unixTimestamp = dn.getTime();

		addToTargetIfExists(ns, id, {
			id: uuidv4(),
			type: "http_request",
			favorite: false,
			name: "New Request",
			url: " ", // NOTE: Lexical breaks if "" - investigate
			method: "GET",
			headers: [],
			body: "",
			open: true,
			items: [],

			updated_at: unixTimestamp,
			created_at: unixTimestamp,
		});

		set({ collection: ns });
	},

	deleteItem: (id: string) => {
		const ns = structuredClone(get().collection);

		deleteTargetIfExists(ns, id, false);

		set({ collection: ns });
	},

	getAllSidebarSliceDataForSessionSave: () => {
		return {
			currentSidebarTab: get().currentSidebarTab,
			collection: get().collection,
		};
	},
	setAllSidebarSliceDataFromSessionSave: (ss: any) =>  {
		set({
			currentSidebarTab: ss.currentSidebarTab,
			collection: ss.collection,
		});
	},
});

export function FindTargetIfExists(nc: any, id: string) {
	for (let i = 0; i < nc.length; ++i) {
		// console.log("NC", nc[i].id);

		if (nc[i].id === id) {
			return nc[i];
		}

		if (nc[i].items) {
			return FindTargetIfExists(nc[i].items, id);
		}
	}
}

export function UpdateHttpRequestTargetIfExists(
	nc: any,
	id: string,
	name: string,
	url: string,
	method: T_Method,
	headers: T_Header[],
	body: string,

	updated_at: string | number,
	created_at: string | number,
) {
	for (let i = 0; i < nc.length; ++i) {
		// console.log("NC", nc[i].id);

		if (nc[i].id === id) {
			nc[i].url = url;
			nc[i].name = name;
			nc[i].method = method.value;
			nc[i].headers = headers;
			nc[i].body = body;

			nc[i].updated_at = updated_at;
			nc[i].created_at = created_at;

			return;
		}

		if (nc[i].items) {
			UpdateHttpRequestTargetIfExists(
				nc[i].items,
				id,
				name,
				url,
				method,
				headers,
				body,

				updated_at,
				created_at,
			);
		}
	}
}

function addToTargetIfExists(nc: any, id: string, value: any) {
	for (let i = 0; i < nc.length; ++i) {
		// console.log("NC", nc[i].id);

		if (nc[i].id === id) {
			nc[i].items.push(value);
			// console.log("FOUND", nc[i]);
			return;
		}

		if (nc[i].items) {
			addToTargetIfExists(nc[i].items, id, value);
		}
	}
}

export function updateTargetIfExists(
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

function deleteTargetIfExists(nc: any, id: string, _delete_all: boolean) {
	for (let i = 0; i < nc.length; ++i) {
		// console.log("NC", nc[i].id);

		// TODO: in the future will need to more throughly delete each item
		// if (delete_all) {
		//     delete  nc
		//     return;
		// }

		if (nc[i].id === id) {
			// TODO: better delete items in future (not needed for the time being)
			// deleteTargetIfExists(nc[i].items, id, true);

			nc.splice(i, 1);
			// console.log("FOUND", nc[i]);
			return;
		}

		if (nc[i].items) {
			deleteTargetIfExists(nc[i].items, id, false);
		}
	}
}

export const test_data = [
	{
		id: uuidv4(),
		type: "collection",
		name: "1 - New Collection",
		open: true,
		favorite: false,

		items: [
			{
				id: uuidv4(),
				type: "http_request",
				favorite: false,
				name: "1.1 New Request",
				url: "",
				method: "GET",
				headers: [],
				body: "",
				open: true,
				items: [],
			},
		],
	},

	{
		id: uuidv4(),
		type: "collection",
		name: "2 - New Collection",
		open: true,
		favorite: true,

		items: [
			{
				id: uuidv4(),
				type: "http_request",
				favorite: false,
				name: "2.1 New Request",
				url: "http://echo.free.beeceptor.com/sample-request?author=beeceptor",
				method: "POST",
				headers: [
					{
						id: uuidv4(),
						key: "Header",
						value: "Test Value",
						enabled: true,
					},
				],
				body: `{
    "name": "John Doe",
    "age": 30,
    "city": "New York"
}`,
				open: true,
				items: [],
			},

			{
				id: uuidv4(),
				type: "folder",
				name: "2.2 - New Folder",
				open: true,
				favorite: false,

				items: [
					{
						id: uuidv4(),
						type: "http_request",
						favorite: false,
						name: "2.2.1 New Request",
						url: "",
						method: "GET",
						headers: [],
						body: "",
						open: true,
						items: [
							// TODO: example request ie postman sample
						],
					},

					{
						id: uuidv4(),
						type: "http_request",
						favorite: false,
						name: "2.2.2 New Request",
						url: "",
						method: "DELETE",
						headers: [],
						body: "",
						open: false,
						items: [],
					},
				],
			},
		],
	},
];
