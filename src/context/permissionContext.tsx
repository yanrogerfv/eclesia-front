// "use client"

// import { createContext, useContext, useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { getUserPermission } from "@/util/getUserPermission";

// const PermissionContext = createContext({ permission: "", setPermission: (permission: string) => { } });

// export function PermissionProvider({ children }: any) {

//     const authToken = Cookies.get("token");
//     const userName = Cookies.get("username");
//     const [permission, setPermission] = useState("");


//     useEffect(() => {
//         async function getUserPermissionOnReload() {
//             if (!authToken || !userName || permission) return;
//             await fetch(`http://localhost:1004/auth/role/${userName}`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 }
//             }).then((res) => res.json()).then((data) => setPermission(data.role))
//             // getUserPermission(userName, setPermission);
//         }
//         getUserPermissionOnReload();
//     }, [authToken, userName, permission])

//     return (
//         <PermissionContext.Provider value={{ permission, setPermission }}>
//             {children}
//         </PermissionContext.Provider>
//     );
// }

// export function usePermission() {
//     const context = useContext(PermissionContext);
//     if (!context) {
//         throw new Error("usePermission deve ser usado dentro de um PermissionProvider");
//     }
//     return context;
// }
