import { ReactElement, useEffect, useState } from "react";
import { convertDateFormat, Escala, EscalaResumida, Levita, RoleDTO, UserDTO } from "@/lib/apiObjects";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { VerEscala } from "./dialog-escala";
import { Badge } from "../ui/badge";
import { SidebarMenuButton } from "../ui/sidebar";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { ptBR, ro } from "date-fns/locale";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { deleteMethod, getMethod, patchMethod, postMethod, putMethod } from "@/lib/apiRequests";
import { toast } from "sonner";
import { ScrollArea } from "../ui/scroll-area";
import { DialogEditLevita, DialogVerLevita } from "./dialog-levita";
import { Eye, EyeOff, PencilLine, RectangleEllipsis, RefreshCcw, RefreshCw, Trash, Trash2 } from "lucide-react";
import { TooltipProvider, TooltipTrigger, Tooltip, TooltipContent } from "../ui/tooltip";
import Cookies from "js-cookie";
import { RadioGroup, RadioGroupItem } from "../ui/motion-radio-group";


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
        getMethod<EscalaResumida[] | undefined>("v1/escala/resumed", setEscala)
        getMethod<Levita[] | undefined>("v1/levita", setLevitas)
        setLoading(false);
    }, [escalas])

    useEffect(() => {
        setSpecial(escalas?.filter(escala => escala.especial))
    }, [escalas])

    return (
        <Dialog>
            <DialogTrigger asChild className={`${!escalas ? `text-zinc-500` : ``} w-full`} disabled={!escalas}>
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
                    <DialogDescription className="border-b-2 border-black/25">
                        {loading ? "Carregando..." : escalas ? "Escalas programadas para os próximos eventos especiais!" : "Erro ao carregar escalas"}
                    </DialogDescription>
                </DialogHeader>
                {/* Content aqui */}

                <div className={!escalas ? "" :
                    "grid grid-cols-2 gap-4"}>
                    {!escalas ? (
                        <div className="flex justify-center items-center h-32">
                            <p className="text-zinc-500">Nenhuma escala encontrada.</p>
                        </div>
                    ) : !special || special.length == 0 ? (
                        <div className="flex justify-center items-center h-32 col-span-2">
                            <p className="text-zinc-500">Nenhum evento especial encontrado.</p>
                        </div>
                    ) : (
                        Array.isArray(special) && special.map((escala) => (
                            <Card key={escala.id} className="col-span-1">
                                <CardHeader className="items-center lg:items-start">
                                    <CardTitle className={escala.domingo ? "text-primary" : escala.quarta ? "text-secondary" : "text-special"}>
                                        {escala.titulo}
                                    </CardTitle>
                                    <CardDescription>
                                        {convertDateFormat(escala.data)}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        <span className="text-special">Ministro:</span> <span className="text-primary">{escala.ministro}</span>
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
                        )))}
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
        getMethod<Date[] | undefined>(`v1/levita/agenda/${sessionStorage.getItem("levita")}`, setUserDates)
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
            `v1/levita/agenda/${sessionStorage.getItem("levita")}`,
            dataBody,
            setDates
        ).then(() => {
            setOpen(false)
            toast.info("Agenda atualizada com sucesso!")
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="w-full" disabled={!userDates}>
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
                                Selecione ao lado as datas que você não estará disponível,
                                seja por viagens, aniversários ou outros compromissos.
                            </p>
                            <p className="mt-2 flex justify-center text-center text-sm text-red-300">
                                Datas em que você já está em uma escala não podem ser removidas.
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
        getMethod<Escala[] | undefined>(`v1/escala?levita=${sessionStorage.getItem("levita")}`, setEscala)
        getMethod<Levita[] | undefined>("v1/levita", setLevitas)

        setLoading(false);
    }, [escalas])

    return (
        <Dialog>
            <DialogTrigger asChild className={`${!escalas ? `text-zinc-500` : ``} w-full`} disabled={!escalas}>
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
                        {loading ? "Carregando..." : escalas ? "Todas as suas escalas cadastradas abaixo" : "Erro ao carregar escalas"}
                    </DialogDescription>
                </DialogHeader>
                {/* Content aqui */}
                <div className={!escalas || escalas.length === 0 ? "" :
                    "grid grid-cols-2 gap-4"}>
                    {loading || !escalas ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="h-16 w-16 border-4 border-primary rounded-3xl animate-spin" />
                        </div>
                    ) : escalas.length === 0 ? (
                        <Card className="text-center">
                            <p className="p-6 sm:p-10 text-lg sm:text-xl text-zinc-400/80">
                                Você não está em nenhuma escala no momento.
                            </p>
                        </Card>
                    ) : Array.isArray(escalas) && escalas.map((escala) => (
                        <Card key={escala.id} className={`col-span-1 ${new Date(escala.data) < new Date() ? 'opacity-60 grayscale' : ''}`}>
                            <CardHeader className="items-center lg:items-start">
                                <CardTitle className={escala.domingo ? "text-primary" : escala.quarta ? "text-secondary" : "text-special"}>
                                    {escala.titulo}
                                </CardTitle>
                                {convertDateFormat(escala.data)}
                                <CardDescription>
                                    {escala.observacoes ?
                                        escala.observacoes.length > 43 ? escala.observacoes.substring(0, 40).trimEnd().concat("...") : escala.observacoes
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

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [self, setSelf] = useState<UserDTO | undefined>(undefined);
    const [currentLevita, setCurrentLevita] = useState<Levita | undefined>();

    const [seePass, setSeePass] = useState(false);

    const [username, setUsername] = useState(self?.username ?? "");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (self && currentLevita) return;
        getMethod<Levita | undefined>(`v1/levita/${sessionStorage.getItem("levita")}`, setCurrentLevita)
        getMethod<UserDTO | undefined>(`auth/user/active`, setSelf)
        setLoading(false);
    }, [self, currentLevita])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
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
                <Label>Usuário:</Label>
                <Input onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Insira seu usuário" />

                <Label>Senha:</Label>
                <div className="relative">
                    <Input onChange={(e) => setPassword(e.target.value)} value={password}
                        type={seePass ? "text" : "password"}
                        placeholder="Insira a Senha"
                    />
                    {seePass ? (
                        <span className="absolute inset-y-0 right-0 flex items-center justify-center pr-3 cursor-pointer">
                            <Eye
                                onClick={() => setSeePass(false)}
                                size={20}
                            />
                        </span>
                    ) : (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                            <EyeOff
                                onClick={() => setSeePass(true)}
                                size={20}
                            />
                        </span>
                    )}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Levita:
                        </CardTitle>
                        <CardDescription className="mb-0">
                            As suas informações como levita
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-1"><span className="text-subprimary">Nome:</span>{" " + currentLevita?.nome}</p>
                        <p className="mb-1"><span className="text-subprimary">Telefone:</span>{` ${currentLevita?.contato ?? "Nenhum telefone inserido."}`}</p>
                        <p className="mb-1"><span className="text-subprimary">Email:</span>{` ${currentLevita?.email ?? "Nenhum email inserido."}`}</p>
                        <p className="mb-1"><span className="text-subprimary">Descrição:</span>{` ${currentLevita?.descricao ?? "Nenhuma descrição inserida."}`}</p>
                        <p><span className="text-subprimary">Instrumentos:</span> <span>
                            {currentLevita?.instrumentos.map((instrumento) => (
                                <Badge key={instrumento.id} variant={"outline"} className="gap-1">{instrumento.nome}</Badge>
                            ))}
                        </span></p>
                    </CardContent>
                </Card>
                <DialogFooter>
                    <div className="flex flex-wrap justify-between w-full">
                        <div>
                            <TooltipProvider delayDuration={250}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {currentLevita ?
                                            <DialogEditLevita levita={currentLevita} />
                                            :
                                            <PencilLine className="outline rounded-lg p-1 size-auto outline-1 outline-secondary/25 hover:bg-destructive/50 cursor-pointer" />
                                        }
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Editar Levita
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="flex gap-2">
                            <Button className="hover:bg-emerald-500" onClick={() => {
                                if (password.length < 8) {
                                    toast.error("A senha deve ter pelo menos 8 caracteres.");
                                } if (username.length < 3) {
                                    toast.error("O nome de usuário deve ter pelo menos 3 caracteres.");
                                } if (currentLevita?.id == undefined) {
                                    toast.error("Selecione um levita para continuar.");
                                } if (self?.id == undefined || self?.role.id == undefined) {
                                    toast.error("Erro ao carregar informações do usuário.");
                                }
                                putMethod<UserDTO>("auth/user", {
                                    id: self?.id,
                                    role: self?.role.id,
                                    username: username,
                                    passcode: password,
                                    levitaId: currentLevita?.id
                                }, () => { }).then(() => {
                                    setOpen(false)
                                    toast.success("Usuário editado com sucesso!")
                                }).catch((error) => {
                                    toast.error("Erro na comunicação com a api: ", error);
                                    console.error("Erro na comunicação com a api: ", error);
                                })
                            }}>Salvar</Button>
                            <Button className="hover:bg-rose-600/80" onClick={() => setOpen(false)}>Cancelar</Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function SidebarAddUser({ icon, title, style }: SidebarModalsProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [levitas, setLevitas] = useState<Levita[] | undefined>(undefined);
    const [roles, setRoles] = useState<RoleDTO[] | undefined>(undefined);
    const [levitaToAdd, setLevitaToAdd] = useState<Levita | undefined>(undefined);
    const [open, setOpen] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState("levita");

    useEffect(() => {
        if (levitas) return;
        getMethod<Levita[] | undefined>("auth/user/levita-x", setLevitas)
        getMethod<RoleDTO[] | undefined>("auth/role", setRoles)
        setIsLoading(false);
    }, [levitas])

    const [isUserAdmin, setUserAdmin] = useState(false)

    useEffect(() => {
        const userAdmin = sessionStorage.getItem("role") === "ADMIN";
        setUserAdmin(userAdmin);
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className={"w-full text-green-600 hover:text-green-600"} disabled={!levitas}>
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
                    <DialogDescription className="border-b border-primary/25 grayscale">
                        Aqui você pode adicionar um novo usuário.
                    </DialogDescription>
                </DialogHeader>
                <Label>Usuário:</Label>
                <Input onChange={(e) => setUsername(e.target.value)} value={username} type="text"
                    placeholder="Insira o usuário que será usado para login." />
                <Label>Senha:</Label>
                <Input onChange={(e) => setPassword(e.target.value)} value={password} type="text"
                    placeholder="Insira a senha que será usada para login." className="mb-4" />

                <div className={isUserAdmin ? "" : "hidden"}>
                    <Label>Cargo:</Label>
                    <RadioGroup onValueChange={(value) => setSelectedRole(value)} className="flex gap-4 mb-2 justify-between mx-4">
                        {roles?.map((role) => (
                            <div className="flex items-center space-x-2" key={role.id}>
                                <RadioGroupItem id={role.id} value={role.id} disabled={isLoading} />
                                <Label htmlFor={role.role}>{role.role}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                <Label>Selecione o Levita que deseja associar ao login:</Label>
                <ScrollArea className="md:max-h-[35vh] w-full">
                    <Card className="bg-transparent grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
                        {isLoading || levitas == undefined ?
                            <div className="flex justify-center items-center h-40">
                                <div className="h-16 w-16 border-4 border-primary rounded-3xl animate-spin" />
                            </div>
                            :

                            levitas.map((levita) => (
                                <Button key={levita.id} variant={"outline"} type="submit"
                                    className={`p-2 rounded-lg m-2 ${levitaToAdd?.id == levita.id ? "bg-primary/80" : ""}`}
                                    onClick={() => setLevitaToAdd(levita)}>
                                    {levita.nome.split(" ").length > 1 ?
                                        levita.nome.split(" ")[0].concat(" ").concat(levita.nome.split(" ")[1].charAt(0)).concat(".") : levita.nome}</Button>
                            ))
                        }
                    </Card>
                </ScrollArea>

                <DialogFooter>
                    <Button onClick={() => {
                        postMethod<UserDTO>("auth/user", {
                            username: username,
                            passcode: password,
                            levitaId: levitaToAdd?.id
                        }, () => { }).then(() => {
                            setOpen(false)
                            toast.success("Usuário adicionado com sucesso!")
                        }).catch((error) => {
                            toast.error("Erro na comunicação com a api: ", error);
                            console.error("Erro na comunicação com a api: ", error);
                        })
                    }}>Adicionar</Button>
                    <Button onClick={() => setOpen(false)}>Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function SidebarManageUsers({ icon, title, style }: SidebarModalsProps) {
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState<UserDTO[] | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (users) return;
        getMethod<UserDTO[] | undefined>("auth/user", setUsers)
        setLoading(false);
    }, [users])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="w-full text-indigo-400 hover:text-indigo-400" disabled={!users}>
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
                        Gerencie os usuários do sistema.
                    </DialogDescription>
                </DialogHeader>
                {/* Content aqui */}
                <div className={!users ? "" : "grid grid-cols-3 gap-4"}>
                    {loading || !users ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="h-16 w-16 border-4 border-primary rounded-3xl animate-spin" />
                        </div>
                    ) : users.length === 0 ? (
                        <Card className="text-center">
                            <p className="p-6 sm:p-10 text-lg sm:text-2xl text-zinc-400/80">
                                Nenhum usuário cadastrado no momento.
                            </p>
                        </Card>
                    ) : Array.isArray(users) && users.map((user) => (
                        <Card key={user.id} className={`${Cookies.get("username") == user.username ? "border-special/30 bg-special/10 " : ""} col-span-1`}>
                            <CardHeader className="items-center lg:items-start">
                                <CardTitle className={Cookies.get("username") == user.username ? "text-special" : ""}>{user.username}</CardTitle>
                                <CardDescription>{user.role.role}</CardDescription>
                            </CardHeader>
                            {/* <CardContent>
                                {user.levita ?
                                    <>
                                        <p><span className="text-subprimary">Levita:</span> {user.levita.nome}</p>
                                        <p><span className="text-subprimary">Email:</span> {user.levita.email ?? "Nenhum email inserido."}</p>
                                        <p><span className="text-subprimary">Telefone:</span> {user.levita.contato ?? "Nenhum telefone inserido."}</p>
                                        <p><span className="text-subprimary">Descrição:</span> {user.levita.descricao ?? "Nenhuma descrição inserida."}</p>
                                        <p><span className="text-subprimary">Instrumentos:</span> <span>
                                            {user.levita.instrumentos.map((instrumento) => (
                                                <Badge key={instrumento.id} variant={"outline"} className="gap-1">{instrumento.nome}</Badge>
                                            ))}
                                        </span></p>
                                    </>
                                    :
                                    <p className="text-secondary">Nenhum levita associado.</p>
                                }
                            </CardContent> */}
                            <CardFooter className="flex items-center justify-between">
                                <div>
                                    {user.levita ?
                                        <DialogVerLevita levita={user.levita} disabled={false} />
                                        : <Button variant="outline" disabled className="text-secondary/50">Nenhum levita associado</Button>
                                    }
                                </div>
                                <div>
                                    {Cookies.get("username") != user.username ?
                                        <ConfirmationModal
                                            onConfirm={() => {
                                                deleteMethod(`auth/user/${user.id}`)
                                                    .catch((error) => {
                                                        toast.error("Erro ao remover usuário: ", error);
                                                        console.error("Erro ao remover usuário: ", error);
                                                    })
                                                    .then(() => {
                                                        toast.success("Usuário removido com sucesso!");
                                                        setUsers(users?.filter(u => u.id !== user.id));
                                                    })
                                            }}
                                            title={`Remover usuário: ${user.username}`}
                                            trigger={
                                                <Button variant={"destructive"}>
                                                    <Trash2 size={16} />
                                                </Button>
                                            }
                                            message={
                                                <p className="text-red-500 font-semibold text-center">
                                                    Você tem certeza que deseja remover este usuário? Esta ação não pode ser desfeita.
                                                </p>
                                            }
                                        />
                                        : <Button variant={"destructive"} className="grayscale border">
                                            <Trash2 size={16} />
                                        </Button>}
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <DialogFooter>
                    <Button variant={"outline"} onClick={() => setOpen(false)}>Fechar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function ConfirmationModal({ onConfirm, title, description, message, trigger, postConfirm }: {
    onConfirm: () => void;
    postConfirm?: () => void;
    title: string;
    description?: string;
    message?: string | ReactElement;
    trigger?: ReactElement;
}) {
    const [isOpen, setOpen] = useState(false);
    return (
        <Dialog open={isOpen} onOpenChange={() => setOpen(!isOpen)}>
            <DialogTrigger asChild>
                {trigger ? trigger
                    : <Button>
                        Trigger
                    </Button>
                }
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {message && typeof message !== "string" ? message
                    : <p className="font-semibold text-center">
                        {typeof message === "string" ? message
                            : "Você tem certeza que deseja continuar?"}
                    </p>}
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button className="hover:animate-pulse" onClick={() => {
                        onConfirm();
                        if (postConfirm) postConfirm();
                        setOpen(false);
                    }}>Confirmar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}   