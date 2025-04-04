/* eslint-disable @typescript-eslint/no-unused-vars */
import { Building2, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
interface SummaryCards {
	category: string;
	total: number;
	icon: LucideIcon;
}

const summaryCards: SummaryCards[] = [
	{ category: "Employees", total: 198, icon: Users },
	{ category: "Branches", total: 6, icon: Building2 },
	{ category: "Employees", total: 198, icon: Users },
];
export default function Cards() {
	return <div>Cards</div>;
}
