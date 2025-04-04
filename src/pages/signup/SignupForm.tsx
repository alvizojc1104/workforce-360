import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon, Lock, Mail, Play } from "lucide-react";
import { useState } from "react";
import LightText from "@/components/LightText";
import TitleText from "@/components/TitleText";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { publicApi } from "@/api/axios";
import { SignupSchema } from "@/features/auth/auth-config";
import { useMutation } from "@tanstack/react-query";
import ButtonPromise from "@/components/loading/ButtonPromise";
import { toast } from "sonner";
import { CustomAxiosError } from "@/types/axiosError";

export function SignupForm() {
	const navigate = useNavigate();
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const form = useForm<z.infer<typeof SignupSchema>>({
		defaultValues: { email: "", password: "", confirmPassword: "" },
		resolver: zodResolver(SignupSchema),
	});

	const toggleVisibility = () => setIsVisible((prevState) => !prevState);

	const onSignup = async (signUpData: z.infer<typeof SignupSchema>) => {
		const response = await publicApi.post("/account/auth/register", {
			...signUpData,
			userName: signUpData.email.replace("@gmail.com", ""),
		});

		return response.data;
	};

	const signup = useMutation({
		mutationKey: ["signup"],
		mutationFn: (data: z.infer<typeof SignupSchema>) => onSignup(data),
		onSuccess: (response) => {
			form.reset();
			navigate("/login");
			toast.success(response.message);
		},
		onError: (error: CustomAxiosError) => {
			if (error.response.data.detail === "ConflictException") {
				form.setError("email", {
					type: "manual",
					message: error.response.data.message,
				});
				return;
			}
			toast.error(
				"An error occurred while signing up. Please try again later."
			);
		},
	});
	return (
		<Card className="max-w-sm w-full">
			<CardHeader className="text-center">
				<TitleText>Create your account</TitleText>
				<LightText>
					Welcome! Please fill in the details to get started.{" "}
				</LightText>
			</CardHeader>
			<CardContent>
				<div className="grid gap-6">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit((data) =>
								signup.mutateAsync(data)
							)}
							className="grid gap-4"
						>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className="relative">
												<Input
													{...field}
													autoCorrect="off"
													id="email"
													placeholder="Email Address"
													className="peer ps-9"
													value={field.value}
												/>
												<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
													<Mail
														size={16}
														aria-hidden="true"
													/>
												</div>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className="relative">
												<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
													<Lock
														size={16}
														aria-hidden="true"
													/>
												</div>
												<Input
													className="peer ps-9"
													placeholder="Password"
													type={
														isVisible
															? "text"
															: "password"
													}
													{...field}
												/>
												<button
													className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
													type="button"
													onClick={toggleVisibility}
													aria-label={
														isVisible
															? "Hide password"
															: "Show password"
													}
													aria-pressed={isVisible}
													aria-controls="password"
												>
													{!isVisible ? (
														<EyeOffIcon
															size={16}
															aria-hidden="true"
														/>
													) : (
														<EyeIcon
															size={16}
															aria-hidden="true"
														/>
													)}
												</button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className="relative">
												<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
													<Lock
														size={16}
														aria-hidden="true"
													/>
												</div>
												<Input
													className="peer ps-9"
													placeholder="Confirm password"
													type={
														isVisible
															? "text"
															: "password"
													}
													{...field}
												/>
												<button
													className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
													type="button"
													onClick={toggleVisibility}
													aria-label={
														isVisible
															? "Hide password"
															: "Show password"
													}
													aria-pressed={isVisible}
													aria-controls="password"
												>
													{!isVisible ? (
														<EyeOffIcon
															size={16}
															aria-hidden="true"
														/>
													) : (
														<EyeIcon
															size={16}
															aria-hidden="true"
														/>
													)}
												</button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="w-full"
								disabled={signup.isPending}
							>
								<ButtonPromise isPending={signup.isPending} />
								Continue
								<Play className="fill-secondary size-2" />
							</Button>
							<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
								<span className="bg-card text-muted-foreground relative z-10 px-2">
									or
								</span>
							</div>
							<div className="flex flex-col gap-4">
								<Button variant="outline" className="w-full">
									<img
										src="/google.svg"
										alt="google"
										className="size-4"
									/>
									Signup with Google
								</Button>
							</div>
						</form>
					</Form>

					<LightText className="text-center">
						Already have an account?{" "}
						<Link
							to="/login"
							className="underline underline-offset-4"
						>
							Login
						</Link>
					</LightText>
				</div>
			</CardContent>
		</Card>
	);
}
