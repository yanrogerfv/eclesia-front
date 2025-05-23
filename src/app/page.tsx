"use client"

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
            className="relative rounded-lg bg-cover bg-center bg-no-repeat text-center">
            <main className="px-4 sm:px-10 md:px-20 h-lvh justify-center items-center">
                <nav className={"outline outline-1 outline-primary bg-cardstartbg/80 h-[8dvh] rounded-b-3xl "} />
                <nav className="pt-8 md:pt-16 flex justify-center">
                    <div className="flex-row justify-center text-center p-6 md:p-10 outline outline-1 outline-primary rounded-xl bg-cardstartbg/80">
                        <h1 className="font-semibold text-4xl sm:text-6xl md:text-8xl border-b">Eclesia</h1>
                        <p className="text-center text-colortext text-lg sm:text-xl md:text-2xl mt-1">
                            Uma amiga na hora de organizar os Levitas e montar Escalas!</p>
                    </div>
                    <br />
                </nav>
                <div className="justify-center items-center">
                    <div className="flex justify-center p-4 sm:p-8">
                        <Link href="/login" className="flex h-[10dvh] w-[20dvh] justify-center items-center">
                            <Button variant={"outline"} className={"w-full size-fit justify-center border border-primary/90 mx-2 text-2xl sm:text-4xl rounded-lg "}>
                                Login
                            </Button>
                        </Link>
                    </div>
                    <div className="flex justify-center pb-4 sm:pb-8">
                        <ThemeSelector className="" />
                    </div>
                    <div className="flex text-center justify-center">
                        <Card className={"w-[90%] sm:w-[80dvh] outline outline-1 outline-primary py-3 px-6 text-center justify-center items-center "}>
                            <p className="text-lg sm:text-xl">Eclesia é uma aplicação web que visa facilitar a organização de escalas e a comunicação entre os membros de um grupo de louvor.
                                Aqui você pode criar e gerenciar Escalas, Levitas, os Instrumentos usados e as Músicas tocadas!</p>
                            <br />
                            <p className="text-lg sm:text-xl text-colortext">Eclesia é uma aplicação em desenvolvimento, então fique à vontade para relatar problemas e sugerir melhorias!</p>
                        </Card>
                    </div>
                    <div className="flex text-center justify-center pb-5 pt-10 sm:pt-20">
                        <Card className="w-[90%] sm:w-[80svh] outline outline-1 items-center outline-primary flex justify-between px-3 py-1 bg-cardstartbg/80">
                            <p className="text-xs sm:text-sm text-colortext pl-2">v0.0.1a</p>
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
                                            Github: <Link target="_blank" href="https://github.com/yanrogerfv" className="text-subprimary hover:underline">
                                                @yan-roger-fv</Link>
                                        </p>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <p className="text-xs sm:text-sm cursor-pointer hover:underline">Thanks!</p>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 rounded-lg">
                                    <div className="flex text-start justify-normal">
                                        <p className="text-sm">
                                            <p className="text-primary">Agradecimentos: </p>
                                            <Link className="text-specialtext hover:underline" target="_blank" href={"https://github.com/JoaoVitorSD"}>João Vitor Depollo</Link>, meu tutor,
                                            <Link className="text-specialtext hover:underline" target="_blank" href={"https://github.com/gregorystevao19"}> Grégory Stevão</Link>,
                                            <Link className="text-specialtext hover:underline" target="_blank" href={"https://github.com/Souzaa1"}> Pedro Antônio</Link> e
                                            <Link className="text-specialtext hover:underline" target="_blank" href={"https://github.com/SamuelAMT"}> Samuel Tavares</Link>, pelas dicas, e
                                            <a className="text-specialtext hover:brightness-125"> Isabella Cassilhas e Gabriel Barros </a> pela avaliação!
                                        </p>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}