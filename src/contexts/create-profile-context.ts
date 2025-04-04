import { TCreateProfile } from "@/pages/employees/create/schema";
import { createContext, SetStateAction } from "react";

interface CreateProfileContextType {
	data: Partial<TCreateProfile> | undefined;
	setData: (data: Partial<TCreateProfile>) => void;
	isLoading: boolean;
	currentStep: number;
	setCurrentStep: React.Dispatch<SetStateAction<number>>;
}

export const CreateProfileContext = createContext<
	CreateProfileContextType | undefined
>(undefined);
