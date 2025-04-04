import { z } from "zod";
import { createProfileSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/FormInput";
import { useCreateProfile } from "@/hooks/use-create-profile";
import TitleText from "@/components/TitleText";
import { Button } from "@/components/ui/button";
import { ArrowRight, KeyRound } from "lucide-react";
import { useEffect } from "react";
import { api } from "@/api/axios";
import { isAxiosError } from "axios";

const accountSetupShema = createProfileSchema.pick({
	email: true,
	password: true,
});

type TAccountSetup = z.infer<typeof accountSetupShema>;

export default function AccountSetup() {
	const { setData, setCurrentStep, data } = useCreateProfile();
	const form = useForm<TAccountSetup>({
		resolver: zodResolver(accountSetupShema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	useEffect(() => {
		if (data?.email && data?.password) {
			form.setValue("email", data.email);
			form.setValue("password", data.password);
		}
	}, [data?.email, data?.password, form]);

	const onSubmit = async (data: TAccountSetup) => {
		try {
			const response = await api.get(
				`/account/users/find?fields=${encodeURIComponent(
					`email:${data.email}`
				)}`
			);
			console.log(response.data);
			if (response.status === 200) {
				form.setError("email", {
					message: "Email already exists. Please use another email.",
				});
				return;
			}
		} catch (error) {
			if (isAxiosError(error)) {
				if (error.response?.status === 404) {
					// Email does not exist, proceed with the next step
					setData(data);
					setCurrentStep((prev) => prev + 1);
				} else {
					// Handle other errors
					console.error("Error fetching email:", error);
				}
			} else {
				// Handle non-Axios errors
				console.error("Error fetching email:", error);
			}
		}
	};

	const generatePassword = () => {
		const length = 12;
		const charset =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$^&+";
		let password = "";
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * charset.length);
			password += charset[randomIndex];
		}
		form.setValue("password", password);
	};

	console.log(form.formState.errors);
	return (
		<Form {...form}>
			<TitleText>Create Employee Account</TitleText>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 mt-4"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<FormInput
						name="email"
						label="Email Address"
						placeholder="Enter employee email address"
						control={form.control}
					/>
				</div>
				<div className="grid grid-cols-1  md:grid-cols-w lg:grid-cols-4 gap-4 items-end">
					<FormInput
						name="password"
						label="Password"
						placeholder="Enter password"
						type="password"
						control={form.control}
					/>
					<Button
						className="max-w-fit"
						type="button"
						onClick={generatePassword}
					>
						<KeyRound />
						Generate
					</Button>
				</div>
				<Button type="submit">
					Next <ArrowRight />
				</Button>
			</form>
		</Form>
	);
}
