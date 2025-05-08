"use client"
import { Card } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ChevronLeft, CircleMinus, ListFilter, ListFilterIcon } from "lucide-react";
import { TbMusicX } from "react-icons/tb";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Musica } from "@/lib/apiObjects";
import { DialogAddMusica } from "@/components/modals/dialog-musica";
import { useToast } from "@/components/ui/use-toast";
import { deleteMethod, getMethod } from "@/lib/apiRequests";
import { toast } from "sonner";

export default function Home() {

	const [musicas, setMusicas] = useState<Musica[] | undefined>(undefined)
	const [filteredMusicas, setFilteredMusicas] = useState<Musica[] | undefined>(undefined)
	const [isLoading, setLoading] = useState(true)
	const [searchItem, setSearchItem] = useState("");
	const [update, setUpdate] = useState(false)
	// const { toast } = useToast();

	const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 3000))

	useEffect(() => {
		if (!filteredMusicas)
			setFilteredMusicas(musicas)
		if (musicas) return;
		setLoading(true)
		getMethod<Musica[] | undefined>("v1/musicas", setMusicas)
	}, [update, musicas])

	useEffect(() => {
		if (musicas)
			setLoading(false)
	}, [musicas])

	useEffect(() => {
		if (!musicas) return;
		setFilteredMusicas(musicas?.filter((musica) => musica.nome.toLowerCase().includes(searchItem.toLowerCase())));
	}, [searchItem, musicas])

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
						<DialogAddMusica setState={setMusicas} />
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

			{isLoading ? (
				<div className="col-span-4 h-full w-full flex items-center justify-center mt-20">
					<div className="size-80 border-4 border-transparent text-primary/40 text-4xl animate-spin flex items-center justify-center border-t-primary rounded-full">
						<div className="size-64 border-4 border-transparent text-subprimary/40 text-2xl animate-spin flex items-center justify-center border-t-subprimary rounded-full" />
					</div>
				</div>
			) : (
				<Card className="flex p-3 w-full max-h-[42rem] scrollbar-hidden">
					<Table className="bg-tablebg rounded-xl h-full">
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
							{filteredMusicas?.map((musica) => (
								<TableRow key={musica.id}>
									<TableCell>{musicas ? musicas.indexOf(musica) + 1 : 0}</TableCell>
									<TableCell>{musica.nome}</TableCell>
									<TableCell><Link href={musica.link} target="_blank">{musica.link}</Link></TableCell>
									<TableCell><TbMusicX className="justify-end size-5 hover:cursor-pointer hover:text-red-500/90"
										onClick={() => {
											// deleteMethod(`musicas/${musica.id}`)
											// toast.promise(promise(), {
											// 	loading: "Carregando...",
											// 	success: "Usuário logado com sucesso!",
											// 	error: "Erro ao efetuar login!"
											// })
											deleteMethod(`musicas/${musica.id}`)
												.then(() => {
													setLoading(true)
													setFilteredMusicas(undefined)
													setMusicas(undefined)
												})
										}} /></TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Card>
			)}
		</main>
	)
}