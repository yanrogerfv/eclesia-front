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
import { Escala } from "@/components/apiObjects";

/* export async function fetchEscalas() {
  var escalas = await (fetch('http://localhost:1005/v1/escala'));
  if (!escalas.ok)
    throw new Error(`HTTP error! status: ${escalas.status}`);
  var data: Escala[] = await escalas.json() as Escala[];
  return data as Escala[];
} */

export default function Home() {
  const [escalasData, setEscalasData] = useState<Escala[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // setIsLoading(true)
    fetch("http://localhost:1004/v1/escala")
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
        <div className="flex items-center gap-3">
          {
            <Link href="/v0" className="w-auto text-4xl justify-center p-2 cursor-pointer outline outline-1 outline-cyan-400/50 hover:bg-teal-400 hover:text-black rounded-lg">
              <ChevronLeft className="size-10" />
            </Link>}
          <h1 className="font-extrabold tracking-tight text-5xl">Escalas</h1>
          {
            <div className="flex items-end translate-x-full px-4">
              <Button variant={"outline"} className="px-4"><CirclePlus className="mx-2" />Adicionar Escala</Button>
              <Button variant={"outline"} className="px-4"><CircleMinus className="mx-2" />Remover Escala</Button>
            </div>}
        </div>
        <br />
        <h2 className="scroll-m-20 border-b text-base text-neutral-700 tracking-tight transition-colors first:mt-0">
          Visualizando das Escalas</h2>
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
              <Card key={escala.id} >
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
                  <a className="text-teal-400">Ministro: </a><a className="text-emerald-400">{escala.ministro.nome}</a><br />
                  <a className="text-teal-400">Violão: </a>{escala.violao ? escala.violao.nome : <a className="text-zinc-50/50">Não inserido.</a>}<br />
                  <a className="text-teal-400">Teclado: </a>{escala.teclado ? escala.teclado.nome : <a className="text-zinc-50/50">Não inserido.</a>}<br />
                  <a className="text-teal-400">Bateria: </a>{escala.bateria ? escala.bateria.nome : <a className="text-zinc-50/50">Não inserido.</a>}<br />
                  <a className="text-teal-400">Baixo: </a>{escala.baixo ? escala.baixo.nome : <a className="text-zinc-50/50">Não inserido.</a>}<br />
                  <a className="text-teal-400">Guitarra: </a>{escala.guitarra ? escala.guitarra.nome : <a className="text-zinc-50/50">Não inserido.</a>}<br />
                </CardContent>
                <CardFooter className="flex mt-auto inset-x-0 bottom-0">
                  {/* <DialogLevita escala={levita} key={levita.id} /> */}
                  {escala.domingo ?
                    <Badge className="bg-teal-400/80 hover:bg-teal-400/20">Domingo</Badge>
                    : escala.quarta ?
                      <Badge className="bg-emerald-400/80 hover:bg-emerald-400/20">Quarta</Badge>
                      :
                      <Badge className="bg-sky-400/80 hover:bg-sky-400/20">Especial</Badge>
                  }
                </CardFooter>
              </Card>
            )))
      }
      </div>
    </main>
  )
}

export function convertDateFormat(dateString: Date) {
  const date = new Date(dateString);

  return String((date.getDate() + 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
}