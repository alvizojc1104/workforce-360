import { ChevronsUpDown, Loader2, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from "../ui/dialog";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { Button } from "../ui/button";
import { UseMutationResult } from "@tanstack/react-query";

export function NavUser({
	user,
	logout,
}: {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
	logout: UseMutationResult<void, unknown, void, unknown>;
}) {
	const { isMobile } = useSidebar();
	const [openDialog, setOpenDialog] = useState(false);
	return (
		<>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage
										src={user.avatar}
										alt={user.name}
									/>
									<AvatarFallback className="rounded-lg">
										WF
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										{user.name}
									</span>
									<span className="truncate text-xs">
										{user.email}
									</span>
								</div>
								<ChevronsUpDown className="ml-auto size-4" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
							side={isMobile ? "bottom" : "right"}
							align="end"
							sideOffset={4}
						>
							<DropdownMenuLabel className="p-0 font-normal">
								<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
									<Avatar className="h-8 w-8 rounded-lg">
										<AvatarImage
											src={user.avatar}
											alt={user.name}
										/>
										<AvatarFallback className="rounded-lg">
											CN
										</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">
											{user.name}
										</span>
										<span className="truncate text-xs">
											{user.email}
										</span>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />

							<DropdownMenuGroup>
								<DropdownMenuItem>
									<User />
									View Account
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => setOpenDialog(!openDialog)}
								variant="destructive"
							>
								<LogOut />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>

			<Dialog open={openDialog} onOpenChange={setOpenDialog}>
				<DialogContent>
					<DialogTitle>Logout</DialogTitle>
					<DialogDescription>
						Are you sure you want to logout?
					</DialogDescription>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant={"secondary"}>Cancel</Button>
						</DialogClose>
						<Button
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
		</>
	);
}
