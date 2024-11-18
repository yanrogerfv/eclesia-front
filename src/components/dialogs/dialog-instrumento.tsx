"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { CircleMinus, CirclePlus } from "lucide-react"
import { useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { toast } from "sonner"
import { UUID } from "crypto"
import { getInstrumentos } from "../apiRequests"
import { Select, SelectTrigger, SelectItem, SelectContent, SelectGroup, SelectLabel, SelectValue } from "../ui/select"
import { Instrumento } from "../apiObjects"

export function DialogAddInstrumento() {
    const [nomeInstrumento, setNomeInstrumento] = useState("")
    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="mx-2 hover:text-emerald-500">
                    <CirclePlus />Adicionar Instrumento</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Instrumento</DialogTitle>
                    <br />
                    <Label>Nome:</Label>
                    <Input type="text" placeholder="Insira o nome do instrumento."
                        value={nomeInstrumento} onChange={(e) => setNomeInstrumento(e.target.value)} />
                    <br />

                </DialogHeader>
                <DialogFooter className="">
                    <Button className="hover:bg-emerald-500"
                        type="submit" disabled={isLoading} onClick={() => {
                            setLoading(true)
                            fetch("http://localhost:1004/v1/instrumento", {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    nome: nomeInstrumento,
                                })
                            })
                                .then((res) => res.json())
                                .then(() => {
                                    setOpen(false)
                                    setLoading(false)
                                })
                                // .then((data) => setCreatedMusic(data))
                                .catch((error) => {
                                    console.error("Erro na comunicação com a api: ", error);
                                })
                            toast(<p>"Instrumento inserido com sucesso!" </p>)
                        }}>Salvar</Button>
                    <Button className="hover:bg-rose-600/80" onClick={() => setOpen(false)}>Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function DialogRemoveInstrumento() {
    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const allInstrumentos = getInstrumentos();
    const [selectedInstrumento, setSelectedInstrumento] = useState<Instrumento>();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="mx-2 hover:text-rose-500" >
                    <CircleMinus />Remover Instrumento</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Remover Instrumento</DialogTitle>
                </DialogHeader>
                <Select onValueChange={() => setSelectedInstrumento(undefined)}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="Escolha o instrumento a ser removido." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Instrumentos</SelectLabel>
                            {allInstrumentos.map((instrumento) => (
                                <SelectItem value={instrumento.nome}>
                                    {instrumento.nome}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <DialogFooter className="">
                    <Button className="hover:bg-rose-500"
                        type="submit" disabled={isLoading} onClick={() => {
                            setLoading(true)
                            fetch(`http://localhost:1004/v1/instrumento/${selectedInstrumento?.numero}`, {
                                method: "DELETE",
                            })
                                .then(() => {
                                    setOpen(false)
                                    setLoading(false)
                                })
                                .catch((error) => {
                                    console.error("Erro na comunicação com a api: ", error);
                                })
                            toast(<p>"Instrumento removido com sucesso!" </p>)
                        }}>Remover</Button>
                    <Button className="hover:bg-emerald-500" onClick={() => setOpen(false)}>Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}