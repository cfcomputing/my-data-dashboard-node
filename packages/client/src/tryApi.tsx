/* @jsxImportSource solid-js */
import { createSignal } from "solid-js";

export const TryApi = () => {
	const [apiResults, setApiResults] = createSignal<any>({});
	return (
		<>
			<div>
				<div id="api-results">{JSON.stringify(apiResults(), null, 2)}</div>
				<button
					onClick={async () => {
						const res = await window.fetch("http://localhost:5051/api");
						const j = await res.json();
						console.log("res", res, "j", j);
						setApiResults(j);
					}}
				>
					Try Api
				</button>
			</div>
		</>
	);
};
