

import Cookies from "js-cookie";
import { toast } from "sonner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const getAuthHeader = () => {
	const token = Cookies.get("token");
	return token ? `Bearer ${token}` : "";
};

const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 1000))

async function handleResponse(req: Response | void, errorMessage?: string) {
	if (!req) return;
	const status = req.status;

	if (status === 401) {
		toast.error("Sessão expirada, redirecionando para o login...");
		Cookies.remove("token");
		await promise();
		window.location.href = "/login";
		return Promise.reject({ message: "Unauthorized", status: 401 });
	}

	let data: any = null;
	const contentType = req.headers.get("content-type");
	if (contentType && contentType.includes("application/json")) {
		try {
			data = await req.json();
		} catch (e) {
			// Failed to parse JSON
		}
	}

	if (status >= 400) {
		if (data && data.error && Array.isArray(data.error)) {
			data.error.forEach((err: string) => {
				toast.error(errorMessage ? `${errorMessage}: ${err}` : err);
			});
		} else if (status === 403) {
			toast.error("Acesso negado. Você não tem permissão para realizar esta ação.");
		} else if (status === 404) {
			toast.error("Recurso não encontrado.");
		} else {
			toast.error(errorMessage ? `${errorMessage} (Erro ${status})` : `Erro ${status} ocorreu.`);
		}
		return Promise.reject({ message: `Error ${status}`, status, data });
	}

	return data;
}

export async function publicGetMethod<T>(url: string, setState: React.Dispatch<React.SetStateAction<T>>) {
	const req = await fetch(`${apiUrl}${url}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	}).catch((error) => {
		console.error("Erro na comunicação com a api: ", error);
		toast.error("Erro na comunicação com a api.");
	});
	
	try {
		const data = await handleResponse(req);
		if (data && setState) setState(data);
		return data;
	} catch (e) {
		return null;
	}
}

export async function getMethod<T>(url: string, setState: React.Dispatch<React.SetStateAction<T>>) {
	const req = await fetch(`${apiUrl}${url}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": getAuthHeader()
		}
	}).catch((error) => {
		console.error("Erro na comunicação com a api: ", error);
		toast.error("Erro na comunicação com a api.");
	});

	try {
		const data = await handleResponse(req);
		if (data && setState) setState(data);
		return data;
	} catch (e) {
		return null;
	}
}

export async function postMethod<T>(url: string, body: body, setState?: React.Dispatch<React.SetStateAction<T>>, errorMessage?: string) {
	const req = await fetch(`${apiUrl}${url}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": getAuthHeader()
		},
		body: JSON.stringify(body)
	}).catch((error) => {
		console.error("Erro na comunicação com a api: ", error);
		toast.error("Erro na comunicação com a api.");
	});

	try {
		const data = await handleResponse(req, errorMessage);
		if (data && setState) setState(data);
		return data;
	} catch (e) {
		return null;
	}
}

interface body {
	[key: string]: any
}

export async function patchMethod<T>(url: string, body?: body, setState?: React.Dispatch<React.SetStateAction<T | undefined>> | undefined) {
	const reqHeaders = body ? {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"Authorization": getAuthHeader()
		},
		body: JSON.stringify(body)
	} : {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"Authorization": getAuthHeader()
		}
	};
	const req = await fetch(`${apiUrl}${url}`, reqHeaders as RequestInit).catch((error) => {
		console.error("Erro na comunicação com a api: ", error);
		toast.error("Erro na comunicação com a api.");
	});

	try {
		const data = await handleResponse(req);
		if (data && setState) setState(data);
		return data;
	} catch (e) {
		return null;
	}
}

export async function putMethod<T>(url: string, body: body, setState?: React.Dispatch<React.SetStateAction<T | undefined>> | undefined) {
	const req = await fetch(`${apiUrl}${url}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"Authorization": getAuthHeader()
		},
		body: JSON.stringify(body)
	}).catch((error) => {
		console.error("Erro na comunicação com a api: ", error);
		toast.error("Erro na comunicação com a api.");
	});

	try {
		const data = await handleResponse(req);
		if (data && setState) setState(data);
		return data;
	} catch (e) {
		return null;
	}
}

export async function deleteMethod<T>(url: string) {
	const req = await fetch(`${apiUrl}${url}`, {
		method: "DELETE",
		headers: {
			"Authorization": getAuthHeader()
		},
	}).catch((error) => {
		console.error("Erro na comunicação com a api: ", error);
		toast.error("Erro na comunicação com a api.");
	});

	try {
		const data = await handleResponse(req);
		if (req && req.status >= 200 && req.status < 300) {
			toast.success("Removido(a) com sucesso!");
		}
		return data;
	} catch (e) {
		return null;
	}
} 