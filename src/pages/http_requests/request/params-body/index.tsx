import { useState } from "react";
import ParamsTable from "./params-table";
import stylex from "@stylexjs/stylex";
import PathVariablesTable from "./path-variables-table";
import TableRow from "./params-table/params-table-row";
// import MoreOptions from "../../../assets/horizontal-ellipsis.svg?react";

const styles = stylex.create({
	wrapper: {
		display: "flex",
		flexDirection: "column",
		gap: "4rem",
		height: "100%",
	},

	addRowButton: {
		display: "flex",
		gap: "0.25rem",
		alignItems: "center",
		fontSize: "0.75rem",
		padding: "0.25rem 0.5rem",
		marginTop: "0.5rem",
		backgroundColor: "var(--color-blue-primary)",
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
		color: "#787878",
		fontSize: "0.75rem",
		margin: 0,
		padding: 0,
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
});

interface I_TableOptionsProps {
	title: string;
}
const TableOptions = ({ title }: I_TableOptionsProps) => {
	return (
		<div {...stylex.props(optionsStyles.wrapper)}>
			<h2 {...stylex.props(optionsStyles.header)}>{title}</h2>
			<div {...stylex.props(optionsStyles.options)}>
				<button {...stylex.props(optionsStyles.button, optionsStyles.bulkEdit)}>
					Bulk Edit
				</button>
				<button {...stylex.props(optionsStyles.button)}>
					{/* <MoreOptions /> */}
				</button>
			</div>
		</div>
	);
};

export interface I_Row {
	key?: string;
	value?: string;
	description?: string;
}
export default function ParamsBody() {
	// const [hasPathVariables, setHasPathVariables] = useState(true);
	const [hasPathVariables] = useState(true);

	const [rows, setRows] = useState<I_Row[]>([]);

	return (
		<div {...stylex.props(styles.wrapper)}>
			<div>
				<TableOptions title={"Query Params"} />

				<ParamsTable>
					{rows.map((row) => {
						return <TableRow key={row.key} />;
					})}

					<button
						{...stylex.props(styles.addRowButton)}
						onClick={() => setRows([...rows, {} as I_Row])}
					>
						Add Row
					</button>
				</ParamsTable>
			</div>

			{hasPathVariables && (
				<div>
					<TableOptions title={"Path Variables"} />
					<PathVariablesTable />
				</div>
			)}
		</div>
	);
}
