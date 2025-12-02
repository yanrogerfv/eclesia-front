"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeftCircle, Eye, EyeOff, Loader, LogIn, RectangleEllipsis, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from "@/components/ui/motion-tabs";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { putMethod } from "@/lib/apiRequests";

const formSchema = z.object({
    username: z.string(),
    password: z.string().min(5),
    accessCode: z.string().toUpperCase().min(6).optional()
})

type FormData = z.infer<typeof formSchema>

export default function LoginPage() {
    var expireMinutes = 15;
    var expireTime = new Date(new Date().getTime() + expireMinutes * 60 * 1000);
    const router = useRouter();
    const form = useForm<FormData>({
        defaultValues: {
            username: "",
            password: "",
            accessCode: ""
        }
    })

    const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 1000))

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
                Cookies.set("username", data.username, { expires: expireTime })
                Cookies.set("levitaname", resp.levita.name, { expires: expireTime })
                sessionStorage.setItem("role", resp.role)
                sessionStorage.setItem("levita", resp.levita.id)
                toast.success(`Usuário logado com sucesso! Bem-vindo, ${data.username}.`)
                await promise();
                // router.push("/home")
                window.location.href = "/home";
            }
            if (!response.ok) {
                let resp = await response.json();
                toast.error("Erro ao fazer login: " + resp.error[0])
            }
        } catch (error) {
            console.error("Erro na comunicação com a api: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleUpdate = async (data: FormData) => {
        if (!data.accessCode || data.accessCode.length != 6) {
            toast.error("Por favor, insira o código de acesso.");
            return;
        }
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                toast.success("Usuário atualizado com sucesso! Agora você pode fazer login.");
                form.reset();
                await promise();
                router.refresh();
            }
            if (!response.ok) {
                let resp = await response.json();
                toast.error("Erro ao atualizar usuário: " + resp.error)
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
            <Tabs defaultValue="login" className="max-w-xs md:max-w-2xl m-4 gap-0 flex items-center">
                <TabsList className="p-1 max-w-xs md:max-w-xl w-2/3 rounded-t-2xl" activeClassName="rounded-t-2xl">
                    <TabsTrigger value="login">
                        Entrar
                    </TabsTrigger>
                    <TabsTrigger value="register">
                        Atualizar
                    </TabsTrigger>
                </TabsList>
                <Card className="">
                    <CardHeader className="text-center p-4">
                        <div className="flex flex-row justify-between">
                            <ArrowLeftCircle className="cursor-pointer text-secondary hover:text-current/20" onClick={() => router.push("/")} />
                            <span className="text-lg sm:text-xl">Login</span>
                            <ArrowLeftCircle color="transparent" />
                        </div>
                        <Separator className="mt-4" />
                    </CardHeader>
                    <CardContent>
                        <TabsContents>
                            <TabsContent value="login" className="p-1">
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
                                                                className="pl-10 rounded-lg"
                                                            />
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                                <User size={20} />
                                                            </span>
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField control={form.control} name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Senha</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input type={seePass ? "text" : "password"} placeholder="Insira a Senha" className="pl-10 rounded-lg"
                                                                {...field} />
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                                <RectangleEllipsis size={20} />
                                                            </span>
                                                            {seePass ? (
                                                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                                                                    <Eye onClick={() => setSeePass(false)} size={20} />
                                                                </span>
                                                            ) : (
                                                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                                                                    <EyeOff onClick={() => setSeePass(true)} size={20} />
                                                                </span>
                                                            )}
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <div className="flex flex-row items-end justify-between">
                                            <Button type="submit" variant="default" className="px-5 mt-10 w-full rounded-lg" disabled={isLoading} >
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
                                            <a href="https://mail.google.com/mail/u/0/?fs=1&to=yanrogerfv@gmail.com&su=Esqueci%20Meu%20Código%20-%20Eclesia%20Software&tf=cm"
                                                className="text-sm text-zinc-400/80 hover:text-zinc-200/80">Esqueci meu código</a>
                                        </div>
                                    </form>
                                </Form>
                            </TabsContent>
                            <TabsContent value="register" className="p-1">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleUpdate)}
                                        className="space-y-6"
                                    >
                                        <FormField
                                            control={form.control}
                                            name="accessCode"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col w-full items-center justify-center">
                                                    <FormLabel className="text-center justify-center items-center w-full" slot="">Código de Acesso</FormLabel>
                                                    <FormControl>
                                                        <div className="space-y-2 flex items-center justify-center w-full">
                                                            <InputOTP className="w-full items-center justify-center"
                                                                maxLength={6}
                                                                value={field.value?.toUpperCase()}
                                                                onChange={field.onChange}
                                                            >
                                                                <InputOTPGroup>
                                                                    <InputOTPSlot index={0} />
                                                                    <InputOTPSlot index={1} />
                                                                    <InputOTPSlot index={2} />
                                                                    <InputOTPSlot index={3} />
                                                                    <InputOTPSlot index={4} />
                                                                    <InputOTPSlot index={5} />
                                                                </InputOTPGroup>
                                                            </InputOTP>
                                                        </div>
                                                    </FormControl>
                                                    <div className="text-center text-sm">
                                                        {field.value === "" ? (
                                                            <>Insira seu código de acesso.</>
                                                        ) : (
                                                            <>Você inseriu: {field.value?.toUpperCase()}</>
                                                        )}
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Username</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter your username" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField control={form.control} name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="Enter your password" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" variant="default" className="w-full mt-4" disabled={isLoading} >
                                            {isLoading ? (
                                                <div className="flex items-center justify-center gap-1">
                                                    <Loader className="animate-spin" size={20} />
                                                    <span className="ml-2">Carregando...</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center gap-1">
                                                    <LogIn size={20} />
                                                    Atualizar Cadastro
                                                </div>
                                            )}
                                        </Button>
                                    </form>
                                </Form>
                            </TabsContent>
                        </TabsContents>
                    </CardContent>
                </Card>
            </Tabs>
        </div>
    );
}