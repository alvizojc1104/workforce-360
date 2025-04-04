import { api } from "@/api/axios";
import { Employee } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

type EmployeesData = {
	data: Employee[];
	meta: {
		[key: string]: string;
	};
	totalCount: number;
};

const fetchEmployees = async (
	skip: string,
	take: string,
	relations: string,
	select: string,
	filter: string
) => {
	const _relations = encodeURIComponent(relations);
	const _select = encodeURIComponent(select);
	const url = `/employees?skip=${skip}&take=${take}&relations=${_relations}&select=${_select}${
		filter ? `&filter=${filter}` : ""
	}`;

	const { data } = await api.get(url);

	return data as EmployeesData;
};

export const useFetchEmployees = (
	skip: string = "0",
	take: string = "10",
	relations: string = '["user", "user.profile"]',
	select: string = '["user"]',
	filter: string = ""
) => {
	const employees = useQuery({
		queryKey: ["employees", skip, take, relations, select, filter],
		queryFn: () => fetchEmployees(skip, take, relations, select, filter),
	});

	return employees;
};
