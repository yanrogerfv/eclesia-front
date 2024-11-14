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

export function DialogLevita(levita: Levita) {
    const tam = levita.instrumentos.length;
    return (
        <Dialog>
            <DialogTrigger asChild key={levita.nome} className="p-5">
                <Button variant={"outline"} className="flex items-center justify-center">Ver Levita</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{levita.nome}</DialogTitle>
                    <DialogDescription>
                        {levita.instrumentos.map(instrumento => (
                            instrumento.nome.concat(" - ")))}
                    </DialogDescription>
                    <br />
                </DialogHeader>
                <p className="text-foreground/25">Descrição</p>
                <DialogFooter>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <PencilLine className="outline rounded-lg size-7 p-1 outline-1 outline-rose-400/25 hover:bg-rose-400 cursor-pointer"
                                    onClick={() => ("")} />
                            </TooltipTrigger>
                            <TooltipContent className="z-50 overflow-hidden rounded-lg mb-2 outline-rose-400/25 border p-1.5 text-sm text-popover-foreground -translate-x-10 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                                <p>Editar Levita</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function DialogAddLevita() {
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const allInstrumentos = getInstrumentos();


    var levita: Levita;

    const [data, setData] = useState([])

    const [nomeLevita, setNomeLevita] = useState("");
    const handleNome = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNomeLevita(event.target.value);
        levita.nome = event.target.value;
    };
    const [emailLevita, setEmailLevita] = useState("");
    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailLevita(event.target.value);
        levita.email = event.target.value;
    };
    const [telLevita, setTelLevita] = useState("");
    const handleTel = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelLevita(event.target.value);
        levita.contato = event.target.value;
    };
    const [instrumentosLevita, setInstrumentosLevita] = useState<Instrumento[]>([]);

    const handleSubmitLevita = (levitaToPost: Levita) => {
        fetch('http://localhost:1004/v1/levita', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: levitaToPost.nome, // Use your own property name / key
                contato: levitaToPost.contato,
                email: levitaToPost.email,
                instrumentos: levitaToPost.instrumentos
            }),
        })
            .then((res) => res.json())
            .then((result) => setData(result.rows))
            .catch((err) => console.log("Erro ao adicionar levita: ", err))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="p-5">
                <Button variant={"outline"} className="mx-2 font-bold" onClick={() => setLoading(false)}>
                    <UserPlus className="mr-2" />Adicionar Levita</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Levita</DialogTitle>
                    <br />
                    <Label>Nome:</Label>
                    <Input type="text" placeholder="Insira o nome do Levita."
                        value={nomeLevita} onChange={handleNome} />
                    <br />
                    <Label>Email:</Label>
                    <Input type="email" placeholder="Insira um email do Levita."
                        value={emailLevita} onChange={handleEmail} />
                    <br />
                    <Label>Telefone:</Label>
                    <Input type="tel" placeholder="Insira um contato do Levita."
                        value={telLevita} onChange={handleTel} />
                    <br />
                    <Label>Instrumentos:</Label>
                    {allInstrumentos.map((instrumento) => (
                        <div className="flex items-center space-x-2">
                            <Checkbox id={instrumento.nome} onClick={() => setInstrumentosLevita(Array.of(instrumento))} />
                            <Label htmlFor={instrumento.nome}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >{instrumento.nome}</Label><br />
                        </div>
                    ))}


                </DialogHeader>
                <DialogFooter className="">
                    <Button className="hover:bg-emerald-500" type="submit" onClick={() => handleSubmitLevita(levita)}>Salvar</Button>
                    <Button className="hover:bg-rose-600/80" onClick={() => setOpen(false)}>Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export function DialogRemoveLevita() {

    // const levitas = await fetchLevitas();
    // var filtereds = levitas.slice(15);

    return (
        <Dialog>
            <DialogTrigger asChild className="p-5">
                <Button variant={"outline"} className="mx-2 font-bold">
                    <UserMinus className="mr-2" />Remover Levita</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Remover Levita</DialogTitle>
                </DialogHeader>
                <Input className="rounded-lg" placeholder="Nome do Levita" />
                {/*<Table className="bg-black/70 rounded-xl">
                    <TableCaption>Listagem das músicas cadastradas.</TableCaption> 
                    <TableBody>
                        {filtereds.map((levita) => (
                            <TableRow key={levita.id}>
                                <TableCell>{filtereds.indexOf(levita)}</TableCell>
                                <TableCell>{levita.nome}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>*/}
                <DialogFooter className="">
                    <Button type="submit">Remover</Button>
                    <Button type="submit">Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}