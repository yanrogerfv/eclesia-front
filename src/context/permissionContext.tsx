"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getMethod } from "@/lib/apiRequests";

interface UserInfo {
	id: string;
	username: string;
	role: {
		id: string;
		role: string;
	} | null;
	levita: {
		id: string;
		name: string;
	} | null;
}

interface PermissionContextType {
	role: string;
	username: string;
	levitaId: string;
	loading: boolean;
	refreshUser: () => Promise<void>;
}

const PermissionContext = createContext<PermissionContextType>({
	role: "",
	username: "",
	levitaId: "",
	loading: true,
	refreshUser: async () => {},
});

export function PermissionProvider({ children }: { children: React.ReactNode }) {
	const [role, setRole] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [levitaId, setLevitaId] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);

	const fetchUserData = async () => {
		const token = Cookies.get("token");
		if (!token) {
			setRole("");
			setUsername("");
			setLevitaId("");
			setLoading(false);
			return;
		}

		try {
			// Usando o getMethod que recupera do token com prefixo Bearer automaticamente
			const data = await getMethod<UserInfo | null>("auth/user/active", () => {});
			if (data) {
				if (data.role) setRole(data.role.role);
				setUsername(data.username);
				if (data.levita) {
					setLevitaId(data.levita.id);
					sessionStorage.setItem("levita", data.levita.id);
				}
				// Sincroniza opcionalmente com o sessionStorage apenas como fallback rápido, 
				// mas nosso hook é a fonte da verdade!
				if (data.role) sessionStorage.setItem("role", data.role.role);
			} else {
				setRole("");
				setUsername("");
				setLevitaId("");
			}
		} catch (error) {
			console.error("Erro ao carregar dados do usuário ativo:", error);
			setRole("");
			setUsername("");
			setLevitaId("");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUserData();
		
		// Evento personalizado para escutar alterações de token/login
		const handleAuthChange = () => {
			fetchUserData();
		};
		window.addEventListener("auth-state-change", handleAuthChange);
		return () => {
			window.removeEventListener("auth-state-change", handleAuthChange);
		};
	}, []);

	return (
		<PermissionContext.Provider value={{ role, username, levitaId, loading, refreshUser: fetchUserData }}>
			{children}
		</PermissionContext.Provider>
	);
}

export function usePermission() {
	const context = useContext(PermissionContext);
	if (!context) {
		throw new Error("usePermission deve ser usado dentro de um PermissionProvider");
	}
	return context;
}
