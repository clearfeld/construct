import { create } from "zustand";
import { createRequestSlice, type RequestSlice } from "./request_slice";

const useRequestStore = create<RequestSlice>()((...a) => ({
	...createRequestSlice(...a),
}));

export default useRequestStore;
