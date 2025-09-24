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

export function DialogAddMusica({setState, disabled}: { setState: React.Dispatch<React.SetStateAction<Musica[] | undefined>>, disabled?: boolean }) {
    const [nomeMusica, setNomeMusica] = useState("");
    const [linkMusica, setLinkMusica] = useState("");
    const [cifraMusica, setCifraMusica] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="flex p-5" disabled={disabled}>
                <Button variant={"outline"} className="hover:text-emerald-500" onClick={() => setLoading(false)}>
                    <Music className="mr-2 hover:animate-bounce" />Adicionar Música</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Música</DialogTitle>
                    <DialogDescription />
                    <br />
                    <Label>Nome:</Label>
                    <Input type="text" placeholder="Insira o nome da música."
                        value={nomeMusica} onChange={(e) => setNomeMusica(e.target.value)} />
                    <br />
                    <Label>Link:</Label>
                    <Input type="url" placeholder="Insira o link da música."
                        value={linkMusica} onChange={(e) => setLinkMusica(e.target.value)} />
                    <br />
                    <Label>Cifra:</Label>
                    <Input type="text" placeholder="Insira o link da cifra da música." 
                        value={cifraMusica} onChange={(e) => setCifraMusica(e.target.value)} />

                </DialogHeader>
                <DialogFooter className="">
                    <Button className="hover:bg-emerald-500" type="submit" disabled={isLoading}
                        onClick={() => {
                            setLoading(true)
                            if (nomeMusica === "" || linkMusica === "") {
                                toast.warning("Preencha todos os campos!")
                                setLoading(false)
                            }
                            postMethod<Musica>("v1/musicas", {
                                nome: nomeMusica,
                                link: linkMusica,
                                cifra: cifraMusica
                            }, () => setOpen(false)).then(() => setState(undefined))
                                .catch((error) => {
                                    toast.error("Erro na comunicação com a api: ", error);
                                })
                            toast.success("Música inserida com sucesso!")
                        }}>Salvar</Button>
                    <Button className="hover:bg-rose-600/80" onClick={() => setOpen(false)}>Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}