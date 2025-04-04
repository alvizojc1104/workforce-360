import { useState } from "react";
import { TCreateProfile } from "./schema";
import LightText from "@/components/LightText";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MapPin, PenLine, User } from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useCreateProfile } from "@/hooks/use-create-profile";
import { toast } from "sonner";
import ButtonPromise from "@/components/loading/ButtonPromise";
import { api } from "@/api/axios";
import TitleText from "@/components/TitleText";

export default function SubmitForm({
	currentStep,
}: {
	currentStep: number;
	data: Partial<TCreateProfile>;
}) {
	const [confirmCreateProfile, setConfirmCreateProfile] = useState(false);
	const { data, setCurrentStep } = useCreateProfile();
	const [isLoading, setIsLoading] = useState(false);
	if (!data) return null;

	const handleConfirmCreateProfile = () => {
		setConfirmCreateProfile(true);
	};

	const createProfile = async () => {
		setIsLoading(true);
		// Logic to create profile
		try {
			const stageData = {
				user: {
					userName: data.email?.replace(/@.*$/, ""),
					email: data.email,
					password: data.password,
					profile: { ...data },
				},
				employeeNumber: Math.floor(100000 + Math.random() * 900000),
			};
			const response = await api.post("/employees", stageData);

			setConfirmCreateProfile(false);
			toast.success("Employee added successfully");
			console.log(response.data);
		} catch (error) {
			// Handle error
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="space-y-8 relative">
			<TitleText>Review Employee Information</TitleText>
			<section>
				<div className="flex items-center gap-2">
					<User className="size-5" />
					<LightText className="font-semibold text-md">
						Personal Information
					</LightText>
				</div>
				<Separator className="my-2" />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					<div className="grid">
						<LightText>First Name: </LightText>
						{data.firstName}
					</div>
					{data.middleName && (
						<div className="grid">
							<LightText>Middle Name: </LightText>
							{data.middleName}
						</div>
					)}
					<div className="grid">
						<LightText>Last Name: </LightText>
						{data.lastName}
					</div>
					<div className="grid">
						<LightText>Suffix: </LightText>
						{data.suffix}
					</div>
					<div className="grid">
						<LightText>Gender: </LightText>
						{data.gender?.toLocaleUpperCase()}
					</div>
					<div className="grid">
						<LightText>Birthday: </LightText>
						{data.birthDate
							? new Date(data.birthDate).toLocaleDateString(
									"en-US",
									{
										year: "numeric",
										month: "long",
										day: "numeric",
									}
							  )
							: "N/A"}
					</div>
					<div className="grid">
						<LightText>Nationality: </LightText>
						{data.nationality?.toUpperCase()}
					</div>
					<div className="grid">
						<LightText>Civil Status: </LightText>
						{data.civilStatus?.toLocaleUpperCase()}
					</div>
					<div className="grid">
						<LightText>Religion: </LightText>
						{data.religion?.toUpperCase()}
					</div>
				</div>
			</section>
			<section>
				<div className="flex items-center gap-2">
					<MapPin className="size-5" />
					<LightText className="font-semibold text-md">
						Address
					</LightText>
				</div>
				<Separator className="my-2" />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					<div className="grid">
						<LightText>
							Street Name/Building/House Number:{" "}
						</LightText>
						{data.address?.streetNameBuildingHouseNumber}
					</div>
					<div className="grid">
						<LightText>Barangay: </LightText>
						{data.address?.barangay}
					</div>
					<div className="grid">
						<LightText>City/Municipality: </LightText>
						{data.address?.cityOrMunicipality}
					</div>
					<div className="grid">
						<LightText>Province: </LightText>
						{data.address?.province}
					</div>
					<div className="grid">
						<LightText>Region: </LightText>
						{data.address?.region}
					</div>
					<div className="grid">
						<LightText>Postal Code: </LightText>
						{data.address?.postalCode}
					</div>
				</div>
			</section>
			<section>
				<div className="flex items-center gap-2">
					<MapPin className="size-5" />
					<LightText className="font-semibold text-md">
						Contact Informatiion
					</LightText>
				</div>
				<Separator className="my-2" />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					<div className="grid">
						<LightText>Phone Number</LightText>
						{data.phoneNumber}
					</div>
					<div className="grid">
						<LightText>Email Address</LightText>
						{data.email}
					</div>
				</div>
			</section>
			<div className="flex items-center gap-4 justify-end">
				<Button
					disabled={currentStep === 1}
					variant={"outline"}
					onClick={() => setCurrentStep((prev) => prev - 1)}
				>
					Back
				</Button>
				<Button onClick={handleConfirmCreateProfile}>
					Create profile <PenLine />
				</Button>
			</div>
			<Dialog
				open={confirmCreateProfile}
				onOpenChange={setConfirmCreateProfile}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm</DialogTitle>
						<DialogDescription>
							Are you sure you want to submit your profile now?
							You can still edit your profile later.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant={"secondary"}>Cancel</Button>
						</DialogClose>
						<Button onClick={createProfile} disabled={isLoading}>
							<ButtonPromise isPending={isLoading} />
							Yes, create profile.
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
