"use client"

import { ChangeTheme, ThemeProvider } from "@/components/themeProvider";
import ThemeSelector from "@/components/themeSelector";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function LandingPage() {

    const { theme, setTheme } = useTheme();

    return (
        <div style={{ backgroundImage: "url('https://i.imgur.com/dZ2L7bl.jpeg')" }}
            // <div style={{ backgroundImage: "url('https://i.imgur.com/dk8EP9v.jpeg')" }} 
            className="relative overflow-hidden rounded-lg bg-cover bg-current/25 bg-no-repeat text-center">
            {/* <div>  */}
            <main className="px-20 h-lvh justify-center items-center">
                <nav className={"outline outline-1 outline-primary h-[8dvh] rounded-b-3xl ".concat(
                    localStorage.getItem("theme") == "light" ? "bg-primary/20 " : "bg-black/80 ")} />
                <nav className="pt-16 flex justify-center">
                    <div className={"flex-row justify-center text-center p-10 outline outline-1 outline-primary rounded-xl ".concat(
                        localStorage.getItem("theme") == "light" ? "bg-primary/20 " : "bg-black/80 ")}>
                        <h1 className="font-extrabold text-8xl border-b">Eclesia</h1>
                        {/* <Button onClick={() => handleSereneMode()} variant={sereneMode ? "outline" : "default"} className="flex h-12 text-lg rounded-lg">Modo Sereno</Button> */}
                        <p className="text-center text-zinc-300/90 text-2xl mt-1">
                            Uma amiga na hora de organizar os Levitas e montar Escalas!</p>
                    </div>
                    <br />
                </nav>
                <div className="justify-center items-center">
                    <div className="flex justify-center p-8">
                        {/* <Button variant={"outfill"} className="flex h-[10dvh] w-[20dvh] size-fit border border-primary/90 mx-2 bg-black/80 text-4xl rounded-lg">
                        <Link href="/v0" className="w-full ">Planejar</Link></Button> */}
                        <Button
                            variant="default"
                            size="icon"
                            className="w-16 rounded-xl absolute right-30 top-5"
                            onClick={() => setTheme(theme => theme === "dark" ? "light" : "dark")}
                        >
                            <div className="group relative flex items-center justify-center w-8 h-8 rounded-xl transition-all">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:text-zinc-200" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-zinc-200" />
                                <span className="sr-only">Toggle theme</span>
                            </div>
                        </Button>
                        <Button variant={"outfill"} className={"flex h-[10dvh] w-[20dvh] size-fit border border-primary/90 mx-2 text-4xl rounded-lg ".concat(localStorage.getItem("theme") == "light" ? "bg-primary/20 " : "bg-black/80 ")}>
                            <Link href="/login" className="w-full ">Login</Link></Button>
                    </div>
                    <div className="flex justify-center pb-8">
                        <ThemeSelector />
                    </div>
                    <div className="flex text-center justify-center">
                        <Card className={"w-[80dvh] outline outline-1 outline-primary py-3 px-6 text-center justify-center items-center ".concat(
                            localStorage.getItem("theme") == "light" ? "bg-primary/20 " : "bg-black/80 ")}>
                            <p className="text-xl">Eclesia é uma aplicação web que visa facilitar a organização de escalas e a comunicação entre os membros de um grupo de louvor.
                                Aqui você pode criar e gerenciar Escalas, Levitas, os Instrumentos usados e as Músicas tocadas!</p>
                            <br />
                            <p className="text-xl text-zinc-300">Eclesia é uma aplicação em desenvolvimento, então fique à vontade para relatar problemas e sugerir melhorias!</p>
                        </Card>
                    </div>
                    <div className="flex text-center justify-center pt-24">
                        <Card className="w-[80svh] outline outline-1 items-center outline-primary flex justify-between px-3 py-1 bg-cardstartbg">
                            <p className="text-sm text-zinc-400 pl-2">v0.0.1a</p>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="link">@yanfv</Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 rounded-lg">
                                    <div className="flex text-start justify-normal">
                                        <p className="text-sm">
                                            <p>Nome: <a className="text-subprimary cursor-default hover:brightness-125">Yan Roger Fogaça Vieira</a></p>
                                            Email: <Link target="_blank" href="https://mail.google.com/mail/u/0/?fs=1&to=yanrogerfv@gmail.com&su=Eclesia%20Software&tf=cm" className="text-subprimary hover:underline">
                                                yanrogerfv@gmail.com</Link><br />
                                            Github: <Link target="_blank" href="https://github.com/yan-roger-fv" className="text-subprimary hover:underline">
                                                @yan-roger-fv</Link>
                                        </p>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            {/* <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Button variant="link">@yanfv</Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80 rounded-lg">
                                    <div className="flex text-start justify-normal">
                                        <p className="text-sm">
                                            <p>Nome: <a className="text-subprimary hover:text-subprimary/90">Yan Roger Fogaça Vieira</a></p>
                                            Email: <Link target="_blank" href="https://mail.google.com/mail/u/0/?fs=1&to=yanrogerfv@gmail.com&su=Eclesia%20Software&tf=cm" className="text-subprimary hover:underline">
                                                yanrogerfv@gmail.com</Link><br />
                                            Github: <Link target="_blank" href="https://github.com/yan-roger-fv" className="text-subprimary hover:underline">
                                                @yan-roger-fv</Link>
                                        </p>
                                    </div>
                                </HoverCardContent>
                            </HoverCard> */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <p className="text-sm cursor-pointer hover:underline">Thanks!</p>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 rounded-lg">
                                    <div className="flex text-start justify-normal">
                                        <p className="text-sm">
                                            <p className="text-primary">Agradecimentos: </p>
                                            <Link className="text-indigo-100 hover:underline" target="_blank" href={"https://github.com/JoaoVitorSD"}>João Vitor Depollo</Link>, meu tutor,
                                            <Link className="text-indigo-100 hover:underline" target="_blank" href={"https://github.com/gregorystevao19"}> Grégory Stevão</Link>,
                                            <Link className="text-indigo-100 hover:underline" target="_blank" href={"https://github.com/Souzaa1"}> Pedro Antônio</Link> e
                                            <Link className="text-indigo-100 hover:underline" target="_blank" href={"https://github.com/SamuelAMT"}> Samuel Tavares</Link>, pelas dicas,
                                            <a className="text-indigo-100 hover:brightness-125"> Gabriel Barros </a> pela avaliação, e
                                            <a className="text-indigo-100 hover:brightness-125"> Ailton Neves</a> pela oportunidade!
                                        </p>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            {/* <HoverCard>
                                <HoverCardTrigger asChild>
                                    <p className="text-sm cursor-pointer hover:underline">Thanks!</p>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80 rounded-lg">
                                    <div className="flex text-start justify-normal">
                                        <p className="text-sm">
                                            <p className="text-primary">Agradecimentos: </p>
                                            <Link className="text-indigo-100 hover:underline" target="_blank" href={"https://github.com/JoaoVitorSD"}>João Vítor Santana Depollo</Link>, meu tutor,
                                            <Link className="text-indigo-100 hover:underline" target="_blank" href={"https://github.com/Souzaa1"}> Pedro Antônio de Souza </Link> e
                                            <Link className="text-indigo-100 hover:underline" target="_blank" href={"https://github.com/SamuelAMT"}> Samuel Tavares</Link>, pelas dicas,
                                            <a className="text-indigo-100 hover:text-indigo-100/80"> Gabriel Barros </a> pela avaliação, e
                                            <a className="text-indigo-100 hover:text-indigo-100/80"> Ailton Neves</a> pela oportunidade!
                                        </p>
                                    </div>
                                </HoverCardContent>
                            </HoverCard> */}
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}