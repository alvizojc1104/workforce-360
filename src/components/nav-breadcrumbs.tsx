import { Link, useLocation } from "react-router-dom";
import { BreadcrumbSeparator } from "./ui/breadcrumb";

export default function NavBreadCrumbs() {
	const location = useLocation();
	const paths = location.pathname.split("/").filter(Boolean);
	return (
		<div className="flex">
			{paths.map((path, index) => (
				<p key={index} className="flex items-center capitalize text-sm">
					{index === paths.length - 1 ? (
						<span>{path.replace(/-/g, " ")}</span>
					) : (
						<Link to={`/${paths.slice(0, index + 1).join("/")}`}>
							<p>{path.replace(/-/g, " ")}</p>
						</Link>
					)}
					{index < paths.length - 1 && (
						<BreadcrumbSeparator className="mx-2 list-none" />
					)}
				</p>
			))}
		</div>
	);
}
