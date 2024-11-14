"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as React from "react"
import { UUID } from "crypto";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useEffect, useMemo, useState, useTransition } from "react";
import { ChevronLeft, CircleMinus, CirclePlus, IterationCw, Loader2 } from "lucide-react";
import { Escala, EscalaResumida } from "@/components/apiObjects";
import { DialogAddEscala, DialogVerEscala } from "@/components/dialogs/dialog-escala";
import ModalEscala from "@/components/modal";

/* export async function fetchEscalas() {
  var escalas = await (fetch('http://localhost:1005/v1/escala'));
  if (!escalas.ok)
    throw new Error(`HTTP error! status: ${escalas.status}`);
  var data: Escala[] = await escalas.json() as Escala[];
  return data as Escala[];
} */

export default function Home() {
  const [escalasData, setEscalasData] = useState<EscalaResumida[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEscalaModalOpen, setIsEscalaModalOpen] = useState(false);

  useEffect(() => {
    // setIsLoading(true)
    fetch("http://localhost:1004/v1/escala/resumed")
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false)
        setEscalasData(data)
      })
      .catch((error) => {
        console.error("Erro na comunicação com a api: ", error)
        setEscalasData([]);
      })
  }, [])


  return (
    <main className="max-w-6xl mx-auto my-12">

      <nav>
        <div className="flex justify-between">
          <div className="flex">
            <Link href="/v0" className="w-auto text-4xl justify-center p-2 cursor-pointer outline outline-1 outline-cyan-400/50 hover:bg-teal-400 hover:text-black rounded-lg">
              <ChevronLeft className="size-10" />
            </Link>
            <h1 className="mx-5 font-extrabold tracking-tight text-5xl">Escalas</h1>
          </div>
          <div className="flex items-center">
            <DialogAddEscala />
            <Button variant={"outline"} className="mx-2 hover:text-rose-500"><CircleMinus className="mx-1 text-rose-500" />Excluir Escala</Button>
          </div>
        </div>
        <br />
        <h2 className="scroll-m-20 border-b text-base text-neutral-700 tracking-tight transition-colors first:mt-0">
          {isLoading ? "Carregando Escalas..." : "Visualizando Escalas"}</h2>
      </nav>
      <br />


      <div className="grid grid-cols-4 gap-8">
        {
          isLoading ? (
            <div className="col-span-4 h-full flex items-center justify-center mt-20">
              <div className="size-80 border-4 border-transparent text-cyan-400/40 text-4xl animate-spin flex items-center justify-center border-t-cyan-400 rounded-full">
                <div className="size-64 border-4 border-transparent text-teal-400/40 text-2xl animate-spin flex items-center justify-center border-t-teal-400 rounded-full" />
              </div>
            </div>
          ) : (
            escalasData.map(escala => (
              <Card className="hover:text-current/50" key={escala.id} onClick={() => setIsEscalaModalOpen(true)}>
                <CardHeader>
                  <CardTitle className={
                    escala.domingo ? "text-teal-400" : escala.quarta ? "text-emerald-400" : "text-sky-400"
                  }>
                    {escala.titulo}
                  </CardTitle>
                  {convertDateFormat(escala.data)}
                  <CardDescription>
                    {escala.observacoes}
                  </CardDescription>
                </CardHeader>
                <CardContent key={escala.id}>
                  <a className="text-teal-400">Ministro: </a><a className="text-emerald-400">{escala.ministro}</a><br />
                  <a className="text-teal-400">Violão: </a>{escala.violao ? escala.violao : <a className="text-zinc-50/50">Não inserido.</a>}<br />
                  <a className="text-teal-400">Teclado: </a>{escala.teclado ? escala.teclado : <a className="text-zinc-50/50">Não inserido.</a>}<br />
                  <a className="text-teal-400">Bateria: </a>{escala.bateria ? escala.bateria : <a className="text-zinc-50/50">Não inserido.</a>}<br />
                  <a className="text-teal-400">Baixo: </a>{escala.baixo ? escala.baixo : <a className="text-zinc-50/50">Não inserido.</a>}<br />
                  <a className="text-teal-400">Guitarra: </a>{escala.guitarra ? escala.guitarra : <a className="text-zinc-50/50">Não inserido.</a>}<br />
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div>
                    {escala.domingo ?
                      <Badge className="bg-teal-400/80 hover:bg-teal-400/20">Domingo</Badge>
                      : escala.quarta ?
                        <Badge className="bg-emerald-400/80 hover:bg-emerald-400/20">Quarta</Badge>
                        :
                        <Badge className="bg-sky-400/80 hover:bg-sky-400/20">Especial</Badge>
                    }
                  </div>
                  <div>
                    <DialogVerEscala escalaId={escala.id} />
                  </div>
                </CardFooter>
              </Card>
            )))
        }
      </div>
    </main>
  )
}

function convertDateFormat(dateString: Date) {
  const date = new Date(dateString);

  return String((date.getDate() + 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
}