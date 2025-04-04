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
	SidebarTrigger,
	useSidebar,
} from "@/components/ui/sidebar";

import { Link } from "react-router-dom";
import { navigation } from "./navigation";
import { useAuth } from "@/hooks/use-auth";
import { NavUser } from "./nav-user";
import { ThemeSwitch } from "../ThemeSwitch";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { open: sidebarOpen } = useSidebar();
	const { logout } = useAuth();
	return (
		<Sidebar {...props} collapsible="icon">
			<SidebarHeader>
				<section className="flex items-center justify-between gap-2 ">
					<img
						src="/favicon.ico"
						alt="logo"
						className="size-8 rounded-full p-1"
					/>
					{sidebarOpen && (
						<div className="flex items-center">
							<ThemeSwitch />
							<SidebarTrigger />
						</div>
					)}
				</section>
			</SidebarHeader>
			<SidebarContent className="overflow-y-hidden">
				<ScrollArea className="flex-1 h-full">
					{navigation.navMain.map((item) => (
						<SidebarGroup key={item.title}>
							<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{item.items.map((item) => (
										<SidebarMenuItem key={item.title}>
											<SidebarMenuButton
												asChild
												isActive={location.pathname.startsWith(
													item.url
												)}
											>
												<Link
													to={item.url}
													className="flex gap-2 items-center"
												>
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
					<ScrollBar orientation="vertical" hidden />
				</ScrollArea>
			</SidebarContent>
			<SidebarFooter>
				<NavUser
					logout={logout}
					user={{
						name: "Mike Alvizo",
						email: "Supoer",
						avatar: "awdawdawd",
					}}
				/>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
