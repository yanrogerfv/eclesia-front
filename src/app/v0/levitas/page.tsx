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
import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import Router, { useRouter } from 'next/router';
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, CircleMinus, CirclePlus, IterationCw, ListFilter, Loader, Loader2, UserMinus, UserPlus } from "lucide-react";
import { DialogAddLevita, DialogLevita, DialogRemoveLevita } from "@/components/dialog-levita";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ModalLevita from "@/components/modal";
import PageHeader from "@/components/pgtitle";
import { Input } from "@/components/ui/input";
import { UUID } from "crypto";
import { Levita } from "@/components/apiObjects";
import { SearchBar } from "@/components/searchBar";

export default function Home() {

  const [levitasData, setLevitasData] = useState<Levita[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    setIsLoading(true)
    fetch("http://localhost:1004/v1/levita")
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false)
        setLevitasData(data)
      })
      .catch((error) => {
        console.error("Erro na comunicação com a api: ", error)
        setLevitasData([]);
      })
  }, [])

  const buscarLevita = useMemo(() => {
    const lowerCase = searchItem.toLowerCase();
    return levitasData.filter((levita) => levita.nome.toLowerCase().includes(lowerCase));
  }, [searchItem, levitasData])

  return (
    <main className="max-w-6xl mx-auto my-12">
      {/*
          Cabeçalho, botões para inserir e remover um levita.
      */}
      <div className="flex items-center gap-3">
        {
          <Link href="/v0" className="w-auto text-4xl justify-center p-2 cursor-pointer outline outline-1 outline-teal-400/50 hover:bg-teal-500 hover:text-black rounded-lg">
            <ChevronLeft className="size-10" />
          </Link>}
        <h1 className="font-extrabold tracking-tight text-5xl">Levitas</h1>
        {
          <div className="translate-x-full">
            <DialogAddLevita />
            <DialogRemoveLevita />
          </div>}
      </div>
      <br />
      <h2 className="scroll-m-20 border-b text-base text-neutral-700 tracking-tight transition-colors first:mt-0">
        {isLoading ? "Carregando dados..." : "Visualizando Levitas"}</h2>
      <br />
      <div className="flex w-full items-center space-x-2 col-span-4">
        <ListFilter
          className="w-auto text-4xl justify-center size-9 p-1 cursor-pointer outline outline-1 outline-teal-500/45 hover:bg-teal-500 hover:text-black rounded-md
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
        {/* <Input className="flex" type="search"  value={searchItem} onChange={handleInputChange}  placeholder="Procure por um Levita" /> */}
        <Input disabled={isLoading} className="flex" type="text"
          value={searchItem} onChange={(e) => setSearchItem(e.target.value)} placeholder="Procure por um Levita" />
      </div>
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
            buscarLevita.map(levita => (
              <Card key={levita.id}>
                <CardHeader>
                  <CardTitle className="flex text-teal-500">{levita.nome}
                  </CardTitle>
                  <CardDescription>
                    {levita.email ? levita.email : levita.contato}
                  </CardDescription>
                </CardHeader>
                <CardContent key={levita.id} className="h-28">
                  {levita.instrumentos.map(instrumento => (
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
                transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 m-1">{instrumento.nome.toUpperCase()}</div>))}
                </CardContent>
                <CardFooter className="flex justify-stretch">
                  <DialogLevita key={levita.id}
                    nome={levita.nome}
                    email={levita.email}
                    contato={levita.contato}
                    disponivel={levita.disponivel}
                    instrumentos={levita.instrumentos} />
                  {/* <BadgeDisponivel disp={levita.disponivel} chav={levita.id.toString()} /> */}
                </CardFooter>
              </Card>
            )))
        }
      </div>
    </main>
  );

}

interface bdprops {
  disp: boolean,
  chav: string
}
export function BadgeDisponivel(bdprops: bdprops) {
  return (
    <div className="flex items-center inset-y-0 right-0 self-end space-x-2 mx-2">
      <Badge key={bdprops.chav} className={bdprops.disp ? "bg-rose-400 space-x-2" : "space-x-2"} variant={bdprops.disp ? "default" : "outline"}>
        {bdprops.disp ? <p>Disponível</p> : <p>Ocupado</p>}
      </Badge>
    </div>
  )

}