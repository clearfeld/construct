import type { StateCreator } from "zustand";
import { v4 as uuidv4 } from "uuid";
// import type { T_Header, T_Method } from "./request_slice";

export type T_Tab = {
	id: string;
	status: E_TabStatus;
	title: string;
	type: E_TabType;
	requestType: string;
	data: any;
};

export enum E_TabType {
	HTTP_REQUEST = "HTTP_REQUEST",
	ENVIRONMENT = "ENVIRONMENT",
}

export enum E_TabStatus {
	SAVED = "SAVED",
	MODIFIED = "MODIFIED",
	NONE = "NONE",
}

export interface TabbarSlice {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	tabs: any[];
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	setTabs: (collection: any[]) => void;
	getTabs: () => any[];

	getActiveTab: () => T_Tab | null;

	activeTab: string | null;
	setActiveTab: (tab_id: string | null) => void;

	setTabTitle: (tab_id: string, title: string) => void;

	setTabState: (tab_id: string, state: E_TabStatus) => void;

	setTabDataField: (tab_id: string, field: string, value: any) => void;

	setTabData: (tab_id: string, data: any) => void;

	getAllTabbarSliceDataForSessionSave: () => any;
	setAllTabbarSliceDataFromSessionSave: (ts: any) => any;

	deleteTabAndMoveToNext: (tab_id: string) => any | void;
}

export const createTabbarSlice: StateCreator<
	TabbarSlice,
	[],
	[],
	TabbarSlice
> = (set, get) => ({
	tabs: [], // test_data, // [],
	setTabs: (tabs) => set({ tabs }),
	getTabs: () => get().tabs,

	activeTab: null,
	setActiveTab: (tab_id) => set({ activeTab: tab_id }),

	getActiveTab: () => {
		const tab_id = get().activeTab;
		const tabs = get().tabs;

		return tabs.find((tab) => tab.id === tab_id) ?? null;
	},

	setTabTitle: (tab_id: string, title: string) => {
		const tabs = [...get().tabs];
		const tab = tabs.find((tab) => tab.id === tab_id);

		if (tab) {
			tab.title = title;
		}

		set({ tabs });
	},

	setTabState: (tab_id: string, state: E_TabStatus) => {
		const tabs = [...get().tabs];
		const tab = tabs.find((tab) => tab.id === tab_id);

		if (tab) {
			tab.status = state;
		}

		set({ tabs });
	},

	setTabDataField: (tab_id: string, field: string, value: any) => {
		const tabs = [...get().tabs];
		const tab = tabs.find((tab) => tab.id === tab_id);

		if (tab) {
			tab.data[field] = value;
		}

		set({ tabs });
	},

	setTabData: (tab_id: string, data: any) => {
		const tabs = [...get().tabs];
		const tab = tabs.find((tab) => tab.id === tab_id);

		if (tab) {
			tab.data = data;
		}

		set({ tabs });
	},

	getAllTabbarSliceDataForSessionSave: () => {
		return {
			tabs: get().tabs,
			activeTab: get().activeTab,
		};
	},
	setAllTabbarSliceDataFromSessionSave: (ts: any) => {
		set({
			tabs: ts.tabs,
			activeTab: ts.activeTab,
		});
	},

	deleteTabAndMoveToNext: (tab_id: string) => {
		const tabs = [...get().tabs];
		const index = tabs.findIndex((tab) => tab.id === tab_id);
		if (index !== -1) {
			tabs.splice(index, 1);
		}
		set({ tabs });

		if (get().activeTab === tab_id) {
			if (tabs.length > 0) {
				if (index - 1 >= 0 && index - 1 < tabs.length) {
					set({ activeTab: tabs[index - 1].id });

					return tabs[index - 1];
				}

				return null;
			} else {
				set({ activeTab: null });
				return null;
			}
		}

		return null;
	},
});

export const test_data: T_Tab[] = [
	{
		id: uuidv4(),
		type: E_TabType.HTTP_REQUEST,
		status: E_TabStatus.MODIFIED,
		title: "U GET",
		requestType: "PUT",
		data: {},
	},

	{
		id: uuidv4(),
		type: E_TabType.HTTP_REQUEST,
		status: E_TabStatus.NONE,
		title: "S GET",
		requestType: "DELETE",
		data: {},
	},

	{
		id: uuidv4(),
		type: E_TabType.HTTP_REQUEST,
		status: E_TabStatus.NONE,
		title: "S GET",
		requestType: "POST",
		data: {},
	},

	{
		id: uuidv4(),
		type: E_TabType.HTTP_REQUEST,
		status: E_TabStatus.NONE,
		title: "S GET",
		requestType: "DELETE",
		data: {},
	},

	{
		id: uuidv4(),
		type: E_TabType.HTTP_REQUEST,
		status: E_TabStatus.MODIFIED,
		title: "S GET",
		requestType: "GET",
		data: {},
	},

	{
		id: uuidv4(),
		type: E_TabType.HTTP_REQUEST,
		status: E_TabStatus.MODIFIED,
		title: "S GET",
		requestType: "OPTIONS",
		data: {},
	},

	{
		id: uuidv4(),
		type: E_TabType.HTTP_REQUEST,
		status: E_TabStatus.NONE,
		title: "S GET",
		requestType: "HEAD",
		data: {},
	},

	{
		id: uuidv4(),
		type: E_TabType.HTTP_REQUEST,
		status: E_TabStatus.NONE,
		title: "S GET",
		requestType: "GET",
		data: {},
	},

	{
		id: uuidv4(),
		type: E_TabType.HTTP_REQUEST,
		status: E_TabStatus.NONE,
		title: "S GET",
		requestType: "GET",
		data: {},
	},

	{
		id: uuidv4(),
		type: E_TabType.HTTP_REQUEST,
		status: E_TabStatus.MODIFIED,
		title: "S GET",
		requestType: "GET",
		data: {},
	},

	{
		id: uuidv4(),
		type: E_TabType.HTTP_REQUEST,
		status: E_TabStatus.MODIFIED,
		title: "M GET",
		requestType: "GET",
		data: {},
	},

	{
		id: uuidv4(),
		type: E_TabType.HTTP_REQUEST,
		status: E_TabStatus.MODIFIED,
		title: "U PUT",
		requestType: "PUT",
		data: {},
	},
];
