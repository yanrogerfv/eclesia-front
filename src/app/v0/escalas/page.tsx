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
import { ChevronLeft, IterationCw, Loader2 } from "lucide-react";
import { DialogLevita } from "@/components/dialog-levita";
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
      <PageHeader urlBack="/v0" title="Escalas" subtitle="Visualização das Escalas" />

      <div className="grid grid-cols-4 gap-8">
        {escalas.map(escala => (
          <Card key={escala.id} >
            <CardHeader>
              <CardTitle className={"text-rose-400"
                // escala.domingo?"text-rose-400":escala.quarta?"text-amber-400":"text-sky-400"
                }>
                {escala.titulo}
              </CardTitle>
              {convertDateFormat(escala.data)}
              <CardDescription>
                {escala.observacoes}
              </CardDescription>
            </CardHeader>
            <CardContent key={escala.id}>
              <a className="text-rose-400">Ministro: </a>{escala.ministro.nome}<br/>
              <a className="text-rose-400">Violão: </a>{escala.violao ? escala.violao.nome : <a className="text-zinc-50/50">Não inserido.</a>}<br/>
              <a className="text-rose-400">Teclado: </a>{escala.teclado ? escala.teclado.nome : <a className="text-zinc-50/50">Não inserido.</a>}<br/>
              <a className="text-rose-400">Bateria: </a>{escala.bateria ? escala.bateria.nome : <a className="text-zinc-50/50">Não inserido.</a>}<br/>
              <a className="text-rose-400">Baixo: </a>{escala.baixo ? escala.baixo.nome : <a className="text-zinc-50/50">Não inserido.</a>}<br/>
              <a className="text-rose-400">Guitarra: </a>{escala.guitarra ? escala.guitarra.nome : <a className="text-zinc-50/50">Não inserido.</a>}<br/>
            </CardContent>
            <CardFooter className="flex mt-auto inset-x-0 bottom-0">
              {/* <DialogLevita escala={levita} key={levita.id} /> */}
              {escala.domingo ?
                <Badge className="bg-rose-400 hover:bg-rose-400/80">Domingo</Badge>
                : escala.quarta ?
                <Badge className="bg-amber-400 transition-colors hover:bg-amber-400/80">Quarta</Badge>
                :
                <Badge className="bg-sky-400 hover:bg-sky-400/80">Especial</Badge>
              }
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}

export function convertDateFormat(dateString:Date) {
  const date = new Date(dateString);

  return String((date.getDate()+1) + '/' + (date.getMonth()+1) + '/' + date.getFullYear())
}