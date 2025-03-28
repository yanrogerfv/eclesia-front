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
import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { ChevronLeft, Filter, FilterX, ListFilter, UserMinus, X } from "lucide-react";
import { DialogAddLevita, DialogVerLevita } from "@/components/modals/dialog-levita";
import { Input } from "@/components/ui/input";
import { UUID } from "crypto";
import { Levita, Instrumento } from "@/lib/apiObjects";
import { SidebarFiltroLevita } from "@/components/sidebar";
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

	useEffect(() => {
		if (!filteredLevitas)
			setFilteredLevita(levitas)
		if (levitas && instrumentos) return;
		getMethod<Levita[] | undefined>("levita/resumed", setLevitas);
		getMethod<Instrumento[] | undefined>("instrumento", setInstrumentos);
	}, [levitas, instrumentos])

	useEffect(() => {
		if (levitas && instrumentos)
			setIsLoading(false)
	}, [levitas, instrumentos])

	useEffect(() => {
		if (!levitas) return;
		if (filteredInstruments.length === 0)
			setFilteredLevita(levitas.filter((levita) => levita.nome.toLowerCase().includes(searchItem.toLowerCase())))
		else
			setFilteredLevita(levitas.filter((levita) => levita.nome.toLowerCase().includes(searchItem.toLowerCase())
				&& levita.instrumentos.some((instrumento) => filteredInstruments.some((filteredInstrument) => filteredInstrument.id === instrumento.id))))

	}, [searchItem, filteredInstruments])

	function addInstrumentoInFilter(instrumento: Instrumento) {
		setFilteredInstruments([...filteredInstruments, instrumento])
	}
	function removeInstrumentoInFilter(instrumento: Instrumento) {
		setFilteredInstruments(filteredInstruments.filter((filteredInstrument) => filteredInstrument.id !== instrumento.id))
	}

	return (
		<SidebarProvider defaultOpen={false}>
			<main className="max-w-6xl w-full mx-auto my-12">
				{//Cabeçalho, botões para inserir e remover um levita.
					<>
						<div className="flex items-center gap-3 justify-between">
							<div className="flex">
								<Link href="/v0" className="w-auto text-4xl justify-center items-center p-2 cursor-pointer outline outline-1 outline-primary/50 hover:bg-secondary hover:text-black rounded-lg">
									<ChevronLeft className="size-10" />
								</Link>
								<h1 className="mx-5 font-extrabold tracking-tight text-5xl">Levitas</h1>
							</div>
							<div>
								{(sessionStorage.getItem("role") == "ADMIN" || sessionStorage.getItem("role") == "LIDER") && <DialogAddLevita />}
								{(sessionStorage.getItem("role") == "ADMIN" || sessionStorage.getItem("role") == "LIDER") &&
									<Button variant="outline" className={removeOverlay ? "mx-2 font-bold bg-rose-500/80 border-rose-600/90 hover:bg-rose-600/40"
										: "mx-2 font-bold hover:bg-rose-500/40"}
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
						<Filter
							className="w-auto text-4xl justify-center size-9 p-1 outline outline-1 outline-primary/45 bg-secondary/30 hover:bg-secondary/20 text-black rounded-md" />
						:
						<Sheet>
							<SheetTrigger asChild>
								{filteredInstruments.length == 0 ?
									<Filter className="w-auto text-4xl justify-center size-[2.4rem] p-1 cursor-pointer outline outline-1 outline-border hover:bg-secondary/80 hover:text-black rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" /> :
									<FilterX onClick={() => setFilteredInstruments([])}
										className="w-auto text-4xl justify-center size-[2.4rem] p-1 cursor-pointer outline outline-1 outline-red-500/45 hover:bg-red-500 hover:text-black rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
								}
							</SheetTrigger>
							<SheetContent>
								<SheetHeader>
									<SheetTitle>Filtrar Levitas</SheetTitle>
									<SheetDescription>
										Filtre os Levitas por instrumento.
									</SheetDescription>
								</SheetHeader>
								<div className="grid grid-cols-1 space-y-1">
									<br />
									{instrumentos?.map((instrumento) => (
										<div key={instrumento.id} className="flex items-center space-x-2">
											<Checkbox id="terms" onClick={() => {
												if (filteredInstruments.some((filteredInstrument) => filteredInstrument.id === instrumento.id)) {
													removeInstrumentoInFilter(instrumento)
												} else {
													addInstrumentoInFilter(instrumento)
												}
											}} />
											<Label
												htmlFor="terms"
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
												{instrumento.nome}
											</Label>
											<br />
										</div>
									))}
								</div>
								<SheetFooter>
									<SheetClose asChild>
										<Button type="submit">Salvar</Button>
									</SheetClose>
								</SheetFooter>
							</SheetContent>
						</Sheet>}
					<Input disabled={isLoading} className="flex" type="text"
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
								<Card key={levita.id} className={`${removeOverlay ? "animate-pulse" : ""} ${Cookies.get("username") == levita.nome ? "border-special/30 bg-special/10" : ""}`}>
									<X className={removeOverlay ? "absolute hover:cursor-pointer p-1 size-6 bg-rose-500/80 rounded-br-xl animate-none" : "absolute invisible"} onClick={() => {
										setLoadingRemove(true)
										deleteMethod(`levita/${levita.id}`)
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
											disabled={removeOverlay} />
										{/* <BadgeDisponivel disp={levita.disponivel} chav={levita.id.toString()} /> */}
									</CardFooter>
								</Card>
							)))
					}
				</div>
			</main>
			<SidebarTrigger className="border" />
			<AppSidebar lado="right" />
		</SidebarProvider>
	);
}
