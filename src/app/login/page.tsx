"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Key, Loader, Lock, LockOpen, LogIn, RectangleEllipsis, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
// import { usePermission } from "@/context/permissionContext";



const formSchema = z.object({
	username: z.string(),
	password: z.string().min(5),
})

type FormData = z.infer<typeof formSchema>


export default function LoginPage() {
	var expireMinutes = 15;
	var expireTime = new Date(new Date().getTime() + expireMinutes * 60 * 1000);
	const router = useRouter();
	const form = useForm<FormData>({
		defaultValues: {
			username: "",
			password: ""
		}
	})

	const promise = () => new Promise((resolve) => setTimeout(() => resolve({name : "Sonner"}), 3000))

	const handleLogin = async (data: FormData) => {
		try {
			setIsLoading(true);
			const response = await fetch("http://localhost:1004/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data)
			})

			if (response.ok) {
				let resp = await response.json();
				Cookies.set("token", resp.token, { expires: expireTime })
				// setPermission(resp.role);
				Cookies.set("username", data.username, { expires: expireTime })
				localStorage.setItem("role", resp.role)
				toast.promise(promise(), {
					loading: "Carregando...",
					success: "Usuário logado com sucesso!",
					error: "Erro ao efetuar login!"
				})
				router.push("/v0")
			}
			if (!response.ok) {
				console.error("Erro ao efetuar login!")
			}
		} catch (error) {
			console.error("Erro na comunicação com a api: ", error);
		} finally {
			setIsLoading(false);
		}
	}


	const [isLoading, setIsLoading] = useState(false)
	const [seePass, setSeePass] = useState(false)

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-primary via-secondary to-violet-600 *:">
			<Card>
				<CardHeader className="text-center p-4">
					Login de Usuário
					<Separator className="mt-4" />
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleLogin)}
							className="space-y-6"
						>
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Usuário</FormLabel>
										<FormControl>
											<div className="relative">

												<Input
													placeholder="Insira o Usuário"
													{...field}
													className="pl-10 text-white rounded-lg"
												/>
												<span className="absolute inset-y-0 left-0 flex items-center pl-3">
													<User size={20} />
												</span>
											</div>

										</FormControl>
									</FormItem>

								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Senha</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													type={seePass ? "text" : "password"}
													placeholder="Insira a Senha"
													className="pl-10 text-white rounded-lg"
													{...field}
												/>
												<span className="absolute inset-y-0 left-0 flex items-center pl-3">
													<RectangleEllipsis size={20} />
												</span>

												{seePass ? (
													<span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
														<Eye
															onClick={() => setSeePass(false)}
															size={20}
														/>
													</span>
												) : (
													<span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
														<EyeOff
															onClick={() => setSeePass(true)}
															size={20}
														/>
													</span>
												)}
											</div>

										</FormControl>
									</FormItem>
								)}
							/>

							<div className="flex items-end h-full">
								<Button
									type="submit"
									variant="default"
									className="px-5 mb-4 mt-10 w-full rounded-lg"
									disabled={isLoading}
								>
									{isLoading ? (
										<>
											<div className="flex items-center justify-center gap-1">
												<Loader className="animate-spin" size={20} />
												<span className="ml-2">Carregando...</span>
											</div>
										</>
									) : (
										<div className="flex items-center justify-center gap-1">
											<LogIn size={20} />
											Entrar
										</div>
									)}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div >
	);
}