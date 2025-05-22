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
import { getMethod, postMethod, putMethod } from "@/lib/apiRequests";
import Cookies from "js-cookie";
import { Checkbox } from "../ui/checkbox";
import { DayPicker } from "react-day-picker";
import { toast } from "sonner";

interface props {
	escalaId: UUID,
	levitasDisponiveis: Levita[] | undefined
}

export function VerEscala(props: props) {
	const [escalaData, setEscalaData] = useState<Escala | undefined>(undefined)
	const [escalaMusicas, setEscalaMusicas] = useState<Musica[] | undefined>(undefined)

	useEffect(() => {
		if (escalaData && escalaMusicas) return;
		getMethod<Escala | undefined>(`v1/escala/${props.escalaId}`, setEscalaData)
	}, [escalaData, props.escalaId])

	useEffect(() => {
		if (escalaMusicas) return;
		getMethod<Musica[] | undefined>(`v1/escala/musicas/${props.escalaId}`, setEscalaMusicas)
		console.log("called", escalaMusicas)
	}, [escalaMusicas])

	const [isUserAdmin, setUserAdmin] = useState(false)
	const [isUserLeader, setUserLeader] = useState(false)
	const [isUserMinistro, setUserMinistro] = useState(false)

	useEffect(() => {
		// This code now runs only on the client side, avoiding the ReferenceError
		const userAdmin = sessionStorage.getItem("role") === "ADMIN";
		setUserAdmin(userAdmin);
		const userLeader = sessionStorage.getItem("role") === "LIDER";
		setUserLeader(userLeader);
		const userMinistro = sessionStorage.getItem("levita") === escalaData?.ministro.id;
		setUserMinistro(userMinistro);
	}, [escalaData?.ministro.id]);

	return (
		<Dialog>
			<DialogTrigger asChild key={escalaData?.id} className="p-5">
				<Button variant={"outline"} disabled={(!escalaData)} className="flex items-center rounded-md justify-center">Ver Escala</Button>
			</DialogTrigger>
			<DialogContent>
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
					<br />
					<p className="text-special">Ministro: <a className="text-secondary">{escalaData?.ministro.nome}</a></p>
					<p className="text-subprimary">Violão: {escalaData?.violao ? <a className="text-colortext"> {escalaData.violao.nome}</a> : <a className="text-colortext/50">Não inserido.</a>}</p>
					<p className="text-subprimary">Teclado: {escalaData?.teclado ? <a className="text-colortext"> {escalaData.teclado.nome}</a> : <a className="text-colortext/50">Não inserido.</a>}</p>
					<p className="text-subprimary">Bateria: {escalaData?.bateria ? <a className="text-colortext"> {escalaData.bateria.nome}</a> : <a className="text-colortext/50">Não inserido.</a>}</p>
					<p className="text-subprimary">Baixo: {escalaData?.baixo ? <a className="text-colortext"> {escalaData.baixo.nome}</a> : <a className="text-colortext/50">Não inserido.</a>}</p>
					<p className="text-subprimary">Guitarra: {escalaData?.guitarra ? <a className="text-colortext"> {escalaData.guitarra.nome}</a> : <a className="text-colortext/50">Não inserido.</a>}</p>
					<p className="text-subprimary">Backs: {escalaData ? <a className="text-colortext"> {listBacks(escalaData.back)}.</a> : <a className="text-colortext/50">Não inseridos.</a>}</p>
					<br />

				</DialogHeader>
				<Label className="text-secondary/85">Observações:</Label>
				{escalaData?.observacoes ? <p className="text-colortext">{escalaData?.observacoes}</p> : <p className="text-foreground/25">Nenhuma observação.</p>}
				<br />

				<Label className="text-secondary/85">Músicas:</Label>
				<Card className="bg-transparent grid grid-flow-row p-2">
					{escalaMusicas ? escalaMusicas.length > 0 ?
						escalaMusicas.map((musica) => (
							<Button key={musica.id} variant={"outline"} className="rounded-lg m-2">
								<Link key={musica.id} href={musica.link} target="_blank" className="w-full">
									{musica.nome}</Link></Button>
						)) : <p className="text-foreground/25">Nenhuma música inserida.</p>
					: <p className="text-foreground/25">Carregando músicas...</p>}
				</Card>
				<DialogFooter>
					{(isUserAdmin || isUserLeader || isUserMinistro) &&
						<DialogAddMusicaInEscala escala={escalaData} setMusicas={setEscalaMusicas}/>}
					{(isUserAdmin || isUserLeader) && <EditEscala isEdit={true} setEscala={setEscalaData}
						escala={escalaData} levitasDisponiveis={props.levitasDisponiveis} />}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export function listBacks(backs: Levita[]) {
	const backNames = new Array<string>();
	backs.forEach((back) => {
		backNames.push(back.nome)
	})

	return String(backNames.join(", "))
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
			<DialogContent >
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
					<Label>Título:</Label>
					<Input type="text" placeholder="Insira um título para a Escala."
						value={titulo} onChange={(e) => setTitulo(e.target.value)} />
					<Label>Data:</Label>
					<Input type="date" placeholder={pp.escala?.data.toString()}
						value={data} onChange={(e) => setData(e.target.value)} />
					<div className="my-2">
						<Label>Especial:    </Label>
						<Checkbox checked={pp.escala?.especial} onClick={() => setEspecial(!especial)} />
					</div>

					<Label>Ministro</Label>
					<Select onValueChange={(value) => setMinistro(value)} disabled={pp.escala?.data.toString().length == 0}>
						<SelectTrigger>
							<SelectValue placeholder={pp.isEdit ? pp.escala?.ministro.nome : "Selecione um ministro."} />
						</SelectTrigger>
						<SelectContent>
							{levitasDisponiveis?.map((levita) => (
								<SelectItem value={levita.id} key={levita.id} onSelect={() => setMinistro(levita.nome)}>{levita.nome}</SelectItem>
							))}
						</SelectContent>
					</Select>
					<br />

					<Label>Violão</Label>
					<Select onValueChange={(value) => setViolao(value)} disabled={pp.escala?.data.toString().length == 0}>
						<SelectTrigger>
							<SelectValue className={pp.escala?.violao ? "text-colortext" : "text-colortext/50"}
								placeholder={pp.escala?.violao ? pp.escala.violao.nome : "Escolha um levita para tocar violão."} />
						</SelectTrigger>
						<SelectContent>
							{filterByInstrumento(1)?.map((levita) => (
								<SelectItem value={levita.id} key={levita.id} onSelect={() => setViolao(levita.id)}>{levita.nome}</SelectItem>
							))}
							<SelectItem value={"null"} onSelect={() => setViolao("")} className="text-zinc-400">Sem violão</SelectItem>
						</SelectContent>
					</Select>
					<br />

					<Label>Teclado</Label>
					<Select onValueChange={(value) => setTeclado(value)} disabled={pp.escala?.data.toString().length == 0}>
						<SelectTrigger>
							<SelectValue className={pp.escala?.teclado ? "text-white" : "text-zinc-50/50"}
								placeholder={pp.escala?.teclado ? pp.escala.teclado.nome : "Escolha um levita para tocar teclado."} />
						</SelectTrigger>
						<SelectContent>
							{filterByInstrumento(2)?.map((levita) => (
								<SelectItem value={levita.id} key={levita.id} onSelect={() => setTeclado(levita.id)}>{levita.nome}</SelectItem>
							))}
							<SelectItem value={"null"} onSelect={() => setTeclado("")} className="text-zinc-400">Sem teclado</SelectItem>
						</SelectContent>
					</Select>
					<br />

					<Label>Bateria</Label>
					<Select onValueChange={(value) => setBateria(value)} disabled={pp.escala?.data.toString().length == 0}>
						<SelectTrigger>
							<SelectValue className={pp.escala?.bateria ? "text-white" : "text-zinc-50/50"}
								placeholder={pp.escala?.bateria ? pp.escala.bateria.nome : "Escolha um levita para tocar bateria."} />
						</SelectTrigger>
						<SelectContent>
							{filterByInstrumento(3)?.map((levita) => (
								<SelectItem value={levita.id} key={levita.id} onSelect={() => setBateria(levita.id)}>{levita.nome}</SelectItem>
							))}
							<SelectItem value={"null"} onSelect={() => setBateria("")} className="text-zinc-400">Sem bateria</SelectItem>
						</SelectContent>
					</Select>
					<br />

					<Label>Baixo</Label>
					<Select onValueChange={(value) => setBaixo(value)} disabled={pp.escala?.data.toString().length == 0}>
						<SelectTrigger>
							<SelectValue className={pp.escala?.baixo ? "text-white" : "text-zinc-50/50"}
								placeholder={pp.escala?.baixo ? pp.escala.baixo.nome : "Escolha um levita para tocar baixo."} />
						</SelectTrigger>
						<SelectContent>
							{filterByInstrumento(4)?.map((levita) => (
								<SelectItem value={levita.id} key={levita.id} onSelect={() => setBaixo(levita.id)}>{levita.nome}</SelectItem>
							))}
							<SelectItem value={"null"} onSelect={() => setBaixo("")} className="text-zinc-400">Sem baixo</SelectItem>
						</SelectContent>
					</Select>
					<br />

					<Label>Guitarra</Label>
					<Select onValueChange={(value) => setGuitarra(value)} disabled={pp.escala?.data.toString().length == 0}>
						<SelectTrigger>
							<SelectValue className={pp.escala?.guitarra ? "text-white" : "text-zinc-50/50"}
								placeholder={pp.escala?.guitarra ? pp.escala.guitarra.nome : "Escolha um levita para tocar guitarra."} />
						</SelectTrigger>
						<SelectContent>
							{filterByInstrumento(5)?.map((levita) => (
								<SelectItem value={levita.id} key={levita.id} onSelect={() => setGuitarra(levita.id)}>{levita.nome}</SelectItem>
							))}
							<SelectItem value={"null"} onSelect={() => setGuitarra("")} className="text-zinc-400">Sem guitarra</SelectItem>
						</SelectContent>
					</Select>
					<br />

					<Label>Observação:</Label>
					<Textarea placeholder="Insira uma observação. (Ex: Dia e hora de ensaio, local de apresentação, etc.)"
						value={pp.escala?.observacoes} onChange={(e) => setObservacao(e.target.value)} />
					<br />

					<Label>Backs:</Label>
					<Card className="bg-transparent grid grid-cols-4">
						{filterByInstrumento(0)?.map((levita) => (
							<Button key={levita.id} variant={backs.includes(levita.id) ? "default" : "outline"} type="submit"
								className={"p-2 rounded-lg m-2"}
								onClick={() => { backs.includes(levita.id) ? removeBack(levita.id) : addBack(levita.id) }}>{levita.nome}</Button>
						))}
					</Card>
					<br />

				</ScrollArea>
				<DialogFooter>
					<Button className="hover:bg-emerald-500" disabled={isLoading} onClick={() => {
						if (titulo.length == 0) {
							toast.warning("Insira um título para a escala!")
						} else if (data.length == 0) {
							toast.warning("Insira uma data para a escala!")
						} else if (ministro.length == 0) {
							toast.warning("Selecione um ministro!")
						}
						else {
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
								.then(() => setIsLoading(false))
								.then(() => toast.success("Escala editada com sucesso!"))
								.then(() => pp.setEscala && pp.setEscala(undefined))
								.then(() => setOpen(false))
								.catch((error) => {
									toast.error("Erro ao editar escala!")
									console.error("Erro na comunicação com a api: ", error);
								})
								: toast.error("Escala não encontrada.")
						}
					}}>{pp.isEdit ? "Confirmar" : "Adicionar"}</Button>
					<Button className="hover:bg-rose-700" disabled={isLoading} onClick={() => setOpen(false)}>Cancelar</Button>
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

	let disableFields =
		data == undefined || data.length == 0 || levitasDisponiveis == undefined || levitasDisponiveis.length == 0


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

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant={"outline"} className="hover:text-emerald-500" disabled={props.disabled}>
					<CirclePlus className="mx-1 text-emerald-500" />Criar Escala</Button>
			</DialogTrigger>
			<DialogContent >
				{isLoading ?
					<div className="absolute w-full h-[85%] z-50 flex justify-center items-center">
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
					<Label>Título:</Label>
					<Input type="text" placeholder="Insira um título para a Escala."
						value={titulo} onChange={(e) => setTitulo(e.target.value)} />
					<Label>Data:</Label>
					{/* <DayPicker onDayClick={(day) => setData(day.toISOString())} /> */}
					<Input type="date" value={data} onChange={(e) => setData(e.target.value)} />
					<div className="flex items-center justify-start gap-2 my-4">
						<Label>Especial:</Label>
						<Checkbox className="" onClick={() => setEspecial(!especial)} />
					</div>

					<Label>Ministro</Label>
					<Select onValueChange={(value) => setMinistro(value)} disabled={disableFields}>
						<SelectTrigger>
							<SelectValue placeholder={"Selecione um ministro."} />
						</SelectTrigger>
						<SelectContent>
							{levitasDisponiveis?.map((levita) => (
								<SelectItem value={levita.id} key={levita.id} onSelect={() => setMinistro(levita.nome)}>{levita.nome}</SelectItem>
							))}
						</SelectContent>
					</Select>
					<br />

					<Label>Violão</Label>
					<Select onValueChange={(value) => setViolao(value)} disabled={disableFields}>
						<SelectTrigger>
							<SelectValue className={"text-white"}
								placeholder={"Escolha um levita para tocar violão."} />
						</SelectTrigger>
						<SelectContent>
							{filterByInstrumento(1)?.length != 0 ?
								<>
									{filterByInstrumento(1)?.map((levita) => (
										<SelectItem value={levita.id} key={levita.id}
											onSelect={() => setViolao(levita.id)}>{levita.nome}</SelectItem>
									))}
									<SelectItem value={"null"} onSelect={() => setViolao("")} className="text-zinc-400">Sem violão</SelectItem>
								</>
								:
								<SelectItem value={"null"} onSelect={() => setViolao("")} className="text-zinc-400">Sem violão disponível</SelectItem>
							}
						</SelectContent>
					</Select>
					<br />

					<Label>Teclado</Label>
					<Select onValueChange={(value) => setTeclado(value)} disabled={disableFields}>
						<SelectTrigger>
							<SelectValue className={"text-zinc-50/50"}
								placeholder={"Escolha um levita para tocar teclado."} />
						</SelectTrigger>
						<SelectContent>
							{filterByInstrumento(2)?.map((levita) => (
								<SelectItem value={levita.id} key={levita.id} onSelect={() => setTeclado(levita.id)}>{levita.nome}</SelectItem>
							))}
							<SelectItem value={"null"} onSelect={() => setTeclado("")} className="text-zinc-400">Sem teclado</SelectItem>
						</SelectContent>
					</Select>
					<br />

					<Label>Bateria</Label>
					<Select onValueChange={(value) => setBateria(value)} disabled={disableFields}>
						<SelectTrigger>
							<SelectValue className={"text-zinc-50/50"}
								placeholder={"Escolha um levita para tocar bateria."} />
						</SelectTrigger>
						<SelectContent>
							{filterByInstrumento(3)?.map((levita) => (
								<SelectItem value={levita.id} key={levita.id} onSelect={() => setBateria(levita.id)}>{levita.nome}</SelectItem>
							))}
							<SelectItem value={"null"} onSelect={() => setBateria("")} className="text-zinc-400">Sem bateria</SelectItem>
						</SelectContent>
					</Select>
					<br />

					<Label>Baixo</Label>
					<Select onValueChange={(value) => setBaixo(value)} disabled={disableFields}>
						<SelectTrigger>
							<SelectValue className={"text-zinc-50/50"}
								placeholder={"Escolha um levita para tocar baixo."} />
						</SelectTrigger>
						<SelectContent>
							{filterByInstrumento(4)?.map((levita) => (
								<SelectItem value={levita.id} key={levita.id} onSelect={() => setBaixo(levita.id)}>{levita.nome}</SelectItem>
							))}
							<SelectItem value={"null"} onSelect={() => setBaixo("")} className="text-zinc-400">Sem baixo</SelectItem>
						</SelectContent>
					</Select>
					<br />

					<Label>Guitarra</Label>
					<Select onValueChange={(value) => setGuitarra(value)} disabled={disableFields}>
						<SelectTrigger>
							<SelectValue className={"text-zinc-50/50"}
								placeholder={"Escolha um levita para tocar guitarra."} />
						</SelectTrigger>
						<SelectContent>
							{filterByInstrumento(5)?.map((levita) => (
								<SelectItem value={levita.id} key={levita.id} onSelect={() => setGuitarra(levita.id)}>{levita.nome}</SelectItem>
							))}
							<SelectItem value={"null"} onSelect={() => setGuitarra("")} className="text-zinc-400">Sem guitarra</SelectItem>
						</SelectContent>
					</Select>
					<br />

					<Label>Observação:</Label>
					<Textarea placeholder="Insira uma observação. (Ex: Dia e hora de ensaio, local de apresentação, etc.)"
						value={observacao} onChange={(e) => setObservacao(e.target.value)} maxLength={255} disabled={disableFields} />
					<br />

					<Label>Backs:</Label>
					<Card className="bg-transparent grid grid-cols-4">
						{filterByInstrumento(0)?.map((levita) => (
							<Button key={levita.id} variant={backs.includes(levita.id) ? "default" : "outline"} type="submit"
								className={"p-2 rounded-lg m-2"} disabled={disableFields}
								onClick={() => { backs.includes(levita.id) ? removeBack(levita.id) : addBack(levita.id) }}>{levita.nome}</Button>
						))}
					</Card>
					<br />

				</ScrollArea>
				<DialogFooter className={isLoading ? "opacity-50 space-y-1.5" : ""}>
					<div className="hidden" />
					<Button className="hover:bg-emerald-500" disabled={isLoading || disableFields} onClick={() => {
						if (titulo.length == 0) {
							toast.warning("Insira um título para a escala!")
						} else if (!data || data.length == 0) {
							toast.warning("Insira uma data para a escala!")
						} else if (ministro.length == 0) {
							toast.warning("Selecione um ministro!")
						}
						else {
							setIsLoading(true)
							postMethod<Escala | undefined>("v1/escala", {
								ministro: ministro,
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
							}).catch((error) => {
								toast.error("Erro ao adicionar escala!")
								console.error("Erro na comunicação com a api: ", error);
							}).then(() => {
								toast.success("Escala adicionada com sucesso!")
								if (props.setEscalas) {
									props.setEscalas(undefined)
								}
								setIsLoading(false)
								setOpen(false)
							})
						}
					}}>{"Adicionar"}</Button>
					<Button className="hover:bg-rose-700" disabled={isLoading} onClick={() => setOpen(false)}>Cancelar</Button>
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
	const [selectedMusicas, setSelectedMusicas] = useState<String[]>(props.escala?.musicas.map((musica) => musica.id) || []);
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
		console.log(selectedMusicas)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant={"outline"} className={"mx-2 hover:text-emerald-500 "} disabled={false}>
					<CirclePlus className="mx-1 text-emerald-500" />Adicionar Música</Button>
			</DialogTrigger>
			<DialogContent>
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
				<br />
				<Label>Músicas para adicionar:</Label>
				<Select onValueChange={(value) => addSelectedMusica(value)} disabled={!musicas}>
					<SelectTrigger>
						<SelectValue placeholder={"Selecione músicas."} />
					</SelectTrigger>
					<SelectContent>
						{musicas?.filter((musica) => !selectedMusicas.includes(musica.id)).map((musica) => (
							<SelectItem value={musica.id} key={musica.id} onSelect={() => addSelectedMusica(musica.id)}>{musica.nome}</SelectItem>
						))}
					</SelectContent>
				</Select>
				<br />
				<Label>Músicas selecionadas:</Label>
				<Card className="bg-transparent grid grid-flow-row">
					{getSelectedMusicas().map((musica) => (
						<Button key={musica?.id} variant={"outline"} type="submit" className="p-2 rounded-lg m-2 hover:bg-red-400/50"
							onClick={() => removeSelectedMusica(musica ? musica.id : "")}>{musica?.nome}</Button>
					))}
				</Card>
				<br />

				<DialogFooter className="">
					<Button className="hover:bg-emerald-500"
						type="submit" disabled={isLoading} onClick={() => {
							console.log(selectedMusicas)
							setLoading(true)
							putMethod(`v1/escala/musicas/${props.escala?.id}`, { musicasIds: selectedMusicas })
								.catch((error) => toast.error("Erro ao adicionar músicas!", error))
								.then(() => toast.success("Músicas adicionadas com sucesso!"))
								.then(() => props.setMusicas && props.setMusicas(undefined))
								.then(() => setLoading(false))
								.then(() => setOpen(false))
							setLoading(false)
						}}>Salvar</Button>
					<Button className="hover:bg-rose-600/80" onClick={() => setOpen(false)}>Cancelar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}