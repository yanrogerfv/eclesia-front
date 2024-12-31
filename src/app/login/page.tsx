import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";


export default function LoginPage() {

  return (
    // <div style={{ backgroundImage: "url('https://imgur.com/a/qoPLe0N')" }}
    //  className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat text-center bg-transparent">
    <>
      {/* <Image src="https://i.imgur.com/dZ2L7bl.jpeg" alt="Grazi" height={1080} width={1920}  objectPosition="relative" objectFit="cover"/> */}
      {/* <blockquote class="imgur-embed-pub" lang="en" data-id="dZ2L7bl"><a href="https://imgur.com/dZ2L7bl">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script> */}
      <div style={{ backgroundImage: "url('https://i.imgur.com/dZ2L7bl.jpeg')" }} 
        className="relative animate-in overflow-hidden rounded-lg bg-cover bg-no-repeat h-full text-center bg-transparent">

        <Card className="justify-center outline outline-1 outline-primary rounded-2xl
          lg:w-[20dvw] lg:h-fit lg:ml-[70dvw] lg:mr-[10dvw] lg:my-[33.5svh] 
          md:w-[40dvw] md:h-[80dvh] md:ml-[30dvw] md:mr-[30dvw] md:my-[10dvh]
          w-4/5 h-[60dvh] mx-[10dvw] my-[5dvh]
          ">
          <CardHeader className="text-4xl font-bold">Login
            <CardDescription className="border-b my-2"></CardDescription>
          </CardHeader>
          <CardContent>
            <Label>Usuário</Label>
            <Input className="mb-2" placeholder="Insira o Usuário"></Input>
            <Label>Senha</Label>
            <Input className="mb-2" type="password" placeholder="Insira a Senha"></Input>
            <Link href={"/login"} className="text-sm text-secondary/75 hover:text-secondary/75">Esqueci minha senha</Link>
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