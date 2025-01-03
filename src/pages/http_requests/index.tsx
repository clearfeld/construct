import { useEffect } from "react";
import RequestSection from "./request";
import ResponseSection from "./response";

export default function HttpRequestsPage() {
	return (
		<>
			<RequestSection />

			<ResponseSection />
		</>
	);
}
