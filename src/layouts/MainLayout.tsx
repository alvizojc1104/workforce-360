import { AppSidebar } from "@/components/sidebar/app-sidebar";
import SidebarInsetHeader from "@/components/sidebar/sidebar-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<SidebarInsetHeader />
				<main className="px-4 pt-4">
					<Outlet />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
