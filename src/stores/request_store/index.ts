import { create } from "zustand";
import { createRequestSlice, type RequestSlice } from "./request_slice";
import { createSidebarSlice, type SidebarSlice } from "./sidebar_slice";
import { createTabbarSlice, type TabbarSlice } from "./tabbar_slice";

const useRequestStore = create<RequestSlice & SidebarSlice & TabbarSlice>()((...a) => ({
	...createRequestSlice(...a),
	...createSidebarSlice(...a),
	...createTabbarSlice(...a),
}));

export default useRequestStore;
