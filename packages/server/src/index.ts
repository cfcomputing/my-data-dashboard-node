import path from "node:path";
import http from "node:http";
import express from "express";
import compression from "compression";
import dotenv from "dotenv";

import { Api } from "./api/api";
import { setupExpressCORS } from "./utils/setupExpressCors";

// // import { Server } from "./server";
// // (async () => {
// // 	const server = new Server();
// // 	console.log("server constructed server->", server);
// // 	await server.start();
// // 	console.log("server started");
// // })();

dotenv.config();

const expressApp = express();
const server = new http.Server(expressApp);
expressApp.use(compression());
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: false }));

setupExpressCORS(expressApp);

// serve up the client dist for now, this will prob need to change on distribution
const clientBuildPath = path.join(__dirname, "../../client/dist");
console.log(`Using clientBuildPath of ${clientBuildPath}`);
expressApp.use("/", express.static(clientBuildPath));

(async () => {
	const api = new Api(expressApp);
	console.log("api", api);
	server.listen(5051, () => {
		console.log("server listening");
	});
})();
