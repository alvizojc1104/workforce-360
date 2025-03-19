import { AppSidebar } from "@/components/app-sidebar";
import NavBreadCrumbs from "@/components/nav-breadcrumbs";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-fit py-4 shrink-0 items-center gap-2  px-4">
					<SidebarTrigger className="-ml-1" />
					<NavBreadCrumbs />
				</header>
				<main className="px-4">
					<Outlet />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
