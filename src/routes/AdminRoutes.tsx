import { ReactNode } from "react";

interface AdminRoutesProps {
	children: ReactNode;
}

const AdminRoutes: React.FC<AdminRoutesProps> = ({ children }) => {
	return <>{children}</>;
};

export default AdminRoutes;
