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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { Card } from "../ui/card";

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
                        <DialogTitle className={"text-2xl " + (escalaData.domingo ? "text-teal-400/80" :
                            escalaData.quarta ? "text-emerald-400/80" : "text-sky-400/80"
                        )}>{escalaData.titulo}</DialogTitle>
                        <DialogDescription className="border-b border-zinc-600">
                            {convertDateFormat(escalaData.data)}
                        </DialogDescription>
                        <br />
                        <p className="text-teal-400">Ministro: <a className="text-emerald-400">{escalaData.ministro.nome}</a></p>
                        <p className="text-teal-400">Violão: {escalaData.violao ? <a className="text-white"> {escalaData.violao.nome}</a> : <a className="text-zinc-50/50">Não inserido.</a>}</p>
                        <p className="text-teal-400">Teclado: {escalaData.teclado ? <a className="text-white"> {escalaData.teclado.nome}</a> : <a className="text-zinc-50/50">Não inserido.</a>}</p>
                        <p className="text-teal-400">Bateria: {escalaData.bateria ? <a className="text-white"> {escalaData.bateria.nome}</a> : <a className="text-zinc-50/50">Não inserido.</a>}</p>
                        <p className="text-teal-400">Baixo: {escalaData.baixo ? <a className="text-white"> {escalaData.baixo.nome}</a> : <a className="text-zinc-50/50">Não inserido.</a>}</p>
                        <p className="text-teal-400">Guitarra: {escalaData.guitarra ? <a className="text-white"> {escalaData.guitarra.nome}</a> : <a className="text-zinc-50/50">Não inserido.</a>}</p>
                        <p className="text-teal-400">Backs: {escalaData.back.length > 0 ? <a className="text-white"> {
                            escalaData.back.map((back) => (back.nome)).join(", ")}.</a> : <a className="text-zinc-50/50">Não inseridos.</a>}</p>
                        <br />

                    </DialogHeader>
                    <Label>Observações:</Label>
                    {escalaData.observacoes ? <p className="text-zinc-200">{escalaData.observacoes}</p> : <p className="text-foreground/25">Nenhuma observação.</p>}
                    <br />

                    <Label>Músicas:</Label>
                    <Card className="bg-transparent grid-flow-row p-2">
                        {escalaData.musicas?
                            escalaData.musicas.map((musica) => (
                            <Button key={musica.id} variant={"outline"} className="p-2 rounded-lg m-2">{musica.nome}</Button>
                        ) ) : <p className="text-foreground/25">Nenhuma música inserida.</p>}
                    </Card>
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
    const [isLoadingLevitas, setIsLoadingLevitas] = useState(true);
    const [levitasDisponiveis, setLevitasDisponiveis] = useState<Levita[]>([])
    const [data, setData] = useState("");
    const [titulo, setTitulo] = useState("");
    const [ministro, setMinistro] = useState("");
    const [baixo, setBaixo] = useState("");
    const [bateria, setBateria] = useState("");
    const [guitarra, setGuitarra] = useState("");
    const [teclado, setTeclado] = useState("");
    const [violao, setViolao] = useState("");
    const [backs, setBacks] = useState<String[]>([]);
    const [observacao, setObservacao] = useState("");

    function filterByInstrumento(instrumentoId: number) {
        return levitasDisponiveis.filter((levita) => levita.instrumentos.some((instrumento) => instrumento.id == instrumentoId))
    }

    useEffect(() => {
        fetch("http://localhost:1004/v1/levita")
            .then((res) => res.json()).then((data) => {
                setIsLoadingLevitas(false)
                setLevitasDisponiveis(data)
            }).catch((error) => {
                console.error("Erro na comunicação com a api: ", error)
                setLevitasDisponiveis([])
            })
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
                <ScrollArea className="h-[720px]">
                    <Label>Título:</Label>
                    <Input type="text" placeholder="Insira um título para a Escala."
                        value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    <Label>Data:</Label>
                    <Input type="date" placeholder="Data."
                        value={data} onChange={(e) => setData(e.target.value)} />
                    <br />

                    <Label>Ministro</Label>
                    <Select onValueChange={(value) => setMinistro(value)} disabled={isLoadingLevitas || data.length == 0}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione um ministro." />
                        </SelectTrigger>
                        <SelectContent>
                            {levitasDisponiveis.map((levita) => (
                                <SelectItem value={levita.id} key={levita.id} onSelect={() => setMinistro(levita.nome)}>{levita.nome}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <br />

                    <Label>Violão</Label>
                    <Select onValueChange={(value) => setViolao(value)} disabled={isLoadingLevitas || data.length == 0}>
                        <SelectTrigger>
                            <SelectValue placeholder="Escolha um levita para tocar violão." />
                        </SelectTrigger>
                        <SelectContent>
                            {filterByInstrumento(1).map((levita) => (
                                <SelectItem value={levita.id} key={levita.id} onSelect={() => setViolao(levita.id)}>{levita.nome}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <br />

                    <Label>Teclado</Label>
                    <Select onValueChange={(value) => setTeclado(value)} disabled={isLoadingLevitas || data.length == 0}>
                        <SelectTrigger>
                            <SelectValue placeholder="Escolha um levita para tocar teclado." />
                        </SelectTrigger>
                        <SelectContent>
                            {filterByInstrumento(2).map((levita) => (
                                <SelectItem value={levita.id} key={levita.id} onSelect={() => setTeclado(levita.id)}>{levita.nome}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <br />

                    <Label>Bateria</Label>
                    <Select onValueChange={(value) => setBateria(value)} disabled={isLoadingLevitas || data.length == 0}>
                        <SelectTrigger>
                            <SelectValue placeholder="Escolha um levita para tocar bateria." />
                        </SelectTrigger>
                        <SelectContent>
                            {filterByInstrumento(3).map((levita) => (
                                <SelectItem value={levita.id} key={levita.id} onSelect={() => setBateria(levita.id)}>{levita.nome}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <br />

                    <Label>Baixo</Label>
                    <Select onValueChange={(value) => setBaixo(value)} disabled={isLoadingLevitas || data.length == 0}>
                        <SelectTrigger>
                            <SelectValue placeholder="Escolha um levita para tocar baixo." />
                        </SelectTrigger>
                        <SelectContent>
                            {filterByInstrumento(4).map((levita) => (
                                <SelectItem value={levita.id} key={levita.id} onSelect={() => setBaixo(levita.id)}>{levita.nome}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <br />

                    <Label>Guitarra</Label>
                    <Select onValueChange={(value) => setGuitarra(value)} disabled={isLoadingLevitas || data.length == 0}>
                        <SelectTrigger>
                            <SelectValue placeholder="Escolha um levita para tocar guitarra." />
                        </SelectTrigger>
                        <SelectContent>
                            {filterByInstrumento(5).map((levita) => (
                                <SelectItem value={levita.id} key={levita.id} onSelect={() => setGuitarra(levita.id)}>{levita.nome}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <br />

                    <Label>Observação:</Label>
                    <Textarea placeholder="Insira uma observação. (Ex: Dia e hora de ensaio, local de apresentação, etc.)" onChange={(e) => setObservacao(e.target.value)} />
                    <br />

                    <Label>Backs:</Label>
                    <Card className="bg-transparent grid grid-cols-4">
                        {filterByInstrumento(0).map((levita) => (
                            <Button key={levita.id} variant={"outline"} type="submit" className="p-2 rounded-lg m-2" onClick={() => setBacks([...backs, levita.nome])}>{levita.nome}</Button>
                        ))}
                    </Card>
                    <br />

                </ScrollArea>
                <DialogFooter>
                    <Button className="hover:bg-emerald-500">Adicionar</Button>
                    <Button className="hover:bg-rose-500" onClick={() => setOpen(false)}>Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}