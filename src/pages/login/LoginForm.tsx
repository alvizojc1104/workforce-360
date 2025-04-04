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
	FormMessage,
} from "@/components/ui/form";
import { EyeIcon, EyeOffIcon, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { APIError } from "@/types/error";
import { useAuth } from "@/hooks/use-auth";
import { Checkbox } from "@/components/ui/checkbox";
import { loginSchema } from "../../features/auth/auth-config";
import LightText from "../../components/LightText";
import TitleText from "../../components/TitleText";

export default function LoginForm() {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: { emailOrUserName: "", password: "" },
	});
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const toggleVisibility = () => setIsVisible((prevState) => !prevState);
	const { login } = useAuth();

	return (
		<Card className="max-w-sm w-full">
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit((data) =>
							login.mutateAsync(data)
						)}
					>
						<div className="flex flex-col gap-6">
							<div className="flex flex-col items-center text-center gap-1">
								<TitleText>Login to Workforce 360</TitleText>
								<LightText>
									Welcome back! Please enter your email and
									password.
								</LightText>
								{login.isError && (
									<div className="border mt-4 border-red-400 p-2 rounded-lg w-full">
										<p className="text-sm text-red-400">
											{
												(
													login.error as unknown as APIError
												)?.response.data.message
											}
										</p>
									</div>
								)}
							</div>
							<div className="flex flex-col gap-4">
								<FormField
									control={form.control}
									name="emailOrUserName"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div className="relative">
													<Input
														autoCorrect="off"
														{...field}
														id="email"
														placeholder="Email or username"
														className="peer ps-9"
														required
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
											<div className="relative">
												<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
													<Lock
														size={16}
														aria-hidden="true"
													/>
												</div>
												<Input
													{...field}
													className="peer ps-9"
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
										</FormItem>
									)}
								/>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<Checkbox id="remember-me" />
									<Label
										htmlFor="remember-me"
										className="text-xs font-normal text-foreground/70 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										Remember me
									</Label>
								</div>

								<Link
									to="#"
									className="ml-auto text-xs underline-offset-2 hover:underline"
								>
									Forgot your password?
								</Link>
							</div>
							<Button
								type="submit"
								className="w-full"
								disabled={login.isPending}
							>
								{login.isPending && (
									<Loader2 className="animate-spin" />
								)}
								Login
							</Button>
							<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
								<span className="bg-background text-muted-foreground relative z-10 px-2">
									or
								</span>
							</div>

							<Button
								variant="outline"
								type="button"
								className="w-full"
							>
								<img
									src="/google.svg"
									alt="google oauth"
									className="size-4"
								/>
								Login with Google
								<span className="sr-only">
									Login with Google
								</span>
							</Button>

							<LightText className="text-center">
								Don&apos;t have an account?{" "}
								<Link
									to="/signup"
									className="underline underline-offset-4"
								>
									Sign up
								</Link>
							</LightText>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
