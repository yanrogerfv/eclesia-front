"use client"

import { Instrumento } from "@/components/apiObjects";
import PageHeader from "@/components/pgtitle";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UUID } from "crypto";
import { useEffect, useState } from "react";

export default function Home() {
  const [instrumentosData, setInstrumentosData] = useState<Instrumento[]>([])

  useEffect(() => {
    fetch("http://localhost:1004/v1/instrumento")
      .then((res) => res.json())
      .then((data) => {
        setInstrumentosData(data)
      })
      .catch((error) => {
        console.error("Erro na comunicação com a api: ", error)
        setInstrumentosData([]);
      })
  }, [])

  return (
    <main className="max-w-6xl mx-auto my-12">
      <PageHeader urlBack="/v0" title="Instrumentos" subtitle="Visualização dos Instrumentos." />



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