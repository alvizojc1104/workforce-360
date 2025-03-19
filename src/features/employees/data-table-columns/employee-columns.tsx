import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export const employeeColumns = z.object({
	id: z.string(),
	email: z.string().email(),
	password: z.string(),
	name: z.string(),
	role: z.string(),
	avatar: z.string().url(),
	creationAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
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
			accessorKey: "id",
			header: "ID",
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
					<p className="capitalize text-sm">
						{props.row.original.role}
					</p>
				);
			},
		},
		{
			accessorKey: "creationAt",
			header: "Creation At",
			cell: ({ row }) =>
				moment(row.original.creationAt).format("YYYY-MM-DD"),
		},
	];
