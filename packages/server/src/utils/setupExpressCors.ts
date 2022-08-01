import type { Request, Response, NextFunction, Express } from "express";

import { getHeaders } from "./expressHeaders";

export function setupExpressCORS(expressApp: Express) {
	expressApp.use(async (req: Request, res: Response, next: NextFunction) => {
		const headers = (await getHeaders(req)).headers;
		Object.keys(headers).forEach((key) => {
			res.header(key, headers[key]);
		});
		next();
	});
}
