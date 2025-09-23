"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signInSchema } from "@/lib/validation";
import { authClient } from "@/lib/auth-client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

export const SignInForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [providerLoading, setproviderLoading] = useState(false)
	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof signInSchema>) {
		setError(null);
		setLoading(true);
		try {
			authClient.signIn.email(
				{
					email: values.email,
					password: values.password,
					callbackURL: "/",
				},
				{
					onSuccess: () => {
						setLoading(false);
					},

					onError: ({ error }) => {
						setError(error.message);
						setLoading(false);
					},
				}
			);
		} catch (error: any) {
			setError(error.message);
		}
	}

	const onSocial = (provider: "google") => {
		setError(null);
		setproviderLoading(true)
		try {
			authClient.signIn.social(
				{
					provider: provider,
					callbackURL: "/",
				},
				{
					onSuccess: () => {
						setproviderLoading(false);
					},

					onError: ({ error }) => {
						setError(error.message || "Something went wrong.");
						setproviderLoading(false);
					},
				}
			);
		} catch (error: any) {
			return { success: false, error: error.message };
		}
	};
	return (
		<div className="min-h-screen flex items-center justify-center  p-4">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 relative">
				<div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-blue-100 via-blue-50 to-transparent opacity-40 blur-3xl -mt-20"></div>
				<div className="p-8">
					<div className="flex flex-col items-center mb-8">
						<div className="bg-white p-4 rounded-2xl shadow-lg mb-6">
							<svg
								width="48"
								height="48"
								viewBox="0 0 110 106"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M100.83 28.63L66.86 3.95c-7.25-5.26-17.07-5.26-24.35 0L8.54 28.63C1.29 33.89-1.76 43.23 1.01 51.77l12.98 39.93c2.77 8.53 10.72 14.3 19.7 14.3h41.97c8.98 0 16.93-5.76 19.7-14.3l12.98-39.93c2.77-8.53-.28-17.88-7.53-23.14ZM64.81 63.13l-10.13 18.55-10.13-18.55-18.55-10.13 18.55-10.13 10.13-18.55 10.13 18.55 18.55 10.13-18.55 10.13Z"
									fill="#3B82F6"
								/>
							</svg>
						</div>
						<div className="p-0">
							<h2 className="text-2xl font-bold text-gray-900 text-center">
								Welcome Back
							</h2>
							<p className="text-center text-gray-500 mt-2">
								Sign in to continue to your account
							</p>
						</div>
					</div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="space-y-6 p-0">
								<div className="space-y-1">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														className="bg-gray-50 border-gray-200 text-gray-900 h-12 rounded-lg focus-visible:ring-2 focus:border-blue-500 w-full px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
														placeholder="Enter your email or phone"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="space-y-1">
									<div className="relative">
										<FormField
											control={form.control}
											name="password"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Password</FormLabel>
													<FormControl>
														<div className="relative">
															<input
																{...field}
																type={showPassword ? "text" : "password"}
																className="bg-gray-50 border-gray-200 text-gray-900 pr-20 h-12 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500/50 focus:border-blue-500 w-full px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
																placeholder="••••••••"
															/>
															<button
																type="button"
																className="absolute inset-y-0 right-2 text-gray-400 hover:text-blue-600 hover:bg-gray-100 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-2"
																onClick={() => setShowPassword(!showPassword)}>
																{showPassword ? (
																	<EyeOff className="w-5 h-5" />
																) : (
																	<Eye className="w-5 h-5" />
																)}
															</button>
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										{error && (
											<Alert variant="destructive" className="mt-2">
												<AlertTitle>Error</AlertTitle>
												<AlertDescription>{error}</AlertDescription>
											</Alert>
										)}
									</div>
								</div>

								<Button
									disabled={loading}
									className="w-full h-12 bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400 hover:from-blue-700 hover:via-blue-600 hover:to-blue-500 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-blue-100 active:scale-[0.98] inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
									type="submit">
									{loading ? (
										<LoaderCircle className="w-4 h-4 animate-spin transition-all duration-100" />
									) : (
										"Sign in"
									)}
								</Button>

								<div className="flex items-center my-4">
									<div className="flex-1 h-px bg-gray-200"></div>
									<span className="px-4 text-sm text-gray-400">
										or continue with
									</span>
									<div className="flex-1 h-px bg-gray-200"></div>
								</div>

								<div className="grid grid-cols-1 gap-3">
									<Button
										type="button"
										disabled={providerLoading}
										onClick={() => onSocial("google")}
										className="h-12  border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg flex items-center justify-center gap-2 border bg-background  whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
										<svg
											width="18"
											height="18"
											viewBox="0 0 24 24"
											fill="none"
											className="text-gray-700">
											<path
												d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
												fill="#4285F4"
											/>
											<path
												d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
												fill="#34A853"
											/>
											<path
												d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
												fill="#FBBC05"
											/>
											<path
												d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
												fill="#EA4335"
											/>
										</svg>
										<span className="whitespace-nowrap">{providerLoading ? <LoaderCircle className="w-4 h-4 animate-spin transition-all duration-100"/>:"Google"}</span>
									</Button>
								</div>
							</div>
							<div className="p-0 mt-6">
								<p className="text-sm text-center text-gray-500 w-full">
									Don&apos;t have an account?{" "}
									<Link
										href="sign-up"
										className="text-blue-600 hover:underline font-medium">
										Sign up
									</Link>
								</p>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
};
