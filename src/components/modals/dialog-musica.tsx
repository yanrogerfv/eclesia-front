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
import { Check, Music } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { postMethod } from "@/lib/apiRequests";
import { title } from "process";
import { useToast } from "../ui/use-toast";

export function DialogAddMusica(props: { setState: React.Dispatch<React.SetStateAction<Musica[] | undefined>> }) {
    const [nomeMusica, setNomeMusica] = useState("");
    const [linkMusica, setLinkMusica] = useState("");
    const [cifraMusica, setCifraMusica] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const { toast } = useToast();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="flex p-5">
                <Button variant={"outline"} className="mx-2 font-bold" onClick={() => setLoading(false)}>
                    <Music className="mr-2" />Adicionar Música</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Música</DialogTitle>
                    <br />
                    <Label>Nome:</Label>
                    <Input type="text" placeholder="Insira o nome da música."
                        value={nomeMusica} onChange={(e) => setNomeMusica(e.target.value)} />
                    <br />
                    <Label>Link:</Label>
                    <Input type="url" placeholder="Insira o link da música."
                        value={linkMusica} onChange={(e) => setLinkMusica(e.target.value)} />
                    <br />
                    {/* <Label>Cifra:</Label>
                    <Input type="text" placeholder="Insira um contato do Levita." 
                        value ={cifraMusica} onChange={(e) => setCifraMusica(e.target.value)}/> */}

                </DialogHeader>
                <DialogFooter className="">
                    <Button className="hover:bg-emerald-500"
                        type="submit"  disabled={isLoading} onClick={() => {
                            setLoading(true)
                            if(nomeMusica === "" || linkMusica === ""){
                                alert("Preencha todos os campos!")
                                setLoading(false)
                            }
                            postMethod<Musica>("v1/musicas", {
                                nome: nomeMusica,
                                link: linkMusica,
                                cifra: cifraMusica
                            }, () => setOpen(false)).then(() => props.setState(undefined))
                                .catch((error) => {
                                    console.error("Erro na comunicação com a api: ", error);
                                })
                            toast({ title: "Música inserida com sucesso!" })
                        }}>Salvar</Button>
                    <Button className="hover:bg-rose-600/80" onClick={() => setOpen(false)}>Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}