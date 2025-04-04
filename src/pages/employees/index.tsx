import DataTable from "@/components/data-table";
import { employeeColumnsDef } from "@/pages/employees/employee-columns";
import { useFetchEmployees } from "@/hooks/useFetchEmployees";
import { writeFullName } from "@/lib/helpers";
import { DataTableSkeleton } from "@/components/skeletons/data-table";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TitleText from "@/components/TitleText";
import { Role } from "@/types/user";

export default function Employees() {
	const navigate = useNavigate();
	const employees = useFetchEmployees(
		"0",
		"10",
		'["user", "user.profile", "roles"]',
		'["user"]'
	);

	console.log(employees.data);

	const tableData =
		employees.data?.data?.map((employee) => {
			const { firstName, lastName, middleName, suffix } =
				employee.user.profile;

			const fullName = writeFullName(
				firstName,
				lastName,
				suffix,
				middleName
			);
			const email = employee.user.email;
			const createdAt = employee.createdAt;
			const role = employee.roles as Role[];
			return {
				id: employee.id,
				avatar:
					employee.user.profile.profilePicture ||
					firstName.charAt(0) + lastName.charAt(0),
				name: fullName,
				email,
				role,
				createdAt,
			};
		}) || [];

	const openDialog = () => {
		navigate("./create");
	};
	return (
		<div>
			<TitleText>Employees</TitleText>
			{employees.isLoading ? (
				<DataTableSkeleton />
			) : (
				<DataTable
					extraElements={
						<Button
							variant={"outline"}
							className="ml-2"
							onClick={openDialog}
						>
							<UserPlus />
							<p className="hidden sm:flex">Add Employee</p>
						</Button>
					}
					columns={employeeColumnsDef}
					data={tableData}
				/>
			)}
		</div>
	);
}
