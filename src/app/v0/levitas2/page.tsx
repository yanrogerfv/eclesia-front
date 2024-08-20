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
import { useState, useTransition } from "react";
import Link from "next/link";
import { List } from "lucide-react";
import { ButtonLink } from "@/components/buttonlink";
import { Gavetinha } from "@/components/gaveta";
import { DialogLevita } from "@/components/dialog-levita";
import { Badge } from "@/components/ui/badge";
import ModalLevita from "@/components/modal";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

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
export default async function Home() {

    async function getLevitas(): Promise<Levita[]> {
        const levita = await Promise.resolve(fetch('http://localhost:1002/v1/levita'));
        if (!levita.ok)
            throw new Error(`HTTP error! status: ${levita.status}`);
        const data: Levita[] = await levita.json() as Levita[];
        return data as Levita[];
    }

    function BadgeDisponivel(text: string, disp: boolean, chav: string) {
        return (
            <div className="flex items-center space-x-2">
                {disp ?
                    <Badge key={chav} className="bg-rose-400">{text}</Badge>
                    :
                    <Badge key={chav} variant={"outline"}>{text}</Badge>
                }
            </div>
        )

    }
    var levitas = getLevitas();
    var levita: Levita;
    levita = {nome: "levita", email: "email.com", instrumentos: [{ numero: 0, nome: "instrumento" }], contato: "", disponivel: true }

    var [openModal, setOpenModal] = useState(false);

    return (
        <main className="max-w-6xl mx-auto my-12">
            <nav>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
                    Planejador de Escalas</h1><br />
                <h2 className="scroll-m-20 border-b text-base text-neutral-700 tracking-tight transition-colors first:mt-0">
                    Tornando a criação de escalas mais simples.</h2>
            </nav>
            <br />
            <div>
                <div key={"card-bg"} className="flex gap-4 w-full p-5 h-screen bg">
                    <ModalLevita 
                        nome={levita.nome}
                        instrumentos={levita.instrumentos}
                        email={levita.email}
                        contato={levita.contato}
                        disponivel={levita.disponivel}
                    />
                    <DialogLevita levita={levita}></DialogLevita>
                </div>
            </div>
        </main>
    );
}
