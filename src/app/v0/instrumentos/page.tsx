"use client"

import { Instrumento } from "@/components/apiObjects";
import { DialogAddInstrumento, DialogRemoveInstrumento } from "@/components/dialogs/dialog-instrumento";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setLoading] = useState(true)
  const [instrumentosData, setInstrumentosData] = useState<Instrumento[]>([])

  useEffect(() => {
    fetch("http://localhost:1004/v1/instrumento")
      .then((res) => res.json())
      .then((data) => {
        setInstrumentosData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Erro na comunicação com a api: ", error)
        setInstrumentosData([]);
      })
  }, [instrumentosData])

  return (
    <main className="max-w-6xl mx-auto my-12">
      <nav>
        <div className="flex items-center gap-4 justify-between">
          <div className="flex">
            <Link href="/v0" className="w-auto text-4xl justify-center p-2 cursor-pointer outline outline-1 outline-cyan-400/50 hover:bg-teal-400 hover:text-black rounded-lg">
              <ChevronLeft className="size-10" />
            </Link>
            <h1 className="mx-5 font-extrabold tracking-tight text-5xl">Instrumentos</h1>
          </div>
          <div className="flex">
              <DialogAddInstrumento />
              <DialogRemoveInstrumento />
          </div>
        </div>
        <br />
        <h2 className="scroll-m-20 border-b text-base text-neutral-700 tracking-tight transition-colors first:mt-0">
          {isLoading ? "Carregando Instrumentos..." : "Visualizando Instrumentos"}</h2>
      </nav>
      <br />


      <div className="grid grid-cols-3 gap-8"> {//Geração dos Cards dos instrumentos
      }
        {instrumentosData.map(instrumento => (
          <Card key={instrumento.nome}>
            <CardHeader>
              <CardTitle className="flex items-center justify-center text-teal-400">{instrumento.nome}
              </CardTitle>
              <CardDescription>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </main>
  )
}