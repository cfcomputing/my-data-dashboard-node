import express, { Application, Router, Request, Response } from "express";

export class Api {
	expressApp: Application;
	router: Router;

	constructor(expressApp: Application) {
		this.expressApp = expressApp;
		this.router = express.Router();
		expressApp.use("/api", [
			this.router.get("/", this.defaultHandler),
			this.router.post("/", this.defaultHandler),
		]);
	}

	async defaultHandler(req: Request, res: Response) {
		console.log(req.query, req.body);
		res.send({ hello: "chris" });
	}
}
