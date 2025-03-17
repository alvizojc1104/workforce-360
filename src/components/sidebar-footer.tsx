import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { SidebarMenuButton } from "./ui/sidebar";
import { Loader2, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "@/services/axios";

const handleLogout = async (navigate: NavigateFunction) => {
	try {
		const refreshToken = localStorage.getItem("refreshToken");
		const response = await api.post("/auth/logout", {
			refreshToken: refreshToken,
		});

		console.log(response);
		localStorage.removeItem("authToken");
		localStorage.removeItem("refreshToken");
		navigate("/login");
	} catch (error) {
		console.error(error);
		alert("Failed to logout");
	}
};

export default function NavFooter() {
	const navigate = useNavigate();
	const logout = useMutation({
		mutationKey: ["logout"],
		mutationFn: () => handleLogout(navigate),
	});
	return (
		<section>
			<SidebarMenuButton className="flex cursor-pointer items-center gap-4">
				<User className="size-4" />
				Employee Portal
			</SidebarMenuButton>
			<Dialog>
				<DialogTrigger asChild>
					<SidebarMenuButton className="flex cursor-pointer items-center gap-4">
						<LogOut className="size-4" />
						Logout
					</SidebarMenuButton>
				</DialogTrigger>
				<DialogContent>
					<DialogTitle>Logout</DialogTitle>
					<DialogDescription>
						Are you sure you want to logout?
					</DialogDescription>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant={"ghost"}>Cancel</Button>
						</DialogClose>
						<Button
							variant={"destructive"}
							onClick={() => logout.mutateAsync()}
							disabled={logout.isPending}
						>
							{logout.isPending && (
								<Loader2 className="animate-spin" />
							)}
							Logout
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</section>
	);
}
