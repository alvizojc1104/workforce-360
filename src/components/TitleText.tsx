import React from "react";
interface TitleTextProps {
	children: React.ReactNode;
}

const TitleText: React.FC<TitleTextProps> = ({ children }) => {
	return <h1 className="font-bold text-lg text-foreground">{children}</h1>;
};

export default TitleText;
