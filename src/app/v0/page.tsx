"use client"

import { Card, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { EscalaResumida, Levita } from "@/lib/apiObjects";
import { EscalaSimpleCard, LevitaSimpleCard } from "@/components/customCards";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Cookies from "js-cookie";
import { getMethod } from "@/lib/apiRequests";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Home() {

    const [nextEscalas, setNextEscalas] = useState<EscalaResumida[] | undefined>(undefined)
    const [levitasData, setLevitasData] = useState<Levita[] | undefined>(undefined)

    useEffect(() => {
        if (nextEscalas && levitasData) return;
        getMethod<EscalaResumida[] | undefined>("v1/escala/resumed", setNextEscalas)
        getMethod<Levita[] | undefined>("v1/levita/resumed", setLevitasData)
    }, [])

    return (
        <SidebarProvider>
            <AppSidebar lado="left" />
            {/* <SidebarTrigger className="border" /> */}
            <main className="max-w-6xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
                <nav>
                    <div className="flex">
                        <Link href="/" className="w-auto text-4xl justify-center items-center p-2 mr-5 cursor-pointer border hover:bg-primary hover:text-black rounded-lg">
                            <ChevronLeft className="size-8" />
                        </Link>
                        <h1 className="font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl">Planejador</h1>
                    </div>
                    <br />
                    <h2 className="scroll-m-20 border-b border-primary/30 text-base text-neutral-700 tracking-tight transition-colors first:mt-0">
                        Planejador de Escalas</h2>
                </nav>
                <br />
                <div>
                    <div key={"card-bg"} className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                        <Link href="v0/escalas" className="flex border hover:bg-primary/90 justify-center items-center h-12 w-full text-lg rounded-lg">Escalas</Link>
                        <Link href="v0/levitas" className="flex border hover:bg-primary/90 justify-center items-center h-12 w-full text-lg rounded-lg">Levitas</Link>
                        <Link href="v0/musicas" className="flex border hover:bg-primary/90 justify-center items-center h-12 w-full text-lg rounded-lg">Músicas</Link>
                        <Link href="v0/instrumentos" className="flex border hover:bg-primary/90 justify-center items-center h-12 w-full text-lg rounded-lg">Instrumentos</Link>
                    </div>
                    <br />
                    <Card className="p-4 sm:p-10 bg-current/30">
                        <Card className="p-2">
                            <CardTitle className="text-primary p-4">
                                Próximas escalas:
                            </CardTitle>
                            {!nextEscalas ?
                                <div className="flex flex-row">
                                    <Skeleton className="h-48 w-80 rounded-lg mx-5" />
                                    <Skeleton className="h-48 w-80 rounded-lg mx-5" />
                                    <Skeleton className="h-48 w-80 rounded-lg mx-5" />
                                </div>
                                :
                                nextEscalas.length > 0 ?
                                    <Carousel className="w-full">
                                        <CarouselContent className="-ml-1">
                                            {nextEscalas.map(escala => (
                                                <CarouselItem key={escala.id} className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3">
                                                    <EscalaSimpleCard key={escala.id}
                                                        id={escala.id}
                                                        titulo={escala.titulo}
                                                        ministro={escala.ministro}
                                                        violao={escala.violao}
                                                        teclado={escala.teclado}
                                                        bateria={escala.bateria}
                                                        guitarra={escala.guitarra}
                                                        baixo={escala.baixo}
                                                        data={escala.data}
                                                        quarta={escala.quarta}
                                                        observacoes={escala.observacoes ? escala.observacoes : ""}
                                                        domingo={escala.domingo}
                                                        especial={escala.especial} />
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious />
                                        <CarouselNext />
                                    </Carousel> :
                                    <h1 className="text-colortext ml-[2dvh] justify-center self-center align-middle">Nenhuma escala cadastrada para os próximos dias.</h1>
                            }
                            <br />
                        </Card>
                        <br />

                        {/*LEVITA SECTION BELOW*/}
                        <Card className="p-2">
                            <CardTitle className="text-primary p-4">
                                Levitas Disponíveis:
                            </CardTitle>
                            {!levitasData ?
                                <div className="flex flex-row">
                                    <Skeleton className="h-48 w-80 rounded-lg mx-5" />
                                    <Skeleton className="h-48 w-80 rounded-lg mx-5" />
                                    <Skeleton className="h-48 w-80 rounded-lg mx-5" />
                                </div>
                                :
                                levitasData.length > 0 ?
                                    <Carousel className="w-full">
                                        <CarouselContent className="-ml-1">
                                            {levitasData.map(levita => (
                                                <CarouselItem key={levita.id} className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3">
                                                    <LevitaSimpleCard key={levita.id}
                                                        id={levita.id}
                                                        nome={levita.nome}
                                                        email={levita.email}
                                                        contato={levita.contato}
                                                        descricao={levita.descricao}
                                                        instrumentos={levita.instrumentos}
                                                        agenda={levita.agenda} />
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious />
                                        <CarouselNext />
                                    </Carousel> :
                                    <h1 className="text-colortext justify-center self-center align-middle">Nenhum levita encontrado!</h1>
                            }
                            <br />
                        </Card>
                    </Card>
                </div>
            </main>
        </SidebarProvider>
    );
}