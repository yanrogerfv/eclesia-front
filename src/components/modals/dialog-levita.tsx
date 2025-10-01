"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Church, PencilLine, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Levita, Instrumento } from "@/lib/apiObjects";
import { Checkbox } from "../ui/checkbox";
import { getMethod, postMethod } from "@/lib/apiRequests";
import { Textarea } from "../ui/textarea";
import Cookies from "js-cookie";
import { toast } from "sonner";

export function DialogVerLevita(props: {
    levita: Levita,
    disabled: boolean,
    setLevitas?: React.Dispatch<React.SetStateAction<Levita[] | undefined>>
}
) {

    const [levitaId, setLevitaId] = useState<string | null>();
    const [isUserAdmin, setIsUserAdmin] = useState(false);

    useEffect(() => {
        // This code now runs only on the client side, avoiding the ReferenceError
        const userAdmin = sessionStorage.getItem("role") === "ADMIN";
        setIsUserAdmin(userAdmin);
        setLevitaId(sessionStorage.getItem("levita"));
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild key={props.levita.nome} className="p-5">
                <Button variant={"outline"} disabled={props.disabled}
                    className={`flex items-center border justify-center ${Cookies.get("username") == props.levita.nome ? "border-special/30 bg-special/10 hover:bg-special/30" : ""}`}>Ver Levita</Button>
            </DialogTrigger>
            <DialogContent className={"w-[85%] max-h-[90vh] overflow-y-auto"}>
                <DialogHeader>
                    <DialogTitle className="text-primary">{props.levita.nome}</DialogTitle>
                    <DialogDescription className="flex border-b">
                        {props.levita.instrumentos.map(i => i.nome).join(" - ")}
                    </DialogDescription>
                </DialogHeader>
                <p className="text-colortext text-center">{props.levita.descricao ? props.levita.descricao : "Nenhuma descrição inserida para este levita."}</p>
                <DialogFooter className="w-full flex">
                    <div className="flex gap-4 w-full justify-end">
                        {levitaId === props.levita.id || isUserAdmin ?
                            <DialogEditLevita levita={props.levita} setLevitas={props.setLevitas} />
                            : <Church size={20} />}
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

interface DialogAddLevitaProps {
    disable?: boolean,
    setLevitas?: React.Dispatch<React.SetStateAction<Levita[] | undefined>>
}
export function DialogAddLevita({ disable, setLevitas }: DialogAddLevitaProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [allInstrumentos, setAllInstrumentos] = useState<Instrumento[] | undefined>(undefined);

    const [nomeLevita, setNomeLevita] = useState("");
    const [emailLevita, setEmailLevita] = useState("");
    const [contatoLevita, setTelLevita] = useState("");
    const [descricaoLevita, setDescLevita] = useState("");
    const [instrumentosLevita, setInstrumentos] = useState<Instrumento[]>([]);

    useEffect(() => {
        if (allInstrumentos) return;
        getMethod<Instrumento[] | undefined>("v1/instrumento", setAllInstrumentos)
    }, [])

    function addInstrumentoInFilter(instrumento: Instrumento) {
        setInstrumentos([...instrumentosLevita, instrumento])
    }
    function removeInstrumentoInFilter(instrumento: Instrumento) {
        setInstrumentos(instrumentosLevita.filter((currentInstrument) => currentInstrument.id !== instrumento.id))
    }

    const handleSubmitLevita = () => {
        setLoading(true)
        if (!nomeLevita || nomeLevita.length < 3) {
            toast.warning("Insira um nome válido para o Levita.")
            setLoading(false)
        } else if ((!emailLevita || emailLevita.length < 5) && (!contatoLevita || contatoLevita.length < 5)) {
            toast.warning("Insira um email e/ou contato válidos para o Levita.")
            setLoading(false)
        } else if (instrumentosLevita.length === 0) {
            toast.warning("Selecione pelo menos um instrumento.")
            setLoading(false)
        } else {
            postMethod("v1/levita", {
                nome: nomeLevita,
                email: emailLevita,
                contato: contatoLevita,
                descricao: descricaoLevita,
                instrumentos: instrumentosLevita.map((instrumento) => instrumento.id)
            }).finally(() => {
                toast.success("Levita adicionado com sucesso!")
                setLoading(false)
                setLevitas && setLevitas(undefined)
                setOpen(false)
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild disabled={disable}>
                <Button variant={"outline"} className="font-bold hover:text-emerald-500" onClick={() => setLoading(false)}>
                    <UserPlus className="text-emerald-500" />Adicionar Levita</Button>
            </DialogTrigger>
            <DialogContent className={"w-[85%] max-h-[90vh] overflow-y-auto"}>
                {isLoading ?
                    <div className="absolute w-full h-[85%] z-50 flex justify-center items-center">
                        <div className="h-16 w-16 border-4 border-subprimary rounded-3xl animate-spin" />
                    </div>
                    : <></>}
                <DialogHeader className={`${isLoading && "opacity-50"}`}>
                    <DialogTitle>
                        Adicionar Levita
                    </DialogTitle>
                    <DialogDescription className="grayscale border-b">
                        Preencha os campos abaixo para adicionar um novo Levita.
                    </DialogDescription>
                </DialogHeader>
                <div className={`grid grid-cols-1 gap-4 ${isLoading && "opacity-50"}`}>
                    <div>
                        <Label>Nome:</Label>
                        <Input type="text" placeholder="Insira o nome do Levita."
                            value={nomeLevita} onChange={(e) => setNomeLevita(e.target.value)} />
                    </div>
                    <div>
                        <Label>Email:</Label>
                        <Input type="email" placeholder="Insira um email do Levita."
                            value={emailLevita} onChange={(e) => setEmailLevita(e.target.value)} />
                    </div>
                    <div>
                        <Label>Telefone:</Label>
                        <Input type="tel" placeholder="Insira um contato do Levita."
                            value={contatoLevita} onChange={(e) => setTelLevita(e.target.value)} />
                    </div>
                    <div>
                        <Label>Instrumentos:</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto border p-2 rounded">
                            {allInstrumentos?.map((instrumento) => (
                                <div key={instrumento.id} className="flex items-center space-x-2">
                                    <Checkbox id={instrumento.nome} onClick={() => {
                                        if (instrumentosLevita.some((currentInstrument) => currentInstrument.id === instrumento.id)) {
                                            removeInstrumentoInFilter(instrumento)
                                        } else {
                                            addInstrumentoInFilter(instrumento)
                                        }
                                    }} />
                                    <Label htmlFor={instrumento.nome}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >{instrumento.nome}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Label>Descrição:</Label>
                        <Textarea placeholder="Insira uma descrição do Levita." onChange={(e) => setDescLevita(e.target.value)} />
                    </div>
                </div>
                <DialogFooter className={`gap-4 ${isLoading && "opacity-50"}`}>
                    <Button className="hover:bg-rose-600 bg-red-600" disabled={isLoading} onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button className="hover:bg-emerald-500 bg-green-600" disabled={isLoading} type="submit" onClick={() => {
                        handleSubmitLevita()
                    }}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

interface DialogEditLevitaProps {
    levita: Levita
    setLevitas?: React.Dispatch<React.SetStateAction<Levita[] | undefined>>
}
export function DialogEditLevita({ levita, setLevitas }: DialogEditLevitaProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [allInstrumentos, setAllInstrumentos] = useState<Instrumento[] | undefined>(undefined);

    const [nomeLevita, setNomeLevita] = useState(levita.nome || "");
    const [emailLevita, setEmailLevita] = useState(levita.email || "");
    const [contatoLevita, setContatoLevita] = useState(levita.contato || "");
    const [descricaoLevita, setDescricaoLevita] = useState(levita.descricao || "");
    const [instrumentosLevita, setInstrumentos] = useState<Instrumento[]>(levita.instrumentos || []);
    function addInstrumentoInFilter(instrumento: Instrumento) {
        setInstrumentos([...instrumentosLevita, instrumento])
    }
    function removeInstrumentoInFilter(instrumento: Instrumento) {
        setInstrumentos(instrumentosLevita.filter((currentInstrument) => currentInstrument.id !== instrumento.id))
    }

    useEffect(() => {
        if (allInstrumentos) return;
        getMethod<Instrumento[] | undefined>("v1/instrumento", setAllInstrumentos)
    }, [])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <PencilLine className="outline rounded-lg p-1 size-auto justify-end outline-1 outline-secondary/25 hover:bg-secondary cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="w-[85%] max-h-[90vh] overflow-y-auto">
                {isLoading ?
                    <div className="absolute w-full h-[85%] z-50 flex justify-center items-center">
                        <div className="h-16 w-16 border-4 border-subprimary rounded-3xl animate-spin" />
                    </div>
                    : <></>}
                <DialogHeader>
                    <DialogTitle>Editar Levita</DialogTitle>
                    <DialogDescription>
                        Alterando os dados de {levita.nome}.
                    </DialogDescription>
                </DialogHeader>

                <div className={`grid grid-cols-1 gap-4 ${isLoading && "opacity-50"}`}>
                    <div>
                        <Label>Nome:</Label>
                        <Input type="text" placeholder="Insira o nome do Levita." disabled={isLoading}
                            value={nomeLevita ? nomeLevita : undefined} onChange={(e) => setNomeLevita(e.target.value)} />
                    </div>
                    <div>
                        <Label>Email:</Label>
                        <Input type="email" placeholder="Insira um email do Levita." disabled={isLoading}
                            value={emailLevita ? emailLevita : undefined} onChange={(e) => setEmailLevita(e.target.value)} />
                    </div>
                    <div>
                        <Label>Telefone:</Label>
                        <Input type="tel" placeholder="Insira um contato do Levita." disabled={isLoading}
                            value={contatoLevita ? contatoLevita : undefined} onChange={(e) => setContatoLevita(e.target.value)} />
                    </div>
                    <div>
                        <Label>Instrumentos:</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto border p-2 rounded">
                            {allInstrumentos?.map((instrumento) => (
                                <div key={instrumento.id} className="flex items-center space-x-2">
                                    <Checkbox id={instrumento.nome} checked={instrumentosLevita.some((currentInstrument) => currentInstrument.id === instrumento.id)} disabled={isLoading}
                                        onClick={() => {
                                            if (instrumentosLevita.some((currentInstrument) => currentInstrument.id === instrumento.id)) {
                                                removeInstrumentoInFilter(instrumento)
                                            } else {
                                                addInstrumentoInFilter(instrumento)
                                            }
                                        }} />
                                    <Label htmlFor={instrumento.nome}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >{instrumento.nome}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Label>Descrição:</Label>
                    <Textarea placeholder={levita.descricao ? levita.descricao : "Insira uma descrição do Levita."} onChange={(e) => setDescricaoLevita(e.target.value)}
                        value={descricaoLevita || undefined} disabled={isLoading} />
                </div>

                <DialogFooter className={`gap-4 ${isLoading && "opacity-50"}`}>
                    <Button className="hover:bg-rose-600 bg-red-600" disabled={isLoading} onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button className="hover:bg-emerald-500 bg-green-600" disabled={isLoading} type="submit" onClick={() => {
                        setLoading(true)
                        postMethod("v1/levita", {
                            id: levita.id,
                            nome: nomeLevita,
                            email: emailLevita,
                            contato: contatoLevita,
                            descricao: descricaoLevita,
                            instrumentos: instrumentosLevita.map((instrumento) => instrumento.id)
                        }).catch((error) => {
                            console.error("Erro na comunicação com a api: ", error);
                            toast.error("Erro ao editar Levita.")
                        }).finally(() => {
                            toast.success("Levita editado com sucesso!")
                            setLoading(false)
                            setLevitas && setLevitas(undefined)
                            window.location.reload();
                            setOpen(false)
                        })
                    }}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}