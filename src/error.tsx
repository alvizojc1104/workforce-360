import { MoveLeft } from "lucide-react";
import { Link, useRouteError } from "react-router-dom";

type RouteError = {
	statusText?: string;
	message?: string;
	data?: string;
};

export default function ErrorPage() {
	const error = useRouteError() as RouteError | null;
	console.log(error);

	return (
		<div className="flex flex-col items-center justify-center gap-6 h-screen">
			<h1>{error?.statusText}</h1>
			<p>{error?.message}</p>
			<p>{"An error occured. Please try again later."}</p>
			<Link to={"/"} className="underline flex gap-2 items-center">
				<MoveLeft size={16} />
				Home
			</Link>
		</div>
	);
}
