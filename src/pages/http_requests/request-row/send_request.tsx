import { Button } from "@controlkit/ui";
import useRequestStore from "@src/stores/request_store";
import type { T_Header } from "@src/stores/request_store/request_slice";
import { invoke } from "@tauri-apps/api/core";

export default function SendRequestBtn() {
	const getHTTPRequest = useRequestStore((state) => state.getHTTPRequest);
	const getEnabledEnvironmentAndDetails = useRequestStore(
		(state) => state.getEnabledEnvironmentAndDetails,
	);

    const setLoading = useRequestStore((state) => state.setLoading);
    const setResponse = useRequestStore((state) => state.setResponse);
    const setResponseHeaders = useRequestStore((state) => state.setResponseHeaders);
    const setResponseCookies = useRequestStore((state) => state.setResponseCookies);

	const setError = useRequestStore((state) => state.setError);

    function ReplaceManagedVariable(env: any, sub_target: any): string {
        console.log(env.variables);

        let s = sub_target;
        for(const variable of env.variables) {
            console.log("VAR - ", s, variable.key, variable.initial_value, variable.current_value);

            if(variable.current_value !== "") {
                if(variable.current_value === "NULL") {
                    s = s.replace(`{{${variable.key}}}`, "null");
                    continue;
                }

                s = s.replace(`{{${variable.key}}}`, variable.current_value);
            }

            if(variable.initial_value !== "") {
                if(variable.initial_value === "NULL") {
                    s = s.replace(`{{${variable.key}}}`, "null");
                    continue;
                }

                s = s.replace(`{{${variable.key}}}`, variable.initial_value);
            }

            // console.log(s.replace(`{{${variable.key}}}`, variable.value));
            // s = s.replace(`{{${variable.key}}}`, variable.value);
        }

        return s;
    }

	function AttemptToSendHTTPRequest() {
		setError(null);
		setResponse(null);
        setLoading(true);

		const { url, method, autoHeaders, headers, body, cookies } =
			getHTTPRequest();

		// const method = get().method;
		// const s = get();
		// const { url, body, cookies, autoHeaders, headers } = get();

		// set({ loading: true, error: null });

		console.group("AttemptToSendHTTPRequest");
		console.log("METHOD - ", method);
		console.log("URL - ", url);
		console.log("AUTO HEADERS - ", autoHeaders);
		console.log("HEADERS - ", headers);
		console.log("BODY - ", body);
		console.log("COOKIES - ", cookies);

		// TODO: verify data before invoking
		// console.log(url);
		const trimmedUrl = url.trim();
		if (trimmedUrl.length === 0) {
			// TODO: error state ui
			// set({ error: "URL cannot be empty", loading: false });
			return;
		}

		const env = getEnabledEnvironmentAndDetails();

		console.log("ENV - ", env);

		// url
		// body
		// headers

		// get().environments();

		// console.log(trimmedUrl);

        console.log("SUBBED");

        let subbed_url = trimmedUrl;
        let subbed_body = body;
        let subbed_headers = structuredClone(headers);

        subbed_url = ReplaceManagedVariable(env, subbed_url);
        subbed_body = ReplaceManagedVariable(env, subbed_body);
        for(let idx = 0; idx < subbed_headers.length; ++idx) {
            subbed_headers[idx].value = ReplaceManagedVariable(env, subbed_headers[idx].value);
        }

		const filtered_headers = subbed_headers
        .filter((h: T_Header) => h.enabled)
        .map((h: T_Header) => `${h.key}: ${h.value}`)
        .join(", ");

        console.log("METHOD - ", method);
		console.log("URL - ", subbed_url);
		console.log("AUTO HEADERS - ", autoHeaders);
		console.log("HEADERS - ", subbed_headers);
        console.log("FILTERED HEADERS - ", filtered_headers);
		console.log("BODY - ", subbed_body);
		console.log("COOKIES - ", cookies);

		invoke("http_request", {
			method: method.value,
			headers: filtered_headers,
			url: subbed_url,
			body: subbed_body,
			cookies: "",
		})
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			.then((message: any) => {
				console.log(message);

				setResponse(message.response_data_string);
				setResponseHeaders(message.response_headers);
				setResponseCookies(message.response_cookies);
				setLoading(false);

				// setResponse(message.response_data_string);
				// set_HTTP_API_Response_Body(message.response_data_string);
				// set_HTTP_API_Response_Headers(message.response_headers);
			})
			.catch((eobj) => {
				console.error(eobj);

				setError(eobj.error_message);

                setLoading(false);
			});

		console.groupEnd();
	}

	return (
		<Button
			onClick={(_) => {
				AttemptToSendHTTPRequest();
			}}
		>
			Send
		</Button>
	);
}
