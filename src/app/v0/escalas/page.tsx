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
import { useEffect, useState } from "react";
import { ChevronLeft, CircleMinus, X } from "lucide-react";
import { convertDateFormat, EscalaResumida, Levita } from "@/components/apiObjects";
import { DialogAddEditEscala, DialogVerEscala } from "@/components/dialogs/dialog-escala";
import { getMethod } from "@/components/apiRequests";
// import React from "react";

export default function Home() {
	// const [escalasData, setEscalasData] = useState<EscalaResumida[]>([]);
	// const [levitasDisponiveis, setLevitasDisponiveis] = useState<Levita[]>([]);
	const [removeOverlay, setRemoveOverlay] = useState(false);
	const [domingoFilter, setDomingoFilter] = useState(false);
	const [quartaFilter, setQuartaFilter] = useState(false);
	const [especialFilter, setEspecialFilter] = useState(false);

	const escalasData: EscalaResumida[] | undefined = getMethod<EscalaResumida[]>("escala/resumed");
	// const escalasData = escalasData;
	const levitasDisponiveis: Levita[] | undefined = getMethod<Levita[]>("levita/resumed")

	

	useEffect(() => {
		fetch("http://localhost:1004/v1/escala/clean", { method: "DELETE" })
			.then((res) => res.json())
			.then(() => console.log("Escalas limpas com sucesso!"))
			.catch((error) => console.error("Erro na comunicação com a api: ", error));
	}, []);

	// useEffect(() => {
	//   fetch("http://localhost:1004/v1/escala/resumed")
	//     .then((res) => res.json())
	//     .then((data) => {
	//       setIsLoading(false);
	//       setEscalasData(data);
	//     })
	//     .catch((error) => {
	//       console.error("Erro na comunicação com a api: ", error);
	//       setEscalasData([]);
	//     });
	// }, []);

	// useEffect(() => {
	//   fetch("http://localhost:1004/v1/levita/resumed")
	//     .then((res) => res.json())
	//     .then((data) => {
	//       setLevitasDisponiveis(data);
	//     })
	//     .catch((error) => {
	//       console.error("Erro na comunicação com a api: ", error);
	//       setLevitasDisponiveis([]);
	//     });
	// }, []);

	return (
		<main className="max-w-6xl px-4 sm:px-8 lg:px-16 mx-auto my-6 sm:my-12">
			<nav>
				<div className="flex flex-wrap justify-between items-center">
					<div className="flex items-center">
						<Link href="/v0" className="w-auto text-2xl sm:text-4xl flex items-center p-2 cursor-pointer outline outline-1 outline-primary/50 hover:bg-secondary hover:text-black rounded-lg">
							<ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
						</Link>
						<h1 className="ml-4 font-extrabold tracking-tight text-2xl sm:text-5xl">Escalas</h1>
					</div>
					<div className="flex items-center mt-4 sm:mt-0">
						<DialogAddEditEscala isEdit={false} escala={undefined} levitasDisponiveis={levitasDisponiveis ? levitasDisponiveis : []} />
						<Button
							variant="outline"
							className={
								removeOverlay
									? "mx-2 font-bold bg-rose-500/80 border-rose-600/90 hover:bg-rose-600/40"
									: "mx-2 font-bold hover:bg-rose-500/40"
							}
							onClick={() => setRemoveOverlay(!removeOverlay)}
						>
							<CircleMinus className="mx-1 text-rose-500" />Excluir Escala
						</Button>
					</div>
				</div>
				<br />
				<h2 className="border-b text-sm sm:text-base text-neutral-700 tracking-tight">
					{!escalasData ? "Carregando Escalas..." : "Visualizando Escalas"}
				</h2>
			</nav>
			<br />

			{escalasData == undefined ? (
				<div className="flex justify-center items-center h-40">
					<div className="h-16 w-16 border-4 border-transparent border-t-primary rounded-full animate-spin" />
				</div>
			) : (
				<div>
					{escalasData.length === 0 ? (
						<Card className="text-center">
							<p className="p-6 sm:p-10 text-lg sm:text-2xl text-zinc-400/80">
								Nenhuma escala cadastrada.
							</p>
						</Card>
					) : (
						<>
							<div className="flex justify-between gap-4 w-full">
								<Button variant="outfill" className={"w-full text-lg hover:text-foreground text-primary hover:bg-primary" + domingoFilter ? " bg-primary" : ""}
									onClick={() => setDomingoFilter(!domingoFilter)}>Domingos</Button>
								<Button variant="outfill" className={"w-full text-lg hover:text-foreground text-subprimary hover:bg-subprimary" + quartaFilter ? " bg-secondary" : ""}
									onClick={() => setQuartaFilter(!quartaFilter)}>Quartas</Button>
								<Button variant="outfill" className={"w-full text-lg hover:text-foreground text-special hover:bg-special" + especialFilter ? " bg-special" : ""}
									onClick={() => setEspecialFilter(!especialFilter)}>Especiais</Button>
							</div>
							<br />
							<div className={escalasData.length === 0 ? "" :
								"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8"}>
								{escalasData.map((escala) => (
									<Card key={escala.id} className={removeOverlay ? "animate-pulse" : ""}>
										<X
											className={
												removeOverlay
													? "absolute hover:cursor-pointer bg-rose-500/80 rounded-br-xl"
													: "absolute invisible"
											}
											onClick={() => {
												fetch(`http://localhost:1004/v1/escala/${escala.id}`, {
													method: "DELETE",
												})
													.then((response) => {
														alert(
															response.status === 200
																? "Escala removida com sucesso!"
																: "Erro ao remover a Escala: " +
																response.headers.get("error")
														);
													})
													.catch((error) => {
														alert("Erro ao remover Escala!");
														console.error("Erro na comunicação com a api: ", error);
													});
											}}
										/>
										<CardHeader>
											<CardTitle
												className={
													escala.domingo
														? "text-primary"
														: escala.quarta
															? "text-secondary"
															: "text-special"
												}
											>
												{escala.titulo}
											</CardTitle>
											{convertDateFormat(escala.data)}
											<CardDescription>
												{escala.observacoes.length > 0
													? escala.observacoes.length > 30
														? escala.observacoes.substring(0, 28).trimEnd().concat("...")
														: escala.observacoes
													: "Sem observações."}
											</CardDescription>
										</CardHeader>
										<CardContent>
											<p>
												<span className="text-subprimary">Ministro:</span> <span className="text-secondary">{escala.ministro}</span>
											</p>
											<p>
												<span className="text-subprimary">Violão:</span> {escala.violao || <span className="text-secondary/40">Não inserido.</span>}
											</p>
											<p>
												<span className="text-subprimary">Teclado:</span> {escala.teclado || <span className="text-secondary/40">Não inserido.</span>}
											</p>
											<p>
												<span className="text-subprimary">Bateria:</span> {escala.bateria || <span className="text-secondary/40">Não inserido.</span>}
											</p>
											<p>
												<span className="text-subprimary">Baixo:</span> {escala.baixo || <span className="text-secondary/40">Não inserido.</span>}
											</p>
											<p>
												<span className="text-subprimary">Guitarra:</span> {escala.guitarra || <span className="text-secondary/40">Não inserido.</span>}
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
												<DialogVerEscala escalaId={escala.id} levitasDisponiveis={levitasDisponiveis} />
											</div>
										</CardFooter>
									</Card>
								))}
							</div>
						</>
					)}
				</div>
			)}
		</main>
	);
}
