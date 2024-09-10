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
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { TooltipContent } from "@radix-ui/react-tooltip"
import { Card } from "./ui/card"
import ModalLevita from "./modal"


interface Instrumento {
    numero: number,
    nome: string,
}

interface Levita {
    nome: string,
    instrumentos: Instrumento[],
    contato: string,
    email: string,
    disponivel: boolean
}

interface LevitaT {
    levita: Levita;
}

export function DialogLevita(levita: LevitaT) {
    return (
        <Dialog>
            <DialogTrigger asChild key={levita.levita.nome} className="p-5">
                <Button variant={"outline"} className="flex items-center justify-center">Ver Levita</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{levita.levita.nome}</DialogTitle>
                    <DialogDescription>
                        {levita.levita.instrumentos.map(instrumento => (
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
                                    onClick={() => ModalLevita(levita.levita)} />
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
    return (
        <Dialog>
            <DialogTrigger asChild className="p-5">
                <Button variant={"outline"} className="mx-2 font-bold">
                    <UserPlus className="mr-2" />Adicionar Levita</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Levita</DialogTitle>
                    <br />
                    <Label>Nome:</Label>
                    <Input type="text" placeholder="Insira o nome do Levita." />
                    <br/>
                    <Label>Email:</Label>
                    <Input type="email" placeholder="Insira um email do Levita." />
                    <br/>
                    <Label>Telefone:</Label>
                    <Input type="tel" placeholder="Insira um contato do Levita." />

                </DialogHeader>
                <DialogFooter className="">
                    <Button type="submit">Salvar</Button>
                    <Button onClick={ () =>
                        <div>aaaaaa</div>
                    }>Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function DialogRemoveLevita(){
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
                <DialogFooter className="">
                    <Button type="submit">Salvar</Button>
                    <Button type="submit">Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}