import { ReactElement, useEffect, useState } from "react";
import { convertDateFormat, Escala, EscalaResumida, Levita } from "../apiObjects";
import { getMethod } from "../apiRequests";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import Cookies from "js-cookie";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { DialogVerEscala } from "./dialog-escala";
import { Badge } from "../ui/badge";
import { SidebarMenuButton } from "../ui/sidebar";

interface SidebarModalsProps {
    icon: ReactElement,
    title: string,
    style?: string
}

export function SidebarNextEvents({ icon, title, style }: SidebarModalsProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [escalas, setEscala] = useState<EscalaResumida[] | undefined>(undefined);
    const [levitas, setLevitas] = useState<Levita[] | undefined>(undefined);

    const [special, setSpecial] = useState<EscalaResumida[] | undefined>(undefined);

    useEffect(() => {
        if (escalas) return;
        setLoading(true);
        getMethod<EscalaResumida[]>(`escala/resumed`, setEscala)
        getMethod<Levita[]>(`levita`, setLevitas)
        setLoading(false);
    }, [escalas])

    useEffect(() => {
        setSpecial(escalas?.filter(escala => escala.especial))
    }, [escalas])

    return (
        <Dialog>
            <DialogTrigger className={`${!escalas ? `text-zinc-500` : ``} w-full`} disabled={!escalas}>
                <SidebarMenuButton>
                    {icon}
                    <span>{title}</span>
                </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent className="max-h-[70vh] max-w-[40vw] overflow-y-auto ">
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {loading ? "Carregando..." : escalas ? "Escala carregada" : "Erro ao carregar escala"}
                    </DialogDescription>
                </DialogHeader>
                {/* Content aqui */}

                <div className={!escalas ? "" :
                    "grid grid-cols-2 gap-4"}>
                    {Array.isArray(special) && special.map((escala) => (
                        <Card key={escala.id} className="col-span-1">
                            <CardHeader className="items-center lg:items-start">
                                <CardTitle className={escala.domingo ? "text-primary" : escala.quarta ? "text-secondary" : "text-special"}>
                                    {escala.titulo}
                                </CardTitle>
                                {convertDateFormat(escala.data)}
                                <CardDescription>
                                    {escala.observacoes ?
                                        // {escala.observacoes.length > 0
                                        // ? escala.observacoes.length > 30
                                        // ? escala.observacoes.substring(0, 28).trimEnd().concat("...")
                                        escala.observacoes
                                        : "Sem observações."}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    <span className="text-subprimary">Ministro:</span> <span className="text-secondary">{escala.ministro}</span>
                                </p>
                                <p>
                                    <span className="text-subprimary">Violão:</span> {escala.violao ? escala.violao : <span className="text-secondary/40">Não inserido.</span>}
                                </p>
                                <p>
                                    <span className="text-subprimary">Teclado:</span> {escala.teclado ? escala.teclado : <span className="text-secondary/40">Não inserido.</span>}
                                </p>
                                <p>
                                    <span className="text-subprimary">Bateria:</span> {escala.bateria ? escala.bateria : <span className="text-secondary/40">Não inserido.</span>}
                                </p>
                                <p>
                                    <span className="text-subprimary">Baixo:</span> {escala.baixo ? escala.baixo : <span className="text-secondary/40">Não inserido.</span>}
                                </p>
                                <p>
                                    <span className="text-subprimary">Guitarra:</span> {escala.guitarra ? escala.guitarra : <span className="text-secondary/40">Não inserido.</span>}
                                </p>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between">
                                <div>
                                    {escala.domingo ? (
                                        <Badge className="bg-primary/80 hover:bg-primary/60 cursor-default">Domingo</Badge>
                                    ) : escala.quarta ? (
                                        <Badge className="bg-secondary/80 hover:bg-secondary/60 cursor-default">Quarta</Badge>
                                    ) : (
                                        <Badge className="bg-special/80 hover:bg-special/60 cursor-default">Especial</Badge>
                                    )}
                                </div>
                                <div>
                                    <DialogVerEscala escalaId={escala.id} levitasDisponiveis={levitas} />
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <DialogFooter>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function SidebarMyAgenda({ icon, title, style }: SidebarModalsProps) {

    return (
        <Dialog>
            <DialogTrigger className="w-full">
                <SidebarMenuButton>
                    {icon}
                    {title}
                </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent className="max-h-[70vh] max-w-[40vw] overflow-y-auto ">
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                {/* Content aqui */}
            </DialogContent>
        </Dialog>
    )
}

export function SidebarMyEscalas({ icon, title, style }: SidebarModalsProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [escalas, setEscala] = useState<Escala[] | undefined>(undefined);
    const [levitas, setLevitas] = useState<Levita[] | undefined>(undefined);

    useEffect(() => {
        if (escalas) return;
        setLoading(true);
        getMethod<Escala[]>(`escala?levita=${sessionStorage.getItem("levita")}`, setEscala)
        getMethod<Levita[]>(`levita`, setLevitas)

        setLoading(false);
    }, [escalas])

    return (
        <Dialog>
            <DialogTrigger className={`${!escalas ? `text-zinc-500` : ``} w-full`} disabled={!escalas}>
                <SidebarMenuButton>
                    <span className={`${!escalas ? `hidden` : ``} ${!escalas?.some(escala => {
                        const escalaDate = new Date(escala.data);
                        const today = new Date();
                        const sevenDaysFromNow = new Date();
                        sevenDaysFromNow.setDate(today.getDate() + 7);
                        return escalaDate >= today && escalaDate <= sevenDaysFromNow;
                    }) ? 'hidden' : ''} absolute inline-flex [animation-time:3s] top-1 left-5 size-2 bg-special rounded-full`}>
                        <span className="size-2 animate-ping rounded-full bg-special opacity-75" />
                    </span>
                    {icon}
                    {title}
                </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent className="max-h-[70vh] max-w-[40vw] overflow-y-auto ">
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription> 
                        {loading ? "Carregando..." : escalas ? "Escala carregada" : "Erro ao carregar escala"}
                    </DialogDescription>
                </DialogHeader>
                {/* Content aqui */}

                <div className={!escalas ? "" :
                    "grid grid-cols-2 gap-4"}>
                    {Array.isArray(escalas) && escalas.map((escala) => (
                        <Card key={escala.id} className={`col-span-1 ${new Date(escala.data) < new Date() ? 'opacity-60 grayscale' : ''}`}>
                            <CardHeader className="items-center lg:items-start">
                                <CardTitle className={escala.domingo ? "text-primary" : escala.quarta ? "text-secondary" : "text-special"}>
                                    {escala.titulo}
                                </CardTitle>
                                {convertDateFormat(escala.data)}
                                <CardDescription>
                                    {escala.observacoes ?
                                        // {escala.observacoes.length > 0
                                        // ? escala.observacoes.length > 30
                                        // ? escala.observacoes.substring(0, 28).trimEnd().concat("...")
                                        escala.observacoes
                                        : "Sem observações."}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p><span className="text-subprimary">Ministro:</span> <span className="text-secondary">{escala.ministro.nome}</span></p>
                                <p><span className="text-subprimary">Violão:</span> {escala.violao ? escala.violao.nome : <span className="text-secondary/40">Não inserido.</span>}</p>
                                <p><span className="text-subprimary">Teclado:</span> {escala.teclado ? escala.teclado.nome : <span className="text-secondary/40">Não inserido.</span>}</p>
                                <p><span className="text-subprimary">Bateria:</span> {escala.bateria ? escala.bateria.nome : <span className="text-secondary/40">Não inserido.</span>}</p>
                                <p><span className="text-subprimary">Baixo:</span> {escala.baixo ? escala.baixo.nome : <span className="text-secondary/40">Não inserido.</span>}</p>
                                <p><span className="text-subprimary">Guitarra:</span> {escala.guitarra ? escala.guitarra.nome : <span className="text-secondary/40">Não inserido.</span>}</p>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between">
                                <div>
                                    {escala.domingo ? (
                                        <Badge className="bg-primary/80 hover:bg-primary/60 cursor-default">Domingo</Badge>
                                    ) : escala.quarta ? (
                                        <Badge className="bg-secondary/80 hover:bg-secondary/60 cursor-default">Quarta</Badge>
                                    ) : (
                                        <Badge className="bg-special/80 hover:bg-special/60 cursor-default">Especial</Badge>
                                    )}
                                </div>
                                <div>
                                    <DialogVerEscala escalaId={escala.id} levitasDisponiveis={levitas} />
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <DialogFooter>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}