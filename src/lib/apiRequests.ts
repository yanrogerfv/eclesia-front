

import Cookies from "js-cookie";
import { toast } from "sonner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

/**
 * Function to perform a GET request to the API
 * @function 
 * 
 * 
 * @param url - Request URL
 * @param setState - SetStateAction to update the state with the response data
 */
export async function getMethod<T>(url: string, setState: React.Dispatch<React.SetStateAction<T>>) {
	const req = await fetch(`${apiUrl}${url}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${Cookies.get("token")}`
		}
	}).catch((error) => {
		if (error instanceof TypeError) {
		} else {
			console.error("Erro na comunicação com a api: ", error);
			toast.error("Erro na comunicação com a api: ", error.error);
		}
	});
	if (req?.status !== 200 && req?.status) {
		console.error(`Erro na comunicação com a api: ${req}`);
		toast.error(`Erro na comunicação com a api: ${req.status}`);
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
export async function postMethod<T>(url: string, body: body, setState?: React.Dispatch<React.SetStateAction<T>>, errorMessage?: string) {
	const req = await fetch(`${apiUrl}${url}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${Cookies.get("token")}`
		},
		body: JSON.stringify(body)
	})
	if (req) {
		const isOk = req.ok;
		const data = await req.json();
		if (!isOk) {
			data.error.forEach((error: string) => {
				toast.error(errorMessage ? `${errorMessage}: ${error}` : error);
			})
		}
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
export async function putMethod<T>(url: string, body: body, setState?: React.Dispatch<React.SetStateAction<T | undefined>> | undefined) {
	const req = await fetch(`${apiUrl}${url}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${Cookies.get("token")}`
		},
		body: JSON.stringify(body)
	}).catch((error) => {
		console.error("Erro na comunicação com a api: ", error);
		toast.error("Erro na comunicação com a api: ", error);
	});
	if (req) {
		const status = req.status;
		if (status !== 200) {
			toast.error(`Erro na comunicação com a api: ${status}`);
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
	const req = await fetch(`${apiUrl}${url}`, {
		method: "DELETE",
		headers: {
			"Authorization": `Bearer ${Cookies.get("token")}`
		},
	}).catch((error) => {
		console.error("Erro na comunicação com a api: ", error);
		toast.error("Erro na comunicação com a api: ", error);
	});
	if (req) {
		const status = req.status;
		if (status !== 200) {
			console.error(`Erro na comunicação com a api: ${status}`);
			toast.error(`Erro na comunicação com a api: ${status}`);
		}
	}
} 