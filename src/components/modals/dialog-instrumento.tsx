"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { BadgeMinus, BadgePlus, CircleMinus, CirclePlus } from "lucide-react"
import React, { useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { toast } from "sonner"
import { deleteMethod, postMethod } from "@/lib/apiRequests"
import { Select, SelectTrigger, SelectItem, SelectContent, SelectGroup, SelectLabel, SelectValue } from "../ui/select"
import { Instrumento } from "@/lib/apiObjects"

export function DialogAddInstrumento(props: { disabled: boolean, state: React.Dispatch<React.SetStateAction<Instrumento[] | undefined>> }) {
    const [nomeInstrumento, setNomeInstrumento] = useState("")
    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"} disabled={props.disabled} className="hover:text-emerald-500">
                    <BadgePlus className="text-emerald-500" />
                    <p className="hidden lg:inline">Adicionar Instrumento</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[85%]">
                {isLoading ?
                    <div className="absolute w-full h-[85%] z-50 flex justify-center items-center">
                        <div className="h-16 w-16 border-4 border-subprimary rounded-3xl animate-spin" />
                    </div>
                    : <></>}
                <DialogHeader>
                    <DialogTitle>Adicionar Instrumento</DialogTitle>
                </DialogHeader>

                <Label>Nome:</Label>
                <Input type="text" placeholder="Insira o nome do instrumento."
                    value={nomeInstrumento} onChange={(e) => setNomeInstrumento(e.target.value)} />

                <DialogFooter className="gap-4">
                    <Button className="hover:bg-rose-600 bg-red-600" disabled={isLoading} onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button className="hover:bg-emerald-500 bg-green-600"
                        type="submit" disabled={isLoading || nomeInstrumento.length === 0} onClick={() => {
                            setLoading(true)
                            postMethod("v1/instrumento", {
                                nome: nomeInstrumento
                            }, () => setOpen(false))
                                .then(() => props.state(undefined))
                                .catch((error) => {
                                    toast.error("Erro na comunicação com a api: ", error);
                                })
                                .finally(() => {
                                    setLoading(false)
                                    toast.success("Instrumento inserido com sucesso!")
                                });
                        }}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function DialogRemoveInstrumento(props: { allInstrumentos: Instrumento[] | undefined, state: React.Dispatch<React.SetStateAction<Instrumento[] | undefined>> }) {
    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedInstrumento, setSelectedInstrumento] = useState<any>(null);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"} disabled={!props.allInstrumentos} className="hover:bg-rose-500/40" >
                    <BadgeMinus className="text-rose-500" />
                    <p className="hidden lg:inline">Remover Instrumento</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[85%]">
                {isLoading ?
                    <div className="absolute w-full h-[85%] z-50 flex justify-center items-center">
                        <div className="h-16 w-16 border-4 border-subprimary rounded-3xl animate-spin" />
                    </div>
                    : <></>}
                <DialogHeader>
                    <DialogTitle>Remover Instrumento</DialogTitle>
                </DialogHeader>
                <Select onValueChange={(value) => setSelectedInstrumento(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Escolha o instrumento a ser removido." />
                    </SelectTrigger>
                    <SelectContent onChange={(e) => { setSelectedInstrumento(e.target) }}>
                        <SelectGroup>
                            <SelectLabel>Instrumentos</SelectLabel>
                            {props.allInstrumentos?.map((instrumento) => (
                                <SelectItem key={instrumento.id} value={instrumento.id.toString()} onSelect={() => setSelectedInstrumento(instrumento.id)}>{instrumento.nome}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <DialogFooter className="gap-4">
                    <Button className="hover:bg-rose-500 bg-red-600" disabled={isLoading} onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button className="hover:bg-emerald-500 bg-green-600"
                        type="submit" disabled={isLoading || !selectedInstrumento} onClick={() => {
                            setLoading(true)
                            deleteMethod(`v1/instrumento/${selectedInstrumento}`)
                                .then(() => props.state(undefined))
                                .then(() => setOpen(false))
                                .catch((error) => {
                                    toast.error("Erro na comunicação com a api: ", error);
                                })
                                .finally(() => {
                                    setLoading(false)
                                    toast.success("Instrumento removido com sucesso!")
                                });
                        }}>Remover</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}