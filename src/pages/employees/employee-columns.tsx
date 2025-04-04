import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ROLES, SCOPES } from "@/features/auth/auth-types";

export const employeeColumns = z.object({
	id: z.string(),
	email: z.string().email(),
	role: z.array(
		z.object({
			name: z.enum(Object.values(ROLES) as [string, ...string[]]),
			scope: z.enum(Object.values(SCOPES) as [string, ...string[]]),
		})
	),
	name: z.string(),
	avatar: z.string().url(),
	createdAt: z.string().datetime(),
});

export const employeeColumnsDef: ColumnDef<z.infer<typeof employeeColumns>>[] =
	[
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) =>
						table.toggleAllPageRowsSelected(!!value)
					}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
					className="self-start cursor-pointer"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: "name",
			header: ({ column }) => (
				<Button
					variant={"ghost"}
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Name
					<ArrowUpDown className="ml-2 size-4" />
				</Button>
			),
			cell(props) {
				return (
					<div className="flex items-center gap-2">
						<Avatar>
							<AvatarImage src={props.row.original.avatar} />
							<AvatarFallback>
								{props.row.original.name[0]}
							</AvatarFallback>
						</Avatar>

						<p className="text-sm">{props.row.original.name}</p>
					</div>
				);
			},
		},
		{
			accessorKey: "email",
			header: "Email",
		},
		{
			accessorKey: "role",
			header: "Role",
			cell(props) {
				return (
					<div>
						{props.row.original.role.map((role) => (
							<Badge
								key={role.name}
								variant={
									role.name === ROLES.SUPER_ADMIN
										? "SuperAdmin"
										: role.name === ROLES.ADMIN
										? "Admin"
										: "Employee"
								}
								className="text-xs font-normal mr-1"
							>
								{role.name}
							</Badge>
						))}
					</div>
				);
			},
		},
		{
			accessorKey: "createdAt",
			header: "Creation At",
			cell: ({ row }) =>
				moment(row.original.createdAt).format("YYYY-MM-DD"),
		},
		{
			accessorKey: "actions",
			header: "Actions",
			cell: ({ row }) => (
				<div className="flex gap-2">
					<Button
						variant={"outline"}
						onClick={() =>
							alert(`Edit employee with id: ${row.original.id}`)
						}
					>
						Edit
					</Button>
					<Button variant={"destructive"}>Delete</Button>
				</div>
			),
		},
	];
