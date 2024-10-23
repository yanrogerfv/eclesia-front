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
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Escala, convertDateFormat } from "./apiObjects";
import { Button } from "./ui/button";
import { PencilLine } from "lucide-react";


export function  DialogEscala(escala: Escala) {
    return (
        <Dialog>
            <DialogTrigger asChild key={escala.id} className="p-5">
                <Button variant={"outline"} className="flex items-center justify-center">Ver Escala</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{escala.titulo}</DialogTitle>
                    <DialogDescription>
                        {convertDateFormat(escala.data)}
                    </DialogDescription>
                    <br />
                    <p className="text-teal-400">Ministro: </p><p className="text-emerald-400">{escala.ministro.nome}</p>
                    <p className="text-teal-400">Violão: </p>{escala.violao ? escala.violao.nome : <p className="text-zinc-50/50">Não inserido.</p>}
                    <p className="text-teal-400">Teclado: </p>{escala.teclado ? escala.teclado.nome : <p className="text-zinc-50/50">Não inserido.</p>}
                    <p className="text-teal-400">Bateria: </p>{escala.bateria ? escala.bateria.nome : <p className="text-zinc-50/50">Não inserido.</p>}
                    <p className="text-teal-400">Baixo: </p>{escala.baixo ? escala.baixo.nome : <p className="text-zinc-50/50">Não inserido.</p>}
                    <p className="text-teal-400">Guitarra: </p>{escala.guitarra ? escala.guitarra.nome : <p className="text-zinc-50/50">Não inserido.</p>}
                    <p className="text-teal-400">Backs: </p><br />
                    {
                        escala.back.length > 0 ?
                            escala.back.map(backLevita => (
                                <a>{backLevita.nome} </a>
                            )) : <a className="text-zinc-50/50">Não inserido.</a>
                    }
                    <br />

                </DialogHeader>
                <p className="text-foreground/25">Descrição</p>
                <DialogFooter>
                    <Button><PencilLine />Editar Escala</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

/*export function DialogAddLevita() {
    var levita : Levita;
    const [nomeLevita, setNomeLevita] = useState("");
    const handleNome = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNomeLevita(event.target.value);
    };
    const [emailLevita, setEmailLevita] = useState("");
    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailLevita(event.target.value);
    };
    const [telLevita, setTelLevita] = useState("");
    const handleTel = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelLevita(event.target.value);
    };
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
                    <Input type="text" placeholder="Insira o nome do Levita."
                        value ={nomeLevita} onChange={handleNome}/>
                    <br />
                    <Label>Email:</Label>
                    <Input type="email" placeholder="Insira um email do Levita."
                        value ={emailLevita} onChange={handleEmail}/>
                    <br />
                    <Label>Telefone:</Label>
                    <Input type="tel" placeholder="Insira um contato do Levita." 
                        value ={telLevita} onChange={handleTel}/>

                </DialogHeader>
                <DialogFooter className="">
                    <Button type="submit">Salvar</Button>
                    <Button>Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}*/