import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import ErrorPage from "./error";
import Dashboard from "./pages/dashboard";
import MainLayout from "./layouts/MainLayout";
import Employees from "./pages/employees";
import Establishments from "./pages/establishments";
import Shifts from "./pages/shifts";
import Payroll from "./pages/payroll";
import Settings from "./pages/settings";
import Notifications from "./pages/notifications";
import Schedule from "./pages/schedule";
import AdminRoutes from "./routes/AdminRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./providers/auth-provider";
import { ThemeProvider } from "./providers/theme-provider";
import Unauthorized from "./unauthorized";
import Signup from "./pages/signup";
import { Toaster } from "sonner";
import Index from ".";
import EmployeeOutlet from "./pages/employees/outlet";
import EmployeeCreate from "./pages/employees/create";
import RolesAndPermissions from "./pages/roles-and-permission";

const queryClient = new QueryClient();
const router = createBrowserRouter([
	{
		index: true,
		path: "/",
		element: <Index />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/login",
		element: <Login />,
		errorElement: <ErrorPage />,
	},
	{
		index: true,
		path: "/signup",
		element: <Signup />,
		errorElement: <ErrorPage />,
	},
	{
		index: true,
		path: "/unauthorized",
		element: <Unauthorized />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/",
		element: (
			<AdminRoutes>
				<MainLayout />
			</AdminRoutes>
		),
		children: [
			{
				index: true,
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "employees",
				element: <EmployeeOutlet />,
				children: [
					{
						index: true,
						element: <Employees />,
					},
					{
						path: "create",
						element: <EmployeeCreate />,
					},
				],
			},
			{
				path: "establishments",
				element: <Establishments />,
			},
			{
				path: "roles-and-permissions",
				element: <RolesAndPermissions />,
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
				<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
					<RouterProvider router={router} />
					<Toaster />
				</ThemeProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}
