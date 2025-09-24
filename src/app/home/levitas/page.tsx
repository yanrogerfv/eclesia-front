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
		if (levitas && instrumentos){
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
			<main className="max-w-6xl w-full mx-auto my-12">
				{//Cabeçalho, botões para inserir e remover um levita.
					<>
						<div className="flex items-center gap-3 justify-between">
							<div className="flex">
								<BackButton />
								<h1 className="mx-5 font-extrabold tracking-tight text-5xl">Levitas</h1>
							</div>
							<div>
								{isAdminOrLeader && <DialogAddLevita disable={isLoading} setLevitas={setLevitas}/>}
								{isAdminOrLeader &&
									<Button variant="outline" className={removeOverlay ? "mx-2 font-bold bg-rose-500/80 border-rose-600/90 hover:bg-rose-600/40"
										: "mx-2 font-bold hover:bg-rose-500/40"} disabled={isLoading}
										onClick={() => setRemoveOverlay(!removeOverlay)}>
										<UserMinus className="mr-2" />Remover Levita</Button>}
							</div>
						</div>
						<br />
						<h2 className="scroll-m-20 border-b text-base text-neutral-700 tracking-tight transition-colors first:mt-0">
							{isLoading ? "Carregando Levitas..." : "Visualizando Levitas"}</h2>
						<br />
					</>
				}
				<div className="flex w-full items-center space-x-2 col-span-4">
					{isLoading ?
						<ListFilter
							className="w-auto text-4xl justify-center size-9 p-2 outline outline-1 outline-primary/45 bg-secondary/30 hover:bg-secondary/20 text-black rounded-md" />
						:
						<SheetFiltroLevita
							disabled={isLoading}
							filteredInstruments={filteredInstruments}
							setFilteredInstruments={setFilteredInstruments}
							instrumentos={instrumentos}
						/>
					}
					<Input disabled={isLoading} className="flex focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" type="text"
						value={searchItem} onChange={(e) => setSearchItem(e.target.value)} placeholder="Procure por um Levita" />
				</div>
				<br />

				<div className="grid grid-cols-4 gap-8">

					{
						isLoading ? (
							<div className="col-span-4 h-full flex items-center justify-center mt-20">
								<div className="size-80 border-4 border-transparent text-primary/40 text-4xl animate-spin flex items-center justify-center border-t-primary rounded-full">
									<div className="size-64 border-4 border-transparent text-subprimary/40 text-2xl animate-spin flex items-center justify-center border-t-subprimary rounded-full" />
								</div>
							</div>
						) : (
							filteredLevitas?.map(levita => (
								<Card key={levita.id} className={`${removeOverlay ? "animate-pulse" : ""} ${Cookies.get("levitaname") == levita.nome ? "border-special/30 bg-special/10" : ""}`}>
									<X className={removeOverlay ? "absolute hover:cursor-pointer p-1 size-6 bg-rose-500/80 rounded-br-xl animate-none" : "absolute invisible"} onClick={() => {
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
									}} />
									<CardHeader >
										<CardTitle className={Cookies.get("username") == levita.nome ? "text-special" : "text-primary"}>{levita.nome}
										</CardTitle>
										<CardDescription>
											{levita.email ? levita.email : levita.contato}
										</CardDescription>
									</CardHeader>
									<CardContent key={levita.id} className="h-28">
										<Carousel className="w-full">
											<CarouselContent className="-ml-1 flex">
												{levita.instrumentos.map(instrumento => (
													<CarouselItem key={instrumento.id} className="basis-auto pl-0">
														<Badge key={instrumento.id} variant={"outline"} className=""> {instrumento.nome} </Badge>
													</CarouselItem>
												))}
											</CarouselContent>
										</Carousel>
										{levita.descricao ?
											<CardDescription className="p-1 pt-4 text-subprimary">
												{levita.descricao}
											</CardDescription>
											: <CardDescription className="p-1 pt-4">
												Levita sem descrição.
											</CardDescription>}
									</CardContent>
									<CardFooter className="flex justify-stretch">
										<DialogVerLevita key={levita.id}
											levita={levita}
											disabled={removeOverlay} 
											setLevitas={setLevitas}/>
										{/* <BadgeDisponivel disp={levita.disponivel} chav={levita.id.toString()} /> */}
									</CardFooter>
								</Card>
							)))
					}
				</div>
			</main>
			<AppSidebar side="right" />
		</SidebarProvider>
	);
}
