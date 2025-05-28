"use client"

import { Instrumento } from "@/lib/apiObjects";
import { getMethod } from "@/lib/apiRequests";
import { DialogAddInstrumento, DialogRemoveInstrumento } from "@/components/modals/dialog-instrumento";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
	const [isLoading, setLoading] = useState(true)
	const [instrumentosData, setInstrumentosData] = useState<Instrumento[] | undefined>(undefined)
	const [isLeader, setLeader] = useState(false)

	useEffect(() => {
		if (sessionStorage.getItem("role") == "LIDER" || sessionStorage.getItem("role") == "ADMIN") {
			setLeader(true)
		}
	}, [])

	useEffect(() => {
		setLoading(true)
		if (instrumentosData) return;
		getMethod<Instrumento[] | undefined>("v1/instrumento", setInstrumentosData)
	}, [instrumentosData])

	useEffect(() => {
		if (instrumentosData) setLoading(false);
	}, [instrumentosData])

	return (
		<main className="max-w-6xl mx-auto my-12">
			<nav>
				<div className="flex items-center gap-4 justify-between">
					<div className="flex">
						<Link href="/v0" className="w-auto text-4xl justify-center items-center p-2 cursor-pointer outline outline-1 outline-primary/50 hover:bg-secondary hover:text-black rounded-lg">
							<ChevronLeft className="size-10" />
						</Link>
						<h1 className="mx-5 font-extrabold tracking-tight text-5xl">Instrumentos</h1>
					</div>
					<div className="flex">
						{isLeader && <DialogAddInstrumento disabled={isLoading} state={setInstrumentosData} />}
						{isLeader && <DialogRemoveInstrumento allInstrumentos={instrumentosData ? instrumentosData : undefined} state={setInstrumentosData}/>}
					</div>
				</div>
				<br />
				<h2 className="scroll-m-20 border-b text-base text-neutral-700 tracking-tight transition-colors first:mt-0">
					{isLoading ? "Carregando Instrumentos..." : "Visualizando Instrumentos"}</h2>
			</nav>
			<br />


			<div className="grid grid-cols-3 gap-8">
				{isLoading || !instrumentosData ? (
					<div className="col-span-4 h-full flex items-center justify-center mt-20">
						<div className="size-80 border-4 border-transparent text-primary/40 text-4xl animate-spin flex items-center justify-center border-t-primary rounded-full">
							<div className="size-64 border-4 border-transparent text-subprimary/40 text-2xl animate-spin flex items-center justify-center border-t-subprimary rounded-full" />
						</div>
					</div>
				) : (
					instrumentosData.map(instrumento => (
						<Card key={instrumento.nome}>
							<CardHeader>
								<CardTitle className="flex items-center justify-center text-secondary">{instrumento.nome}
								</CardTitle>
								<CardDescription>
								</CardDescription>
							</CardHeader>
						</Card>
					))
				)}
			</div>
		</main>
	)
}