import { create } from "zustand";
import { createRequestSlice, type RequestSlice } from "./request_slice";
import { createSidebarSlice, type SidebarSlice } from "./sidebar_slice";
import { createTabbarSlice, type TabbarSlice } from "./tabbar_slice";
import { createEnvironmentsSlice, type EnvironmentsSlice } from "./environments_slice";

const useRequestStore = create<RequestSlice & SidebarSlice & TabbarSlice & EnvironmentsSlice>()((...a) => ({
	...createRequestSlice(...a),
	...createSidebarSlice(...a),
	...createTabbarSlice(...a),
	...createEnvironmentsSlice(...a),
}));

export default useRequestStore;
