import React, { Dispatch, useEffect, useState } from "react";
import { z } from "zod";
import { createProfileSchema } from "./schema";
import { FormSelectOption } from "@/components/form/FormSelect";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Form } from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FormInput } from "@/components/form/FormInput";
import LightText from "@/components/LightText";
import axios from "axios";
import TitleText from "@/components/TitleText";
import { useCreateProfile } from "@/hooks/use-create-profile";

const AddressSchema = createProfileSchema.pick({
	address: true,
	phoneNumber: true,
	email: true,
});

type TAddress = z.infer<typeof AddressSchema>;

export default function AddressForm({
	setData,
	setCurrentStep,
	regions,
	currentStep,
}: {
	currentStep: number;
	setData: (data: Partial<TAddress>) => void;
	setCurrentStep: Dispatch<React.SetStateAction<number>>;
	regions: FormSelectOption[];
}) {
	const form = useForm<TAddress>({
		resolver: zodResolver(AddressSchema),
		defaultValues: {
			address: {
				streetNameBuildingHouseNumber: "",
				barangay: "",
				cityOrMunicipality: "",
				province: "",
				region: "",
				postalCode: "",
			},
			phoneNumber: "",
		},
	});
	const [provinces, setProvinces] = useState<FormSelectOption[]>([]);
	const [citiesOrMunicipalities, setCitiesOrMunicipalities] = useState<
		FormSelectOption[]
	>([]);
	const [barangays, setBarangays] = useState<FormSelectOption[]>([]);
	const { data } = useCreateProfile();
	useEffect(() => {
		if (data?.email) {
			form.setValue("email", data.email);
		}
	}, [data, form]);
	const handleRegionChange = async (region: string) => {
		try {
			const { data } = await axios.get(
				`https://psgc.gitlab.io/api/regions/${region}/provinces`
			);

			const selectedRegion = regions.find(
				(regionItem) => regionItem.value === region
			);

			if (!selectedRegion) {
				form.setError(
					"address.region",
					{ message: "Region not found" },
					{ shouldFocus: true }
				);
				return;
			}

			form.setValue("address.region", selectedRegion?.label);

			const provinces = data.map(
				(province: { code: string; name: string }) => ({
					value: province.code,
					label: province.name,
				})
			);

			if (provinces.length === 0) {
				const { data: citiesAndMunicipalities } = await axios.get(
					`https://psgc.gitlab.io/api/regions/${region}/cities-municipalities`
				);

				const citiesOrMunicipalities = citiesAndMunicipalities.map(
					(cityOrMunicipality: { code: string; name: string }) => ({
						value: cityOrMunicipality.code,
						label: cityOrMunicipality.name,
					})
				);
				form.setValue("address.province", "N/A");
				setCitiesOrMunicipalities(citiesOrMunicipalities);
				return;
			}

			setProvinces(provinces);
		} catch (error) {
			console.log(JSON.stringify(error, null, 2));
			alert("Error fetching provinces");
		}
	};

	const handleProvinceChange = async (province: string) => {
		form.setValue("address.province", province); // Update form state
		try {
			const { data } = await axios.get(
				`https://psgc.gitlab.io/api/provinces/${province}/cities-municipalities`
			);
			const citiesOrMunicipalities = data.map(
				(cityOrMunicipality: { code: string; name: string }) => ({
					value: cityOrMunicipality.code,
					label: cityOrMunicipality.name,
				})
			);

			if (citiesOrMunicipalities.length === 0) {
				alert("No cities or municipalities found for this province");
				return;
			}
			const selectedProvince = provinces.find(
				(provinceItem) => provinceItem.value === province
			);
			if (!selectedProvince) {
				form.setError(
					"address.province",
					{ message: "Province not found" },
					{ shouldFocus: true }
				);
				return;
			}
			form.setValue("address.province", selectedProvince?.label);
			setCitiesOrMunicipalities(citiesOrMunicipalities);
		} catch (error) {
			console.log(JSON.stringify(error, null, 2));
			alert("Error fetching cities or municipalities");
		}
	};

	const handleCityOrMunicipalityChange = async (
		cityOrMunicipality: string
	) => {
		form.setValue("address.cityOrMunicipality", cityOrMunicipality); // Update form state
		try {
			const { data } = await axios.get(
				`https://psgc.gitlab.io/api/cities-municipalities/${cityOrMunicipality}/barangays`
			);

			if (data.length === 0) {
				alert("No barangays found for this city or municipality");
				return;
			}

			const barangays = data.map(
				(barangay: { code: string; name: string }) => ({
					value: barangay.code,
					label: barangay.name,
				})
			);
			const selectedCityOrMunicipality = citiesOrMunicipalities.find(
				(cityOrMunicipalityItem) =>
					cityOrMunicipalityItem.value === cityOrMunicipality
			);
			if (!selectedCityOrMunicipality) {
				form.setError(
					"address.cityOrMunicipality",
					{ message: "City or Municipality not found" },
					{ shouldFocus: true }
				);
				return;
			}
			form.setValue(
				"address.cityOrMunicipality",
				selectedCityOrMunicipality?.label
			);
			setBarangays(barangays);
		} catch (error) {
			console.log(error);
		}
	};

	const handleBarangayChange = (barangay: string) => {
		form.setValue("address.barangay", barangay); // Update form state
	};

	const handleUpdateData: SubmitHandler<TAddress> = (data) => {
		setData(data);
		setCurrentStep((prev) => prev + 1);
	};

	return (
		<div className="relative">
			<Form {...form}>
				<TitleText>Employee Address</TitleText>
				<form
					onSubmit={form.handleSubmit(handleUpdateData)}
					className="space-y-6 mt-4"
				>
					<section className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						<div className="space-y-2">
							<Label>Region</Label>
							<Select onValueChange={handleRegionChange}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select Region" />
								</SelectTrigger>
								<SelectContent>
									{regions.map((region) => (
										<SelectItem
											key={region.value}
											value={region.value}
										>
											{region.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{form.formState.errors.address?.region && (
								<LightText className="text-red-600 text-xs">
									{
										form.formState.errors.address?.region
											.message
									}
								</LightText>
							)}
						</div>
						<div className="space-y-2">
							<Label>Province</Label>
							<Select
								onValueChange={handleProvinceChange}
								disabled={provinces.length === 0}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select Province" />
								</SelectTrigger>
								<SelectContent>
									{provinces.map((province) => (
										<SelectItem
											key={province.value}
											value={province.value}
										>
											{province.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{form.formState.errors.address?.province && (
								<LightText className="text-red-600 text-xs">
									{
										form.formState.errors.address?.province
											.message
									}
								</LightText>
							)}{" "}
						</div>
						<div className="space-y-2">
							<Label>City or Municipality</Label>
							<Select
								onValueChange={handleCityOrMunicipalityChange}
								disabled={citiesOrMunicipalities.length === 0}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select City or Municipality" />
								</SelectTrigger>
								<SelectContent>
									{citiesOrMunicipalities.map(
										(cityOrMunicipality) => (
											<SelectItem
												key={cityOrMunicipality.value}
												value={cityOrMunicipality.value}
											>
												{cityOrMunicipality.label}
											</SelectItem>
										)
									)}
								</SelectContent>
							</Select>
							{form.formState.errors.address
								?.cityOrMunicipality && (
								<LightText className="text-red-600 text-xs">
									{
										form.formState.errors.address
											?.cityOrMunicipality.message
									}
								</LightText>
							)}
						</div>
						<div className="space-y-2">
							<Label>Barangay</Label>
							<Select
								onValueChange={handleBarangayChange}
								disabled={barangays.length === 0}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select Barangay" />
								</SelectTrigger>
								<SelectContent>
									{barangays.map((barangay) => (
										<SelectItem
											key={barangay.value}
											value={barangay.label}
										>
											{barangay.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{form.formState.errors.address?.barangay && (
								<LightText className="text-red-600 text-xs">
									{
										form.formState.errors.address?.barangay
											.message
									}
								</LightText>
							)}
						</div>
						<FormInput
							control={form.control}
							name="address.streetNameBuildingHouseNumber"
							placeholder="Street Name, Building, House Number"
							label="Street Name, Building, House Number"
						/>
						<FormInput
							control={form.control}
							name="address.postalCode"
							placeholder="Enter Postal Code"
							label="Postal Code"
						/>
					</section>
					<TitleText>Employee Contact</TitleText>
					<section className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						<FormInput
							control={form.control}
							name="phoneNumber"
							placeholder="Enter phone number"
							label="Phone Number"
						/>
						<FormInput
							control={form.control}
							name="email"
							placeholder="Enter email address"
							label="Email Address"
							disabled
						/>
					</section>
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
