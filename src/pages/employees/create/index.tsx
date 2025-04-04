import { Button } from "@/components/ui/button";
import { CreateProfileProvider } from "@/providers/create-profile-provider";
import { ArrowLeft, Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EmployeeCreateFormSteps from "./employee-create-steps-form";
import countries from "@/data/countries.json";
export interface Country {
	name: {
		common: string;
	};
	flags: string;
}
export default function EmployeeCreate() {
	const regions = useQuery({
		queryKey: ["regions"],
		queryFn: async () => {
			return axios
				.get("https://psgc.gitlab.io/api/regions/")
				.then((response) =>
					response.data.map(
						(region: { code: string; name: string }) => ({
							value: region.code,
							label: region.name,
						})
					)
				);
		},
	});

	return (
		<>
			<Button
				variant={"ghost"}
				className="mb-4"
				onClick={() => window.history.back()}
			>
				<ArrowLeft />
				Back
			</Button>
			<CreateProfileProvider>
				<div>
					<h1 className="text-2xl font-bold">Create Employee</h1>
					<p className="text-sm text-muted-foreground">
						Create a new employee profile.
					</p>
					{regions.isLoading ? (
						<div>
							<Loader className="animate-spin" />
						</div>
					) : (
						<EmployeeCreateFormSteps
							nationalities={countries.countries}
							regions={regions.data}
						/>
					)}
				</div>
			</CreateProfileProvider>
		</>
	);
}
