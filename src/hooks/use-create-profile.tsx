import { CreateProfileContext } from "@/contexts/create-profile-context";
import { useContext } from "react";

export const useCreateProfile = () => {
	const context = useContext(CreateProfileContext);
	if (context === undefined) {
		throw new Error(
			"useCreateProfile must be used within a CreateProfileProvider"
		);
	}
	return context;
};
