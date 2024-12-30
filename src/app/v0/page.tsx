"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { //Card
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { useEffect, useState, useTransition } from "react";
import { ButtonLink } from "@/components/buttonlink";
import PageHeader from "@/components/pgtitle";
import { Escala, EscalaResumida, Levita } from "@/components/apiObjects";
import { EscalaSimpleCard, LevitaSimpleCard } from "@/components/customCards";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import ThemeSelector from "@/components/themeSelector";
import { ArrowLeftFromLine } from "lucide-react";

const document = typeof window !== "undefined" ? window.document : null;

export default function Home() {
  const [nextEscalas, setNextEscalas] = useState<EscalaResumida[]>([]);
  const [levitasData, setLevitasData] = useState<Levita[]>([]);
  const [isEscalasLoading, setEscalasLoading] = useState(true)
  const [isLevitasLoading, setLevitasLoading] = useState(true)
  const [sereneMode, setsereneMode] = useState(document?.documentElement.classList.contains("serene"));

  function handleSereneMode() {
    setsereneMode(!sereneMode)
    if (sereneMode) {
      document?.documentElement.classList.remove("sunset");
      document?.documentElement.classList.add("serene");
      localStorage.setItem("theme", "serene");
    } else {
      document?.documentElement.classList.remove("serene");
      document?.documentElement.classList.add("sunset");
      localStorage.setItem("theme", "sunset");
    }
  }

  useEffect(() => {
    fetch("http://localhost:1004/v1/escala/resumed")
      .then((res) => res.json())
      .then((data) => {
        setEscalasLoading(false)
        setNextEscalas(data)
      })
      .catch((error) => {
        console.error("Erro na comunicação com a api: ", error)
        setNextEscalas([]);
      })
  }, [])

  useEffect(() => {
    // setIsLoading(true)
    fetch("http://localhost:1004/v1/levita/resumed")
      .then((res) => res.json())
      .then((data) => {
        setLevitasLoading(false)
        setLevitasData(data)
      })
      .catch((error) => {
        console.error("Erro na comunicação com a api: ", error)
        setLevitasData([]);
      })
  }, [])

  return (
    <main className="max-w-6xl mx-auto my-12">
      <nav>
        <div className="flex">
          <Link href="/" className="w-auto text-4xl justify-center items-center p-2 mr-5 cursor-pointer border hover:bg-primary hover:text-black rounded-lg">
            <ArrowLeftFromLine className="size-8" />
          </Link>
          <h1 className="font-extrabold tracking-tight text-5xl">Planejador</h1>
          {/* <Button onClick={() => handleSereneMode()} variant={sereneMode ? "outline" : "default"} className="flex h-12 text-lg rounded-lg">Modo Sereno</Button> */}
        </div>
        <br />
        <h2 className="scroll-m-20 border-b text-base text-neutral-700 tracking-tight transition-colors first:mt-0">
          Planejador de Escalas</h2>
      </nav>
      <br />
      <div>
        <div key={"card-bg"} className="flex items-center justify-between gap-4 w-full">
          {/* <ButtonLink title="Escalas" reff="v0/escalas" /> */}
          <Link href="v0/escalas" className="flex border hover:bg-primary/90 justify-center items-center h-12 w-full text-lg rounded-lg">Escalas</Link>
          {/* <Button variant={"outfill"} className="flex h-12 w-full text-lg rounded-lg"><Link href="v0/escalas" className="w-full">Escala</Link></Button> */}
          {/* <ButtonLink title="Levitas" reff="v0/levitas" /> */}
          <Link href="v0/levitas" className="flex border hover:bg-primary/90 justify-center items-center h-12 w-full text-lg rounded-lg">Levitas</Link>
          {/* <Button variant={"outfill"} className="flex h-12 w-full text-lg rounded-lg"><Link href="v0/levitas" className="w-full">Levitas</Link></Button> */}
          {/* <ButtonLink title="Músicas" reff="v0/musicas" /> */}
          <Link href="v0/musicas" className="flex border hover:bg-primary/90 justify-center items-center h-12 w-full text-lg rounded-lg">Músicas</Link>
          {/* <Button variant={"outfill"} className="flex h-12 w-full text-lg rounded-lg"><Link href="v0/musicas" className="w-full">Músicas</Link></Button> */}
          {/* <ButtonLink title="Instrumentos" reff="v0/instrumentos" /> */}
          <Link href="v0/instrumentos" className="flex border hover:bg-primary/90 justify-center items-center h-12 w-full text-lg rounded-lg">Instrumentos</Link>
          {/* <Button variant={"outfill"} className="flex h-12 w-full text-lg rounded-lg"><Link href="v0/instrumentos" className="w-full">Instrumentos</Link></Button> */}
        </div>
        <br />
        <Card className="p-10 bg-current/30">
          {/* <Calendar title="Próximas Escalas" locale={ptBR as unknown as Locale} selected={date} onSelect={setDate} className="flex border"/> */}
          <Card className="p-2">
            <CardTitle className="text-primary p-4">
              Próximas escalas:
            </CardTitle>
            {isEscalasLoading ?
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
                      <CarouselItem key={escala.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
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
                <h1 className="text-zinc-200 ml-[2dvh] justify-center self-center align-middle">Nenhuma escala cadastrada para os próximos dias.</h1>
            }
            <br />
          </Card>
          <br />



          {/*LEVITA SECTION BELOW*/}
          <Card className="p-2">
            <CardTitle className="text-primary p-4">
              Levitas Disponíveis:
            </CardTitle>
            {isLevitasLoading ?
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
                      <CarouselItem key={levita.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <LevitaSimpleCard key={levita.id}
                          id={levita.id}
                          nome={levita.nome}
                          email={levita.email}
                          contato={levita.contato}
                          descricao={levita.descricao}
                          instrumentos={levita.instrumentos} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel> :
                <h1 className="text-zinc-200 justify-center self-center align-middle">Todos os levitas disponíveis!</h1>
            }
            <br />
          </Card>
        </Card>


      </div>
    </main >
  );
}
