
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
import { ChevronLeft, ListFilter, ListFilterIcon } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/pgtitle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { modalzin } from "@/components/modalzin";
import { ChangeEvent, useState } from "react";
import { Musica } from "@/components/apiObjects";

async function fetchMusicas() {
    const musicas = await (fetch('http://localhost:1004/v1/musicas'));
    if (!musicas.ok)
        throw new Error(`HTTP error! status: ${musicas.status}`);
    const data: Musica[] = await musicas.json() as Musica[];
    return data as Musica[];
}

export default async function Home() {

    var musicas = (await fetchMusicas()).sort();
    var searchHandler = (filter:string) => {
        musicas = musicas.filter((music) => music.nome.includes(filter))
    }

    return (
        <main className="max-w-6xl mx-auto my-12">
            <PageHeader urlBack="/v0" title="Músicas" subtitle="Visualização das Músicas" />

            <div className="flex w-full items-center space-x-2">
                <Input className="flex" type="search" placeholder="Procure por uma música" />
                <Button type="submit" className="">Buscar</Button>
            </div>
            <br />

            <Card className="flex p-3 bg-current/85">
                <Table className="bg-black/70 rounded-xl">
                    {/* <TableCaption>Listagem das músicas cadastradas.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead>Título</TableHead>
                            <TableHead>Link</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            musicas.map((musica) => (
                                <TableRow key={musica.id}>
                                    <TableCell>{musicas.indexOf(musica)}</TableCell>
                                    <TableCell>{musica.nome}</TableCell>
                                    <TableCell><Link href={musica.link}>{musica.link}</Link></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Card>
        </main>
    )
}