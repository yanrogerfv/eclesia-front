"use client"

import { createContext, useContext, useState } from "react";

const PermissionContext = createContext( { permission: "", setPermission: (permission: string) => {} } );

export function PermissionProvider({ children } : any) {
    const [permission, setPermission] = useState("");

    return (
        <PermissionContext.Provider value={{ permission, setPermission }}>
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
