"use client"

import { Card, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { EscalaResumida, Levita } from "@/lib/apiObjects";
import { EscalaSimpleCard, LevitaSimpleCard } from "@/components/customCards";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { getMethod } from "@/lib/apiRequests";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import compareDates from "@/util/compareDates";
import BackButton from "@/components/next-back";
import { Badge } from "@/components/ui/badge";
import { WifiOff } from "lucide-react";

export default function Home() {

    const [nextEscalas, setNextEscalas] = useState<EscalaResumida[] | undefined>(undefined)
    const [levitasData, setLevitasData] = useState<Levita[] | undefined>(undefined)
    const [isClient, setIsClient] = useState(false)
    const [isOffline, setIsOffline] = useState(false)

    useEffect(() => {
        setIsClient(true)
        
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        if (typeof window !== 'undefined') {
            setIsOffline(!navigator.onLine);
            window.addEventListener('online', handleOnline);
            window.addEventListener('offline', handleOffline);

            return () => {
                window.removeEventListener('online', handleOnline);
                window.removeEventListener('offline', handleOffline);
            };
        }
    }, [])

    useEffect(() => {
        if (!isClient) return;
        if (nextEscalas) return;
        getMethod<EscalaResumida[] | undefined>("v1/escala/resumed", setNextEscalas)
        getMethod<Levita[] | undefined>("v1/levita/resumed", setLevitasData)
    }, [isClient, nextEscalas])

    return (
        <SidebarProvider defaultOpen>
            <AppSidebar side="left" />
            <main className="flex-1 w-full max-w-3xl xl:max-w-6xl max-h-screen mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
                <nav className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                            <BackButton />
                            <h1 className="font-extrabold tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl truncate">
                                Planejador
                            </h1>
                            {isOffline && ((nextEscalas && nextEscalas.length > 0) || (levitasData && levitasData.length > 0)) && (
                                <Badge variant="destructive" className="ml-2 sm:ml-4 flex gap-1 items-center bg-red-500 hover:bg-red-600 cursor-default">
                                    <WifiOff className="w-3 h-3" />
                                    Dessincronizado
                                </Badge>
                            )}
                        </div>
                        <SidebarTrigger className="border md:hidden" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-sm sm:text-base text-neutral-700 tracking-tight border-b border-primary/30 pb-2">
                            Planejador de Escalas
                        </h2>
                    </div>
                </nav>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <Link className="flex border hover:bg-primary/90 hover:text-colortext justify-center items-center h-12 sm:h-14 text-sm sm:text-base md:text-lg rounded-lg transition-colors font-medium"
                        href="home/escalas" >
                        Escalas
                    </Link>
                    <Link className="flex border hover:bg-primary/90 hover:text-colortext justify-center items-center h-12 sm:h-14 text-sm sm:text-base md:text-lg rounded-lg transition-colors font-medium"
                        href="home/levitas" >
                        Levitas
                    </Link>
                    <Link className="flex border hover:bg-primary/90 hover:text-colortext justify-center items-center h-12 sm:h-14 text-sm sm:text-base md:text-lg rounded-lg transition-colors font-medium"
                        href="home/musicas" >
                        Músicas
                    </Link>
                    <Link className="flex border hover:bg-primary/90 hover:text-colortext justify-center items-center h-12 sm:h-14 text-sm sm:text-base md:text-lg rounded-lg transition-colors font-medium"
                        href="home/instrumentos" >
                        Instrumentos
                    </Link>
                </div>

                <div className="space-y-6">
                    {isOffline && !nextEscalas && !levitasData ? (
                        <Card className="text-center border-red-900/20 bg-red-500/5 mt-4">
                            <div className="p-6 sm:p-10 flex flex-col items-center">
                                <WifiOff className="h-16 w-16 text-red-500/80 mb-4" />
                                <h3 className="text-2xl text-red-500 font-bold mb-2">Sem Conexão</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-md">
                                    Você está offline e não possui dados salvos no planejador. Conecte-se à internet para carregar as escalas e levitas.
                                </p>
                            </div>
                        </Card>
                    ) : (
                        <Card className="p-3 sm:p-6 lg:p-8 bg-current/30">
                            {/* Próximas Escalas Section */}
                            <Card className="p-3 sm:p-4 mb-6">
                                <CardTitle className="text-primary p-3 sm:p-4 text-lg sm:text-xl">
                                    Próximas Escalas:
                                </CardTitle>

                                {!isClient || !nextEscalas ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 px-4 py-4">
                                        <Skeleton className="h-40 w-full rounded-lg" />
                                        <Skeleton className="h-40 w-full rounded-lg hidden sm:block" />
                                        <Skeleton className="h-40 w-full rounded-lg hidden xl:block" />
                                    </div>
                                ) : nextEscalas.length > 0 ? (
                                    <div className="px-2 sm:px-4">
                                        <Carousel className="w-full">
                                            <CarouselContent className="-ml-2 sm:-ml-1">
                                                {nextEscalas.sort((a, b) => {
                                                    const today = new Date();
                                                    const dateA = new Date(a.data);
                                                    const dateB = new Date(b.data);
                                                    const isPastA = compareDates(a.data, today);
                                                    const isPastB = compareDates(b.data, today);

                                                    if (isPastA && !isPastB) return 1;
                                                    if (!isPastA && isPastB) return -1;

                                                    return dateA.getTime() - dateB.getTime();
                                                }).map(escala => (
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
                                    Levitas Cadastrados:
                                </CardTitle>

                                {!isClient || !levitasData ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 px-4 py-4">
                                        <Skeleton className="h-40 w-full rounded-lg" />
                                        <Skeleton className="h-40 w-full rounded-lg hidden sm:block" />
                                        <Skeleton className="h-40 w-full rounded-lg hidden xl:block" />
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
                    )}
                </div>
            </main>
        </SidebarProvider>
    );
}