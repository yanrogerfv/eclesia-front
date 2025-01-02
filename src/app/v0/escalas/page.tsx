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
import { ChevronLeft, CircleMinus, CirclePlus, IterationCw, Loader2, X } from "lucide-react";
import { Escala, EscalaResumida, Levita } from "@/components/apiObjects";
import { DialogAddEditEscala, DialogAddMusicaInEscala, DialogVerEscala } from "@/components/dialogs/dialog-escala";
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
  const [levitasDisponiveis, setLevitasDisponiveis] = useState<Levita[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadingRemove, setLoadingRemove] = useState(false)
  const [removeOverlay, setRemoveOverlay] = useState(false)

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
  }, [escalasData])

  useEffect(() => {
    fetch("http://localhost:1004/v1/levita/resumed")
      .then((res) => res.json())
      .then((data) => {
        setLevitasDisponiveis(data)
      })
      .catch((error) => {
        console.error("Erro na comunicação com a api: ", error)
        setLevitasDisponiveis([]);
      })
  }, [levitasDisponiveis])

  return (
    <main className="max-w-6xl mx-auto my-12">

      <nav>
        <div className="flex justify-between">
          <div className="flex">
            <Link href="/v0" className="w-auto text-4xl justify-center items-center p-2 cursor-pointer outline outline-1 outline-primary/50 hover:bg-secondary hover:text-black rounded-lg">
              <ChevronLeft className="size-10" />
            </Link>
            <h1 className="mx-5 font-extrabold tracking-tight text-5xl">Escalas</h1>
          </div>
          <div className="flex items-center">
            <DialogAddEditEscala isEdit={false} escala={undefined} levitasDisponiveis={levitasDisponiveis} />
            <Button variant="outline" className={removeOverlay ? "mx-2 font-bold bg-rose-500/80 border-rose-600/90 hover:bg-rose-600/40"
              : "mx-2 font-bold hover:bg-rose-500/40"}
              onClick={() => setRemoveOverlay(!removeOverlay)}>
              <CircleMinus className="mx-1 text-rose-500" />Excluir Escala</Button>
          </div>
        </div>
        <br />
        <h2 className="scroll-m-20 border-b text-base text-neutral-700 tracking-tight transition-colors first:mt-0">
          {isLoading ? "Carregando Escalas..." : "Visualizando Escalas"}</h2>
      </nav>
      <br />

      {
        isLoading ? (
          <div className="col-span-4 h-full flex items-center justify-center mt-20">
            <div className="size-80 border-4 border-transparent text-primary/40 text-4xl animate-spin flex items-center justify-center border-t-primary rounded-full">
              <div className="size-64 border-4 border-transparent text-subprimary/40 text-2xl animate-spin flex items-center justify-center border-t-subprimary rounded-full" />
            </div>
          </div>
        )
          :
          <div className="grid grid-cols-4 gap-8">
            {
              escalasData.length == 0 ?
                <Card className="flex text-center justify-center">
                  <p className="p-10 text-2xl text-zinc-400/80">Nenhuma escala cadastrada.</p>
                </Card>
                : (
                  escalasData.map(escala => (
                    <Card key={escala.id} className={removeOverlay ? "animate-pulse" : ""}>
                      <X className={removeOverlay ? "absolute hover:cursor-pointer bg-rose-500/80 rounded-br-xl animate-none" : "absolute invisible"} onClick={() => {
                        setLoadingRemove(true)
                        fetch(`http://localhost:1004/v1/escala/${escala.id}`, {
                          method: "DELETE"
                        })
                          .then((response) => {
                            setLoadingRemove(false)
                            alert(response.status === 200 ? "Escala removida com sucesso!" : "Erro ao remover a Escala: " + response.headers.get("error"))
                          })
                          .catch((error) => {
                            alert("Erro ao remover Escala!")
                            console.error("Erro na comunicação com a api: ", error);
                          })
                      }} />
                      <CardHeader>
                        <CardTitle className={
                          escala.domingo ? "text-primary" : escala.quarta ? "text-secondary" : "text-special"
                        }>
                          {escala.titulo}
                        </CardTitle>
                        {convertDateFormat(escala.data)}
                        <CardDescription>
                          {escala.observacoes.length > 0 ? 
                            escala.observacoes.length > 30 ? 
                              escala.observacoes.substring(0, 25).trimEnd().concat("...") 
                              : escala.observacoes 
                            : "Sem observações."}
                        </CardDescription>
                      </CardHeader>
                      <CardContent key={escala.id}>
                        <a className="text-subprimary">Ministro: </a><a className="text-secondary">{escala.ministro}</a><br />
                        <a className="text-subprimary">Violão: </a>{escala.violao ? escala.violao : <a className="text-secondary/40">Não inserido.</a>}<br />
                        <a className="text-subprimary">Teclado: </a>{escala.teclado ? escala.teclado : <a className="text-secondary/40">Não inserido.</a>}<br />
                        <a className="text-subprimary">Bateria: </a>{escala.bateria ? escala.bateria : <a className="text-secondary/40">Não inserido.</a>}<br />
                        <a className="text-subprimary">Baixo: </a>{escala.baixo ? escala.baixo : <a className="text-secondary/40">Não inserido.</a>}<br />
                        <a className="text-subprimary">Guitarra: </a>{escala.guitarra ? escala.guitarra : <a className="text-secondary/40">Não inserido.</a>}<br />
                      </CardContent>
                      <CardFooter className="flex items-center justify-between">
                        <div>
                          {escala.domingo ?
                            <Badge className="bg-primary/80 hover:bg-primary/60 cursor-default">Domingo</Badge>
                            : escala.quarta ?
                              <Badge className="bg-secondary/80 hover:bg-secondary/60 cursor-default">Quarta</Badge>
                              :
                              <Badge className="bg-special/80 hover:bg-special/60 cursor-default">Especial</Badge>
                          }
                        </div>
                        <div>
                          <DialogVerEscala escalaId={escala.id} levitasDisponiveis={levitasDisponiveis} />
                        </div>
                      </CardFooter>
                    </Card>
                  )))
            }
          </div>
      }
    </main>
  )
}

function convertDateFormat(dateString: Date) {
  const date = new Date(dateString);

  return String((date.getDate() + 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
}