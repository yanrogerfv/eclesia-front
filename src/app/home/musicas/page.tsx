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
import { ChevronLeft } from "lucide-react";
import { TbMusicX } from "react-icons/tb";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Musica } from "@/lib/apiObjects";
import { DialogAddMusica } from "@/components/modals/dialog-musica";
import { deleteMethod, getMethod } from "@/lib/apiRequests";
import { toast } from "sonner";
import BackButton from "@/components/next-back";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Home() {

	const [musicas, setMusicas] = useState<Musica[] | undefined>(undefined)
	const [filteredMusicas, setFilteredMusicas] = useState<Musica[] | undefined>(undefined)
	const [isLoading, setLoading] = useState(true)
	const [searchItem, setSearchItem] = useState("");
	const [update, setUpdate] = useState(false)
	const [isLeader, setLeader] = useState(false)

	useEffect(() => {
		if (sessionStorage.getItem("role") == "Líder" || sessionStorage.getItem("role") == "ADMIN") {
			setLeader(true)
		}
	}, [])

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
		<SidebarProvider defaultOpen={false}>
			<main className="max-w-6xl w-full h-full px-4 sm:px-8 lg:px-6 mx-auto my-6 sm:my-12">
				<nav className="mb-4">
					<div className="flex items-center mb-4 gap-4 justify-between align-middle">
						<div className="flex items-center justify-between w-full">
							<div className="flex items-center">
								<BackButton />
								<h1 className="ml-4 font-extrabold tracking-tight text-2xl sm:text-5xl">Músicas</h1>
							</div>
							<SidebarTrigger className="border sm:hidden" />
						</div>
						{isLeader && <DialogAddMusica setState={setMusicas} disabled={isLoading} />}
					</div>
					<h2 className="scroll-m-20 border-b text-base text-neutral-700 tracking-tight transition-colors first:mt-0">
						{isLoading ? "Carregando Músicas..." : "Visualizando Músicas"}</h2>
				</nav>

				<div className="flex w-full items-center space-x-2 mb-4	">
					<Input disabled={isLoading} className="flex bg-card" type="text"
						value={searchItem} onChange={(e) => setSearchItem(e.target.value)} placeholder="Procurar por uma música." />
				</div>

				{isLoading ? (
					<div className="col-span-4 h-full w-full flex items-center justify-center mt-20">
						<div className="size-80 border-4 border-transparent text-primary/40 text-4xl animate-spin flex items-center justify-center border-t-primary rounded-full">
							<div className="size-64 border-4 border-transparent text-subprimary/40 text-2xl animate-spin flex items-center justify-center border-t-subprimary rounded-full" />
						</div>
					</div>
				) : (
					<Card className="flex p-3 w-full max-h-[75dvh]">
						<Table className="bg-tablebg rounded-xl h-full">
							{/* <TableCaption>Listagem das músicas cadastradas.</TableCaption> */}
							<TableHeader className="">
								<TableRow>
									<TableHead className="max-w-[10px]" />
									<TableHead className="text-center sm:text-start">
										<p className="hidden sm:inline">
											Título
										</p>
										<p className="inline sm:hidden">
											Músicas
										</p>
									</TableHead>
									<TableHead className="hidden sm:table-cell">Link</TableHead>
									<TableHead />
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredMusicas?.map((musica) => (
									<TableRow key={musica.id}>
										<TableCell className="max-w-[10px]">{musicas ? musicas.indexOf(musica) + 1 : 0}</TableCell>
										<TableCell>
											<a href={musica.link} target="_blank" className="hover:underline sm:hidden">
												{musica.nome}
											</a>
											<p className="hidden sm:inline">
												{musica.nome}
											</p>
										</TableCell>
										<TableCell className="hidden sm:table-cell"><Link href={musica.link} target="_blank">
											<p className="hover:underline hover:text-current/80">
												{musica.link}
											</p>
										</Link></TableCell>
										<TableCell><TbMusicX className="justify-end size-5 hover:cursor-pointer hover:text-red-500/90"
											onClick={() => {
												deleteMethod(`v1/musicas/${musica.id}`)
													.then(() => {
														toast.success("Música excluída com sucesso!")
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
			<AppSidebar side="right" />
		</SidebarProvider>
	)
}