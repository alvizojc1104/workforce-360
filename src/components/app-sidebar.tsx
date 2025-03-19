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
import {
	Link,
	NavigateFunction,
	useLocation,
	useNavigate,
} from "react-router-dom";
import { Logo } from "./logo";
import api from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import { NavUser } from "./nav-user";
import { useAuth } from "@/hooks/use-auth";

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

const handleLogout = async (navigate: NavigateFunction) => {
	try {
		const refreshToken = localStorage.getItem("refreshToken");
		await api.post("/auth/logout", {
			refreshToken: refreshToken,
		});

		localStorage.removeItem("authToken");
		localStorage.removeItem("refreshToken");
		navigate("/login");
	} catch (error) {
		console.error(error);
		alert("Logout failed");
	}
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation();
	const navigate = useNavigate();
	const { auth, logout } = useAuth();
	const logoutMutation = useMutation({
		mutationKey: ["logout"],
		mutationFn: () => handleLogout(navigate),
		onSuccess() {
			logout();
		},
	});

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
				<NavUser
					logout={logoutMutation}
					key={"nav-user-dropdown"}
					user={{
						avatar: "/workforce.svg",
						email: auth.user.email,
						name: "Mike Alvizo",
					}}
				/>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
