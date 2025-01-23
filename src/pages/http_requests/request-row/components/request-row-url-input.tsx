import {
	//	$createParagraphNode,
	//	$createTextNode,
	$getRoot,
	type LexicalEditor,
	type EditorState,
	//	RootNode,
	//	type TextNode,
} from "lexical";

import * as stylex from "@stylexjs/stylex";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import { useEffect, useRef } from "react";
import useRequestStore from "@src/stores/request_store";
// import type { RequestSlice } from "@src/stores/request_store/request_slice";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import type { RequestSlice } from "@src/stores/request_store/request_slice";
import { useEffect, useRef } from "react";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
// import { E_TabStatus } from "@src/stores/request_store/tabbar_slice";

const styles = stylex.create({
	editorContainer: {
		flex: 1,
		position: "relative",
		backgroundColor: "var(--background-sub)",
		height: "1.75rem",
		borderRadius: "0.25rem",
		paddingHorizontal: "0.25rem",
		display: "flex",
		alignItems: "center",
		outline: "none",
	},

	editor: {
		width: "100%",
		color: "var(--color-white)",
		whiteSpace: "nowrap",
		borderRadius: "0.25rem",
		outline: "none",
		padding: "0.125rem 0.25rem",
		border: "0.0625rem solid var(--border-color)",

		":focus": {
			border: "0.0625rem solid var(--cds-blue-300)",
		}
	},

	placeholder: {
		padding: "0.125rem 0.25rem",
		overflow: "hidden",
		position: "absolute",
		textOverflow: "ellipsis",
		left: "0.25rem",
		display: "inline-block",
		userSelect: "none",
		pointerEvents: "none",
		top: 0,
		bottom: 0,
		color: "var(--color-placeholder)",
	},
});

// const newlinesRegex = /[\n\r]/g;

// const variableRegex = /\{\{([^\}]+)\}\}/g;

// type CustomTextNode = {
// 	type: "variable" | "text";
// 	value: string;
// 	start: number;
// 	end: number;
// };

// function SingleLineAndVariablePlugin({
// 	availableVariables,
// }: { availableVariables: string[] }): null {
// 	const [editor] = useLexicalComposerContext();
// 	const prevLength = useRef(0);

// 	useEffect(() => {
// 		return editor.registerNodeTransform(RootNode, (rootNode: RootNode) => {
// 			const paragraph = $createParagraphNode();
// 			const nodes: TextNode[] = [];
// 			const textContent = rootNode
// 				.getAllTextNodes()
// 				.map((node) => node.getTextContent())
// 				.join("");
// 			const variableNodes: CustomTextNode[] = [];
// 			const customTextNodes: CustomTextNode[] = [];

// 			if (prevLength.current === textContent.length) {
// 				// remove line break
// 				if (newlinesRegex.test(textContent)) {
// 					const curNodes = rootNode.getAllTextNodes();
// 					paragraph.append(...curNodes);
// 					rootNode.clear().append(paragraph);
// 					rootNode.selectEnd();
// 				}
// 				return;
// 			}
// 			prevLength.current = textContent.length;
// 			let match;

// 			while ((match = variableRegex.exec(textContent)) !== null) {
// 				const variableNode: CustomTextNode = {
// 					start: match.index,
// 					end: variableRegex.lastIndex,
// 					value: match[1],
// 					type: "variable",
// 				};
// 				variableNodes.push(variableNode);
// 			}

// 			if (variableNodes.length > 0) {
// 				let firstTextNode: CustomTextNode = {
// 					start: 0,
// 					end: variableNodes[0].start,
// 					value: textContent.substring(0, variableNodes[0].start),
// 					type: "text",
// 				};
// 				customTextNodes.push(firstTextNode);

// 				for (let i = 0; i < variableNodes.length; i++) {
// 					if (i === 0) {
// 						customTextNodes.push(variableNodes[i]);
// 					} else {
// 						const prev = variableNodes[i - 1];
// 						const current = variableNodes[i];
// 						const textNode: CustomTextNode = {
// 							start: prev.end,
// 							end: current.start,
// 							value: textContent.substring(prev.end, current.start),
// 							type: "text",
// 						};
// 						customTextNodes.push(textNode);
// 						customTextNodes.push(current);
// 					}
// 				}

// 				const lastTextNode: CustomTextNode = {
// 					start: variableNodes[variableNodes.length - 1].end,
// 					end: textContent.length,
// 					value: textContent.substring(
// 						variableNodes[variableNodes.length - 1].end,
// 					),
// 					type: "text",
// 				};
// 				customTextNodes.push(lastTextNode);
// 			} else {
// 				customTextNodes.push({
// 					start: 0,
// 					end: textContent.length,
// 					value: textContent,
// 					type: "text",
// 				});
// 			}

// 			for (let i = 0; i < customTextNodes.length; i++) {
// 				const node = customTextNodes[i];
// 				if (node.start === node.end) {
// 					continue;
// 				}
// 				if (node.type === "text") {
// 					const textNode = $createTextNode(node.value);
// 					nodes.push(textNode);
// 				} else {
// 					const textNode = $createTextNode(`{{${node.value}}}`);
// 					if (availableVariables.includes(node.value)) {
// 						textNode.setStyle("color: var(--color-code-string);");
// 					} else {
// 						// TODO: change me
// 						textNode.setStyle("color: var(--color-code-string);");
// 					}
// 					nodes.push(textNode);
// 				}
// 			}

//       for (let i = 0; i < nodes.length; i++) {
// 				console.log(nodes[i].getTextContent());
// 			}

// 			paragraph.append(...nodes);
// 			rootNode.clear().append(paragraph);
// 			rootNode.selectEnd();
// 		});
// 	}, [editor]);

// 	return null;
// }

function onError(error: Error) {
	console.error(error);
}

const Placeholder = () => {
	return (
		<div {...stylex.props(styles.placeholder)}>Enter URL or paste text</div>
	);
};

export function RequestRowUrlInput() {
	// TODO: need to update lexical line with url when enabling sidebar
	// const url = useRequestStore((state: RequestSlice) => state.url);
	const setUrl = useRequestStore((state: RequestSlice) => state.setUrl);
	const setUrlEditorRef = useRequestStore(
		(state: RequestSlice) => state.setUrlEditorRef,
	);

	const internalEditorRef = useRef<LexicalEditor>();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (internalEditorRef.current) {
			setUrlEditorRef(internalEditorRef.current);
		}
		// if(internalEditorRef.current && props.value && props.value !== "") {
		// 	const initialEditorState = internalEditorRef.current.parseEditorState(
		// 		props.value,
		// 	);
		// 	internalEditorRef.current.setEditorState(initialEditorState);
		// }
	}, []);

	// const setTabState = useRequestStore((state) => state.setTabState);
	// const getId = useRequestStore((state) => state.getId);

	return (
		<LexicalComposer
			initialConfig={{
				namespace: "MyEditor",
				theme: {},
				onError,
			}}
		>
			<EditorRefPlugin editorRef={internalEditorRef} />

			<div {...stylex.props(styles.editorContainer)}>
				{/* <RichTextPlugin
          contentEditable={<ContentEditable {...stylex.props(styles.editor)}/>}
          placeholder={<Placeholder/>}
          ErrorBoundary={LexicalErrorBoundary}
        /> */}

				{/* EditorRefPlugin must be first in render order*/}

				<PlainTextPlugin
					contentEditable={<ContentEditable {...stylex.props(styles.editor)} />}
					placeholder={<Placeholder />}
					ErrorBoundary={LexicalErrorBoundary}
				/>

				<OnChangePlugin
					onChange={(editorState: EditorState) => {
						editorState.read(() => {
							const textContent = editorState.read(() =>
								$getRoot().getTextContent(),
							);
							// console.log(textContent);
							setUrl(textContent);

							// TODO: dont update state on first render update ie when tab switch otherwise false dirty state is set
							// setTabState(getId(), E_TabStatus.MODIFIED);
						});

						// editorStateRef.current = editorState;
					}}
				/>

				{/* <SingleLineAndVariablePlugin availableVariables={[]} /> */}
				<HistoryPlugin />
			</div>
		</LexicalComposer>
	);
}
