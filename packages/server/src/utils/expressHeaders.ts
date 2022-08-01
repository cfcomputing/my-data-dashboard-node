// utility for http headers related to cors
import type { Request } from "express";

interface headerTypeDef {
	[key: string]: string;
}
interface HeadersTypeDef {
	headers: headerTypeDef;
}

export const getHeaders = (req: Request) =>
	new Promise<HeadersTypeDef>(async (resolve) => {
		const ui_address = process.env.UI_ADDRESS || "";
		let port = process.env.UI_PORT || "";
		if (port.length) {
			port = `:${port}`;
		}
		const localHostURLS =
			process.env.NODE_ENV === "development"
				? [
						`http://localhost${port}`,
						`http://127.0.0.1${port}`,
						`http://0.0.0.0${port}`,
						`http://localhost:5000`,
						"http://localhost:3000",
				  ]
				: [
						"http://localhost:8080", // Allow npx serve for now
						"http://localhost:5000", // Allow npx serve for now
				  ];
		const domainWhiteList = new Set(localHostURLS);

		if (ui_address.length) {
			domainWhiteList.add(ui_address);
		}

		const origin = Array.isArray(req.headers.origin)
			? req.headers.origin.join("")
			: req.headers.origin || "";
		const corsOrigin = domainWhiteList.has(origin) ? origin : "";

		const headers = {
			headers: {
				"Access-Control-Allow-Origin": corsOrigin,
				"Access-Control-Allow-Headers":
					"Origin, X-Requested-With, Content-Type, Accept",
			},
		};
		resolve(headers);
	});
