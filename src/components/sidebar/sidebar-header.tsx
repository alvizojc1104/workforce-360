import NavBreadCrumbs from "../nav-breadcrumbs";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";

export default function SidebarInsetHeader() {
	const { open: sidebarOpen } = useSidebar();

	return (
		<header className="flex h-fit py-4 border-b shrink-0 items-center gap-2  px-4">
			{!sidebarOpen && <SidebarTrigger className="-ml-1" />}
			<NavBreadCrumbs />
		</header>
	);
}
