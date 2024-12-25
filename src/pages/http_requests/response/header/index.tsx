import React, { useState } from "react";
import stylex from "@stylexjs/stylex";
// import HeadersTable from "./headers-table";
// import MoreOptions from "../../../assets/horizontal-ellipsis.svg?react";
import TableRow from "./header-row";
import useRequestStore from "@src/stores/request_store";
import { RequestSlice } from "@src/stores/request_store/request_slice";
// import { useRecoilValue } from "recoil";
// import { HTTP_API_Response_Headers_StateData } from "../../../store/http-api-request-and-response/response-headers";

const styles = stylex.create({
    wrapper: {
        display: "flex",
        flexDirection: "column",
    },

    table: {
        width: "100%",
        height: "100%",
        //backgroundColor: "gray",
    },

    headerRow: {
        display: "grid",
        gridTemplateColumns: "auto 1fr 1fr",
        alignItems: "center",
        border: "1px solid #292929",
    },

    header: {
        fontSize: "0.75rem",
        color: "#ABABAB",
        padding: 0,
        margin: 0,
    },

    flexGrow: {
        flexGrow: 1,
    },

    cell: {
        padding: "0.25rem 0.5rem",
        display: "flex",
        alignItems: "center",
    },
    borderRightReset: {
        borderRight: "unset",
    },
    borderRight: {
        borderRight: "1px solid #292929",
    },

    dragHandle: {
        cursor: "pointer",
        padding: "0.25rem 0.5rem",
        backgroundColor: {
            ":hover": "#292929",
        },

        //hidden for now
        opacity: 0,
    },
});

const optionsStyles = stylex.create({
    wrapper: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
    },

    header: {
        fontSize: "0.75rem",
        margin: 0,
        padding: 0,
    },

    textColor: {
        color: "#787878",
    },
});

export interface I_Header {
    key?: string;
    value?: string;
    description?: string;
}

export default function Headers() {
    // const get_response_headers = useRecoilValue(HTTP_API_Response_Headers_StateData);

    const get_response_headers = useRequestStore((state: RequestSlice) => state.response_headers);

    return (
        <div {...stylex.props(styles.wrapper)}>
            {/* {get_response_headers[0]} */}

            <div>
                <div {...stylex.props(styles.headerRow)}>
                    <div {...stylex.props(styles.cell, styles.borderRight)}>

                    </div>

                    <div {...stylex.props(styles.cell, styles.flexGrow, styles.borderRight)}>
                        <h1 {...stylex.props(styles.header)}>Key</h1>
                    </div>

                    <div {...stylex.props(styles.cell, styles.flexGrow)}>
                        <h1 {...stylex.props(styles.header)}>Value</h1>
                    </div>

                    {/* <div {...stylex.props(styles.cell, styles.flexGrow)}>
                        <h1 {...stylex.props(styles.header)}>Description</h1>
                    </div> */}
                </div>


                {get_response_headers !== null && get_response_headers.map((header_line, index: number) => {
                    const split_idx = header_line.indexOf(":");
                    if (split_idx === -1) return;

                    const key = header_line.substring(0, split_idx);
                    const value = header_line.substring(split_idx + 1, header_line.length);

                    const header = {
                        key: key,
                        value: value,
                        description: "",
                    };

                    return (
                        <TableRow key={index} header={header} />
                    );
                })}
            </div>
        </div>
    );
}
