import { create } from "zustand";
import { createRequestSlice, type RequestSlice } from "./request_slice";
import { createSidebarSlice, type SidebarSlice } from "./sidebar_slice";

const useRequestStore = create<RequestSlice & SidebarSlice>()((...a) => ({
	...createRequestSlice(...a),
	...createSidebarSlice(...a),
}));

export default useRequestStore;
