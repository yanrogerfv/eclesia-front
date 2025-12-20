

import Cookies from "js-cookie";
import { toast } from "sonner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const token = Cookies.get("token") || null;

const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 1000))

async function checkErrors(req: void | Response) {
	const status = req?.status;
	if (!status || status == 200 || status == 201) return;
	
	if (status == 401) {
		toast.error("Sessão expirada, redirecionando para o login...");
		Cookies.remove("token");
		await promise();
		window.location.href = "/login";
		return Promise.reject({ message: "Unauthorized", status: 401 });
	} else if (status == 403) {
		console.warn("Access forbidden.");
		toast.error("Access forbidden.");
		return Promise.reject({ message: "Forbidden", status: 403 });
	} else if (status == 404) {
		console.warn("Resource not found.");
		toast.error("Resource not found.");
		return Promise.reject({ message: "Not Found", status: 404 });
	} else {
		console.error(`Error ${status} occurred.`);
		toast.error(`Error ${status} occurred.`);
		return Promise.reject({ message: `Error ${status}`, status });
	}
}

/**
 * Function to perform a public GET request to the API
 * @function 
 * 
 * 
 * @param url - Request URL
 * @param setState - SetStateAction to update the state with the response data
 */
export async function publicGetMethod<T>(url: string, setState: React.Dispatch<React.SetStateAction<T>>) {
	const req = await fetch(`${apiUrl}${url}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	}).catch((error) => {
		console.error("Erro na comunicação com a api: ", error);
		toast.error("Erro na comunicação com a api: ", error.error);
	});
	await checkErrors(req);
	
	const data = await req?.json();
	setState(data);
	return data;
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
	const req = await fetch(`${apiUrl}${url}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `${token}`
		}
	}).catch((error) => {
		if (error instanceof TypeError) {
		} else {
			console.error("Erro na comunicação com a api: ", error);
			toast.error("Erro na comunicação com a api: ", error.error);
		}
	});
	if (req) {
		const status = req.status;
		const data = await req.json();
		if (status >= 400) {
			data.error.forEach((error: string) => {
				toast.error(error);
			})
		}
		if (setState)
			setState(data);
	}
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
			"Authorization": `${token}`
		},
		body: JSON.stringify(body)
	})
	if (req) {
		const status = req.status;
		const data = await req.json();
		if (status >= 400) {
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
 * Function to perform a PATCH request to the API
 * @function 
 * 
 * 
 * @param url - Request URL
 * @param body - Fields with the parameters to be passed as a body of the request
 * @param setState - SetStateAction to update the state with the response data
 * */
export async function patchMethod<T>(url: string, body?: body, setState?: React.Dispatch<React.SetStateAction<T | undefined>> | undefined) {

	const reqHeaders = body ? {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `${token}`
		},
		body: JSON.stringify(body)
	} : {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `${token}`
		}
	}
	const req = await fetch(`${apiUrl}${url}`, reqHeaders).catch((error) => {
		console.error("Erro na comunicação com a api: ", error);
		toast.error("Erro na comunicação com a api: ", error);
	}
	);
	if (req) {
		const status = req.status;
		const data = await req.json();
		if (status >= 400) {
			data.error.forEach((error: string) => {
				toast.error(error);
			})
		}
		if (setState)
			setState(data);
	}
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
			"Authorization": `${token}`
		},
		body: JSON.stringify(body)
	}).catch((error) => {
		console.error("Erro na comunicação com a api: ", error);
		toast.error("Erro na comunicação com a api: ", error);
	});
	if (req) {
		const status = req.status;
		const data = await req.json();
		if (status >= 400) {
			data.error.forEach((error: string) => {
				toast.error(error);
			})
		}
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
			"Authorization": `${token}`
		},
	}).catch((error) => {
		console.error("Erro na comunicação com a api: ", error);
		toast.error("Erro na comunicação com a api: ", error);
	});
	if (req) {
		const status = req.status;
		if (status >= 400) {
			const data = await req.json();
			data.error.forEach((error: string) => {
				toast.error(error);
			})
		} else {
			toast.success("Removido(a) com sucesso!");
		}
	}
} 