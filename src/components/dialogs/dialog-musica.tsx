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
import { Musica } from "../apiObjects";
import { useState } from "react";
import { Button } from "../ui/button";
import { Check, Music } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CreateMusica } from "../apiRequests";
import { toast, useToast } from "../ui/use-toast";
import { title } from "process";

interface props {
    bool: boolean
}

export function DialogAddMusica(props:props) {
    const [nomeMusica, setNomeMusica] = useState("");
    const [linkMusica, setLinkMusica] = useState("");
    const [cifraMusica, setCifraMusica] = useState("");

    return (
        <Dialog>
            <DialogTrigger asChild className="flex p-5">
                <Button variant={"outline"} className="mx-2 font-bold">
                <Music className="mr-2"/>Adicionar Música</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Música</DialogTitle>
                    <br />
                    <Label>Nome:</Label>
                    <Input type="text" placeholder="Insira o nome da música."
                        value ={nomeMusica} onChange={(e) => setNomeMusica(e.target.value)}/>
                    <br />
                    <Label>Link:</Label>
                    <Input type="url" placeholder="Insira o link da música."
                        value ={linkMusica} onChange={(e) => setLinkMusica(e.target.value)}/>
                    <br />
                    {/* <Label>Cifra:</Label>
                    <Input type="text" placeholder="Insira um contato do Levita." 
                        value ={cifraMusica} onChange={(e) => setCifraMusica(e.target.value)}/> */}

                </DialogHeader>
                <DialogFooter className=""> 
                    <Button className="hover:bg-emerald-500"
                        type="submit" onClick={() => {
                            fetch("http://localhost:1004/v1/musicas", {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                nome: nomeMusica,
                                link: linkMusica,
                                cifra: cifraMusica
                            })
                        }).then((res) => res.json())
                        .then(() => {props.bool = true})
                        // .then((data) => setCreatedMusic(data))
                        .catch((error) => {
                            console.error("Erro na comunicação com a api: ", error);
                        })
                        toast({title:"Música inserida com sucesso!"})
                        }}>Salvar</Button>
                    <Button className="hover:bg-rose-600/80">Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}