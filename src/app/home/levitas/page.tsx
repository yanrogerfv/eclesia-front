"use client"

import Cookies from "js-cookie";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { use, useEffect, useState } from "react";
import { Filter, FilterX, ListFilter, UserMinus, X } from "lucide-react";
import { DialogAddLevita, DialogVerLevita } from "@/components/modals/dialog-levita";
import { Input } from "@/components/ui/input";
import { Levita, Instrumento } from "@/lib/apiObjects";
import { SheetFiltroLevita } from "@/components/filter-sheet";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { CheckboxDemo } from "@/components/checkboxObj";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { deleteMethod, getMethod } from "@/lib/apiRequests";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import BackButton from "@/components/next-back";

export default function Home() {

	const [levitas, setLevitas] = useState<Levita[] | undefined>(undefined)
	const [instrumentos, setInstrumentos] = useState<Instrumento[] | undefined>(undefined)
	const [isLoading, setIsLoading] = useState(true)
	const [loadingRemove, setLoadingRemove] = useState(false)
	const [removeOverlay, setRemoveOverlay] = useState(false)
	const [searchItem, setSearchItem] = useState("");
	const [reload, setReload] = useState(false)
	const [filteredInstruments, setFilteredInstruments] = useState<Instrumento[]>([])
	const [filteredLevitas, setFilteredLevita] = useState<Levita[] | undefined>(undefined)
	const [isAdminOrLeader, setLeader] = useState(false)

	useEffect(() => {
		if (sessionStorage.getItem("role") == "Líder" || sessionStorage.getItem("role") == "ADMIN") {
			setLeader(true)
		}
	}, [])

	useEffect(() => {
		if (!filteredLevitas)
			setFilteredLevita(levitas)
		if (levitas) return;
		getMethod<Levita[] | undefined>("v1/levita/resumed", setLevitas);
	}, [levitas])

	// useEffect(() => {
	// 	if (reload) {
	// 		setLevitas(undefined)
	// 		setFilteredLevita(undefined)
	// 		setInstrumentos(undefined)
	// 		setIsLoading(true)
	// 		setReload(false)
	// 	}
	// }, [reload])

	useEffect(() => {
		if (instrumentos) return;
		getMethod<Instrumento[] | undefined>("v1/instrumento", setInstrumentos);
	}, [instrumentos])

	useEffect(() => {
		if (levitas && instrumentos) {
			setIsLoading(false)
			return;
		}
	}, [levitas, instrumentos])

	useEffect(() => {
		if (!levitas) return;
		if (filteredInstruments.length === 0)
			setFilteredLevita(levitas.filter((levita) => levita.nome.toLowerCase().includes(searchItem.toLowerCase())))
		else
			setFilteredLevita(levitas.filter((levita) => levita.nome.toLowerCase().includes(searchItem.toLowerCase())
				&& levita.instrumentos.some((instrumento) => filteredInstruments.some((filteredInstrument) => filteredInstrument.id === instrumento.id))))

	}, [searchItem, filteredInstruments])



	return (
		<SidebarProvider defaultOpen={false}>
			<main className="max-w-6xl w-full px-4 sm:px-8 lg:px-6 mx-auto my-6 sm:my-12">
				{/* Header Section */}
				<div>
					<div className="flex flex-wrap md:flex-nowrap justify-between items-center">
						<div className="flex items-center justify-between w-full">
							<div className="flex items-center">
								<BackButton />
								<h1 className="ml-4 font-extrabold tracking-tight text-2xl sm:text-5xl">Levitas</h1>
							</div>
							<SidebarTrigger className="border md:hidden" />
						</div>
						{/* Action Buttons */}
						{isAdminOrLeader && (
							<div className="flex w-full justify-between sm:justify-end gap-2 mt-4 sm:w-full">
								<DialogAddLevita disable={isLoading} setLevitas={setLevitas} />
								<Button
									variant="outline"
									className={` ${removeOverlay
										? "font-bold bg-rose-500/80 border-rose-600/90 hover:bg-rose-600/40"
										: "font-bold hover:bg-rose-500/40"
										}`}
									disabled={isLoading}
									onClick={() => setRemoveOverlay(!removeOverlay)}
								>
									<UserMinus className="mx-1 text-rose-500" />
									<span className="hidden sm:block">Remover Levita</span>
								</Button>
							</div>
						)}
					</div>

					<h2 className="border-b my-3 text-sm sm:text-base text-neutral-700 tracking-tight">
						{isLoading ? "Carregando Levitas..." : "Visualizando Levitas"}
					</h2>
				</div>

				{/* Search and Filter Section */}
				<div className="flex gap-2 w-full mb-2 md:mb-4">
					<div className="flex-shrink-0">
						{isLoading ? (
							<div className="flex items-center justify-center size-9 sm:size-10 border border-primary/45 bg-secondary/30 text-black rounded-md">
								<ListFilter className="size-5" />
							</div>
						) : (
							<SheetFiltroLevita
								disabled={isLoading}
								filteredInstruments={filteredInstruments}
								setFilteredInstruments={setFilteredInstruments}
								instrumentos={instrumentos}
							/>
						)}
					</div>
					<Input
						disabled={isLoading}
						className="flex-1 order-1 sm:order-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
						type="text"
						value={searchItem}
						onChange={(e) => setSearchItem(e.target.value)}
						placeholder="Procure por um Levita"
					/>
				</div>

				{/* Content Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
					{isLoading ? (
						<div className="col-span-full flex items-center justify-center py-16 sm:py-20">
							<div className="size-32 sm:size-48 lg:size-80 border-4 border-transparent text-primary/40 animate-spin flex items-center justify-center border-t-primary rounded-full">
								<div className="size-24 sm:size-36 lg:size-64 border-4 border-transparent text-subprimary/40 animate-spin flex items-center justify-center border-t-subprimary rounded-full" />
							</div>
						</div>
					) : filteredLevitas && filteredLevitas.length > 0 ? (
						filteredLevitas.map(levita => (
							<Card
								key={levita.id}
								className={`relative flex flex-col h-full items-center lg:items-start transition-all ${removeOverlay ? "animate-pulse" : ""
									} ${Cookies.get("levitaname") == levita.nome ? "border-special/30 bg-special/10" : ""
									}`}
							>
								<X
									className={`absolute transition-all self-end sm:self-start duration-500 ${removeOverlay
										? "hover:cursor-pointer p-1 size-6 bg-rose-500/80 hover:bg-rose-600 rounded-bl-xl sm:rounded-bl-none sm:rounded-br-xl animate-none"
										: "invisible"
										}`}
									onClick={() => {
										setLoadingRemove(true)
										deleteMethod(`v1/levita/${levita.id}`)
											.then(() => {
												setLoadingRemove(false)
												setReload(!reload)
												setLevitas(undefined)
												setFilteredLevita(undefined)
												setInstrumentos(undefined)
												setIsLoading(true)
												setRemoveOverlay(false)
											})
											.catch((error) => {
												alert("Erro ao remover o Levita!")
												console.error("Erro na comunicação com a api: ", error);
											})
									}}
								/>

								<CardHeader className="pb-3 items-center text-center lg:items-start lg:text-start">
									<CardTitle className={`text-base sm:text-lg ${Cookies.get("username") == levita.nome ? "text-special" : "text-primary"
										} leading-tight`}>
										{levita.nome}
									</CardTitle>
									<CardDescription className="text-xs sm:text-sm line-clamp-1">
										{levita.email ? levita.email : levita.contato}
									</CardDescription>
								</CardHeader>

								<CardContent className="flex-1 pb-3 space-y-3">
									{/* Instruments Carousel */}
									<div className="min-h-[2rem]">
										{levita.instrumentos.length > 0 ? (
											<Carousel className="w-fit max-w-48 lg:w-full lg:justify-self-start justify-self-center">
												<CarouselContent className="-ml-1">
													{levita.instrumentos.map(instrumento => (
														<CarouselItem key={instrumento.id} className="basis-auto pl-1">
															<Badge variant="outline" className="text-xs whitespace-nowrap">
																{instrumento.nome}
															</Badge>
														</CarouselItem>
													))}
												</CarouselContent>
											</Carousel>
										) : (
											<p className="text-xs text-muted-foreground">Sem instrumentos</p>
										)}
									</div>

									{/* Description */}
									<div className="min-h-[3rem] sm:min-h-[4rem] justify-self-center lg:justify-self-start">
										{levita.descricao ? (
											<CardDescription className="text-xs sm:text-sm text-subprimary line-clamp-3">
												{levita.descricao}
											</CardDescription>
										) : (
											<CardDescription className="text-xs sm:text-sm line-clamp-3">
												Levita sem descrição.
											</CardDescription>
										)}
									</div>
								</CardContent>

								<CardFooter className="pt-3 justify-center">
									<DialogVerLevita
										key={levita.id}
										levita={levita}
										disabled={removeOverlay}
										setLevitas={setLevitas}
									/>
								</CardFooter>
							</Card>
						))
					) : (
						<div className="col-span-full flex flex-col items-center justify-center py-16 sm:py-20 text-center">
							<p className="text-lg sm:text-xl text-muted-foreground mb-2">
								Nenhum levita encontrado
							</p>
							<p className="text-sm text-muted-foreground">
								Tente ajustar os filtros ou busca
							</p>
						</div>
					)}
				</div>
			</main>
			<AppSidebar side="right" />
		</SidebarProvider>
	);
}