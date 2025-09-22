"use client"

import { useEffect, useState } from "react";

export function isUserRole(role: string): boolean {
    if (typeof window === "undefined") {
        return false; // Server-side rendering, no role available
    }
    const [isUserRole, setUserRole] = useState(false)

    useEffect(() => {
        // This code now runs only on the client side, avoiding the ReferenceError
        const isUserRole = sessionStorage.getItem("role") === role;
        setUserRole(isUserRole);
    }, []);
    return isUserRole;
}