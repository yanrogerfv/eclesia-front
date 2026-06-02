"use client"

import { Instrumento } from "@/lib/apiObjects";
import { getMethod } from "@/lib/apiRequests";
import { DialogAddInstrumento, DialogRemoveInstrumento } from "@/components/modals/dialog-instrumento";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import BackButton from "@/components/next-back";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Badge } from "@/components/ui/badge";
import { WifiOff } from "lucide-react";
import { usePermission } from "@/context/permissionContext";

export default function Home() {
	const [isLoading, setLoading] = useState(true)
	const [instrumentosData, setInstrumentosData] = useState<Instrumento[] | undefined>(undefined)
	const { role } = usePermission();
	const isLeader = role === "Líder" || role === "ADMIN";
	const [isOffline, setIsOffline] = useState(false)

	useEffect(() => {
		const handleOnline = () => setIsOffline(false);
		const handleOffline = () => setIsOffline(true);

		if (typeof window !== 'undefined') {
			setIsOffline(!navigator.onLine);
			window.addEventListener('online', handleOnline);
			window.addEventListener('offline', handleOffline);

			return () => {
				window.removeEventListener('online', handleOnline);
				window.removeEventListener('offline', handleOffline);
			};
		}
	}, []);



	useEffect(() => {
		setLoading(true)
		if (instrumentosData) return;
		getMethod<Instrumento[] | undefined>("v1/instrumento", setInstrumentosData)
	}, [instrumentosData])

	useEffect(() => {
		if (instrumentosData) setLoading(false);
	}, [instrumentosData])

	return (
		<SidebarProvider defaultOpen={false}>
			<main className="max-w-6xl w-full h-full px-4 sm:px-8 lg:px-6 mx-auto my-6 sm:my-12">
				<nav className="mb-4">
					<div className="flex items-center mb-4 gap-4 justify-between align-middle">
						<div className="flex items-center justify-between w-full">
							<div className="flex items-center flex-wrap">
								<BackButton />
								<h1 className="ml-4 font-extrabold tracking-tight text-2xl sm:text-5xl">Instrumentos</h1>
								{isOffline && Array.isArray(instrumentosData) && instrumentosData.length > 0 && (
									<Badge variant="destructive" className="ml-4 mt-2 sm:mt-0 flex gap-1 items-center bg-red-500 hover:bg-red-600 cursor-default">
										<WifiOff className="w-3 h-3" />
										Dessincronizado
									</Badge>
								)}
							</div>
							<SidebarTrigger className="border sm:hidden" />
						</div>
						<div className="flex gap-2">
							{isLeader && <DialogAddInstrumento disabled={isLoading} state={setInstrumentosData} />}
							{isLeader && <DialogRemoveInstrumento allInstrumentos={instrumentosData ? instrumentosData : undefined} state={setInstrumentosData} />}
						</div>
					</div>
					<h2 className="scroll-m-20 border-b text-base text-neutral-700 tracking-tight transition-colors first:mt-0">
						{isLoading ? "Carregando Instrumentos..." : "Visualizando Instrumentos"}</h2>
				</nav>


				{isOffline && !instrumentosData ? (
					<Card className="text-center border-red-900/20 bg-red-500/5 mt-4">
						<div className="p-6 sm:p-10 flex flex-col items-center">
							<WifiOff className="h-16 w-16 text-red-500/80 mb-4" />
							<h3 className="text-2xl text-red-500 font-bold mb-2">Sem Conexão</h3>
							<p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-md">
								Você está offline e não possui instrumentos salvos em cache. Conecte-se à internet para carregar os instrumentos.
							</p>
						</div>
					</Card>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
				)}
			</main>
			<AppSidebar side="right" />
		</SidebarProvider >
	)
}