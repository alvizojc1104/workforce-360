import * as React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import {
	Bell,
	Building2,
	Calendar,
	ChartColumn,
	Clock,
	DollarSign,
	Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./logo";
import NavFooter from "./sidebar-footer";

const navigation = {
	versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
	navMain: [
		{
			title: "Main",
			items: [
				{
					title: "Dashboard",
					url: "/dashboard",
					icon: ChartColumn,
				},
				{
					title: "Employees",
					url: "/employees",
					icon: Users,
				},
				{
					title: "Establishments",
					url: "/establishments",
					icon: Building2,
				},
				{
					title: "Shifts",
					url: "/shifts",
					icon: Clock,
				},
				{
					title: "Schedule",
					url: "/schedule",
					icon: Calendar,
				},
				{
					title: "Payroll",
					url: "/payroll",
					icon: DollarSign,
				},
			],
		},
		{
			title: "Other",
			items: [
				{
					title: "Settings",
					url: "/settings",
					icon: Users,
				},
				{
					title: "Notifications",
					url: "/notifications",
					icon: Bell,
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation();
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<Logo />
			</SidebarHeader>
			<SidebarContent>
				{navigation.navMain.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											asChild
											isActive={item.url.startsWith(
												location.pathname
											)}
										>
											<Link to={item.url}>
												<item.icon className="size-4" />
												{item.title}
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter>
				<NavFooter />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
