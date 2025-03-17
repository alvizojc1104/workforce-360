import LoginForm from "@/features/auth/LoginForm";
import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";
export default function LoginPage() {
	const { auth } = useAuth();

	if (auth.isAuthenticated) {
		return <Navigate to="/dashboard" />;
	}

	console.log(auth)
	
	return (
		<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-3xl">
				<LoginForm />
			</div>
		</div>
	);
}
