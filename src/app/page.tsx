"use client"

import ThemeSelector from "@/components/themeSelector";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GridBeams } from "@/components/ui/grid-beams";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { VideoText } from "@/components/ui/video-text";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function LandingPage() {

    const { theme, setTheme } = useTheme();

    return (
        <div /* style={{ backgroundImage: "url('https://i.imgur.com/dZ2L7bl.jpeg')" }} */
            // <div style={{ backgroundImage: "url('https://i.imgur.com/dk8EP9v.jpeg')" }} 
            className="relative rounded-lg bg-cover bg-center bg-no-repeat text-center bg-background from-neutral-900/50 to-neutral-900/90">
            <GridBeams>
                <main className="px-4 pt-32 sm:px-10 md:px-20 h-lvh justify-center items-center">
                    <div className="pt-8 md:pt-16 flex justify-center">
                        <div >
                            <h1>
                                <VideoText autoPlay loop muted className="h-32"
                                    src="https://www.pexels.com/download/video/19493166/">
                                    Eclesia
                                </VideoText>
                            </h1>
                            <p className="text-center text-colortext text-lg sm:text-xl md:text-2xl pt-2 border-t border-primary">
                                Uma amiga na hora de organizar os Levitas!</p>
                        </div>
                        <br />
                    </div>
                    <div className="justify-center items-center">
                        {/* <div className="flex justify-center p-4 sm:p-8">
                            <Link href="/login" className="flex h-[10dvh] w-[20dvh] justify-center items-center">
                                <Button variant={"outline"} className={"w-full size-fit justify-center border border-primary/90 mx-2 text-2xl sm:text-4xl rounded-lg "}>
                                    Login
                                </Button>
                            </Link>
                        </div>
                        <div className="flex justify-center pb-4 sm:pb-8">
                            <ThemeSelector className="" />
                        </div> */}


                        <div className="w-full flex justify-center mt-10">
                            <div className="flex justify-center items-center border rounded-sm">
                                <Link href="/login" className="m-4">
                                    <Button variant={"ghost"} className="text-lg sm:text-xl md:text-2xl">
                                        Acessar
                                    </Button>
                                </Link>
                                <Separator orientation="vertical" className="py-4 my-4" />
                                <Link href="/escalas" className="m-4">
                                    <Button variant={"ghost"} className="text-lg sm:text-xl md:text-2xl">
                                        Ver Próximas Escalas
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="flex text-center justify-center w-full mt-12">
                            <div className="max-w-xl">
                                {/* <Card className={"w-[90%] sm:w-[80dvh] outline outline-1 outline-primary py-3 px-6 text-center justify-center items-center "}> */}
                                <p className="sm:text-lg">Eclesia é uma aplicação web que visa facilitar a organização de escalas e a comunicação entre os membros de um grupo de louvor.
                                    Aqui você pode criar e gerenciar Escalas, Levitas, os Instrumentos usados e as Músicas escolhidas!</p>
                                <br />
                                <p className="sm:text-lg text-colortext">Esta ainda é uma aplicação em desenvolvimento, então fique a vontade para relatar problemas e sugerir melhorias!</p>
                                {/* </Card> */}
                            </div>
                        </div>

                        <div className="flex text-center justify-center pb-5 pt-10 sm:pt-20">
                            <Card className="w-[90%] sm:w-[80svh] outline outline-1 items-center outline-primary flex justify-between px-3 py-1 bg-cardstartbg/80">
                                <p className="text-xs sm:text-sm text-colortext pl-2">v0.1.0</p>
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
                                                    @yanrogerfv</Link>
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
                                                <Link className="text-specialtext hover:underline" target="_blank" href={"https://github.com/JoaoVitorSD"}>João Vitor Depollo</Link>, meu tutor
                                                , <Link className="text-specialtext hover:underline" target="_blank" href={"https://github.com/SamuelAMT"}>Samuel Tavares</Link>
                                                , <Link className="text-specialtext hover:underline" target="_blank" href={"https://github.com/Souzaa1"}>Pedro Antônio</Link> e <Link className="text-specialtext hover:underline" target="_blank" href={"https://github.com/gregorystevao19"}> Grégory Stevão</Link>, pelas dicas, e
                                                <a className="text-specialtext hover:brightness-125"> Isabella Cassilhas e Gabriel Barros </a> pela avaliação!
                                            </p>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </Card>
                        </div>
                    </div>
                </main>
            </GridBeams>
        </div>
    )
}