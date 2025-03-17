import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIError } from "@/types/error";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/hooks/use-auth";

const API = import.meta.env.VITE_BACKEND_URL;

const loginSchema = z.object({
	email: z.string().email({ message: "Invalid email address." }),
	password: z.string(),
});

export default function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
	});
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const navigate = useNavigate();
	const toggleVisibility = () => setIsVisible((prevState) => !prevState);
	const { login } = useAuth();

	const loginAttempt = useMutation({
		mutationKey: ["login"],
		mutationFn: async (data: z.infer<typeof loginSchema>) => {
			const response = await axios.post(`${API}/auth/login`, data);

			const loginCredentials = {
				accessToken: response.data.accessToken,
				refreshToken: response.data.refreshToken,
				user: {
					email: response.data.user.email,
					id: response.data.user.id,
				},
			};

			if (!response.data.accessToken || !response.data.refreshToken) {
				throw new Error("Invalid response from server.");
				
			}

			localStorage.setItem("authToken", response.data.accessToken);
			localStorage.setItem("refreshToken", response.data.refreshToken);

			login(loginCredentials);
			navigate("/dashboard");
		},
		
	});

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card className="overflow-hidden p-0 ">
				<CardContent className="grid p-0 md:grid-cols-2">
					<Form {...form}>
						<form
							className="p-6 md:p-8"
							onSubmit={form.handleSubmit((data) =>
								loginAttempt.mutate(data)
							)}
						>
							<div className="flex flex-col gap-6">
								<div className="flex flex-col items-center text-center">
									<h1 className="text-2xl font-bold">
										Welcome back
									</h1>
									<p className="text-muted-foreground text-balance">
										Login to your DW 2025 account
									</p>
									{loginAttempt.isError && (
										<div className="border mt-4 border-red-400 p-2 rounded-lg w-full">
											<p className="text-sm text-red-400">
												{
													(
														loginAttempt.error as unknown as APIError
													)?.response.data.message
												}
											</p>
										</div>
									)}
								</div>

								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<div className="grid gap-3">
											<FormItem>
												<FormLabel htmlFor="email">
													Email
												</FormLabel>
												<FormControl>
													<Input
														autoCorrect="off"
														{...field}
														id="email"
														placeholder="dw@example.com"
														required
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										</div>
									)}
								/>
								<div className="grid gap-3">
									<div className="flex items-center">
										<Label htmlFor="password">
											Password
										</Label>
										<a
											href="#"
											className="ml-auto text-sm underline-offset-2 hover:underline"
										>
											Forgot your password?
										</a>
									</div>
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<div className="relative">
													<Input
														{...field}
														className="pe-9"
														placeholder="Password"
														type={
															isVisible
																? "text"
																: "password"
														}
													/>
													<button
														className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
														type="button"
														onClick={
															toggleVisibility
														}
														aria-label={
															isVisible
																? "Hide password"
																: "Show password"
														}
														aria-pressed={isVisible}
														aria-controls="password"
													>
														{isVisible ? (
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
											</FormItem>
										)}
									/>
								</div>
								<Button
									type="submit"
									className="w-full"
									disabled={loginAttempt.isPending}
								>
									{loginAttempt.isPending && (
										<Loader2 className="animate-spin" />
									)}
									Login
								</Button>
								<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
									<span className="bg-background text-muted-foreground relative z-10 px-2">
										Or continue with
									</span>
								</div>

								<Button
									variant="outline"
									type="button"
									className="w-full"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
									>
										<path
											d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
											fill="currentColor"
										/>
									</svg>
									<span className="sr-only">
										Login with Google
									</span>
								</Button>

								<div className="text-center text-sm">
									Don&apos;t have an account?{" "}
									<a
										href="#"
										className="underline underline-offset-4"
									>
										Sign up
									</a>
								</div>
							</div>
						</form>
					</Form>

					<div className="bg-muted relative hidden md:block">
						<img
							src="/payroll.svg"
							alt="Image"
							className="absolute inset-0 bg-foreground h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
						/>
					</div>
				</CardContent>
			</Card>
			<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
				By clicking continue, you agree to our{" "}
				<a href="#">Terms of Service</a> and{" "}
				<a href="#">Privacy Policy</a>.
			</div>
		</div>
	);
}
