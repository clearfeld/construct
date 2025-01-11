// TODO: Figure out what to do with unofficial status codes
// should include nginx, cloudflare, microsoft, and aws custom ones at minimun.

export const HTTPStatusCodes = {
    // 1XX - Informational Response
    100: {
        title: "Continue",
        description: ""
    },

    101: {
        title: "Switching Protocols",
        description: ""
    },

    102: {
        title: "Processing",
        description: ""
    },

    103: {
        title: "Early Hints",
        description: ""
    },

    // 2XX - Success

    200: {
        title: "OK",
        description: ""
    },

    201: {
        title: "Created",
        description: ""
    },

    202: {
        title: "Accepted",
        description: ""
    },

    203: {
        title: "Non-Authoritative Information",
        description: ""
    },

    204: {
        title: "No Content",
        description: ""
    },

    205: {
        title: "Reset Content",
        description: ""
    },

    206: {
        title: "Partial Content",
        description: ""
    },

    207: {
        title: "Multi-Status",
        description: ""
    },

    208: {
        title: "Already Reported",
        description: ""
    },

    226: {
        title: "IM Used",
        description: ""
    },

    // Unofficial 2XX Codes

    // Apache HTTP Server
    // 218: {
    //     title: "This is fine",
    //     description: ""
    // },

    // 3XX - Redirection

    300: {
        title: "Multiple Choices",
        description: ""
    },

    301: {
        title: "Moved Permanently",
        description: ""
    },

    302: {
        title: "Found",
        description: ""
    },

    303: {
        title: "See Other",
        description: ""
    },

    304: {
        title: "Not Modified",
        description: ""
    },

    305: {
        title: "Use Proxy",
        description: ""
    },

    306: {
        title: "Switch Proxy",
        description: ""
    },

    307: {
        title: "Temporary Redirect",
        description: ""
    },

    308: {
        title: "Permanent Redirect",
        description: ""
    },

    // 4XX - Client Error

    400: {
        title: "Bad Request",
        description: ""
    },

    401: {
        title: "Unauthorized",
        description: ""
    },

    402: {
        title: "Payment Required",
        description: ""
    },

    403: {
        title: "Forbidden",
        description: ""
    },

    404: {
        title: "Not Found",
        description: ""
    },

    405: {
        title: "Method Not Allowed",
        description: ""
    },

    406: {
        title: "Not Acceptable",
        description: ""
    },

    407: {
        title: "Proxy Authentication Required",
        description: ""
    },

    408: {
        title: "Request Timeout",
        description: ""
    },

    409: {
        title: "Conflict",
        description: ""
    },

    410: {
        title: "Gone",
        description: ""
    },

    411: {
        title: "Length Required",
        description: ""
    },

    412: {
        title: "Precondition Failed",
        description: ""
    },

    413: {
        title: "Payload Too Large",
        description: ""
    },

    414: {
        title: "URI Too Long",
        description: ""
    },

    415: {
        title: "Unsupported Media Type",
        description: ""
    },

    416: {
        title: "Range Not Satisfiable",
        description: ""
    },

    417: {
        title: "Expectation Failed",
        description: ""
    },

    418: {
        title: "I'm a teapot",
        description: ""
    },

    421: {
        title: "Misdirected Request",
        description: ""
    },

    422: {
        title: "Unprocessable Entity",
        description: ""
    },

    423: {
        title: "Locked",
        description: ""
    },

    424: {
        title: "Failed Dependency",
        description: ""
    },

    425: {
        title: "Too Early",
        description: ""
    },

    426: {
        title: "Upgrade Required",
        description: ""
    },

    428: {
        title: "Precondition Required",
        description: ""
    },

    429: {
        title: "Too Many Requests",
        description: ""
    },

    431: {
        title: "Request Header Fields Too Large",
        description: ""
    },

    451: {
        title: "Unavailable For Legal Reasons",
        description: ""
    },

    // 4XX Codes
    // Larvael Framework
    // 419: {
    //     title: "Page Expired",
    //     description: ""
    // },
    // Spring Framework
    // 420: {
    //     title: "Method Failure",
    //     description: ""
    // },


    // 5XX - Server Error

    500: {
        title: "Internal Server Error",
        description: ""
    },

    501: {
        title: "Not Implemented",
        description: ""
    },

    502: {
        title: "Bad Gateway",
        description: ""
    },

    503: {
        title: "Service Unavailable",
        description: ""
    },

    504: {
        title: "Gateway Timeout",
        description: ""
    },

    505: {
        title: "HTTP Version Not Supported",
        description: ""
    },

    506: {
        title: "Variant Also Negotiates",
        description: ""
    },

    507: {
        title: "Insufficient Storage",
        description: ""
    },

    508: {
        title: "Loop Detected",
        description: ""
    },

    510: {
        title: "Not Extended",
        description: ""
    },

    511: {
        title: "Network Authentication Required",
        description: ""
    },
};