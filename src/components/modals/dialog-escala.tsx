"use client"

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Escala, EscalaResumida, Levita, Musica, convertDateFormat } from "@/lib/apiObjects";
import { Button } from "../ui/button";
import { CirclePlus, Loader2, LoaderCircle, PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { randomUUID, UUID } from "crypto";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { Card } from "../ui/card";
import Link from "next/link";
import { getMethod, postMethod, publicGetMethod, putMethod } from "@/lib/apiRequests";
import Cookies from "js-cookie";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";
import SelectLevita from "../select-levita";
import CheckboxConfetti from "../ui/checkbox-animated";

interface props {
	escalaId: UUID,
	levitasDisponiveis: Levita[] | undefined
}

export function VerEscalaSomenteLeitura({ escalaId }: { escalaId: UUID }) {
	const [escalaData, setEscalaData] = useState<Escala | undefined>(undefined)
	const [escalaMusicas, setEscalaMusicas] = useState<Musica[] | undefined>(undefined)

	useEffect(() => {
		if (escalaData && escalaMusicas) return;
		publicGetMethod<Escala | undefined>(`v1/escala/find/${escalaId}`, setEscalaData)
		publicGetMethod<Musica[] | undefined>(`v1/escala/musicas/${escalaId}`, setEscalaMusicas)
	}, [escalaData, escalaMusicas])

	return (
		<Dialog>
			<DialogTrigger asChild key={escalaData?.id} className="p-5">
				<Button variant={"outline"} disabled={(!escalaData)} className="flex items-center rounded-md justify-center">Ver Escala</Button>
			</DialogTrigger>
			<DialogContent className="w-[85%] max-h-[90vh] overflow-y-auto">
				{!escalaData ?
					<div className="absolute w-full h-[85%] bg-black/50 z-50 flex justify-center items-center">
						<div className="h-16 w-16 border-4 border-subprimary rounded-3xl animate-spin" />
					</div>
					: <></>}
				<DialogHeader>
					<DialogTitle className={"text-2xl " + (escalaData?.domingo ? "text-primary/80" :
						escalaData?.quarta ? "text-secondary/80" : "text-special"
					)}>{escalaData?.titulo}</DialogTitle>
					<DialogDescription className="border-b border-zinc-600">
						{convertDateFormat(escalaData ? escalaData.data : undefined)}
					</DialogDescription>

					<div className="text-start">
						<p className="text-special">Ministro: {escalaData?.ministro ? <a className="text-secondary">{escalaData?.ministro.nome}</a> : <span className="text-colortext/50">Não inserido.</span>}</p>
						<p className="text-subprimary">Violão: {escalaData?.violao ? <a className="text-colortext"> {escalaData.violao.nome}</a> : <a className="text-colortext/50">Não inserido.</a>}</p>
						<p className="text-subprimary">Teclado: {escalaData?.teclado ? <a className="text-colortext"> {escalaData.teclado.nome}</a> : <a className="text-colortext/50">Não inserido.</a>}</p>
						<p className="text-subprimary">Bateria: {escalaData?.bateria ? <a className="text-colortext"> {escalaData.bateria.nome}</a> : <a className="text-colortext/50">Não inserido.</a>}</p>
						<p className="text-subprimary">Baixo: {escalaData?.baixo ? <a className="text-colortext"> {escalaData.baixo.nome}</a> : <a className="text-colortext/50">Não inserido.</a>}</p>
						<p className="text-subprimary">Guitarra: {escalaData?.guitarra ? <a className="text-colortext"> {escalaData.guitarra.nome}</a> : <a className="text-colortext/50">Não inserido.</a>}</p>
						<p className="text-subprimary">Backs: {escalaData ? <a className="text-colortext"> {listBacks(escalaData.back)}</a> : <a className="text-colortext/50">Não inseridos.</a>}</p>
					</div>

				</DialogHeader>
				<Label className="text-secondary/85">Observações:</Label>
				{escalaData?.observacoes ? <p className="text-colortext line-clamp-3">{escalaData?.observacoes}</p> : <p className="text-colortext/50">Nenhuma observação.</p>}

				<Label className="text-secondary/85">Músicas:</Label>
				<Card className="bg-transparent grid p-2">
					{escalaMusicas ? escalaMusicas.length > 0 ?
						escalaMusicas.map((musica) => (
							<Button key={musica.id} variant={"outline"} className="rounded-lg m-2">
								<Link key={musica.id} href={musica.link} target="_blank" className="">
									<p className="sm:hidden">
										{musica.nome.substring(0, 25) + (musica.nome.length > 25 ? "..." : "")}
									</p>
									<p className="hidden sm:block">
										{musica.nome}
									</p>
								</Link>
							</Button>
						)) : <p className="text-colortext/50">Nenhuma música inserida.</p>
						: <p className="text-colortext/50">Carregando músicas...</p>}
				</Card>
			</DialogContent>
		</Dialog>
	)
}

export function VerEscala(props: props) {
	const [escalaData, setEscalaData] = useState<Escala | undefined>(undefined)
	const [escalaMusicas, setEscalaMusicas] = useState<Musica[] | undefined>(undefined)

	useEffect(() => {
		if (escalaData && escalaMusicas) return;
		getMethod<Escala | undefined>(`v1/escala/find/${props.escalaId}`, setEscalaData)
		getMethod<Musica[] | undefined>(`v1/escala/musicas/${props.escalaId}`, setEscalaMusicas)
	}, [escalaData, escalaMusicas, props.escalaId])

	const [isUserAdmin, setUserAdmin] = useState(false)
	const [isUserLeader, setUserLeader] = useState(false)
	const [isUserMinistro, setUserMinistro] = useState(false)

	useEffect(() => {
		// This code now runs only on the client side, avoiding the ReferenceError
		const userAdmin = sessionStorage.getItem("role") === "ADMIN";
		setUserAdmin(userAdmin);
		const userLeader = sessionStorage.getItem("role") === "Líder";
		setUserLeader(userLeader);
		const userMinistro = sessionStorage.getItem("levita") === escalaData?.ministro.id;
		setUserMinistro(userMinistro);
	}, [escalaData?.ministro?.id]);

	return (
		<Dialog>
			<DialogTrigger asChild key={escalaData?.id} className="p-5">
				<Button variant={"outline"} disabled={(!escalaData)} className="flex items-center rounded-md justify-center">Ver Escala</Button>
			</DialogTrigger>
			<DialogContent className="w-[85%] max-h-[90vh] overflow-y-auto">
				{!escalaData ?
					<div className="absolute w-full h-[85%] bg-black/50 z-50 flex justify-center items-center">
						<div className="h-16 w-16 border-4 border-subprimary rounded-3xl animate-spin" />
					</div>
					: <></>}
				<DialogHeader>
					<DialogTitle className={"text-2xl " + (escalaData?.domingo ? "text-primary/80" :
						escalaData?.quarta ? "text-secondary/80" : "text-special"
					)}>{escalaData?.titulo}</DialogTitle>
					<DialogDescription className="border-b">
						{convertDateFormat(escalaData ? escalaData.data : undefined)}
					</DialogDescription>

					<div className="text-start">
						<p className="text-special">Ministro: {escalaData?.ministro ? <a className="text-secondary">{escalaData?.ministro.nome}</a> : <span className="text-colortext/50">Não inserido.</span>}</p>
						<p className="text-subprimary">Violão: {escalaData?.violao ? <a className="text-colortext"> {escalaData.violao.nome}</a> : <a className="text-colortext/50">Não inserido.</a>}</p>
						<p className="text-subprimary">Teclado: {escalaData?.teclado ? <a className="text-colortext"> {escalaData.teclado.nome}</a> : <a className="text-colortext/50">Não inserido.</a>}</p>
						<p className="text-subprimary">Bateria: {escalaData?.bateria ? <a className="text-colortext"> {escalaData.bateria.nome}</a> : <a className="text-colortext/50">Não inserido.</a>}</p>
						<p className="text-subprimary">Baixo: {escalaData?.baixo ? <a className="text-colortext"> {escalaData.baixo.nome}</a> : <a className="text-colortext/50">Não inserido.</a>}</p>
						<p className="text-subprimary">Guitarra: {escalaData?.guitarra ? <a className="text-colortext"> {escalaData.guitarra.nome}</a> : <a className="text-colortext/50">Não inserido.</a>}</p>
						<p className="text-subprimary">Backs: {escalaData?.back ? <a className="text-colortext"> {listBacks(escalaData.back)}</a> : <a className="text-colortext/50">Não inseridos.</a>}</p>
					</div>
				</DialogHeader>
				<Label className="text-secondary/85">Observações:</Label>
				{escalaData?.observacoes ? <p className="text-colortext line-clamp-3">{escalaData?.observacoes}</p> : <p className="text-colortext/50">Nenhuma observação.</p>}

				<Label className="text-secondary/85">Músicas:</Label>
				<Card className="bg-transparent grid md:p-2">
					{escalaMusicas ? escalaMusicas.length > 0 ?
						escalaMusicas.map((musica) => (
							<Button key={musica.id} variant={"outline"} className="rounded-lg m-2">
								<Link key={musica.id} href={musica.link} target="_blank" className="">
									<p className="sm:hidden">
										{musica.nome.substring(0, 25) + (musica.nome.length > 25 ? "..." : "")}
									</p>
									<p className="hidden sm:block">
										{musica.nome}
									</p>
								</Link>
							</Button>
						)) : <p className="text-colortext/50">Nenhuma música inserida.</p>
						: <p className="text-colortext/50">Carregando músicas...</p>}
				</Card>
				<DialogFooter className="sm:justify-between gap-4">
					{(isUserAdmin || isUserLeader) && <EditEscala isEdit={true} setEscala={setEscalaData}
						escala={escalaData} levitasDisponiveis={props.levitasDisponiveis} />}
					{(isUserAdmin || isUserLeader || isUserMinistro) &&
						<DialogAddMusicaInEscala escala={escalaData} setMusicas={setEscalaMusicas} />}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export function listBacks(backs: Levita[]) {
	const backNames = new Array<string>();
	if (backs.length == 0) return "Nenhum back vocal inserido."
	backs.forEach((back) => {
		backNames.push(back.nome)
	})
	if (backNames.length > 1) {
		const lastBack = backNames.pop();
		return String(backNames.join(", ") + " e " + lastBack + ".")
	}
	return String(backNames.join(", ") + ".")
}

export function formatLevitaName(levita: Levita) : string {
	const name = levita.nome;
	if (name.length > 11) {
		if (name.split(" ").length > 1) {
			return name.split(" ")[0].concat(" ").concat(name.split(" ")[1].charAt(0)).concat(".")
		} else {
			return name;
		}
	} else {
		return name.substring(0, 11) + (name.length > 11 ? "..." : "");
	}
}

interface addEditDialogProps {
	isEdit: boolean,
	escala?: Escala | undefined,
	levitasDisponiveis: Levita[] | undefined;
	setEscala?: React.Dispatch<React.SetStateAction<Escala | undefined>>
}

export function EditEscala(pp: addEditDialogProps) {
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false)
	const levitasDisponiveis = pp.levitasDisponiveis;
	const [data, setData] = useState(pp.escala?.data.toString() || "");
	const [especial, setEspecial] = useState(pp.escala?.especial || false);
	const [titulo, setTitulo] = useState(pp.escala?.titulo || "");
	const [ministro, setMinistro] = useState(pp.escala?.ministro?.id || "");
	const [baixo, setBaixo] = useState(pp.escala?.baixo?.id || "");
	const [bateria, setBateria] = useState(pp.escala?.bateria?.id || "");
	const [guitarra, setGuitarra] = useState(pp.escala?.guitarra?.id || "");
	const [teclado, setTeclado] = useState(pp.escala?.teclado?.id || "");
	const [violao, setViolao] = useState(pp.escala?.violao?.id || "");
	const [backs, setBacks] = useState<String[]>(pp.escala?.back.map((back) => back.id) || []);
	const [observacao, setObservacao] = useState(pp.escala?.observacoes || "");

	function resetEditFields() {
		setData("");
		setEspecial(false);
		setTitulo("");
		setMinistro("");
		setBaixo("");
		setBateria("");
		setGuitarra("");
		setTeclado("");
		setViolao("");
		setBacks([]);
		setObservacao("");
	}

	function filterByInstrumento(instrumentoId: number) {
		return levitasDisponiveis && levitasDisponiveis.filter((levita) => levita.instrumentos.some((instrumento) => instrumento.id == instrumentoId))
	}

	function addBack(levitaId: String) {
		setBacks([...backs, levitaId])
	}
	function removeBack(levitaId: String) {
		setBacks(backs.filter((back) => back != levitaId))
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{pp.isEdit ?
					<Button variant={"outline"} className="hover:text-sky-500" disabled={!pp.levitasDisponiveis}>
						<PencilLine className="text-sky-500" />Editar Escala</Button>
					: <Button variant={"outline"} className="hover:text-emerald-500" disabled={!pp.levitasDisponiveis}>
						<CirclePlus className="mx-1 text-emerald-500" />Criar Escala</Button>
				}
			</DialogTrigger>
			<DialogContent className="w-[85%]">
				{isLoading ?
					<div className="absolute w-full h-[85%] bg-black/50 z-50 flex justify-center items-center">
						<div className="h-16 w-16 border-4 border-subprimary rounded-3xl animate-spin" />
					</div>
					: <></>}
				<DialogHeader>
					<DialogTitle>{pp.isEdit ? "Editando uma Escala" : "Criando uma Escala"}</DialogTitle>
					<DialogDescription>
						{pp.isEdit ? `Editando a escala ${pp.escala?.titulo}` : "Adicione uma nova escala ao planejador."}
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className="max-h-[47dvh]">
					<div className="p-1 w-[97%]">
						<div>
							<Label>Título:</Label>
							<Input type="text" placeholder="Insira um título para a Escala."
								value={titulo} onChange={(e) => setTitulo(e.target.value)} />
						</div>
						<div className="w-full space-y-1 my-4">
							<Label>Data:</Label>
							<Input type="date" placeholder={pp.escala?.data.toString()}
								value={data} onChange={(e) => setData(e.target.value)} />
						</div>
						<div className="w-full space-y-1 my-4">
							<CheckboxConfetti value={especial} title="Especial:" onClick={() => setEspecial(!especial)} />
						</div>

						<SelectLevita
							value={ministro}
							instrumentoNome="Ministro"
							message={pp.isEdit && pp.escala?.ministro ? pp.escala?.ministro.nome : "Selecione um ministro."}
							setLevitaInInstrumento={setMinistro}
							filteredLevitas={filterByInstrumento(0)}
							alreadySelectedLevitaIds={[violao, teclado, bateria, baixo, guitarra]}
							disableFields={pp.escala?.data.toString().length == 0}
						/>

						<SelectLevita
							value={violao}
							instrumentoNome="Violão"
							message={pp.escala?.violao ? pp.escala.violao.nome : "Escolha um levita para tocar violão."}
							setLevitaInInstrumento={setViolao}
							filteredLevitas={filterByInstrumento(1)}
							alreadySelectedLevitaIds={[teclado, bateria, baixo, guitarra]}
							disableFields={pp.escala?.data.toString().length == 0}
						/>

						<SelectLevita
							value={teclado}
							instrumentoNome="Teclado"
							message={pp.escala?.teclado ? pp.escala.teclado.nome : "Escolha um levita para tocar teclado."}
							setLevitaInInstrumento={setTeclado}
							filteredLevitas={filterByInstrumento(2)}
							alreadySelectedLevitaIds={[violao, bateria, baixo, guitarra]}
							disableFields={pp.escala?.data.toString().length == 0}
						/>

						<SelectLevita
							value={bateria}
							instrumentoNome="Bateria"
							message={pp.escala?.bateria ? pp.escala.bateria.nome : "Escolha um levita para tocar bateria."}
							setLevitaInInstrumento={setBateria}
							filteredLevitas={filterByInstrumento(3)}
							alreadySelectedLevitaIds={[violao, teclado, baixo, guitarra]}
							disableFields={pp.escala?.data.toString().length == 0}
						/>

						<SelectLevita
							value={baixo}
							instrumentoNome="Baixo"
							message={pp.escala?.baixo ? pp.escala.baixo.nome : "Escolha um levita para tocar baixo."}
							setLevitaInInstrumento={setBaixo}
							filteredLevitas={filterByInstrumento(4)}
							alreadySelectedLevitaIds={[violao, teclado, bateria, guitarra]}
							disableFields={pp.escala?.data.toString().length == 0}
						/>

						<SelectLevita
							value={guitarra}
							instrumentoNome="Guitarra"
							message={pp.escala?.guitarra ? pp.escala.guitarra.nome : "Escolha um levita para tocar guitarra."}
							setLevitaInInstrumento={setGuitarra}
							filteredLevitas={filterByInstrumento(5)}
							alreadySelectedLevitaIds={[violao, teclado, bateria, baixo]}
							disableFields={pp.escala?.data.toString().length == 0}
						/>

						<div className="w-full space-y-1 my-4">
							<Label>Observação:</Label>
							<Textarea placeholder="Insira uma observação. (Exemplo: dia e hora de ensaio, etc.)"
								value={observacao} onChange={(e) => setObservacao(e.target.value)} />
						</div>

						<div className="w-full space-y-1 my-4">
							<Label>Backs:</Label>
							<Card className="bg-transparent grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
								{filterByInstrumento(0)?.filter(l => 
									ministro != l.id && violao != l.id && teclado != l.id && bateria != l.id && baixo != l.id && guitarra != l.id
								).map((levita) => (
									<Button key={levita.id} variant={backs.includes(levita.id) ? "default" : "outline"} type="submit"
										className={"p-2 rounded-lg m-2"}
										onClick={() => { backs.includes(levita.id) ? removeBack(levita.id) : addBack(levita.id) }}>
										{formatLevitaName(levita)}
									</Button>
								))}
							</Card>
						</div>
					</div>

				</ScrollArea>
				<p className={`text-center text-red-500 text-sm ${isLoading ? "opacity-50" : ""}
					${data != undefined && (ministro.length == 0 || ministro == "null") ? "" : "hidden"}`}>
					A escala está sem ministro selecionado!
				</p>
				<DialogFooter className={`gap-4 ${isLoading ? "opacity-50" : ""}`}>
					<Button variant={"cancel"} disabled={isLoading} onClick={() => setOpen(false)}>Cancelar</Button>
					<Button variant={"save"} disabled={isLoading} onClick={() => {
						if (titulo.length == 0) {
							toast.warning("Insira um título para a escala!")
						} else if (titulo.length < 3 || titulo.length > 50) {
							toast.warning("O título da escala deve ter entre 3 e 50 caracteres!")
						} else if (data.length == 0) {
							toast.warning("Insira uma data para a escala!")
						} else {
							setIsLoading(true)
							pp.escala ?
								putMethod<Escala>("v1/escala", {
									id: pp.escala.id,
									titulo: titulo.length == 0 ? pp.escala.titulo : titulo,
									data: data.length == 0 ? pp.escala.data : data,
									especial: especial,
									ministro: ministro == "null" ? null : ministro,
									violao: violao == "null" ? null : violao,
									teclado: teclado == "null" ? null : teclado,
									bateria: bateria == "null" ? null : bateria,
									baixo: baixo == "null" ? null : baixo,
									guitarra: guitarra == "null" ? null : guitarra,
									backs: backs,
									observacoes: observacao
								})
									.then(() => {
										setIsLoading(false);
										toast.success("Escala editada com sucesso!");
										resetEditFields();
										pp.setEscala && pp.setEscala(undefined);
										setOpen(false);
									})
									.catch((error) => {
										setIsLoading(false);
										toast.error("Erro ao editar escala!")
										console.error("Erro na comunicação com a api: ", error);
									})
								: toast.error("Escala não encontrada.")
						}
					}}>{pp.isEdit ? "Confirmar" : "Adicionar"}</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog >
	)
}

interface DialogAddEscalaProps {
	disabled?: boolean
	setEscalas?: React.Dispatch<React.SetStateAction<EscalaResumida[] | undefined>>
}
export function AddEscala(props: DialogAddEscalaProps) {
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false)
	const [levitasDisponiveis, setLevitasDisponiveis] = useState<Levita[] | undefined>(undefined);
	const [data, setData] = useState<string>();
	const [especial, setEspecial] = useState(false);
	const [titulo, setTitulo] = useState("");
	const [ministro, setMinistro] = useState("");
	const [baixo, setBaixo] = useState("");
	const [bateria, setBateria] = useState("");
	const [guitarra, setGuitarra] = useState("");
	const [teclado, setTeclado] = useState("");
	const [violao, setViolao] = useState("");
	const [backs, setBacks] = useState<String[]>([]);
	const [observacao, setObservacao] = useState<string>();

	let disableFields = data == undefined || data.length == 0 || levitasDisponiveis == undefined || levitasDisponiveis.length == 0


	useEffect(() => {
		const fetchData = async () => {
			if (data == undefined) return;
			setIsLoading(true)
			setLevitasDisponiveis(undefined)
			await getMethod<Levita[] | undefined>(`v1/levita/agenda?date=${data}`, setLevitasDisponiveis)
			setIsLoading(false)
		}
		fetchData();
	}, [data])


	function filterByInstrumento(instrumentoId: number) {
		return levitasDisponiveis && levitasDisponiveis.filter((levita) => levita.instrumentos.some((instrumento) => instrumento.id == instrumentoId))
		// return levitasDisponiveis.filter((levita) => levita.instrumentos.some((instrumento) => instrumento.id == instrumentoId))
	}

	function addBack(levitaId: String) {
		setBacks([...backs, levitaId])
	}
	function removeBack(levitaId: String) {
		setBacks(backs.filter((back) => back != levitaId))
	}

	function resetCreateFields() {
		setLevitasDisponiveis(undefined);
		setData(undefined);
		setEspecial(false);
		setTitulo("");
		setMinistro("");
		setBaixo("");
		setBateria("");
		setGuitarra("");
		setTeclado("");
		setViolao("");
		setBacks([]);
		setObservacao(undefined);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant={"outline"} className="hover:text-emerald-500" disabled={props.disabled}>
					<CirclePlus className="text-emerald-500" />Criar Escala</Button>
			</DialogTrigger>
			<DialogContent className="w-[85%]">
				{isLoading ?
					<div className="absolute w-full h-[85%] z-50 flex justify-center items-center">
						{/* Loader */}
						<div className="h-16 w-16 border-4 border-subprimary rounded-3xl animate-spin" />
					</div>
					: <></>}
				<DialogHeader className={isLoading ? "opacity-50 space-y-1.5" : ""} >
					<DialogTitle>{"Criando uma Escala"}</DialogTitle>
					<DialogDescription className="border-b grayscale">
						{"Adicione uma nova escala ao planejador."}
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className={`max-h-[47dvh] ${isLoading ? "opacity-50 space-y-1.5" : ""}`} >
					<div className="p-1 w-[97%]">
						<div>
							<Label>Título:</Label>
							<Input type="text" placeholder="Insira um título para a Escala." className="pr-2"
								value={titulo} onChange={(e) => setTitulo(e.target.value)} />
						</div>
						<div className="w-full space-y-1 my-4">
							<Label>Data:</Label>
							<Input type="date" value={data} onChange={(e) => setData(e.target.value)} className="" />
						</div>
						<div className="flex items-center justify-start gap-2 my-4">
							<CheckboxConfetti title="Especial" onClick={() => setEspecial(!especial)} />
						</div>
						<div className={`w-full ${!disableFields ? "hidden" : "flex"} justify-center items-center text-center`}>
							<div className="fixed w-2/3 mt-24 flex justify-center items-center">
								<h1 className="">
									{isLoading ? "Buscando levitas disponíveis..." :
										levitasDisponiveis == undefined ? "Escolha uma data para buscar os levitas disponíveis." :
											levitasDisponiveis.length == 0 ? "Nenhum levita disponível para a data selecionada." :
												"Levitas disponíveis carregados!"}
								</h1>
							</div>
						</div>
						<div className={disableFields ? "opacity-40 pointer-events-none select-none blur-[2px]" : ""}>

							<SelectLevita
								value={ministro}
								instrumentoNome="Ministro"
								message="Escolha um ministro."
								setLevitaInInstrumento={setMinistro}
								filteredLevitas={filterByInstrumento(0)}
								alreadySelectedLevitaIds={[violao, teclado, bateria, baixo, guitarra]}
								disableFields={disableFields}
							/>

							<SelectLevita
								value={violao}
								instrumentoNome="Violão"
								setLevitaInInstrumento={setViolao}
								filteredLevitas={filterByInstrumento(1)}
								alreadySelectedLevitaIds={[teclado, bateria, baixo, guitarra]}
								disableFields={disableFields}
							/>

							<SelectLevita
								value={teclado}
								instrumentoNome="Teclado"
								setLevitaInInstrumento={setTeclado}
								filteredLevitas={filterByInstrumento(2)}
								alreadySelectedLevitaIds={[violao, bateria, baixo, guitarra]}
								disableFields={disableFields}
							/>

							<SelectLevita
								value={bateria}
								instrumentoNome="Bateria"
								setLevitaInInstrumento={setBateria}
								filteredLevitas={filterByInstrumento(3)}
								alreadySelectedLevitaIds={[violao, teclado, baixo, guitarra]}
								disableFields={disableFields}
							/>

							<SelectLevita
								value={baixo}
								instrumentoNome="Baixo"
								setLevitaInInstrumento={setBaixo}
								filteredLevitas={filterByInstrumento(4)}
								alreadySelectedLevitaIds={[violao, teclado, bateria, guitarra]}
								disableFields={disableFields}
							/>

							<SelectLevita
								value={guitarra}
								instrumentoNome="Guitarra"
								setLevitaInInstrumento={setGuitarra}
								filteredLevitas={filterByInstrumento(5)}
								alreadySelectedLevitaIds={[violao, teclado, bateria, baixo]}
								disableFields={disableFields}
							/>

							<div className="w-full space-y-1 my-4">
								<Label>Observação:</Label>
								<Textarea placeholder="Insira uma observação. (Exemplo: dia e hora de ensaio, etc.)"
									value={observacao} onChange={(e) => setObservacao(e.target.value)} maxLength={255} disabled={disableFields} />
							</div>

							<div className="w-full space-y-1 my-4">
								<Label>Backs:</Label>
								<Card className="bg-transparent grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
									{filterByInstrumento(0)?.filter(l => 
										ministro != l.id && violao != l.id && teclado != l.id && bateria != l.id && baixo != l.id && guitarra != l.id
									).map((levita) => (
										<Button key={levita.id} variant={backs.includes(levita.id) ? "default" : "outline"} type="submit"
											className={"m-2"} disabled={disableFields}
											onClick={() => { backs.includes(levita.id) ? removeBack(levita.id) : addBack(levita.id) }}>{formatLevitaName(levita)}</Button>
									))}
								</Card>
							</div>
						</div>
					</div>
				</ScrollArea>
				<p className={`text-center text-red-500 text-sm ${isLoading ? "opacity-50" : ""}
					${data != undefined && (ministro.length == 0 || ministro == "null") ? "" : "hidden"}`}>
					A escala está sem ministro selecionado!
				</p>
				<DialogFooter className={`gap-4 ${isLoading ? "opacity-50" : ""}`}>
					<Button variant={"cancel"} disabled={isLoading} onClick={() => console.log(violao)}>Cancelar</Button>
					<Button variant={"save"} disabled={isLoading || disableFields} onClick={() => {
						if (titulo.length == 0) {
							toast.warning("Insira um título para a escala!")
						} else if (titulo.length < 3 || titulo.length > 50) {
							toast.warning("O título deve ter entre 3 e 50 caracteres!")
						} else if (!data || data.length == 0) {
							toast.warning("Insira uma data para a escala!")
						} else {
							setIsLoading(true)
							postMethod<Escala | undefined>("v1/escala", {
								ministro: ministro == "null" ? null : ministro,
								titulo: titulo,
								data: data,
								especial: especial,
								violao: violao == "null" ? null : violao,
								teclado: teclado == "null" ? null : teclado,
								bateria: bateria == "null" ? null : bateria,
								baixo: baixo == "null" ? null : baixo,
								guitarra: guitarra == "null" ? null : guitarra,
								backs: backs,
								observacoes: observacao
							})
								.then(() => {
									toast.success("Escala adicionada com sucesso!");
									props.setEscalas && props.setEscalas(undefined);
									resetCreateFields();
									setIsLoading(false);
									setOpen(false);
								})
								.catch((error) => {
									setIsLoading(false);
									toast.error("Erro ao adicionar escala!");
									console.error("Erro na comunicação com a api: ", error);
								})
						}
					}}>{"Adicionar"}</Button>
				</DialogFooter>
			</DialogContent>

		</Dialog >
	)
}

interface DialogAddMusicaInEscalaProps {
	escala: Escala | undefined,
	setMusicas?: React.Dispatch<React.SetStateAction<Musica[] | undefined>>
}
export function DialogAddMusicaInEscala(props: DialogAddMusicaInEscalaProps) {
	// const [musicas, setMusicas] = useState<Musica[]>();
	const [selectedMusicas, setSelectedMusicas] = useState<String[]>(props.escala?.musicas?.map((musica) => musica.id) || []);
	const [open, setOpen] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [musicas, setMusicas] = useState<Musica[] | undefined>(undefined);

	useEffect(() => {
		if (musicas) return;
		getMethod<Musica[] | undefined>("v1/musicas", setMusicas)
	}, [musicas])

	function getSelectedMusicas() {
		return musicas ? selectedMusicas.map((musicaId) => musicas.find((musica) => musica.id == musicaId)) : []
	}
	function addSelectedMusica(musicaId: String) {
		setSelectedMusicas([...selectedMusicas, musicaId])
	}
	function removeSelectedMusica(musicaId: String) {
		setSelectedMusicas(selectedMusicas.filter((musica) => musica != musicaId))
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant={"outline"} className={"hover:text-emerald-500 "} disabled={false}>
					<CirclePlus className="mx-1 text-emerald-500" />Adicionar Músicas</Button>
			</DialogTrigger>
			<DialogContent className="w-[85%] ">
				{isLoading ?
					<div className="absolute w-full h-[85%] z-50 flex justify-center items-center">
						<div className="h-16 w-16 border-4 border-subprimary rounded-3xl animate-spin" />
					</div>
					: <></>}
				<DialogHeader>
					<DialogTitle>Adicionar Música</DialogTitle>
					<DialogDescription className="border-b grayscale">
						Selecione as músicas que deseja adicionar a escala {props.escala?.titulo}.
					</DialogDescription>
				</DialogHeader>
				<Label>Músicas para adicionar:</Label>
				<Select onValueChange={(value) => addSelectedMusica(value)} disabled={!musicas}>
					<SelectTrigger>
						<SelectValue placeholder={"Selecione músicas."} />
					</SelectTrigger>
					<SelectContent>
						{Array.isArray(musicas) && musicas?.filter((musica) => !selectedMusicas.includes(musica.id)).map((musica) => (
							<SelectItem value={musica.id} key={musica.id} onSelect={() => addSelectedMusica(musica.id)}>{musica.nome}</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Label>Músicas selecionadas:</Label>
				<Card className="bg-transparent grid grid-flow-row mb-4 gap-2 max-h-[42dvh] md:max-h-[50dvh] overflow-y-auto border rounded">
					{getSelectedMusicas().map((musica) => (
						<Button key={musica?.id} variant={"outline"} type="submit" className="p-2 rounded-lg m-2 hover:bg-red-400/50"
							onClick={() => removeSelectedMusica(musica ? musica.id : "")}>{musica?.nome}</Button>
					))}
				</Card>

				<DialogFooter className="flex justify-between gap-4">
					<Button variant={"cancel"} onClick={() => setOpen(false)}>Cancelar</Button>
					<Button variant={"save"} type="submit" disabled={isLoading} onClick={() => {
						setLoading(true)
						putMethod(`v1/escala/musicas/${props.escala?.id}`, { musicasIds: selectedMusicas })
							.catch((error) => toast.error("Erro ao adicionar músicas!", error))
							.then(() => toast.success("Músicas adicionadas com sucesso!"))
							.then(() => props.setMusicas && props.setMusicas(undefined))
							.then(() => setLoading(false))
							.then(() => setOpen(false))
						setLoading(false)
					}}>Salvar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}