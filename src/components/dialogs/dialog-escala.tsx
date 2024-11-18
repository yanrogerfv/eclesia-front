"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Escala, Levita, convertDateFormat } from "../apiObjects";
import { Button } from "../ui/button";
import { CirclePlus, PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { UUID } from "crypto";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface props {
    escalaId: UUID
}

export function DialogVerEscala(props: props) {
    const [escalaData, setEscalaData] = useState<Escala>()
    const [isLoading, setIsLoading] = useState(true)
    const [backs, setBacks] = useState<string>("")
    useEffect(() => {
        // setIsLoading(true)
        fetch(`http://localhost:1004/v1/escala/${props.escalaId}`)
            .then((res) => res.json())
            .then((data) => {
                setIsLoading(false)
                setEscalaData(data)
            })
            .catch((error) => {
                console.error("Erro na comunicação com a api: ", error)
                setEscalaData(undefined);
            })
    }, [])

    // const backs = escalaData?.back.map((back) => (back.nome)).join(", ")

    return (
        !isLoading && escalaData ?

            <Dialog>
                <DialogTrigger asChild key={escalaData.id} className="p-5">
                    <Button variant={"outline"} className="flex items-center justify-center">Ver Escala</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{escalaData.titulo}</DialogTitle>
                        <DialogDescription>
                            {convertDateFormat(escalaData.data)}
                        </DialogDescription>
                        <br />
                        <p className="text-teal-400">Ministro: <a className="text-emerald-400">{escalaData.ministro.nome}</a></p>
                        <p className="text-teal-400">Violão: {escalaData.violao ? <a className="text-white"> {escalaData.violao.nome}</a> : <a className="text-zinc-50/50">Não inserido.</a>}</p>
                        <p className="text-teal-400">Teclado: {escalaData.teclado ? <a className="text-white"> {escalaData.teclado.nome}</a> : <a className="text-zinc-50/50">Não inserido.</a>}</p>
                        <p className="text-teal-400">Bateria: {escalaData.bateria ? <a className="text-white"> {escalaData.bateria.nome}</a> : <a className="text-zinc-50/50">Não inserido.</a>}</p>
                        <p className="text-teal-400">Baixo: {escalaData.baixo ? <a className="text-white"> {escalaData.baixo.nome}</a> : <a className="text-zinc-50/50">Não inserido.</a>}</p>
                        <p className="text-teal-400">Guitarra: {escalaData.guitarra ? <a className="text-white"> {escalaData.guitarra.nome}</a> : <a className="text-zinc-50/50">Não inserido.</a>}</p>
                        <p className="text-teal-400">Backs: {escalaData.back ?<a className="text-white"> {
                            escalaData.back.map((back) => (back.nome)).join(", ")}</a>:<a className="text-zinc-50/50">Não inseridos.</a>}</p>

                        <br />

                    </DialogHeader>
                    <p className="text-foreground/25">Descrição</p>
                    <DialogFooter>
                        <Button><PencilLine />Editar Escala</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog> : <Button variant={"outline"} disabled={true} className="flex items-center justify-center">Ver Escala</Button>
    )
}

export function listBacks(backs: Levita[]) {
    const backNames = new Array<string>();
    backs.forEach((back) => {
        backNames.push(back.nome)
    })

    return String(backNames.join(", "))
}


export function DialogAddEscala() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [levitasDisponiveis, setLevitasDisponiveis] = useState<Levita[]>([])
    const [titulo, setTitulo] = useState("");
    const [data, setData] = useState("");

    useEffect(() => {
        fetch("http://localhost:1004/v1/levita")
    })
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="mx-2 hover:text-emerald-500">
                    <CirclePlus className="mx-1 text-emerald-500" />Criar Escala</Button>
            </DialogTrigger>
            <DialogContent>

                <DialogHeader>
                    <DialogTitle>Criando uma Escala</DialogTitle>
                    <DialogDescription>
                        Adicione uma nova escala ao planejador.
                    </DialogDescription>
                </DialogHeader>

                <Label>Título:</Label>
                <Input type="text" placeholder="Insira um título para a Escala."
                    value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                <Label>Data:</Label>
                <Input type="date" placeholder="Data."
                    value={data} onChange={(e) => setData(e.target.value)} />

                <DialogFooter>
                    <Button className="hover:bg-emerald-500">Adicionar</Button>
                    <Button className="hover:bg-rose-500" onClick={() => setOpen(false)}>Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}