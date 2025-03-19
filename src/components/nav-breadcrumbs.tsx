import { Link, useLocation } from "react-router-dom";
import { BreadcrumbSeparator } from "./ui/breadcrumb";

export default function NavBreadCrumbs() {
	const location = useLocation();
	const paths = location.pathname.split("/").filter(Boolean);
	return (
		<ul className="flex">
			{paths.map((path, index) => (
				<li key={index} className="capitalize text-sm">
					<Link to={path}>{path}</Link>
					{index < paths.length - 1 && <BreadcrumbSeparator />}
				</li>
			))}
		</ul>
	);
}
