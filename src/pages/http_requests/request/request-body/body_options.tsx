// import { SelectOption } from "../../select";

export type OPTION_NONE = {
	label: "None";
	value: "none";
};

export type OPTION_FORM_DATA = {
	label: "Form Data";
	value: "form_data";
};

export type OPTION_URL_ENCODED = {
	label: "URL Encoded";
	value: "url_encoded";
};

export type OPTION_RAW = {
	label: "Raw";
	value: "raw";
};

export type OPTION_GRAPHQL = {
	label: "GraphQL";
	value: "graphql";
};

export type OPTION_VALUES =
	| OPTION_NONE
	| OPTION_FORM_DATA
	| OPTION_URL_ENCODED
	| OPTION_RAW
	| OPTION_GRAPHQL;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const OPTIONS: any[] =
	// : SelectOption[]
	[
		{
			label: "None",
			value: "none",
		},
		{
			label: "Form Data",
			value: "form_data",
		},
		{
			label: "URL Encoded",
			value: "url_encoded",
		},
		{
			label: "Raw",
			value: "raw",
		},
		{
			label: "GraphQL",
			value: "graphql",
		},
	];

export default OPTIONS;
