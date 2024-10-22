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
import { Escala } from "@/components/apiObjects";
import { EscalaCard } from "@/components/customCards";
import { SkeletonDemo } from "@/components/bones";

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [nextEscalas, setNextEscalas] = useState<Escala[]>([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // setIsLoading(true)
    fetch("http://localhost:1004/v1/escala")
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false)
        setNextEscalas(data)
      })
      .catch((error) => {
        console.error("Erro na comunicação com a api: ", error)
        setNextEscalas([]);
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
            <div className="grid grid-cols-4">
              {isLoading ?
                  <SkeletonDemo/>
                :
                nextEscalas.map(escala => (
                    <EscalaCard key={escala.id}
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
                ))}
            </div>
          </Card>
        </Card>


      </div>
    </main >
  );
}
