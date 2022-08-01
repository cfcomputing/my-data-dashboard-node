// @ts-ignore
import tingodb from "tingodb";

export class Server {
	constructor() {
		console.log("Server constructor");
	}

	async start() {
		console.log("Executing server");
		const Db = tingodb().Db;
		const db = new Db("tingodb/", {});
		const collection = db.collection("my_first_collection");

		const res = await collection.insertMany([
			{
				name: "hi",
			},
			{
				rando: "foo",
			},
		]);
		const { error, results } = await collection
			.find({ name: "hi" })
			.toArrayAsPromise();
		console.log("error", error, "results", results, "count", results.length);
	}
}
