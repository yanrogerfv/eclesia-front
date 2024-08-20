"use client"

import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import { Badge } from "./ui/badge";

interface Levita {
    nome: string,
    instrumentos: Instrumento[],
    contato: string,
    email: string,
    disponivel: boolean
}
interface Instrumento {
    numero: number,
    nome: string
}

export default function ModalLevita( levita: Levita) {

    const [isModalOpen, setIsModalOpen] = useState(true);

    return (
        <>
            {isModalOpen &&
                <div key={levita.nome} className="fixed inset-0 flex justify-center items-center bg-black/25 backdrop-blur-sm">
                    <div key={levita.nome} className="w-[600px]">
                        <Card key={levita.nome}>
                            <CardHeader>
                                <CardTitle className="flex">{levita.nome}
                                    <X onClick={() => setIsModalOpen(false)}
                                        className="flex hover:cursor-pointer outline-rose-400 outline rounded-lg text-right justify-items-end items-end justify-end"/>
                                </CardTitle>
                                <CardDescription>
                                    Descricao descritiva
                                </CardDescription>
                            </CardHeader>
                            <CardContent key={levita.nome}>
                                <p>{levita.instrumentos.map(instrumento => (<Badge key={instrumento.numero} className="m-1">{instrumento.nome}</Badge>))}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            }
            <Button variant={"outline"} onClick={() => setIsModalOpen(true)}>Ver Levita</Button>
        </>
    )
}

export function BadgeDisponivel(text: string, disp: boolean, chav: string) {
    return (
      <div key={chav} className="flex items-center space-x-2">
        {disp ?
          <Badge key={chav} className="bg-rose-400">{text}</Badge>
          :
          <Badge key={chav} variant={"outline"}>{text}</Badge>
        }
      </div>
    )
  
  }