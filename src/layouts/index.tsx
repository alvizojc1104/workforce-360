import { AppSidebar } from "@/components/app-sidebar";
import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
	const location = useLocation();
	const paths = location.pathname.split("/").filter(Boolean);
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<ul>
						{paths.map((path, index) => (
							<li key={index} className="capitalize text-sm">
								<Link to={path}>{path}</Link>
								{index < paths.length - 1 && (
									<BreadcrumbSeparator />
								)}
							</li>
						))}
					</ul>
				</header>
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	);
}
