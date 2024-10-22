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
import { UUID } from "crypto";
import Link from "next/link";
import { //Navigation Menu
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { //Menu Bar
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from "@/components/ui/menubar";
import { ButtonLink } from "@/components/buttonlink";
import PageHeader from "@/components/pgtitle";
import { Calendar } from "@/components/ui/calendar";
import { Locale } from "date-fns";
import { Escala, Levita } from "@/components/apiObjects";
import { EscalaCard, EscalaSimpleCard, LevitaSimpleCard } from "@/components/customCards";
import { SkeletonDemo } from "@/components/bones";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ModalEscala from "@/components/modal";

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [nextEscalas, setNextEscalas] = useState<Escala[]>([]);
  const [levitasData, setLevitasData] = useState<Levita[]>([]);
  const [isEscalasLoading, setEscalaLoader] = useState(true)
  const [isLevitasLoading, setLevitaLoader] = useState(true)

  useEffect(() => {
    fetch("http://localhost:1004/v1/escala")
      .then((res) => res.json())
      .then((data) => {
        setEscalaLoader(false)
        setNextEscalas(data)
      })
      .catch((error) => {
        console.error("Erro na comunicação com a api: ", error)
        setNextEscalas([]);
      })
  }, [])

  useEffect(() => {
    // setIsLoading(true)
    fetch("http://localhost:1004/v1/levita")
      .then((res) => res.json())
      .then((data) => {
        setLevitaLoader(false)
        setLevitasData(data)
      })
      .catch((error) => {
        console.error("Erro na comunicação com a api: ", error)
        setLevitasData([]);
      })
  }, [])

  return (
    <main className="max-w-6xl mx-auto my-12">
      <PageHeader urlBack="null" title="Planejador" subtitle="Planejador de Escalas" />
      <div>
        <div key={"card-bg"} className="flex gap-4 w-full p-5 h-auto bg">
          <ButtonLink title="Escalas" reff="v0/escalas" />
          <ButtonLink title="Levitas" reff="v0/levitas" />
          <ButtonLink title="Músicas" reff="v0/musicas" />
          <ButtonLink title="Instrumentos" reff="v0/instrumentos" />
        </div><br />
        <Card className="p-10 bg-current/30">
          {/* <Calendar title="Próximas Escalas" locale={ptBR as unknown as Locale} selected={date} onSelect={setDate} className="flex border"/> */}
          <Card className="p-2">
            <CardTitle className="text-teal-400 p-4">
              Próximas escalas:
            </CardTitle>
            {isEscalasLoading ?
              <SkeletonDemo />
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
                          musicas={escala.musicas}
                          observacoes={escala.observacoes}
                          domingo={escala.domingo}
                          especial={escala.especial}
                          back={escala.back} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel> :
                <h1 className="text-zinc-200 justify-center self-center align-middle">Nenhuma escala cadastrada para os próximos dias.</h1>
            }
            <br />
          </Card>
          <br />



          {/*LEVITA SECTION BELOW*/}
          <Card className="p-2">
            <CardTitle className="text-teal-400 p-4">
              Levitas Disponíveis:
            </CardTitle>
            {isLevitasLoading ?
              <SkeletonDemo />
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
                          instrumentos={levita.instrumentos}/>
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
