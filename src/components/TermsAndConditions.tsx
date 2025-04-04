import { Link } from "react-router-dom";

export default function TermsAndConditions() {
	return (
		<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
			By clicking continue, you agree to our{" "}
			<Link to="#">Terms of Service</Link> and{" "}
			<Link to="#">Privacy Policy</Link>.
		</div>
	);
}
