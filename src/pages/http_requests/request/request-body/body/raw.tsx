import Editor, { useMonaco } from "@monaco-editor/react";
import { CTNAME, darkThemeMonaco } from "@src/commons/monaco/cust_theme";
import { useEffect, useRef } from "react";
// import { useRecoilValue } from "recoil";
// import { HTTP_API_Response_Body_StateData } from "../../../../store/http-api-request-and-response/response-body";

function Raw() {
	const monacoRef = useRef(null);
	const editorRef = useRef(null);

	// const get_HTTP_API_Response_Body = useRecoilValue(HTTP_API_Response_Body_StateData);

	useEffect(() => {
		// FormatEditorPreview();
	}, []);

	function handleEditorWillMount(monaco: any) {
		// here is the monaco instance
		// do something before editor is mounted
		// monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
	}

	function handleEditorDidMount(editor: any, monaco: any) {
		monacoRef.current = monaco;
		editorRef.current = editor;

		monaco?.editor.defineTheme(CTNAME, darkThemeMonaco);
		monaco.editor.setTheme(CTNAME);

		setTimeout(function () {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
			editor
				.getAction("editor.action.formatDocument")
				.run()
				.then(() => {
					editor.setScrollPosition({ scrollTop: 0 });
				});
		}, 300);
	}

	function FormatEditorPreview(): void {
		if (editorRef.current) {
			setTimeout(function () {
				// @ts-ignore
				editorRef.current
					.getAction("editor.action.formatDocument")
					.run()
					.then(() => {
						// @ts-ignore
						editorRef.current.setScrollPosition({ scrollTop: 0 });
					});
			}, 300);
		}
	}

	return (
		<Editor
			// height="calc(100% - var(--response-height))"
			height="calc(100% - 1rem)"

			defaultLanguage="json"
			theme="vs-dark"
			defaultValue=""
			beforeMount={handleEditorWillMount}
			onMount={handleEditorDidMount}
			//options={{ automaticLayout: true }}
			options={{
				automaticLayout: true,
			}}
		/>
	);
}

export default Raw;
