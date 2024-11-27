"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Church, PencilLine, UserMinus, UserPlus } from "lucide-react"
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { TooltipContent } from "@radix-ui/react-tooltip"
import { Card } from "../ui/card"
// import { fetchLevitas } from "./apiObjects"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useEffect, useState } from "react"
import { Levita, Instrumento } from "../apiObjects"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import { getInstrumentos } from "../apiRequests"
import { set } from "date-fns"
import { Textarea } from "../ui/textarea"

interface propsView {
    levita: Levita,
    disabled: boolean
}

export function DialogLevita(att: propsView) {
    return (
        <Dialog>
            <DialogTrigger asChild key={att.levita.nome} className="p-5">
                <Button variant={"outline"} disabled={att.disabled} className="flex items-center justify-center">Ver Levita</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{att.levita.nome}</DialogTitle>
                    <DialogDescription>
                        {att.levita.instrumentos.map(instrumento => (
                            instrumento.nome.concat(" - ")))}
                    </DialogDescription>
                    <br />
                </DialogHeader>
                <p className="text-foreground/25">{att.levita.descricao}</p>
                <DialogFooter>
                    <DialogEditLevita id={att.levita.id}
                        nome={att.levita.nome}
                        email={att.levita.email}
                        contato={att.levita.contato}
                        descricao={att.levita.descricao}
                        instrumentos={att.levita.instrumentos}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function DialogAddLevita() {
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const allInstrumentos = getInstrumentos();

    const [nomeLevita, setNomeLevita] = useState("");
    const [emailLevita, setEmailLevita] = useState("");
    const [telLevita, setTelLevita] = useState("");
    const [descLevita, setDescLevita] = useState("");
    const [instrumentosLevita, setInstrumentos] = useState<Instrumento[]>([]);
    function addInstrumentoInFilter(instrumento: Instrumento) {
        setInstrumentos([...instrumentosLevita, instrumento])
    }
    function removeInstrumentoInFilter(instrumento: Instrumento) {
        setInstrumentos(instrumentosLevita.filter((currentInstrument) => currentInstrument.id !== instrumento.id))
    }

    const handleSubmitLevita = (nome: string | undefined, contato: string | undefined, email: string | undefined, instrumentos: Instrumento[] | []) => {
        fetch('http://localhost:1004/v1/levita', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nome, // Use your own property name / key
                contato: contato ? contato : "",
                email: email ? email : "",
                instrumentos: instrumentos.map((instrumento) => instrumento.id)
            }),
        })
            .then((res) => {
                res.json()
                res.status === 200 ?
                    setOpen(false)
                    : alert("Erro ao adicionar levita:" + res.status)
            })
            // .then((result) => setData(result.rows))
            .catch((err) => console.log("Erro ao adicionar levita: ", err))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="p-5">
                <Button variant={"outline"} className="mx-2 font-bold hover:text-emerald-500" onClick={() => setLoading(false)}>
                    <UserPlus className="mr-2" />Adicionar Levita</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Levita</DialogTitle>
                    <br />
                    <Label>Nome:</Label>
                    <Input type="text" placeholder="Insira o nome do Levita."
                        value={nomeLevita} onChange={(e) => setNomeLevita(e.target.value)} />
                    <br />
                    <Label>Email:</Label>
                    <Input type="email" placeholder="Insira um email do Levita."
                        value={emailLevita} onChange={(e) => setEmailLevita(e.target.value)} />
                    <br />
                    <Label>Telefone:</Label>
                    <Input type="tel" placeholder="Insira um contato do Levita."
                        value={telLevita} onChange={(e) => setTelLevita(e.target.value)} />
                    <br />
                    <Label>Instrumentos:</Label>
                    {allInstrumentos.map((instrumento) => (
                        <div key={instrumento.id} className="flex items-center space-x-2">
                            <Checkbox id={instrumento.nome} onClick={() => {
                                if (instrumentosLevita.some((currentInstrument) => currentInstrument.id === instrumento.id)) {
                                    removeInstrumentoInFilter(instrumento)
                                } else {
                                    addInstrumentoInFilter(instrumento)
                                    console.log(instrumentosLevita)
                                }
                            }} />
                            <Label htmlFor={instrumento.nome}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >{instrumento.nome}</Label><br />
                        </div>
                    ))}
                    <br />
                    <Label>Descrição:</Label>
                    <Textarea placeholder="Insira uma descrição do Levita." onChange={(e) => setDescLevita(e.target.value)} />


                </DialogHeader>
                <DialogFooter className="">
                    <Button className="hover:bg-emerald-500" disabled={isLoading} type="submit" onClick={() => {
                        setLoading(true)
                        handleSubmitLevita(nomeLevita, telLevita, emailLevita, instrumentosLevita)
                    }}>Salvar</Button>
                    <Button className="hover:bg-rose-600/80" disabled={isLoading} onClick={() => setOpen(false)}>Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function DialogEditLevita(levita: Levita) {
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const allInstrumentos = getInstrumentos();

    const [nomeLevita, setNomeLevita] = useState("");
    const [emailLevita, setEmailLevita] = useState("");
    const [contatoLevita, setContatoLevita] = useState("");
    const [descricaoLevita, setDescricaoLevita] = useState("");
    const [instrumentosLevita, setInstrumentos] = useState<Instrumento[]>([]);
    function addInstrumentoInFilter(instrumento: Instrumento) {
        setInstrumentos([...instrumentosLevita, instrumento])
    }
    function removeInstrumentoInFilter(instrumento: Instrumento) {
        setInstrumentos(instrumentosLevita.filter((currentInstrument) => currentInstrument.id !== instrumento.id))
    }

    const handleSubmitLevita = () => {
        fetch('http://localhost:1004/v1/levita', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: levita.id, 
                nome: nomeLevita, 
                email: emailLevita, 
                contato: contatoLevita, 
                descricao: descricaoLevita, 
                instrumentos: instrumentosLevita.map((instrumento) => instrumento.id)
            }),
        })
            .then((res) => {
                res.json()
                res.status === 200 ?
                    setOpen(false)
                    : alert("Erro ao adicionar levita:" + res.status)
            })
            // .then((result) => setData(result.rows))
            .catch((err) => console.log("Erro ao adicionar levita: ", err))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <PencilLine className="outline rounded-lg p-1 size-auto outline-1 outline-sky-400/25 hover:bg-sky-400 cursor-pointer"
                    onClick={() => {
                        setNomeLevita(levita.nome)
                        setEmailLevita(levita.email)
                        setContatoLevita(levita.contato)
                        setDescricaoLevita(levita.descricao)
                        setInstrumentos(levita.instrumentos)
                        }} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Levita</DialogTitle>
                    <DialogDescription>
                        Alterando os dados de {levita.nome}.
                    </DialogDescription>
                    <br />
                    <br />
                    <Label>Nome:</Label>
                    <Input type="text" placeholder="Insira o nome do Levita."
                    value={nomeLevita ? nomeLevita : undefined} onChange={(e) => setNomeLevita(e.target.value)} />
                    <br />
                    <br />
                    <Label>Email:</Label>
                    <Input type="email" placeholder="Insira um email do Levita."
                    value={emailLevita ? emailLevita : undefined} onChange={(e) => setEmailLevita(e.target.value)} />
                    <br />
                    <br />
                    <Label>Telefone:</Label>
                    <Input type="tel" placeholder="Insira um contato do Levita."
                    value={contatoLevita ? contatoLevita : undefined} onChange={(e) => setContatoLevita(e.target.value)} />
                    <br />
                    <br />
                    <Label>Instrumentos:</Label>
                    {allInstrumentos.map((instrumento) => (
                        <div key={instrumento.id} className="flex items-center space-x-2">
                            <Checkbox id={instrumento.nome} checked={instrumentosLevita.some((current) => current.id == instrumento.id) ? true : false}
                                onClick={() => {
                                    if (instrumentosLevita.some((currentInstrument) => currentInstrument.id === instrumento.id)) {
                                        removeInstrumentoInFilter(instrumento)
                                    } else {
                                        addInstrumentoInFilter(instrumento)
                                    }
                                }} />
                            <Label htmlFor={instrumento.nome}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >{instrumento.nome}</Label><br />
                        </div>
                    ))}
                    <br />
                    <br />
                    <Label>Descrição:</Label>
                    <Textarea placeholder="Insira uma descrição do Levita." onChange={(e) => setDescricaoLevita(e.target.value)}
                        value={levita.descricao ? levita.descricao : undefined} />


                </DialogHeader>
                <DialogFooter className="">
                    <Button className="hover:bg-emerald-500" disabled={isLoading} type="submit" onClick={() => {
                        setLoading(true)
                        handleSubmitLevita()
                    }}>Salvar</Button>
                    <Button className="hover:bg-rose-600/80" disabled={isLoading} onClick={() => setOpen(false)}>Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}