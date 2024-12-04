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
import { Escala, Levita, Musica, convertDateFormat } from "../apiObjects";
import { Button } from "../ui/button";
import { CirclePlus, PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { randomUUID, UUID } from "crypto";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { Card } from "../ui/card";

interface props {
    escalaId: UUID,
    levitasDisponiveis: Levita[]
}

export function DialogVerEscala(props: props) {
    const [escalaData, setEscalaData] = useState<Escala>()
    const [isLoading, setIsLoading] = useState(true)
    const [backs, setBacks] = useState<string>("")
    useEffect(() => {
        // setIsLoading(true)
        fetch(`http://localhost:1004/v1/escala/${props.escalaId}`)
            .then((res) => res.json())
            .then((data) => {
                setIsLoading(false)
                setEscalaData(data)
            })
            .catch((error) => {
                console.error("Erro na comunicação com a api: ", error)
                setEscalaData(undefined);
            })
    }, [])

    // const backs = escalaData?.back.map((back) => (back.nome)).join(", ")

    return (
        !isLoading && escalaData && props.levitasDisponiveis.length > 0 ?

            <Dialog>
                <DialogTrigger asChild key={escalaData.id} className="p-5">
                    <Button variant={"outline"} className="flex items-center justify-center">Ver Escala</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className={"text-2xl " + (escalaData.domingo ? "text-teal-400/80" :
                            escalaData.quarta ? "text-emerald-400/80" : "text-sky-400/80"
                        )}>{escalaData.titulo}</DialogTitle>
                        <DialogDescription className="border-b border-zinc-600">
                            {convertDateFormat(escalaData.data)}
                        </DialogDescription>
                        <br />
                        <p className="text-teal-400">Ministro: <a className="text-emerald-400">{escalaData.ministro.nome}</a></p>
                        <p className="text-teal-400">Violão: {escalaData.violao ? <a className="text-white"> {escalaData.violao.nome}</a> : <a className="text-zinc-50/50">Não inserido.</a>}</p>
                        <p className="text-teal-400">Teclado: {escalaData.teclado ? <a className="text-white"> {escalaData.teclado.nome}</a> : <a className="text-zinc-50/50">Não inserido.</a>}</p>
                        <p className="text-teal-400">Bateria: {escalaData.bateria ? <a className="text-white"> {escalaData.bateria.nome}</a> : <a className="text-zinc-50/50">Não inserido.</a>}</p>
                        <p className="text-teal-400">Baixo: {escalaData.baixo ? <a className="text-white"> {escalaData.baixo.nome}</a> : <a className="text-zinc-50/50">Não inserido.</a>}</p>
                        <p className="text-teal-400">Guitarra: {escalaData.guitarra ? <a className="text-white"> {escalaData.guitarra.nome}</a> : <a className="text-zinc-50/50">Não inserido.</a>}</p>
                        <p className="text-teal-400">Backs: {escalaData.back.length > 0 ? <a className="text-white"> {
                            escalaData.back.map((back) => (back.nome)).join(", ")}.</a> : <a className="text-zinc-50/50">Não inseridos.</a>}</p>
                        <br />

                    </DialogHeader>
                    <Label>Observações:</Label>
                    {escalaData.observacoes ? <p className="text-zinc-200">{escalaData.observacoes}</p> : <p className="text-foreground/25">Nenhuma observação.</p>}
                    <br />

                    <Label>Músicas:</Label>
                    <Card className="bg-transparent grid-flow-row p-2">
                        {escalaData.musicas ?
                            escalaData.musicas.map((musica) => (
                                <Button key={musica.id} variant={"outline"} className="p-2 rounded-lg m-2">{musica.nome}</Button>
                            )) : <p className="text-foreground/25">Nenhuma música inserida.</p>}
                    </Card>
                    <DialogFooter>
                        <DialogAddMusicaInEscala escalaId={escalaData.id}/>
                        <DialogAddEditEscala isEdit={true} escala={escalaData} levitasDisponiveis={props.levitasDisponiveis} />
                    </DialogFooter>
                </DialogContent>
            </Dialog> : <Button variant={"outline"} disabled={true} className="flex items-center justify-center">Ver Escala</Button>
    )
}

export function listBacks(backs: Levita[]) {
    const backNames = new Array<string>();
    backs.forEach((back) => {
        backNames.push(back.nome)
    })

    return String(backNames.join(", "))
}

interface addEditDialogProps {
    isEdit: boolean,
    escala: Escala | undefined,
    levitasDisponiveis: Levita[];
}

export function DialogAddEditEscala(pp: addEditDialogProps) {
    const [escala, setEscala] = useState<Escala>()
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const levitasDisponiveis = pp.levitasDisponiveis;
    const [data, setData] = useState("");
    const [titulo, setTitulo] = useState("");
    const [ministro, setMinistro] = useState("");
    const [baixo, setBaixo] = useState("");
    const [bateria, setBateria] = useState("");
    const [guitarra, setGuitarra] = useState("");
    const [teclado, setTeclado] = useState("");
    const [violao, setViolao] = useState("");
    const [backs, setBacks] = useState<String[]>([]);
    const [observacao, setObservacao] = useState("");

    function filterByInstrumento(instrumentoId: number) {
        return levitasDisponiveis.filter((levita) => levita.instrumentos.some((instrumento) => instrumento.id == instrumentoId))
    }

    // useEffect(() => {
    //     fetch("http://localhost:1004/v1/levita/resumed")
    //         .then((res) => res.json()).then((data) => {
    //             set (false)
    //             setLevitasDisponiveis(data)
    //         }).catch((error) => {
    //             console.error("Erro na comunicação com a api: ", error)
    //             setLevitasDisponiveis([])
    //         })
    // })
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {pp.isEdit ? <Button><PencilLine />Editar Escala</Button>
                    : <Button variant={"outline"} className="mx-2 hover:text-emerald-500">
                        <CirclePlus className="mx-1 text-emerald-500" />Criar Escala</Button>
                }
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>{pp.isEdit ? "Editando uma Escala" : "Criando uma Escala"}</DialogTitle>
                    <DialogDescription>
                        {pp.isEdit ? `Editando a escala ${pp.escala?.titulo}` : "Adicione uma nova escala ao planejador."}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[47dvh]">
                    <Label>Título:</Label>
                    <Input type="text" placeholder="Insira um título para a Escala."
                        value={pp.escala?.titulo} onChange={(e) => setTitulo(e.target.value)} />
                    <Label>Data:</Label>
                    <Input type="date" placeholder="Data."
                        value={pp.escala ? pp.escala.data.toString() : undefined} onChange={(e) => setData(e.target.value)} />
                    <br />

                    <Label>Ministro</Label>
                    <Select onValueChange={(value) => setMinistro(value)} disabled={pp.escala?.data.toString().length == 0}>
                        <SelectTrigger>
                            <SelectValue placeholder={pp.isEdit ? pp.escala?.ministro.nome : "Selecione um ministro."} />
                        </SelectTrigger>
                        <SelectContent>
                            {levitasDisponiveis.map((levita) => (
                                <SelectItem value={levita.id} key={levita.id} onSelect={() => setMinistro(levita.nome)}>{levita.nome}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <br />

                    <Label>Violão</Label>
                    <Select onValueChange={(value) => setViolao(value)} disabled={pp.escala?.data.toString().length == 0}>
                        <SelectTrigger>
                            <SelectValue className={pp.escala?.violao ? "text-white" : "text-zinc-50/50"}
                                placeholder={pp.escala?.violao ? pp.escala.violao.nome : "Escolha um levita para tocar violão."} />
                        </SelectTrigger>
                        <SelectContent>
                            {filterByInstrumento(1).map((levita) => (
                                <SelectItem value={levita.id} key={levita.id} onSelect={() => setViolao(levita.id)}>{levita.nome}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <br />

                    <Label>Teclado</Label>
                    <Select onValueChange={(value) => setTeclado(value)} disabled={pp.escala?.data.toString().length == 0}>
                        <SelectTrigger>
                            <SelectValue className={pp.escala?.teclado ? "text-white" : "text-zinc-50/50"}
                                placeholder={pp.escala?.teclado ? pp.escala.teclado.nome : "Escolha um levita para tocar teclado."} />
                        </SelectTrigger>
                        <SelectContent>
                            {filterByInstrumento(2).map((levita) => (
                                <SelectItem value={levita.id} key={levita.id} onSelect={() => setTeclado(levita.id)}>{levita.nome}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <br />

                    <Label>Bateria</Label>
                    <Select onValueChange={(value) => setBateria(value)} disabled={pp.escala?.data.toString().length == 0}>
                        <SelectTrigger>
                            <SelectValue className={pp.escala?.bateria ? "text-white" : "text-zinc-50/50"}
                                placeholder={pp.escala?.bateria ? pp.escala.bateria.nome : "Escolha um levita para tocar bateria."} />
                        </SelectTrigger>
                        <SelectContent>
                            {filterByInstrumento(3).map((levita) => (
                                <SelectItem value={levita.id} key={levita.id} onSelect={() => setBateria(levita.id)}>{levita.nome}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <br />

                    <Label>Baixo</Label>
                    <Select onValueChange={(value) => setBaixo(value)} disabled={pp.escala?.data.toString().length == 0}>
                        <SelectTrigger>
                            <SelectValue className={pp.escala?.baixo ? "text-white" : "text-zinc-50/50"}
                                placeholder={pp.escala?.baixo ? pp.escala.baixo.nome : "Escolha um levita para tocar baixo."} />
                        </SelectTrigger>
                        <SelectContent>
                            {filterByInstrumento(4).map((levita) => (
                                <SelectItem value={levita.id} key={levita.id} onSelect={() => setBaixo(levita.id)}>{levita.nome}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <br />

                    <Label>Guitarra</Label>
                    <Select onValueChange={(value) => setGuitarra(value)} disabled={pp.escala?.data.toString().length == 0}>
                        <SelectTrigger>
                            <SelectValue className={pp.escala?.guitarra ? "text-white" : "text-zinc-50/50"}
                                placeholder={pp.escala?.guitarra ? pp.escala.guitarra.nome : "Escolha um levita para tocar guitarra."} />
                        </SelectTrigger>
                        <SelectContent>
                            {filterByInstrumento(5).map((levita) => (
                                <SelectItem value={levita.id} key={levita.id} onSelect={() => setGuitarra(levita.id)}>{levita.nome}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <br />

                    <Label>Observação:</Label>
                    <Textarea placeholder="Insira uma observação. (Ex: Dia e hora de ensaio, local de apresentação, etc.)"
                        value={pp.escala?.observacoes} onChange={(e) => setObservacao(e.target.value)} />
                    <br />

                    <Label>Backs:</Label>
                    <Card className="bg-transparent grid grid-cols-4">
                        {filterByInstrumento(0).map((levita) => (
                            <Button key={levita.id} variant={"outline"} type="submit" className="p-2 rounded-lg m-2"
                                onClick={() => setBacks([...backs, levita.id])}>{levita.nome}</Button>
                        ))}
                    </Card>
                    <br />

                </ScrollArea>
                <DialogFooter>
                    <Button className="hover:bg-emerald-500" onClick={() => {
                        setIsLoading(true)
                        pp.isEdit ? escala ?
                            fetch("http://localhost:1004/v1/escala", {
                                method: "PUT",
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    id: escala.id,
                                    titulo: titulo,
                                    data: data,
                                    ministro: ministro,
                                    violao: violao,
                                    teclado: teclado,
                                    bateria: bateria,
                                    baixo: baixo,
                                    guitarra: guitarra,
                                    backs: backs,
                                    observacoes: observacao
                                })
                            }).then((response) => {
                                setIsLoading(false)
                                alert(response.status === 200 ? "Escala editada com sucesso!" : "Erro ao editar a escala: " + response.headers.get("error"))
                            }).then(() => console.log(escala)).catch((error) => {
                                alert("Erro ao editar escala!")
                                console.error("Erro na comunicação com a api: ", error);
                            }) : alert("Escala não encontrada.") :
                            fetch("http://localhost:1004/v1/escala", {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    data: data,
                                    titulo: titulo,
                                    ministro: ministro,
                                    violao: violao,
                                    teclado: teclado,
                                    bateria: bateria,
                                    baixo: baixo,
                                    guitarra: guitarra,
                                    backs: backs,
                                    observacoes: observacao
                                })
                            }).then((response) => {
                                setIsLoading(false)
                                alert(response.status === 200 ? "Escala adicionada com sucesso!" : "Erro ao adicionar escala: " + response.headers.get("error"))
                            }).catch((error) => {
                                alert("Erro ao adicionar escala!")
                                console.error("Erro na comunicação com a api: ", error);
                            })
                    }}>{pp.isEdit ? "Confirmar" : "Adicionar"}</Button>
                    <Button className="hover:bg-rose-500" onClick={() => setOpen(false)}>Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

interface DialogAddMusicaInEscalaProps {
    escalaId: UUID
}
export function DialogAddMusicaInEscala(props: DialogAddMusicaInEscalaProps) {
    const [musicas, setMusicas] = useState<Musica[]>();
    const [selectedMusicas, setSelectedMusicas] = useState<String[]>([]);
    const [filteredMusicas, setFilteredMusicas] = useState(musicas);
    const [nomeMusica, setNomeMusica] = useState("");
    const [linkMusica, setLinkMusica] = useState("");
    const [cifraMusica, setCifraMusica] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    function getSelectedMusicas() {
        return musicas ? selectedMusicas.map((musicaId) => musicas.find((musica) => musica.id == musicaId)) : []
    }
    function addSelectedMusica(musicaId: String) {
        setSelectedMusicas([...selectedMusicas, musicaId])
        setFilteredMusicas(musicas?.filter((musica) => !selectedMusicas.includes(musica.id)))
    }
    function removeSelectedMusica(musicaId: String) {
        setSelectedMusicas(selectedMusicas.filter((musica) => musica != musicaId))
        setFilteredMusicas(musicas?.filter((musica) => !selectedMusicas.includes(musica.id)))
    }

    useEffect(() => {
        fetch("http://localhost:1004/v1/musicas")
            .then((res) => res.json())
            .then((data) => {
                setMusicas(data)
                setFilteredMusicas(data)
            })
            .catch((error) => {
                console.error("Erro na comunicação com a api: ", error)
                setMusicas([]);
                setFilteredMusicas([])
            })
    }, [musicas])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="mx-2 hover:text-emerald-500">
                    <CirclePlus className="mx-1 text-emerald-500" />Adicionar Música</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Música</DialogTitle>
                    <br />
                    <Label>Músicas para adicionar:</Label>
                    <Select onValueChange={(value) => addSelectedMusica(value)} disabled={musicas == undefined || musicas.length==0}>
                        <SelectTrigger>
                            <SelectValue placeholder={"Selecione músicas."} />
                        </SelectTrigger>
                        <SelectContent>
                            {filteredMusicas?.map((musica) => (
                                <SelectItem value={musica.id} key={musica.id} onSelect={() => addSelectedMusica(musica.id)}>{musica.nome}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <br />
                    <Label>Músicas selecionadas:</Label>
                    <Card className="bg-transparent grid grid-cols-4">
                        {getSelectedMusicas().map((musica) => (
                            <Button key={musica?.id} variant={"outline"} type="submit" className="p-2 rounded-lg m-2"
                                onClick={() => removeSelectedMusica(musica ? musica.id : "")}>{musica?.nome}</Button>
                        ))}
                    </Card>
                    <br />

                </DialogHeader>
                <DialogFooter className="">
                    <Button className="hover:bg-emerald-500"
                        type="submit" disabled={isLoading} onClick={() => {
                            setLoading(true)
                            fetch(`http://localhost:1004/v1/escala/musicas/${props.escalaId}`, {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    musicasIds: selectedMusicas
                                })
                            })
                                .then((res) => res.json())
                                .then(() => { setOpen(false) })
                                // .then((data) => setCreatedMusic(data))
                                .catch((error) => {
                                    console.error("Erro na comunicação com a api: ", error);
                                })
                            alert("Música inserida com sucesso!")
                        }}>Salvar</Button>
                    <Button className="hover:bg-rose-600/80" onClick={() => setOpen(false)}>Cancelar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}