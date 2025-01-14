"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, LockOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const formSchema = z.object({
  username: z.string(),
  password: z.string().min(5),
})

type FormData = z.infer<typeof formSchema>


export default function LoginPage() {
  const [cookie, setCookie, removeCookie] = useCookie("token");
  const router = useRouter();
  const form = useForm<FormData>({
    defaultValues: {
      username: "",
      password: ""
    }
  })

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

      if (!response.ok) {
        console.error("Erro ao efetuar login!")
      }
      router.push("/v0")
    } catch (error) {
      console.error("Erro na comunicação com a api: ", error);
    } finally {
      setIsLoading(false);
    }
  }


  const [isLoading, setIsLoading] = useState(false)
  const [seePass, setSeePass] = useState(false)

  return (
    // <div style={{ backgroundImage: "url('https://imgur.com/a/qoPLe0N')" }}
    //  className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat text-center bg-transparent">
    <>
      {/* <Image src="https://i.imgur.com/dZ2L7bl.jpeg" alt="Grazi" height={1080} width={1920}  objectPosition="relative" objectFit="cover"/> */}
      {/* <blockquote class="imgur-embed-pub" lang="en" data-id="dZ2L7bl"><a href="https://imgur.com/dZ2L7bl">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script> */}
      <div style={{ backgroundImage: "url('https://i.imgur.com/dZ2L7bl.jpeg')" }}
        className="relative overflow-hidden rounded-lg bg-cover bg-current/25 bg-no-repeat text-center">

        {/* <Card className="justify-center outline outline-1 outline-primary rounded-2xl
          lg:w-[20dvw] lg:h-fit lg:ml-[70dvw] lg:mr-[10dvw] lg:my-[31dvh] 
          md:w-[40dvw] md:h-[80dvh] md:ml-[30dvw] md:mr-[30dvw] md:my-[10dvh]
          w-4/5 h-[60dvh] mx-[10dvw] my-[5dvh]
          ">
          <CardHeader className="text-4xl font-bold">Login
            <CardDescription className="border-b my-2"></CardDescription>
          </CardHeader>
          <CardContent>
            <Label>Usuário</Label>
            <Input className="mb-2" placeholder="Insira o Usuário" onChange={(e) => setUsername(e.target.value)} />
            <Label>Senha</Label>
            <div className="flex justify-between mb-2">
              <Input type={seePass ? "password" : "text"} placeholder="Insira a Senha" onChange={(e) => setPassword(e.target.value)} />
              {seePass ? <Lock className="absolute lg:right-[12dvw] self-center align-middle cursor-pointer" onClick={() => setSeePass(!seePass)} />
                : <LockOpen className="absolute lg:right-[12dvw] self-center align-middle cursor-pointer" onClick={() => setSeePass(!seePass)} />}
            </div>
            <Button variant={"outfill"} className="px-5 mb-4" onClick={() => console.log("Username: " + username + "\nPassword: " + password)}>Entrar</Button>
            <br />
            <Link href={"/"} className="text-sm text-secondary/75 hover:text-secondary/75">Esqueci minha senha</Link>
            <p className="text-xs mt-1 text-zinc-400">v0.0.1a</p>
          </CardContent>
        </Card> */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira o Usuário"
                      {...field}
                    />
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
                    <Input
                      type={seePass ? "password" : "text"}
                      placeholder="Insira a Senha"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="outfill"
              className="px-5 mb-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <div>
                  <div className="animate-spin h-5 w-5 border-b-2 border-white rounded-full" />
                  Entrando...
                </div>
              ) : "Entrar"}
            </Button>

          </form>
        </Form>







        <Card className="flex outline outline-1 outline-primary rounded-2xl
      lg:hidden md:hidden w-4/5 h-[25dvh] mx-[10dvw] my-[5dvh]
      "></Card>
      </div>
    </>
  );
}