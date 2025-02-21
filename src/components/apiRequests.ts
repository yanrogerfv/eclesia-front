"use client"

import { UUID } from "crypto";
import { SetStateAction, useEffect, useState } from "react";
import { EscalaResumida, Instrumento, Musica } from "./apiObjects";
import Cookies from "js-cookie";

const apiUrl = process.env.API_URL;

export function DeleteLevita(levitaId: UUID) {
	useEffect(() => {
		fetch(apiUrl + "levita/" + levitaId.toString(), {
			method: "DELETE"
		}).catch((error) => {
			console.error("Erro na comunicação com a api: ", error);
		})
	}, [])
}

export function DeleteEscala(escalaId: UUID) {
	useEffect(() => {
		fetch(apiUrl + "escala/".concat(escalaId.toString()), {
			method: "DELETE"
		}).catch((error) => {
			console.error("Erro na comunicação com a api: ", error);
		})
	}, [])
}

export function CreateMusica(nomeMusica: string, linkMusica: string, cifraMusica: string) {
	// const [createdMusic, setCreatedMusic] = useState<Musica>()
	useEffect(() => {
		fetch("http://localhost:1004/v1/musicas", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				nome: nomeMusica,
				link: linkMusica,
				cifra: cifraMusica
			})
		}).then((res) => res.json())
			// .then((data) => setCreatedMusic(data))
			.catch((error) => {
				console.error("Erro na comunicação com a api: ", error);
			})
	}, [])
	// return createdMusic;
}
export function DeleteMusica(musicaId: UUID) {
	useEffect(() => {
		fetch(apiUrl + "musicas/".concat(musicaId.toString()), {
			method: "DELETE"
		}).catch((error) => {
			console.error("Erro na comunicação com a api: ", error);
		})
	}, [])
}

export function GetInstrumentos() {
	const [instrumentosBase, setInstrumentosBase] = useState<Instrumento[]>([])

	useEffect(() => {
		fetch("http://localhost:1004/v1/instrumento")
			.then((res) => res.json())
			.then((data) => {
				setInstrumentosBase(data)
			})
			.catch((error) => {
				console.error("Erro na comunicação com a api: ", error)
				setInstrumentosBase([]);
			})
	}, [instrumentosBase])
	return instrumentosBase;
}

/**
 * Function to perform a GET request to the API
 * @function 
 * 
 * 
 * @param url - Request URL
 * @param setState - SetStateAction to update the state with the response data
 */
export async function getMethod<T>(url: string, setState: React.Dispatch<React.SetStateAction<T>>) {
	const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${Cookies.get("token")}`
		}
	}).catch((error) => {
		console.error("Erro na comunicação com a api: ", error);
	});
	if (req?.status !== 200) {
		console.error(`Erro na comunicação com a api: ${req?.status}`);
	}
	const data = await req?.json();
	setState(data);
}

/**
 * Function to perform a POST request to the API
 * @function 
 * 
 * 
 * @param url - Request URL
 * @param body - Fields with the parameters to be passed as a body of the request
 * @param setState - SetStateAction to update the state with the response data
 */
export async function postMethod<T>(url: string, body: body, setState?: React.Dispatch<React.SetStateAction<T>>) {
	const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${Cookies.get("token")}`
		},
		body: JSON.stringify(body)
	}).catch((error) => {
		console.error("Erro na comunicação com a api: ", error);
	});
	if (req) {
		const status = req.status;
		if (status !== 200) {
			console.error(`Erro na comunicação com a api: ${status}`);
		}
		const data = await req.json();
		if (setState)
			setState(data);
	}
} interface body {
	[key: string]: any
}

/**
 * Function to perform a PUT request to the API
 * @function 
 * 
 * 
 * @param url - Request URL
 * @param body - Fields with the parameters to be passed as a body of the request
 * @param setState - SetStateAction to update the state with the response data
 */
export async function putMethod<T>(url: string, body: body, setState: React.Dispatch<React.SetStateAction<T | undefined>> | undefined) {
	const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${Cookies.get("token")}`
		},
		body: JSON.stringify(body)
	}).catch((error) => {
		console.error("Erro na comunicação com a api: ", error);
	});
	if (req) {
		const status = req.status;
		if (status !== 200) {
			console.error(`Erro na comunicação com a api: ${status}`);
		}
		const data = await req.json();
		if (setState)
			setState(data);
	}
}

/**
 * Function to perform a DELETE request to the API
 * @function 
 * 
 * 
 * @param url - Request URL
 */
export async function deleteMethod<T>(url: string) {
	const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
		method: "DELETE",
		headers: {
			"Authorization": `Bearer ${Cookies.get("token")}`
		},
	}).catch((error) => {
		console.error("Erro na comunicação com a api: ", error);
	});
	if (req) {
		const status = req.status;
		if (status !== 200) {
			console.error(`Erro na comunicação com a api: ${status}`);
		}
		// const data = await req.json();
	}
} 