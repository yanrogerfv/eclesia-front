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
import Router, { useRouter } from 'next/router';
import { usePathname } from 'next/navigation'
import { Switch } from "@radix-ui/react-switch";
import { Label } from "@/components/ui/label";
import { ButtonLink } from "@/components/buttonlink";
import { Gavetinha } from "@/components/gaveta";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, CircleMinus, CirclePlus, IterationCw, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import PageHeader from "@/components/pgtitle";
import { Escala } from "@/components/apiObjects";
import { BadgeDisponivel } from "@/components/modal";

export async function fetchEscalas() {
  var escalas = await (fetch('http://localhost:1005/v1/escala'));
  if (!escalas.ok)
    throw new Error(`HTTP error! status: ${escalas.status}`);
  var data: Escala[] = await escalas.json() as Escala[];
  return data as Escala[];
}

export default async function Home() {
  var escalas = await fetchEscalas();
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
              <Button variant={"outline"} className="px-4"><CirclePlus className="mr-2" />Adicionar Escala</Button>
              <Button variant={"outline"} className="px-4"><CircleMinus className="mr-2" />Remover Escala</Button>
            </div>}
        </div>
        <br />
        <h2 className="scroll-m-20 border-b text-base text-neutral-700 tracking-tight transition-colors first:mt-0">
          Visualizando das Escalas</h2>
      </nav>
      <br />


      <div className="grid grid-cols-4 gap-8">
        {escalas.map(escala => (
          <Card key={escala.id} >
            <CardHeader>
              <CardTitle className={
                escala.domingo?"text-teal-400":escala.quarta?"text-emerald-400":"text-sky-400"
              }>
                {escala.titulo}
              </CardTitle>
              {convertDateFormat(escala.data)}
              <CardDescription>
                {escala.observacoes}
              </CardDescription>
            </CardHeader>
            <CardContent key={escala.id}>
              <a className="text-teal-400">Ministro: </a>{escala.ministro.nome}<br />
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
        ))}
      </div>
    </main>
  )
}

export function convertDateFormat(dateString: Date) {
  const date = new Date(dateString);

  return String((date.getDate() + 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
}