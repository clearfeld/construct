import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect, useRef } from "react";
// import { useRecoilValue } from "recoil";
// import { HTTP_API_Response_Body_StateData } from "@store/http-api-request-and-response/response-body";

// import CopySVG from "@assets/copy.svg?react";
// import SearchSVG from "@assets/search2.svg?react";

function Body() {
    const monacoRef = useRef(null);
    const editorRef = useRef(null);

    // const get_HTTP_API_Response_Body = useRecoilValue(HTTP_API_Response_Body_StateData);

    useEffect(() => {
        FormatEditorPreview();
    }, []);

    function handleEditorWillMount(monaco: any) {
        // here is the monaco instance
        // do something before editor is mounted
        // monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    }

    function handleEditorDidMount(editor: any, monaco: any) {
        monacoRef.current = monaco;
        editorRef.current = editor;

        setTimeout(function () {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            editor.getAction("editor.action.formatDocument").run().then(() => {
                editor.setScrollPosition({ scrollTop: 0 });
            });
        }, 300);
    }

    function FormatEditorPreview(): void {
        if (editorRef.current) {
            setTimeout(function () {
                // @ts-ignore
                editorRef.current.getAction("editor.action.formatDocument").run()
                    .then(() => {
                        // @ts-ignore
                        editorRef.current.setScrollPosition({ scrollTop: 0 });
                    });
            }, 300);
        }
    }

    return (
        <div
            style={{
                height: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: "2.75rem",
                    alignItems: "center",
                    padding: "0 0.5rem",
                }}
            >
                <div
                    style={{
                        display: "flex",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            paddingRight: "1rem",
                        }}
                    >
                        <div
                            className="no-select"
                            style={{
                                height: "1.75rem",
                                backgroundColor: "var(--background-sub)",
                                color: "var(--text)",
                                width: "7rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "0.5rem 0 0 0.5rem",
                            }}
                        >
                            Pretty
                        </div>

                        <div
                            className="no-select"
                            style={{
                                height: "1.75rem",
                                backgroundColor: "var(--background-compliment)",
                                color: "var(--text-sub)",
                                width: "7rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            Raw
                        </div>

                        <div
                            className="no-select"
                            style={{
                                height: "1.75rem",
                                backgroundColor: "var(--background-compliment)",
                                color: "var(--text-sub)",
                                width: "7rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            Preview
                        </div>

                        <div
                            className="no-select"
                            style={{
                                height: "1.75rem",
                                backgroundColor: "var(--background-compliment)",
                                color: "var(--text-sub)",
                                width: "7rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "0 0.5rem 0.5rem 0"
                            }}
                        >
                            Visualize
                        </div>
                    </div>

                    <div>
                        JSON
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "0.75rem"
                    }}
                >
                    <div
                        role="button"
                    >
                        {/* <CopySVG /> */}
                    </div>

                    <div
                        role="button"
                    >
                        {/* <SearchSVG /> */}
                    </div>
                </div>
            </div>

            <Editor
                // height="35vh"
                height="calc(100% - 2.75rem)"
                defaultLanguage="json"
                theme="vs-dark"
                defaultValue="// some comment"
                // value={get_HTTP_API_Response_Body !== null ? get_HTTP_API_Response_Body : "// some comment"}
                value={"// Some comment"}
                beforeMount={handleEditorWillMount}
                onMount={handleEditorDidMount}
                // options={{ automaticLayout: true }}
                options={{
                    readOnly: true,
                    automaticLayout: true
                }}
            />
        </div >
    );
}

export default Body;