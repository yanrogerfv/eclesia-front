"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { CircleMinus, CirclePlus } from "lucide-react"
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
                <Button variant={"outline"} disabled={props.disabled} className="mx-2 hover:text-emerald-500">
                    <CirclePlus />Adicionar Instrumento</Button>
            </DialogTrigger>
            <DialogContent>
                {isLoading ?
                    <div className="absolute w-full h-[85%] z-50 flex justify-center items-center">
                        <div className="h-16 w-16 border-4 border-subprimary rounded-3xl animate-spin" />
                    </div>
                : <></>}
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
                            if (nomeInstrumento === "") {
                                alert("O nome do instrumento não pode ser vazio.")
                                setLoading(false)
                            } else {
                                postMethod("v1/instrumento", {
                                    nome: nomeInstrumento
                                }, () => { }).then(() => {
                                    setOpen(false)
                                    setLoading(false)
                                    props.state(undefined)
                                }).catch((error) => {
                                    console.error("Erro na comunicação com a api: ", error);
                                })
                            }
                        }}>Salvar</Button>
                    <Button className="hover:bg-rose-600/80" disabled={isLoading} onClick={() => setOpen(false)}>Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function DialogRemoveInstrumento( props: { allInstrumentos: Instrumento[] | undefined, state: React.Dispatch<React.SetStateAction<Instrumento[] | undefined>> }) {
    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedInstrumento, setSelectedInstrumento] = useState<any>(null);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"} disabled={!props.allInstrumentos} className="mx-2 hover:bg-rose-500/40" >
                    <CircleMinus />Remover Instrumento</Button>
            </DialogTrigger>
            <DialogContent>
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
                <DialogFooter className="">
                    <Button className="hover:bg-emerald-500"
                        type="submit" disabled={isLoading} onClick={() => {
                            setLoading(true)
                            deleteMethod(`v1/instrumento/${selectedInstrumento}`)
                                .then(() => {
                                    setOpen(false)
                                    setLoading(false)
                                    props.state(undefined)
                                })
                                .catch((error) => {
                                    console.error("Erro na comunicação com a api: ", error);
                                })
                        }}>Remover</Button>
                    <Button className="hover:bg-rose-500" disabled={isLoading} onClick={() => setOpen(false)}>Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}