import {
	Banknote,
	Building,
	Building2,
	Calendar,
	ChartColumn,
	ClipboardEdit,
	ClipboardList,
	Clock,
	DollarSign,
	HandCoins,
	Logs,
	Network,
	UserPen,
	Users,
} from "lucide-react";

export const navigation = {
	navMain: [
		{
			title: "Dashboard",
			items: [
				{
					title: "Dashboard",
					url: "/dashboard",
					icon: ChartColumn,
				},
			],
		},
		{
			title: "Account",
			items: [
				{
					title: "Users",
					url: "/users",
					icon: Users,
				},
				{
					title: "Sessions",
					url: "/sessions",
					icon: Clock,
				},
			],
		},
		{
			title: "Organization",
			items: [
				{
					title: "Organizations",
					url: "/organizations",
					icon: Building2,
				},
				{
					title: "Branches",
					url: "/branches",
					icon: Building,
				},
				{
					title: "Departments",
					url: "/departments",
					icon: Network,
				},
			],
		},
		{
			title: "Employee",
			items: [
				{
					title: "Employees",
					url: "/employees",
					icon: Users,
				},
				{
					title: "Roles and Permissions",
					url: "/roles-and-permissions",
					icon: UserPen,
				},
				{
					title: "Benefits & Deductions",
					url: "/benefits-and-deductions",
					icon: DollarSign,
				},
				{
					title: "Memos",
					url: "/memos",
					icon: ClipboardList,
				},
			],
		},
		{
			title: "Schedule",
			items: [
				{
					title: "Schedules",
					url: "/schedules/schedules",
					icon: Calendar,
				},
				{
					title: "Shifts",
					url: "/schedules/shifts",
					icon: Clock,
				},
				{
					title: "Groups",
					url: "/schedules/groups",
					icon: Clock,
				},
				{
					title: "Holidays",
					url: "/schedules/holidays",
					icon: Clock,
				},
			],
		},
		{
			title: "Payroll",
			items: [
				{
					title: "Cut-offs",
					url: "/payroll/cut-offs",
					icon: HandCoins,
				},
				{
					title: "Payrolls",
					url: "/payroll/payrolls",
					icon: Banknote,
				},
			],
		},
		{
			title: "Documents",
			items: [
				{
					title: "Documents",
					url: "/documents",
					icon: HandCoins,
				},
				{
					title: "Requirements",
					url: "/documents/requirements",
					icon: ClipboardEdit,
				},
			],
		},
		{
			title: "Audit & Tracking",
			items: [
				{
					title: "Activity Logs",
					url: "/audit/activity-logs",
					icon: Logs,
				},
			],
		},
	],
};
