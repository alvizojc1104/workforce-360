import { Logo } from "@/components/logo";
import TermsAndConditions from "@/components/TermsAndConditions";
import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { auth } = useAuth();

	if (auth.isAuthenticated) {
		return <Navigate to="/dashboard" replace />;
	}
	return (
		<div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-t from-yellow-50 to-background md:p-10">
			<div className="w-full max-w-sm flex flex-col items-center gap-4">
				<Logo />
				{children}
				<TermsAndConditions />
			</div>
		</div>
	);
}
