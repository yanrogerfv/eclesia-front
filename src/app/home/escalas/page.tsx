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
import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, CircleMinus, LoaderCircle, X } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { deleteMethod, getMethod } from "@/lib/apiRequests";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AddEscala, VerEscala } from "@/components/modals/dialog-escala";
import { convertDateFormat, EscalaResumida, Levita } from "@/lib/apiObjects";
import { toast } from "sonner";
import BackButton from "@/components/next-back";

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
		if (escalasData && levitasDisponiveis) return;
		getMethod<EscalaResumida[] | undefined>("v1/escala/resumed", setEscalasData);
		getMethod<Levita[] | undefined>("v1/levita/resumed", setLevitasDisponiveis);
		// deleteMethod("escala/clean");
	}, [escalasData, levitasDisponiveis])

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
			<>
				<main className="max-w-6xl w-full px-4 sm:px-8 lg:px-6 mx-auto my-6 sm:my-12">
					<nav>
						<div className="flex flex-wrap md:flex-nowrap justify-between items-center">
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center">
									<BackButton />
									<h1 className="ml-4 font-extrabold tracking-tight text-2xl sm:text-5xl">Escalas</h1>
								</div>
								<SidebarTrigger className="border sm:hidden" />
							</div>
							<div className="flex w-full justify-between sm:justify-end gap-2 mt-4 sm:w-full">
								{isLeader && <AddEscala disabled={escalasData === undefined} setEscalas={setEscalasData} />}
								{isLeader && <Button
									variant="outline"
									disabled={escalasData === undefined}
									className={removeOverlay ? "font-bold bg-rose-500/80 border-rose-600/90 hover:bg-rose-600/40" : "font-bold hover:bg-rose-500/40"}
									onClick={() => setRemoveOverlay(!removeOverlay)}>
									<CircleMinus className="mx-1 text-rose-500" />Excluir Escala
								</Button>}
							</div>
						</div>
						<br />
						<h2 className="border-b text-sm sm:text-base text-neutral-700 tracking-tight">
							{!filteredEscalas ? "Carregando Escalas..." : "Visualizando Escalas"}
						</h2>
					</nav>
					<br />
					<div>
						<div className="flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-4 md:gap-6">
							<Button variant="outline" className={"md:flex-1 w-full text-lg hover:text-foreground rounded-lg text-primary hover:bg-primary".concat(domingoFilter ? " bg-primary text-foreground" : "")}
								onClick={() => setDomingoFilter(!domingoFilter)} disabled={isLoading}>Domingos</Button>
							<Button variant="outline" className={"md:flex-1 w-full text-lg hover:text-foreground rounded-lg text-subprimary hover:bg-secondary".concat(quartaFilter ? " bg-secondary text-foreground" : "")}
								onClick={() => setQuartaFilter(!quartaFilter)} disabled={isLoading}>Quartas</Button>
							<Button variant="outline" className={"md:flex-1 w-full text-lg hover:text-foreground rounded-lg text-special hover:bg-special".concat(especialFilter ? " bg-special text-foreground" : "")}
								onClick={() => setEspecialFilter(!especialFilter)} disabled={isLoading}>Especiais</Button>
						</div>
						<br />

						{Array.isArray(filteredEscalas) && filteredEscalas.length === 0 ? (
							<Card className="text-center">
								<p className="p-6 sm:p-10 text-lg sm:text-2xl text-zinc-400/80">
									{
										domingoFilter || quartaFilter || especialFilter
											? "Nenhuma Escala encontrada com os filtros aplicados."
											: "Nenhuma Escala cadastrada."
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
									<Card key={escala.id} className={`${removeOverlay ? "animate-pulse" : ""} ${new Date(escala.data) < new Date() ? 'opacity-60 grayscale' : ''}`}>
										<X className={removeOverlay ? "absolute hover:cursor-pointer bg-rose-500/80 rounded-br-xl p-1" : "absolute invisible"}
											onClick={() => {
												setIsLoading(true);
												deleteMethod(`v1/escala/${escala.id}`)
													.catch((error: any) => toast.error("Erro ao remover escala: " + error))
													.then(() => toast.success("Escala " + escala.titulo + " removida com sucesso!"))
													.then(() => {
														setEscalasData(undefined);
														setRemoveOverlay(false);
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
											<p><span className="text-subprimary">Ministro:</span> <span className="text-secondary">{escala.ministro}</span>
											</p>
											<p><span className="text-subprimary">Violão:</span> {escala.violao || <span className="text-secondary/40">Não inserido.</span>}
											</p>
											<p><span className="text-subprimary">Teclado:</span> {escala.teclado || <span className="text-secondary/40">Não inserido.</span>}
											</p>
											<p><span className="text-subprimary">Bateria:</span> {escala.bateria || <span className="text-secondary/40">Não inserido.</span>}
											</p>
											<p><span className="text-subprimary">Baixo:</span> {escala.baixo || <span className="text-secondary/40">Não inserido.</span>}
											</p>
											<p><span className="text-subprimary">Guitarra:</span> {escala.guitarra || <span className="text-secondary/40">Não inserido.</span>}
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
			</>
			<AppSidebar side="right" />
		</SidebarProvider>
	);
}
