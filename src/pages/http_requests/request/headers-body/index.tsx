import type { MouseEventHandler } from "react";
import HeadersTable from "./headers-table";
import stylex from "@stylexjs/stylex";
import TableRow from "./headers-table/headers-table-row";
import { Button, ButtonVariants } from "@controlkit/ui";
// import { T_Header } from "@src/stores/request_store/request_slice";
import { v4 as uuidv4 } from "uuid";
import useRequestStore from "@src/stores/request_store";
import { E_TabStatus } from "@src/stores/request_store/tabbar_slice";

// import MoreOptions from "../../../assets/horizontal-ellipsis.svg?react";
// import EyeOpen from "../../../assets/eye-open.svg?react";
// import EyeClosed from "../../../assets/eye-closed.svg?react";

const styles = stylex.create({
	wrapper: {
		display: "flex",
		flexDirection: "column",
		gap: "4rem",
		padding: "1rem",
		boxSizing: "border-box",
		overflow: "auto",
		height:
			"calc(100vh - var(--navbar-height) - var(--footer-height) - var(--response-height) - 6.75rem)",
	},

	addRowButton: {
		height: "1.75rem",
		fontSize: "0.75rem",
		// marginTop: "0.5rem",
	},
});

const optionsStyles = stylex.create({
	wrapper: {
		display: "flex",
		alignItems: "center",
		gap: "0.5rem",
	},

	options: {
		marginLeft: "auto",
		display: "flex",
		alignItems: "center",
		gap: "1rem",
	},
	header: {
		fontSize: "0.75rem",
		margin: 0,
		padding: 0,
	},
	textColor: {
		color: "#787878",
	},
	bulkEdit: {
		color: "#787878",
		fontSize: "0.75rem",
		fontWeight: 700,
	},

	button: {
		padding: "0",
		color: "#787878",
		display: "flex",
		alignItems: "center",
		gap: "0.5rem",
		fontSize: "0.75rem",
		boxShadow: "unset",
		border: "unset",
	},

	autoHideButton: {
		height: "1.5rem",
		padding: "0.5rem 0.5rem",
		// marginTop: "0.25rem",
		// display: "flex",
		// gap: "0.25rem",
		// alignItems: "center",
		// fontSize: "0.75rem",
		// color: "#787878",
		// padding: "0.25rem 0.5rem",
	},
});

export interface I_TableOptionsProps {
	title: string;
	amount?: number;
	onClick?: MouseEventHandler;
	hide?: boolean;
}

const TableOptions = ({
	title,
	amount,
	onClick,
	hide,
}: I_TableOptionsProps) => {
	return (
		<div {...stylex.props(optionsStyles.wrapper)}>
			<h2 {...stylex.props(optionsStyles.header, optionsStyles.textColor)}>
				{title}
			</h2>

			<Button
				onClick={onClick}
				variant={ButtonVariants.GHOST}
				extend={optionsStyles.autoHideButton}
			>
				{!hide ? (
					<>
						{/* <EyeOpen /> */}
						<p {...stylex.props(optionsStyles.textColor)}>{amount} hidden</p>
					</>
				) : (
					<>
						{/* <EyeClosed /> */}
						<p {...stylex.props(optionsStyles.textColor)}>
							Hide auto-generated headers
						</p>
					</>
				)}
			</Button>

			<div {...stylex.props(optionsStyles.options)}>
				<button {...stylex.props(optionsStyles.button, optionsStyles.bulkEdit)}>
					{/* Bulk Edit */}
				</button>
				<button {...stylex.props(optionsStyles.button)}>
					{/* <MoreOptions /> */}
				</button>
			</div>
		</div>
	);
};

export default function HeadersBody() {
	const autoHeaders = useRequestStore((state) => state.autoHeaders);

	const headers = useRequestStore((state) => state.headers);
	const setHeaders = useRequestStore((state) => state.setHeaders);

	const isAutoHeadersVisible = useRequestStore(
		(state) => state.isAutoHeadersVisible,
	);
	const setIsAutoHeadersVisible = useRequestStore((state) => state.setIsAutoHeadersVisible);

	const setTabState = useRequestStore((state) => state.setTabState);
	const getId = useRequestStore((state) => state.getId);
	const setTabDataField = useRequestStore((state) => state.setTabDataField);

	return (
		<div {...stylex.props(styles.wrapper)}>
			<div>
				<TableOptions
					title={"Headers"}
					amount={autoHeaders.length}
					onClick={() => setIsAutoHeadersVisible(!isAutoHeadersVisible)}
					hide={isAutoHeadersVisible}
				/>

				<div
					style={{
						marginTop: "0.5rem",
					}}
				/>

				<HeadersTable>
					{isAutoHeadersVisible &&
						autoHeaders.map((autoHeader) => {
							return <TableRow key={autoHeader.id} header={autoHeader} autoHeaderRow />;
						})}
					{headers.map((header) => {
						return <TableRow key={header.id} header={header} />;
					})}
				</HeadersTable>

				<div
					style={{
						marginTop: "0.75rem",
					}}
				/>

				<Button
					extend={styles.addRowButton}
					onClick={() => {
						const nheaders = [
							...headers,
							{
								id: uuidv4(),
								auto: false,
								enabled: true,
								key: "",
								value: "",
								description: "",
							},
						];
						setHeaders(nheaders);

						setTabDataField(getId(), "headers", nheaders);

						setTabState(getId(), E_TabStatus.MODIFIED);
					}}
				>
					Add Row
				</Button>
			</div>
		</div>
	);
}
