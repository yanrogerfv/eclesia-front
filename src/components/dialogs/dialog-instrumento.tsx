"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { CirclePlus } from "lucide-react"

export function DialogAddInstrumento() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="flex items-center justify-center">
                    <CirclePlus className="mr-2" />Adicionar Instrumento</Button>
            </DialogTrigger>
            <DialogContent>

            </DialogContent>
        </Dialog>
    )
}