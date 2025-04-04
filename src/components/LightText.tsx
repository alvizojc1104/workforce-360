import { cn } from "@/lib/utils";
import React from "react";
interface LightTextProps {
	children: React.ReactNode;
	className?: string;
}

const LightText: React.FC<LightTextProps> = ({ children, className }) => {
	return (
		<p className={cn("font-light text-gray-700 text-xs", className)}>
			{children}
		</p>
	);
};

export default LightText;
