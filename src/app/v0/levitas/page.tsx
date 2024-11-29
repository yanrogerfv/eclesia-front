"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { ChevronLeft, Filter, FilterX, ListFilter, UserMinus, X } from "lucide-react";
import { DialogAddLevita, DialogLevita } from "@/components/dialogs/dialog-levita";
import { Input } from "@/components/ui/input";
import { UUID } from "crypto";
import { Levita, Instrumento } from "@/components/apiObjects";
import { SidebarFiltroLevita } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CheckboxDemo } from "@/components/checkboxObj";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Home() {

  const [levitasData, setLevitasData] = useState<Levita[]>([])
  const [instrumentosBase, setInstrumentosBase] = useState<Instrumento[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadingRemove, setLoadingRemove] = useState(false)
  const [removeOverlay, setRemoveOverlay] = useState(false)
  const [searchItem, setSearchItem] = useState("");
  const [reload, setReload] = useState(false)
  const [filteredInstruments, setFilteredInstruments] = useState<Instrumento[]>([])

  useEffect(() => {
    // setIsLoading(true)
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
  }, [searchItem, levitasData, reload, loadingRemove])


  useEffect(() => {
    fetch("http://localhost:1004/v1/instrumento")
      .then((res) => res.json())
      .then((data) => {
        setInstrumentosBase(data)
      })
      .catch((error) => {
        console.error("Erro na comunicação com a api: ", error)
        setInstrumentosBase([]);
      })
  }, [])

  const buscarLevita = useMemo(() => {
    return filteredInstruments.length === 0 ? levitasData.filter((levita) => levita.nome.toLowerCase().includes(searchItem.toLowerCase()))
    : levitasData.filter((levita) => levita.nome.toLowerCase().includes(searchItem.toLowerCase())).filter((levita) => levita.instrumentos.some((instrumento) => filteredInstruments.some((filteredInstrument) => filteredInstrument.id === instrumento.id)));
  }, [searchItem, levitasData])

  function addInstrumentoInFilter(instrumento: Instrumento) {
    setFilteredInstruments([...filteredInstruments, instrumento])
  }
  function removeInstrumentoInFilter(instrumento: Instrumento) {
    setFilteredInstruments(filteredInstruments.filter((filteredInstrument) => filteredInstrument.id !== instrumento.id))
  }

  return (
    <main className="max-w-6xl mx-auto my-12">
      {//Cabeçalho, botões para inserir e remover um levita.
        <>
          <div className="flex items-center gap-3 justify-between">
            <div className="flex">
              <Link href="/v0" className="text-4xl p-2 cursor-pointer outline outline-1 outline-teal-400/50 hover:bg-teal-500 hover:text-black rounded-lg">
                <ChevronLeft className="size-10" />
              </Link>
              <h1 className="mx-5 font-extrabold tracking-tight text-5xl">Levitas</h1>
            </div>
            <div>
              <DialogAddLevita />
              <Button variant="outline" className={removeOverlay ? "mx-2 font-bold bg-rose-500/80 border-rose-600/90 hover:bg-rose-600/40"
                : "mx-2 font-bold hover:bg-rose-500/40"}
                onClick={() => setRemoveOverlay(!removeOverlay)}>
                <UserMinus className="mr-2" />Remover Levita</Button>
            </div>
          </div>
          <br />
          <h2 className="scroll-m-20 border-b text-base text-neutral-700 tracking-tight transition-colors first:mt-0">
            {isLoading ? "Carregando Levitas..." : "Visualizando Levitas"}</h2>
          <br />
        </>
      }
      <div className="flex w-full items-center space-x-2 col-span-4">
        {isLoading ?
          <Filter
            className="w-auto text-4xl justify-center size-9 p-1 outline outline-1 outline-teal-500/45 bg-teal-500/30 hover:bg-teal-500/20 text-black rounded-md" />
          :
          <Sheet>
            <SheetTrigger asChild>
              {filteredInstruments.length == 0 ? 
                <Filter className="w-auto text-4xl justify-center size-9 p-1 cursor-pointer outline outline-1 outline-teal-500/45 hover:bg-teal-500 hover:text-black rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"/> :
                <FilterX onClick={() => setFilteredInstruments([])}
                  className="w-auto text-4xl justify-center size-9 p-1 cursor-pointer outline outline-1 outline-rose-500/45 hover:bg-rose-500 hover:text-black rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"/>
              }
              </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filtrar Levitas</SheetTitle>
                <SheetDescription>
                  Filtre os Levitas por instrumento.
                </SheetDescription>
              </SheetHeader>
              <div className="grid grid-cols-1 space-y-1">
                <br />
                {instrumentosBase.map((instrumento) => (
                  <div key={instrumento.id} className="flex items-center space-x-2">
                    <Checkbox id="terms" onClick={() => {
                      if (filteredInstruments.some((filteredInstrument) => filteredInstrument.id === instrumento.id)) {
                        removeInstrumentoInFilter(instrumento)
                      } else {
                        addInstrumentoInFilter(instrumento)
                      }}}/>
                    <Label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {instrumento.nome}
                    </Label>
                    <br />
                  </div>
                ))}
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>}
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
              <Card key={levita.id} className={removeOverlay ? "animate-pulse" : ""}>
                <X className={removeOverlay ? "absolute hover:cursor-pointer bg-rose-500/80 rounded-br-xl animate-none" : "absolute invisible"} onClick={() => {
                  setLoadingRemove(true)
                  fetch(`http://localhost:1004/v1/levita/${levita.id}`, {
                    method: "DELETE"
                  })
                    .then((response) => {
                      setLoadingRemove(false)
                      alert(response.status === 200 ? "Levita removido com sucesso!" : "Erro ao remover o Levita: " + response.headers.get("error"))
                      setReload(!reload)
                    })
                    .catch((error) => {
                      alert("Erro ao remover o Levita!")
                      console.error("Erro na comunicação com a api: ", error);
                    })
                }} />
                <CardHeader >
                  <CardTitle className="flex text-teal-500">{levita.nome}
                  </CardTitle>
                  <CardDescription>
                    {levita.email ? levita.email : levita.contato}
                  </CardDescription>
                </CardHeader>
                <CardContent key={levita.id} className="h-28">
                  {levita.instrumentos.map(instrumento => (
                    <div key={instrumento.id} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
                transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 m-1">{instrumento.nome.toUpperCase()}</div>))}
                </CardContent>
                <CardFooter className="flex justify-stretch">
                  <DialogLevita key={levita.id}
                    levita={levita}
                    disabled={removeOverlay} />
                  {/* <BadgeDisponivel disp={levita.disponivel} chav={levita.id.toString()} /> */}
                </CardFooter>
              </Card>
            )))
        }
      </div>
    </main>
  );
}
