import DataTable from "@/components/data-table";
import { employeeColumnsDef } from "@/features/employees/data-table-columns/employee-columns";
import { DataTableSkeleton } from "@/components/skeletons/data-table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async () => {
	const { data } = await axios.get("https://api.escuelajs.co/api/v1/users");
	return data;
};

export default function Employees() {
	const users = useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
	});

	return (
		<div className="p-4 max-w-screen">
			{users.isLoading && <DataTableSkeleton />}
			{users.isSuccess && (
				<DataTable columns={employeeColumnsDef} data={users.data} />
			)}
		</div>
	);
}
