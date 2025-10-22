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
import { Musica } from "@/lib/apiObjects";
import { useState } from "react";
import { Button } from "../ui/button";
import { Music } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { postMethod } from "@/lib/apiRequests";
import { toast } from "sonner";

export function DialogAddMusica({ setState, disabled }: { setState: React.Dispatch<React.SetStateAction<Musica[] | undefined>>, disabled?: boolean }) {
    const [nomeMusica, setNomeMusica] = useState("");
    const [linkMusica, setLinkMusica] = useState("");
    const [cifraMusica, setCifraMusica] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="flex" disabled={disabled}>
                <Button variant={"outline"} className="hover:text-emerald-500" onClick={() => setLoading(false)}>
                    <Music className="text-emerald-500" />
                    <p className="hidden sm:inline">Adicionar Música</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[85%]">
                <DialogHeader>
                    <DialogTitle>Adicionar Música</DialogTitle>
                    <DialogDescription />
                </DialogHeader>

                <Label>Nome:</Label>
                <Input type="text" placeholder="Insira o nome da música."
                    value={nomeMusica} onChange={(e) => setNomeMusica(e.target.value)} />
                <Label>Link:</Label>
                <Input type="url" placeholder="Insira o link da música."
                    value={linkMusica} onChange={(e) => setLinkMusica(e.target.value)} />
                <Label>Cifra:</Label>
                <Input type="text" placeholder="Insira o link da cifra da música."
                    value={cifraMusica} onChange={(e) => setCifraMusica(e.target.value)} />

                <DialogFooter className="gap-4">
                    <Button variant={"cancel"} onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button variant={"save"} type="submit" disabled={isLoading || nomeMusica === "" || linkMusica === ""}
                        onClick={() => {
                            setLoading(true)
                            postMethod<Musica>("v1/musicas", {
                                nome: nomeMusica,
                                link: linkMusica,
                                cifra: cifraMusica
                            }, () => setOpen(false))
                            .then(() => setState(undefined))
                            .catch((error) => {
                                toast.error("Erro na comunicação com a api: ", error);
                            })
                            .finally(() => {
                                setLoading(false)
                                toast.success("Música inserida com sucesso!")
                            });
                        }}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}