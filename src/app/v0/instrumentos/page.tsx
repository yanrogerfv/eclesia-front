"use client"

import { Instrumento } from "@/components/apiObjects";
import PageHeader from "@/components/pgtitle";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UUID } from "crypto";

export async function getInstrumentos() {
  const levita = await (fetch('http://localhost:1005/v1/instrumento'));
  if (!levita.ok)
    throw new Error(`HTTP error! status: ${levita.status}`);
  const data: Instrumento[] = await levita.json() as Instrumento[];
  return data as Instrumento[];
}

export default async function Home() {
  const instrumentos = await getInstrumentos();
  return (
    <main className="max-w-6xl mx-auto my-12">
      <PageHeader urlBack="/v0" title="Instrumentos" subtitle="Visualização dos Instrumentos." />



      <div className="grid grid-cols-3 gap-8"> {//Geração dos Cards dos instrumentos
      }
        {instrumentos.map(instrumento => (
          <Card key={instrumento.nome}>
            <CardHeader>
              <CardTitle className="flex items-center justify-center">{instrumento.nome}
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