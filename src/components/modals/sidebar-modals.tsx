import { ReactElement, useEffect, useState } from "react";
import { convertDateFormat, Escala, EscalaResumida, Levita } from "@/lib/apiObjects";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { VerEscala } from "./dialog-escala";
import { Badge } from "../ui/badge";
import { SidebarMenuButton } from "../ui/sidebar";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { ptBR } from "date-fns/locale";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { getMethod, postMethod } from "@/lib/apiRequests";

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
        getMethod<EscalaResumida[] | undefined>(`escala/resumed`, setEscala)
        getMethod<Levita[] | undefined>(`levita`, setLevitas)
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
                                    <VerEscala escalaId={escala.id} levitasDisponiveis={levitas} />
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
    const [userDates, setUserDates] = useState<Date[] | undefined>(undefined);
    const [dates, setDates] = useState<Date[] | undefined>(undefined);
    const [open, setOpen] = useState(false);

    /* Sorting of dates for better organization when sending to backend */
    useEffect(() => {
        setDates(dates?.sort((a, b) => a.getTime() - b.getTime()))
    }, [dates])

    /* Used to fetch the current agenda of logged user */
    useEffect(() => {
        if (userDates !== undefined) return;
        getMethod<Date[] | undefined>(`levita/agenda/${sessionStorage.getItem("levita")}`, setUserDates)
    }, [userDates])

    /* Setter of dates from the data fetched */
    useEffect(() => {
        const aux = userDates?.map(date => new Date(date))
        setDates(aux?.map(date => new Date(date.getTime() + 1000 * 60 * 60 * 3)))
    }, [userDates])

    /* Function to post the agenda of the logged user to backend */
    const postAgenda = () => {
        const dataBody = dates
            ? dates
                .filter(date => date >= new Date(Date.now() - 1000 * 60 * 60 * 24))
                .map(date => date.toISOString().split("T")[0])
            : []
        postMethod<Date[] | undefined>(
            `levita/agenda/${sessionStorage.getItem("levita")}`,
            dataBody,
            setDates
        ).then(() => {
            setOpen(false)
            alert("Agenda atualizada com sucesso!")
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="w-full" disabled={!userDates}>
                <SidebarMenuButton>
                    {icon}
                    {title}
                </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent className="max-h-[70vh] max-w-[36vw] overflow-y-auto ">
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                {/* Content aqui */}
                <div className="grid grid-cols-1 lg:flex lg:justify-between">
                    <Calendar
                        lang="pt-BR"
                        locale={ptBR}
                        title="Agenda"
                        mode="multiple"
                        selected={dates}
                        onSelect={setDates}
                        disabled={(data) => data < new Date(Date.now() - 1000 * 60 * 60 * 24)}
                        className="border rounded-lg w-fit p-2 m-2"
                    />
                    <Card className="w-full p-2 m-2 justify-center">
                        <CardHeader className="text-2xl flex justify-center font-semibold">
                            <CardTitle className="flex justify-center">
                                Agenda
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="justify-center">
                            <p className="flex justify-center text-center">
                                Selecione ao lado as datas que você não estará disponível para ser escalado,
                                seja por viagens, aniversários, compromissos, etc.
                            </p>
                            <p className="mt-2 flex justify-center text-center text-sm text-red-300">
                                Datas que você já foi escalado não podem ser removidas.
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-center bottom-0">
                            <Button
                                variant="outline"
                                className="border rounded-lg"
                                onClick={() => postAgenda()}
                            >Confirmar agenda</Button>
                        </CardFooter>
                    </Card>
                </div>
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
        getMethod<Escala[] | undefined>(`escala?levita=${sessionStorage.getItem("levita")}`, setEscala)
        getMethod<Levita[] | undefined>(`levita`, setLevitas)

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
                        {loading ? "Carregando..." : escalas ? "Todas as suas escalas cadastradas abaixo" : "Erro ao carregar escala"}
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
                                    <VerEscala escalaId={escala.id} levitasDisponiveis={levitas} />
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

export function SidebarMyProfile({ icon, title, style }: SidebarModalsProps) {
    return (
        <Dialog>
            <DialogTrigger>
                <SidebarMenuButton>
                    {icon}
                    {title}
                </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        Aqui você pode visualizar e editar suas informações.
                    </DialogDescription>
                </DialogHeader>
                {/* Content aqui */}
            </DialogContent>
        </Dialog>
    )
}

export function SidebarAddUser({ icon, title, style }: SidebarModalsProps) {
    const [isLoading, setIsLoading] = useState(true);
    // const [toDisable, setDisabled] = useState(false);
    const [levitas, setLevitas] = useState<Levita[] | undefined>([]);

    const toDisable = isLoading || levitas == undefined || levitas.length == 0;

    useEffect(() => {
        if (levitas) return;
        setIsLoading(true);
        getMethod<Levita[] | undefined>(`auth/user/levita-x`, setLevitas)
        setIsLoading(false);
    }, [levitas])

    return (
        <Dialog>
            <DialogTrigger className={"w-full " + toDisable ? "cursor-not-allowed": ""} disabled={toDisable}>
                <SidebarMenuButton disabled={toDisable}>
                    {icon}
                    {title}
                </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        Aqui você pode adicionar um novo usuário.
                    </DialogDescription>
                </DialogHeader>
                <Label>Usuário</Label>
                <Input inert placeholder="Insira o usuário que será usado para login." />
                <Label>Senha</Label>
                <Input placeholder="Insira a senha que será usada para login." />

                <Label>Selecione o Levita que deseja associar a conta:</Label>
                <Card className="bg-transparent grid grid-cols-4">
                    {isLoading || levitas == undefined ?
                        <div className="flex justify-center items-center h-40">
                            <div className="h-16 w-16 border-4 border-primary rounded-3xl animate-spin" />
                        </div>
                        : levitas.map((levita) => (
                            <Button key={levita.id} variant={"outline"} type="submit"
                                className={"p-2 rounded-lg m-2"}
                                onClick={() => { }}>{levita.nome}</Button>
                        ))}
                </Card>

                <DialogFooter>
                    <Button>Adicionar</Button>
                    <Button>Cancelar</Button>
                </DialogFooter>
                {/* Content aqui */}
            </DialogContent>
        </Dialog>
    )
}