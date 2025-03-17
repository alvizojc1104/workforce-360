import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import ErrorPage from "./error";
import Dashboard from "./pages/dashboard";
import MainLayout from "./layouts";
import Employees from "./pages/employees";
import Establishments from "./pages/establishments";
import Shifts from "./pages/shifts";
import Payroll from "./pages/payroll";
import Settings from "./pages/settings";
import Notifications from "./pages/notifications";
import Schedule from "./pages/schedule";
import ProtectRoutes from "./protected-routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./providers/auth-provider";

const queryClient = new QueryClient();
const router = createBrowserRouter([
	{
		index: true,
		path: "/login",
		element: <Login />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/",
		element: (
			<ProtectRoutes>
				<MainLayout />
			</ProtectRoutes>
		),
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "employees",
				element: <Employees />,
			},
			{
				path: "establishments",
				element: <Establishments />,
			},
			{
				path: "shifts",
				element: <Shifts />,
			},
			{
				path: "payroll",
				element: <Payroll />,
			},
			{
				path: "settings",
				element: <Settings />,
			},
			{
				path: "notifications",
				element: <Notifications />,
			},
			{
				path: "schedule",
				element: <Schedule />,
			},
		],
	},
]);

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</QueryClientProvider>
	);
}
