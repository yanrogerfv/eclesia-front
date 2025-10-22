"use client"

import { Card, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { EscalaResumida, Levita } from "@/lib/apiObjects";
import { EscalaSimpleCard, LevitaSimpleCard } from "@/components/customCards";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getMethod } from "@/lib/apiRequests";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Home() {

    const [nextEscalas, setNextEscalas] = useState<EscalaResumida[] | undefined>(undefined)
    const [levitasData, setLevitasData] = useState<Levita[] | undefined>(undefined)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        if (nextEscalas && levitasData) return;
        getMethod<EscalaResumida[] | undefined>("v1/escala/resumed", setNextEscalas)
        getMethod<Levita[] | undefined>("v1/levita/resumed", setLevitasData)
    }, [])

    return (
        <SidebarProvider defaultOpen>
            <AppSidebar side="left" />
			{/* <main className="max-w-3xl xl:max-w-7xl w-fit px-4 sm:px-8 lg:px-6 mx-auto my-6 sm:my-12 space-y-6"> */}
            <main className="flex-1 w-full max-w-3xl xl:max-w-6xl max-h-screen mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
                {/* Navigation Header */}
                <nav className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <Link href="/" className="flex-shrink-0 flex items-center justify-center p-2 sm:p-3 border hover:bg-primary hover:text-black rounded-lg transition-colors">
                                <ChevronLeft className="size-6 sm:size-8" />
                            </Link>
                            <h1 className="font-extrabold tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl truncate">
                                Planejador
                            </h1>
                        </div>
                        <SidebarTrigger className="border md:hidden" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-sm sm:text-base text-neutral-700 tracking-tight border-b border-primary/30 pb-2">
                            Planejador de Escalas
                        </h2>
                    </div>
                </nav>

                {/* Quick Action Buttons */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <Link
                        href="home/escalas"
                        className="flex border hover:bg-primary/90 hover:text-colortext justify-center items-center h-12 sm:h-14 text-sm sm:text-base md:text-lg rounded-lg transition-colors font-medium"
                    >
                        Escalas
                    </Link>
                    <Link
                        href="home/levitas"
                        className="flex border hover:bg-primary/90 hover:text-colortext justify-center items-center h-12 sm:h-14 text-sm sm:text-base md:text-lg rounded-lg transition-colors font-medium"
                    >
                        Levitas
                    </Link>
                    <Link
                        href="home/musicas"
                        className="flex border hover:bg-primary/90 hover:text-colortext justify-center items-center h-12 sm:h-14 text-sm sm:text-base md:text-lg rounded-lg transition-colors font-medium"
                    >
                        Músicas
                    </Link>
                    <Link
                        href="home/instrumentos"
                        className="flex border hover:bg-primary/90 hover:text-colortext justify-center items-center h-12 sm:h-14 text-sm sm:text-base md:text-lg rounded-lg transition-colors font-medium"
                    >
                        Instrumentos
                    </Link>
                </div>

                {/* Content Cards */}
                <div className="space-y-6">
                    <Card className="p-3 sm:p-6 lg:p-8 bg-current/30">
                        {/* Próximas Escalas Section */}
                        <Card className="p-3 sm:p-4 mb-6">
                            <CardTitle className="text-primary p-3 sm:p-4 text-lg sm:text-xl">
                                Próximas escalas:
                            </CardTitle>

                            {!isClient || !nextEscalas ? (
                                <div className="flex flex-col sm:flex-row gap-4 px-4">
                                    <Skeleton className="h-40 sm:h-48 w-full sm:w-80 rounded-lg flex-shrink-0" />
                                    <Skeleton className="h-40 sm:h-48 w-full sm:w-80 rounded-lg flex-shrink-0 hidden sm:block" />
                                    <Skeleton className="h-40 sm:h-48 w-full sm:w-80 rounded-lg flex-shrink-0 hidden lg:block" />
                                </div>
                            ) : nextEscalas.length > 0 ? (
                                <div className="px-2 sm:px-4">
                                    <Carousel className="w-full">
                                        <CarouselContent className="-ml-2 sm:-ml-1">
                                            {nextEscalas.map(escala => (
                                                <CarouselItem key={escala.id} className="pl-2 sm:pl-1 basis-full sm:basis-1/2 xl:basis-1/3 select-none">
                                                    <div className="p-1">
                                                        <EscalaSimpleCard
                                                            key={escala.id}
                                                            escala={escala}
                                                        />
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <div className="hidden sm:flex">
                                            <CarouselPrevious className="ml-4" />
                                            <CarouselNext className="mr-4" />
                                        </div>
                                    </Carousel>
                                </div>
                            ) : (
                                <div className="px-4 py-8 text-center">
                                    <p className="text-neutral-600 text-sm sm:text-base">
                                        Nenhuma escala cadastrada para os próximos dias.
                                    </p>
                                </div>
                            )}
                        </Card>

                        {/* Levitas Section */}
                        <Card className="p-3 sm:p-4">
                            <CardTitle className="text-primary p-3 sm:p-4 text-lg sm:text-xl">
                                Levitas Disponíveis:
                            </CardTitle>

                            {!isClient || !levitasData ? (
                                <div className="flex flex-col sm:flex-row gap-4 px-4">
                                    <Skeleton className="h-40 sm:h-48 w-full sm:w-80 rounded-lg flex-shrink-0" />
                                    <Skeleton className="h-40 sm:h-48 w-full sm:w-80 rounded-lg flex-shrink-0 hidden sm:block" />
                                    <Skeleton className="h-40 sm:h-48 w-full sm:w-80 rounded-lg flex-shrink-0 hidden lg:block" />
                                </div>
                            ) : levitasData.length > 0 ? (
                                <div className="px-2 sm:px-4">
                                    <Carousel className="w-full">
                                        <CarouselContent className="-ml-2 sm:-ml-1">
                                            {levitasData.map(levita => (
                                                <CarouselItem key={levita.id} className="pl-2 sm:pl-1 basis-full sm:basis-1/2 xl:basis-1/3 select-none">
                                                    <div className="p-1">
                                                        <LevitaSimpleCard
                                                            key={levita.id}
                                                            levita={levita}
                                                        />
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <div className="hidden sm:flex">
                                            <CarouselPrevious className="ml-4" />
                                            <CarouselNext className="mr-4" />
                                        </div>
                                    </Carousel>
                                </div>
                            ) : (
                                <div className="px-4 py-8 text-center">
                                    <p className="text-neutral-600 text-sm sm:text-base">
                                        Nenhum levita encontrado!
                                    </p>
                                </div>
                            )}
                        </Card>
                    </Card>
                </div>
            </main>
        </SidebarProvider>
    );
}