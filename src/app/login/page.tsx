"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, LockOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [seePass, setSeePass] = useState(false)

  return (
    // <div style={{ backgroundImage: "url('https://imgur.com/a/qoPLe0N')" }}
    //  className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat text-center bg-transparent">
    <>
      {/* <Image src="https://i.imgur.com/dZ2L7bl.jpeg" alt="Grazi" height={1080} width={1920}  objectPosition="relative" objectFit="cover"/> */}
      {/* <blockquote class="imgur-embed-pub" lang="en" data-id="dZ2L7bl"><a href="https://imgur.com/dZ2L7bl">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script> */}
      <div style={{ backgroundImage: "url('https://i.imgur.com/dZ2L7bl.jpeg')" }}
        className="relative overflow-hidden rounded-lg bg-cover bg-current/25 bg-no-repeat text-center">

        <Card className="justify-center outline outline-1 outline-primary rounded-2xl
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
        </Card>









        <Card className="flex outline outline-1 outline-primary rounded-2xl
      lg:hidden md:hidden w-4/5 h-[25dvh] mx-[10dvw] my-[5dvh]
      "></Card>
      </div>
    </>
  );
}