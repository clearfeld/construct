import type { StateCreator } from "zustand";

export enum E_ToolbarHTTPRequestSections {
	DOCUMENTATION = "DOCUMENTATION",
	COMMENTS = "COMMENTS",
	CODE = "CODE",
	INFO = "INFO",
}

export interface ToolbarSlice {
	currentToolbarTab: E_ToolbarHTTPRequestSections | null;
	setCurrentToolbarTab: (tab: E_ToolbarHTTPRequestSections | null) => void;
}

export const createToolbarSlice: StateCreator<
	ToolbarSlice,
	[],
	[],
	ToolbarSlice
> = (set, _get) => ({
	currentToolbarTab: null,
	setCurrentToolbarTab: (tab: E_ToolbarHTTPRequestSections | null) => {
		set({ currentToolbarTab: tab });
	},
});
