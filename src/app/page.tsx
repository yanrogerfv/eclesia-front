"use client"

import { HomepageThemeSelector, ThemeSwitcher } from "@/components/themeSelector";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GridBeams } from "@/components/ui/grid-beams";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { VideoText } from "@/components/ui/video-text";
import Link from "next/link";

export default function LandingPage() {

    return (
        <div className="relative min-h-screen bg-cover bg-center bg-no-repeat text-center bg-background from-neutral-900/50 to-neutral-900/90">
            {/* <GridBeams> */}
                <main className="px-4 sm:px-6 md:px-10 lg:px-20 py-8 sm:py-16 md:py-32 min-h-screen flex flex-col justify-center">
                    {/* Hero Section */}
                    <div className="flex justify-center mb-8 md:mb-12">
                        <div className="w-full max-w-2xl">
                            <h1 className="mb-4">
                                <VideoText autoPlay loop muted className="h-32"
                                    src="https://www.pexels.com/download/video/19493166/">
                                    Eclesia
                                </VideoText>
                            </h1>
                            <p className="text-center text-colortext text-base sm:text-lg md:text-xl lg:text-2xl pt-2 border-t border-primary max-w-2xl mx-auto">
                                Uma amiga na hora de organizar os Levitas!
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center mb-8 md:mb-12">
                        <div className="w-fit max-w-md ">
                            <div className="flex flex-col sm:flex-row justify-center items-center border rounded-sm text-black bg-white/10 backdrop-blur-sm">
                                <Link href="/home" className="w-full sm:w-auto">
                                    <Button variant={"ghost"} className="text-base text-specialtext hover:text-special sm:text-lg md:text-xl w-fit sm:w-auto m-2 sm:m-4">
                                        Acessar
                                    </Button>
                                </Link>
                                <Separator orientation="vertical" className="hidden sm:block py-4 my-4" />
                                <Separator orientation="horizontal" className="sm:hidden w-full" />
                                <Link href="/escalas" className="w-full sm:w-auto">
                                    <Button variant={"ghost"} className="text-base text-specialtext hover:text-special sm:text-lg md:text-xl w-fit sm:w-auto m-2 sm:m-4">
                                        Ver Próximas Escalas
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="flex justify-center mb-8 md:mb-12">
                        <div className="max-w-xs sm:max-w-md md:max-w-xl text-black px-4">
                            <p className="text-colortext text-sm sm:text-base md:text-lg leading-relaxed">
                                Eclesia é uma aplicação web que visa facilitar a organização de escalas e a comunicação entre os membros de um grupo de louvor.
                                Aqui você pode criar e gerenciar Escalas, Levitas, os Instrumentos usados e as Músicas escolhidas!
                            </p>
                        </div>
                    </div>

                    {/* Theme Selector */}
                    <div className="flex justify-center mb-8 md:mb-12">
                        <div className="w-fit max-w-md">
                            <HomepageThemeSelector />
                        </div>
                    </div>

                    {/* Footer Card */}
                    <div className="flex justify-center ">
                        <Card className="w-[95%] sm:w-[90%] md:w-[80%] max-w-4xl border border-primary/75 flex  justify-between items-center px-3 py-2 sm:py-1 bg-cardstartbg/80 gap-2 sm:gap-0">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <p className="text-xs sm:text-sm text-colortext cursor-pointer hover:underline">v0.1.2</p>
                                </PopoverTrigger>
                                <PopoverContent className="w-72 sm:w-80 rounded-lg mx-2" side="top">
                                    <p className="text-sm text-center text-colortext/75 leading-relaxed">
                                        Esta ainda é uma aplicação em desenvolvimento, então fique a vontade para relatar problemas e sugerir melhorias!
                                    </p>
                                </PopoverContent>
                            </Popover>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="link" className="text-xs sm:text-sm p-0 sm:p-2">@yanfv</Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-72 sm:w-80 rounded-lg mx-2" side="top">
                                    <div className="text-start">
                                        <p className="text-xs sm:text-sm space-y-1">
                                            <p>Nome: <span className="text-subprimary cursor-default hover:brightness-125">Yan Roger Fogaça Vieira</span></p>
                                            <p>Email: <Link target="_blank" href="https://mail.google.com/mail/u/0/?fs=1&to=yanrogerfv@gmail.com&su=Eclesia%20Software&tf=cm" className="text-subprimary hover:underline break-all">
                                                yanrogerfv@gmail.com</Link></p>
                                            <p>Github: <Link target="_blank" href="https://github.com/yanrogerfv" className="text-subprimary hover:underline">
                                                @yanrogerfv</Link></p>
                                        </p>
                                    </div>
                                </PopoverContent>
                            </Popover>

                        {/* <Popover>
                                <PopoverTrigger asChild>
                                    <p className="text-xs sm:text-sm cursor-pointer hover:underline order-3 sm:order-3">Thanks!</p>
                                </PopoverTrigger>
                                <PopoverContent className="w-72 sm:w-80 rounded-lg mx-2">
                                    <div className="text-start">
                                        <p className="text-xs sm:text-sm leading-relaxed">
                                            <p className="text-primary font-medium mb-2">Agradecimentos:</p>
                                            <Link className="text-specialtext hover:underline" target="_blank" href={"https://github.com/JoaoVitorSD"}>João Vitor Depollo</Link>, {" "}
                                            <Link className="text-specialtext hover:underline" target="_blank" href={"https://github.com/SamuelAMT"}>Samuel Tavares</Link>, {" "}
                                            <Link className="text-specialtext hover:underline" target="_blank" href={"https://github.com/Souzaa1"}>Pedro Antônio</Link> e {" "}
                                            <Link className="text-specialtext hover:underline" target="_blank" href={"https://github.com/gregorystevao19"}>Grégory Stevão</Link> pelas dicas, e {" "}
                                            <span className="text-specialtext hover:brightness-125">Isabella Cassilhas e Gabriel Barros</span> pela avaliação!
                                        </p>
                                    </div>
                                </PopoverContent>
                            </Popover> */}
                        </Card>
                    </div>
                </main>
            {/* </GridBeams> */}
        </div>
    )
}