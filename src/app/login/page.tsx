"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeftCircle, Eye, EyeOff, Key, Loader, Lock, LockOpen, LogIn, RectangleEllipsis, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { DialogFooter } from "@/components/ui/dialog";
// import { usePermission } from "@/context/permissionContext";

const formSchema = z.object({
    username: z.string(),
    password: z.string().min(5),
})

type FormData = z.infer<typeof formSchema>

export default function LoginPage() {
    var expireMinutes = 150;
    var expireTime = new Date(new Date().getTime() + expireMinutes * 60 * 1000);
    const router = useRouter();
    const form = useForm<FormData>({
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 3000))

    const handleLogin = async (data: FormData) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
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
                Cookies.set("levitaname", resp.levita.name, { expires: expireTime })
                sessionStorage.setItem("role", resp.role)
                sessionStorage.setItem("levita", resp.levita.id)
                toast.success("Usuário logado com sucesso!")
                router.push("/v0")
            }
            if (!response.ok) {
                // const error = await response.json()
                let resp = await response.json();
                toast.error("Erro ao fazer login: " + resp.error[0])
                // toast.error("Erro ao fazer login: ")
                // console.log(response)
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
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-primary via-secondary to-violet-600">
            <Card className=" max-w-xs mx-4 sm:mx-0">
                <CardHeader className="text-center p-4">
                    <div className="flex flex-row justify-between">
                        <ArrowLeftCircle className="cursor-pointer text-secondary hover:text-current/20" onClick={() => router.push("/")} />
                        <span className="text-lg sm:text-xl">Login de Usuário</span>
                        <ArrowLeftCircle color="transparent" />
                    </div>
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

                            <div className="flex flex-row items-end justify-between">
                                <Button
                                    type="submit"
                                    variant="default"
                                    className="px-5 mt-10 w-full rounded-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center gap-1">
                                            <Loader className="animate-spin" size={20} />
                                            <span className="ml-2">Carregando...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-1">
                                            <LogIn size={20} />
                                            Entrar
                                        </div>
                                    )}
                                </Button>
                            </div>
                            <div className="flex justify-center">
                                {/* patchMethod<UserDTO>(`auth/user/${user.id}`, () => {
                                        setUsers(users?.map(u => u.id === user.id ? { ...u, username: user.username, role: user.role } : u));
                                        toast.success("Usuário editado com sucesso!");
                                                }
                                                ).catch((error) => {
                                            toast.error("Erro ao editar usuário: ", error);
                                        console.error("Erro ao editar usuário: ", error);
                                                }) */}
                                <a href="https://mail.google.com/mail/u/0/?fs=1&to=yanrogerfv@gmail.com&su=Esqueci%20Minha%20Senha%20-%20Eclesia%20Software&tf=cm"
                                    className="text-sm text-zinc-400/80 hover:text-zinc-200/80">Esqueci minha senha</a>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}