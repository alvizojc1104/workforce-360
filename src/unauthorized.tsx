import React from "react";
import { useAuth } from "./hooks/use-auth";
import { Button } from "./components/ui/button";
import { LogOut } from "lucide-react";

const Unauthorized: React.FC = () => {
	const { logout } = useAuth();
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<h1 className="text-4xl font-bold text-red-600 mb-4">
				403 - Unauthorized
			</h1>
			<p className="text-lg text-gray-700 mb-6">
				You do not have permission to view this page.
			</p>
			<Button
				onClick={() => logout.mutateAsync()}
				className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition duration-300"
			>
				<LogOut />
				Logout
			</Button>
		</div>
	);
};

export default Unauthorized;
