"use client";
import React, { Dispatch, useEffect, useState } from "react";
import { createProfileSchema, TCreateProfile } from "./schema";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/FormInput";
import { FormSelect, FormSelectOption } from "@/components/form/FormSelect";
import { ArrowRight, Mars, Venus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TitleText from "@/components/TitleText";

const personalInformationSchema = createProfileSchema.pick({
	firstName: true,
	middleName: true,
	lastName: true,
	suffix: true,
	birthDate: true,
	civilStatus: true,
	gender: true,
	religion: true,
	nationality: true,
	profilePicture: true,
});

type TPersonalInformation = z.infer<typeof personalInformationSchema>;

const suffixes = [
	{ value: "None", label: "N/A" },
	{ value: "Jr.", label: "Jr." },
	{ value: "Sr.", label: "Sr." },
	{ value: "III", label: "III" },
	{ value: "IV", label: "IV" },
	{ value: "V", label: "V" },
];

const religions = [
	{ value: "Roman Catholic", label: "Roman Catholic" },
	{ value: "Christian", label: "Christian" },
	{ value: "Islam", label: "Islam" },
	{ value: "Evangelical", label: "Evangelical" },
	{ value: "Iglesia ni Cristo", label: "Iglesia ni Cristo" },
	{ value: "Aglipayan", label: "Aglipayan" },
	{ value: "Buddhism", label: "Buddhism" },
	{ value: "Hinduism", label: "Hinduism" },
	{ value: "Judaism", label: "Judaism" },
	{ value: "Protestant", label: "Protestant" },
	{ value: "Other", label: "Other" },
];

const genders = [
	{ value: "male", label: "Male", icon: Mars },
	{ value: "female", label: "Female", icon: Venus },
];

export default function PersonalInformationForm({
	data,
	setData,
	setCurrentStep,
	nationalities,
	currentStep,
}: {
	data: Partial<TCreateProfile>;
	currentStep: number;
	setData: (data: Partial<TPersonalInformation>) => void;
	setCurrentStep: Dispatch<React.SetStateAction<number>>;
	nationalities: FormSelectOption[];
}) {
	const [initialPhotoUrl, setInitialPhotoUrl] = useState<
		string | undefined
	>();
	const form = useForm<TPersonalInformation>({
		resolver: zodResolver(personalInformationSchema),
		defaultValues: {
			firstName: "",
			middleName: "",
			lastName: "",
			suffix: "",
			birthDate: "",
			civilStatus: "",
			gender: "",
			nationality: "",
			religion: "",
			profilePicture: "",
		},
	});
	const formData: FormData = new FormData();

	useEffect(() => {
		if (data) {
			(Object.keys(data) as (keyof TPersonalInformation)[]).forEach(
				(key) => {
					form.setValue(
						key,
						data[
							key
						] as TPersonalInformation[keyof TPersonalInformation]
					);
				}
			);
			if (data.profilePicture) {
				setInitialPhotoUrl(data.profilePicture);
			}
		}
	}, [data, form]);

	const handleSetData: SubmitHandler<TPersonalInformation> = (data) => {
		setData(data);
		setCurrentStep((prev) => prev + 1);
		console.log(JSON.stringify(data));
	};

	const handleProfilePictureChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setInitialPhotoUrl(reader.result as string);
			};
			reader.onload = () => {
				formData.append("file", file);
				form.setValue("profilePicture", reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="relative">
			<Form {...form}>
				<TitleText>Employee Information</TitleText>
				<form
					onSubmit={form.handleSubmit(handleSetData)}
					className="space-y-6 mt-4"
				>
					<div className="flex gap-4 items-start">
						<Avatar className="w-24 h-24">
							<AvatarImage
								src={
									form.getValues("profilePicture") ||
									initialPhotoUrl
								}
							/>
							<AvatarFallback>P</AvatarFallback>
						</Avatar>
						<div className="space-y-2">
							<Label>Upload Profile Photo</Label>
							<Input
								name="profilePicture"
								type="file"
								accept="image/*"
								onChange={handleProfilePictureChange}
							/>
						</div>
					</div>
					<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						<FormInput
							control={form.control}
							name="firstName"
							placeholder="Enter first name"
							label="First Name"
						/>
						<FormInput
							control={form.control}
							name="middleName"
							label="Middle Name"
							placeholder="Enter middle name"
						/>
						<FormInput
							control={form.control}
							name="lastName"
							label="Last Name"
							placeholder="Enter last name"
						/>
						<FormSelect
							label="Suffix"
							placeholder="Select suffix"
							control={form.control}
							name="suffix"
							options={suffixes}
						/>
					</section>
					<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						<FormSelect
							label="Gender"
							placeholder="Select gender"
							control={form.control}
							name="gender"
							options={genders}
						/>
						<FormInput
							control={form.control}
							name="birthDate"
							label="Birthday"
							type="date"
						/>
						<FormSelect
							label="Civil Status"
							placeholder="Select civil status"
							control={form.control}
							name="civilStatus"
							options={[
								{ value: "single", label: "Single" },
								{ value: "married", label: "Married" },
								{ value: "widowed", label: "Widowed" },
								{ value: "divorced", label: "Divorced" },
							]}
						/>
						<FormSelect
							label="Nationality"
							control={form.control}
							name="nationality"
							placeholder="Select nationality"
							options={nationalities}
						/>
					</section>
					<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						<FormSelect
							label="Religion"
							control={form.control}
							name="religion"
							placeholder="Select religion"
							options={religions}
						/>
					</section>
					<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"></section>
					<div className="flex items-center gap-4 justify-end">
						<Button
							type="button"
							disabled={currentStep === 1}
							variant={"outline"}
							onClick={() => setCurrentStep((prev) => prev - 1)}
						>
							Back
						</Button>
						<Button type="submit">
							Next <ArrowRight />
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
