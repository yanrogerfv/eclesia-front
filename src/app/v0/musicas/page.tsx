"use client"
import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { UUID } from "crypto";
import { ChevronLeft, CircleMinus, ListFilter, ListFilterIcon } from "lucide-react";
import { TbMusicX } from "react-icons/tb";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Musica } from "@/components/apiObjects";
import { DialogAddMusica } from "@/components/dialogs/dialog-musica";
import { useToast } from "@/components/ui/use-toast";

// async function fetchMusicas() {
//     const musicas = await (fetch('http://localhost:1004/v1/musicas'));
//     if (!musicas.ok)
//         throw new Error(`HTTP error! status: ${musicas.status}`);
//     const data: Musica[] = await musicas.json() as Musica[];
//     return data as Musica[];
// }

export default function Home() {

    const [musicas, setMusicas] = useState<Musica[]>([])
    const [isLoading, setLoading] = useState(true)
    const [searchItem, setSearchItem] = useState("");
    const [update, setUpdate] = useState(false)
    const { toast } = useToast();

    useEffect(() => {
        fetch("http://localhost:1004/v1/musicas")
            .then((res) => res.json())
            .then((data) => {
                setLoading(false)
                setMusicas(data)
                setUpdate(false)
            })
            .catch((error) => {
                console.error("Erro na comunicação com a api: ", error)
                setMusicas([]);
            })
    }, [update, musicas])

    const filtrarMusica = useMemo(() => {
        const lowerCase = searchItem.toLowerCase();
        return musicas.filter((musica) => musica.nome.toLowerCase().includes(lowerCase));
    }, [searchItem, musicas])

    // var searchHandler = (filter: string) => {
    //     setMusicas(musicas.filter((music) => music.nome.includes(filter)))
    // }

    return (
        <main className="max-w-6xl mx-auto my-12">
            <nav>
                <div className="flex items-center gap-4 justify-between">
                    <div className="flex">
                        <Link href="/v0" className="w-auto text-4xl justify-center items-center p-2 cursor-pointer outline outline-1 outline-primary/50 hover:bg-secondary hover:text-black rounded-lg">
                            <ChevronLeft className="size-10" />
                        </Link>
                        <h1 className="mx-5 font-extrabold tracking-tight text-5xl">Músicas</h1>
                    </div>
                    <div className="">
                        <DialogAddMusica />
                    </div>
                </div>
                <br />
                <h2 className="scroll-m-20 border-b text-base text-neutral-700 tracking-tight transition-colors first:mt-0">
                    {isLoading ? "Carregando Músicas..." : "Visualizando Músicas"}</h2>
            </nav>
            <br />

            <div className="flex w-full items-center space-x-2">
                <Input disabled={isLoading} className="flex bg-card" type="text"
                    value={searchItem} onChange={(e) => setSearchItem(e.target.value)} placeholder="Procurar por uma música." />
            </div>
            <br />

            <Card className="flex p-3">
                <Table className="bg-black/70 rounded-xl">
                    {/* <TableCaption>Listagem das músicas cadastradas.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead>Título</TableHead>
                            <TableHead>Link</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            filtrarMusica.map((musica) => (
                                <TableRow key={musica.id}>
                                    <TableCell>{musicas.indexOf(musica) + 1}</TableCell>
                                    <TableCell>{musica.nome}</TableCell>
                                    <TableCell><Link href={musica.link} target="_blank">{musica.link}</Link></TableCell>
                                    <TableCell><TbMusicX className="justify-end size-5 hover:cursor-pointer hover:text-red-500/90"
                                        onClick={() => {
                                            // const {toast} = useToast();
                                            fetch(`http://localhost:1004/v1/musicas/${musica.id}`, {
                                                method: "DELETE"
                                            })
                                                .then(() => {
                                                    toast({
                                                        description: "Your message has been sent.",
                                                    })
                                                })
                                                .catch((error) => {
                                                    console.error("Erro na comunicação com a api: ", error);
                                                })
                                            toast({ title: "Música deletada com sucesso!" })
                                        }} /></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Card>
        </main>
    )
}