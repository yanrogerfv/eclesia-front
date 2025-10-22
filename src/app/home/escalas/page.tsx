"use client"

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { CircleMinus, X } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { deleteMethod, getMethod } from "@/lib/apiRequests";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AddEscala, VerEscala } from "@/components/modals/dialog-escala";
import { convertDateFormat, EscalaResumida, Levita } from "@/lib/apiObjects";
import { toast } from "sonner";
import BackButton from "@/components/next-back";
import compareDates from "@/util/compareDates";

export default function Home() {
	const [removeOverlay, setRemoveOverlay] = useState(false);
	const [domingoFilter, setDomingoFilter] = useState(false);
	const [quartaFilter, setQuartaFilter] = useState(false);
	const [especialFilter, setEspecialFilter] = useState(false);

	const [isLoading, setIsLoading] = useState(true);
	const [escalasData, setEscalasData] = useState<EscalaResumida[] | undefined>(undefined);
	const [filteredEscalas, setFilteredEscalas] = useState<EscalaResumida[] | undefined>(undefined);
	const [levitasDisponiveis, setLevitasDisponiveis] = useState<Levita[] | undefined>(undefined);

	const [isLeader, setLeader] = useState(false)

	useEffect(() => {
		if (sessionStorage.getItem("role") == "Líder" || sessionStorage.getItem("role") == "ADMIN") {
			setLeader(true)
		}
	}, [])

	useEffect(() => {
		if (escalasData) return;
		getMethod<EscalaResumida[] | undefined>("v1/escala/resumed", setEscalasData);
		// deleteMethod("escala/clean");
	}, [escalasData, levitasDisponiveis])

	useEffect(() => {
		if (levitasDisponiveis) return;
		getMethod<Levita[] | undefined>("v1/levita/resumed", setLevitasDisponiveis);
	}, [])

	useEffect(() => {
		if (!escalasData) return;
		setFilteredEscalas(escalasData);
		setIsLoading(false);
	}, [escalasData]);

	useEffect(() => {
		if (!escalasData) return;
		if (!domingoFilter && !quartaFilter && !especialFilter) setFilteredEscalas(escalasData);
		else setFilteredEscalas(escalasData?.filter(escala => {
			return (domingoFilter && escala.domingo) || (quartaFilter && escala.quarta) || (especialFilter && escala.especial)
		}))
	}, [domingoFilter, quartaFilter, especialFilter, escalasData]);

	return (
		<SidebarProvider defaultOpen={false}>
			<main className="max-w-6xl w-full px-4 sm:px-8 lg:px-6 mx-auto my-6 sm:my-12">
				<nav className="mb-4">
					<div className="flex flex-wrap md:flex-nowrap justify-between items-center">
						<div className="flex items-center justify-between w-full">
							<div className="flex items-center">
								<BackButton />
								<h1 className="ml-4 font-extrabold tracking-tight text-2xl sm:text-5xl">Escalas</h1>
							</div>
							<SidebarTrigger className="border sm:hidden" />
						</div>
						{isLeader && (
							<div className="flex w-full justify-between sm:justify-end gap-2 mt-4 sm:w-full">
								<AddEscala disabled={escalasData === undefined} setEscalas={setEscalasData} />
								<Button
									variant="outline"
									disabled={escalasData === undefined}
									className={removeOverlay ? "font-bold bg-rose-500/80 border-rose-600/90 hover:bg-rose-600/40" : "font-bold hover:bg-rose-500/40"}
									onClick={() => setRemoveOverlay(!removeOverlay)}>
									<CircleMinus className={`${removeOverlay ? "" : "text-rose-500"}`} />Excluir Escala
								</Button>
							</div>)}
					</div>
					<h2 className="border-b mt-3 text-sm sm:text-base text-neutral-700 tracking-tight">
						{!filteredEscalas ? "Carregando Escalas..." : "Visualizando Escalas"}
					</h2>
				</nav>
				<div>
					<div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2 sm:gap-4 md:gap-6">
						<Button variant="outline" className={"md:flex-1 w-full text-lg hover:text-colortext text-primary hover:bg-primary".concat(domingoFilter ? " bg-primary text-foreground" : "")}
							onClick={() => setDomingoFilter(!domingoFilter)} disabled={isLoading}>Domingos</Button>
						<Button variant="outline" className={"md:flex-1 w-full text-lg hover:text-colortext text-secondary hover:bg-secondary".concat(quartaFilter ? " bg-secondary text-foreground" : "")}
							onClick={() => setQuartaFilter(!quartaFilter)} disabled={isLoading}>Quartas</Button>
						<Button variant="outline" className={"md:flex-1 w-full text-lg hover:text-colortext text-special hover:bg-special".concat(especialFilter ? " bg-special text-foreground" : "")}
							onClick={() => setEspecialFilter(!especialFilter)} disabled={isLoading}>Especiais</Button>
					</div>

					{Array.isArray(filteredEscalas) && filteredEscalas.length === 0 ? (
						<Card className="text-center">
							<p className="p-6 sm:p-10 text-lg sm:text-2xl text-zinc-400/80">
								{
									domingoFilter || quartaFilter || especialFilter
									//concatenando strings de filtros ativos, dando um join em vírgula
										? `Nenhuma escala encontrada para ${
											[domingoFilter && "domingos", quartaFilter && "quartas", especialFilter && " datas especiais"].filter(Boolean).join(" ou ")
										}.`
										: "Nenhuma escala cadastrada."
								}
							</p>
						</Card>
					) : (
						<div className={isLoading ? "grid grid-cols-1" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8"}>
							{isLoading ? (
								<div className="flex items-center justify-center z-50">
									<div className="size-80 border-4 border-transparent text-primary/40 text-4xl animate-spin flex items-center justify-center border-t-primary rounded-full">
										<div className="size-64 border-4 border-transparent text-subprimary/40 text-2xl animate-spin flex items-center justify-center border-t-subprimary rounded-full" />
									</div>
								</div>
							) : Array.isArray(filteredEscalas) && filteredEscalas.map((escala) => (
                                <Card key={escala.id} className={`hover:scale-[1.02] hover:shadow-lg transition-transform ${removeOverlay ? "animate-pulse" : "duration-200"} ${compareDates(escala.data, new Date()) ? 'opacity-60 grayscale' : ''}`}>
								{/* <Card key={escala.id} className={`${removeOverlay ? "animate-pulse" : ""} ${compareDates(escala.data, new Date()) ? 'opacity-60 grayscale' : ''}`}> */}
									<X className={removeOverlay ? "absolute hover:cursor-pointer bg-rose-500/80 rounded-br-xl p-1" : "absolute invisible"}
										onClick={() => {
											deleteMethod(`v1/escala/${escala.id}`)
												.catch((error: any) => toast.error("Erro ao remover escala: " + error))
												.then(() => toast.success("Escala " + escala.titulo + " removida com sucesso!"))
												.then(() => {
													setEscalasData(undefined);
												})
										}}
									/>
									<CardHeader className="items-center lg:items-start">
										<CardTitle className={escala.domingo ? "text-primary" : escala.quarta ? "text-secondary" : "text-special"}>
											{escala.titulo}
										</CardTitle>
										{convertDateFormat(escala.data)}
										<CardDescription>
											{escala.observacoes && escala.observacoes.length > 0
												? escala.observacoes.length > 30
													? escala.observacoes.substring(0, 28).trimEnd().concat("...")
													: escala.observacoes
												: "Sem observações."}
										</CardDescription>
									</CardHeader>
									<CardContent>
										<p><span className="text-special">Ministro:</span> {escala.ministro ? <span className="text-primary">{escala.ministro}</span> : <span className="text-colortext/40">Não inserido.</span>}
										</p>
										<p><span className="text-subprimary">Violão:</span> {escala.violao || <span className="text-colortext/40">Não inserido.</span>}
										</p>
										<p><span className="text-subprimary">Teclado:</span> {escala.teclado || <span className="text-colortext/40">Não inserido.</span>}
										</p>
										<p><span className="text-subprimary">Bateria:</span> {escala.bateria || <span className="text-colortext/40">Não inserido.</span>}
										</p>
										<p><span className="text-subprimary">Baixo:</span> {escala.baixo || <span className="text-colortext/40">Não inserido.</span>}
										</p>
										<p><span className="text-subprimary">Guitarra:</span> {escala.guitarra || <span className="text-colortext/40">Não inserido.</span>}
										</p>
									</CardContent>
									<CardFooter className="flex items-center justify-between">
										<div>
											{escala.domingo ?
												<Badge className="bg-primary/80 hover:bg-primary/60 cursor-default">Domingo</Badge>
												: escala.quarta ?
													<Badge className="bg-secondary/80 hover:bg-secondary/60 cursor-default">Quarta</Badge>
													:
													<Badge className="bg-special/80 hover:bg-special/60 cursor-default">Especial</Badge>
											}
										</div>
										<div>
											<VerEscala escalaId={escala.id} levitasDisponiveis={levitasDisponiveis} />
										</div>
									</CardFooter>
								</Card>
							))}
						</div>
					)}
				</div>
			</main>
			<AppSidebar side="right" />
		</SidebarProvider>
	);
}
