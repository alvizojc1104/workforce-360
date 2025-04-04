import { CreateProfileContext } from "@/contexts/create-profile-context";
import { TCreateProfile } from "@/pages/employees/create/schema";
import { useState } from "react";

export const CreateProfileProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [data, setData] = useState<Partial<TCreateProfile> | undefined>(
		undefined
	);
	const [isLoading] = useState(false);
	const [currentStep, setCurrentStep] = useState(1);

	const handleSetData = (newData: Partial<TCreateProfile>) => {
		setData((prevData) => ({
			...prevData,
			...newData,
		}));
	};

	return (
		<CreateProfileContext.Provider
			value={{
				data,
				setData: handleSetData,
				isLoading,
				currentStep,
				setCurrentStep,
			}}
		>
			{children}
		</CreateProfileContext.Provider>
	);
};
