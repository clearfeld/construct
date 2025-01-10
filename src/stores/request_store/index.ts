import { create } from "zustand";
import { createRequestSlice, type RequestSlice } from "./request_slice";
import { createSidebarSlice, type SidebarSlice } from "./sidebar_slice";
import { createTabbarSlice, type TabbarSlice } from "./tabbar_slice";
import { createEnvironmentsSlice, type EnvironmentsSlice } from "./environments_slice";
import { createToolbarSlice, type ToolbarSlice } from "./toolbar_slice";

const useRequestStore = create<RequestSlice & SidebarSlice & TabbarSlice & EnvironmentsSlice & ToolbarSlice>()((...a) => ({
	...createRequestSlice(...a),
	...createSidebarSlice(...a),
	...createTabbarSlice(...a),
	...createEnvironmentsSlice(...a),
	...createToolbarSlice(...a),
}));

export default useRequestStore;
