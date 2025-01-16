// import Cookies from "js-cookie";
// import { useEffect, useState } from "react";
const userRole = localStorage?.getItem("role");
export default userRole;
// export function getUserRole() {
//     const [role, setRole] = useState<string>("");
//     if (!Cookies.get("token") || !Cookies.get("username")) return role;
//     // if (role) return role;
//     fetch(`http://localhost:1004/auth/role/${Cookies.get("username")}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${Cookies.get("token")}`
//         }
//     }).then((res) => res.json())
//     .then((data) => {data.role; setRole(data.role)})
//     .catch((error) => {
//         console.error("Erro na comunicação com a api: ", error)
//     })
//     console.log("Logged User: ", Cookies.get("username"))
//     console.log("Token: ", Cookies.get("token"))
//     console.log("Role: ", role)
//     console.log("==========================================")
//     return role;
// }