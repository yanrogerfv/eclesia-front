import { CalendarClock, CalendarDays, Home, Inbox, LogOut, User2, UserCircle2, UserRoundCog, UserRoundPlus } from "lucide-react"
import Cookies from "js-cookie"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { SidebarAddUser, SidebarManageUsers, SidebarMyAgenda, SidebarMyEscalas, SidebarMyProfile, SidebarNextEvents } from "./modals/sidebar-modals"
import ThemeSelector from "./themeSelector"
import { useEffect, useState } from "react"

export function AppSidebar({ side, alwaysOpen }: { side: "left" | "right", alwaysOpen?: boolean }) {

    const [isUserLeader, setUserLeader] = useState(false)
    const [isUserAdmin, setUserAdmin] = useState(false)
    const [username, setUsername] = useState("");

    useEffect(() => {
        // This code now runs only on the client side, avoiding the ReferenceError
        const userLeader = sessionStorage.getItem("role") === "Líder";
        const userAdmin = sessionStorage.getItem("role") === "ADMIN";
        setUsername(Cookies.get("username") || "Usuário")
        setUserAdmin(userAdmin);
        setUserLeader(userLeader);
    }, []);

    return (
        <Sidebar side={side} collapsible="icon">
            <SidebarContent className="h-screen flex flex-col">
                <SidebarGroup>
                    <SidebarGroupLabel className="flex justify-between">
                        <div className="flex items-center">
                            {!alwaysOpen && <SidebarTrigger className="text-primary brightness-150 hover:-rotate-180 transition-all duration-300 ease-in-out"/>}
                            Eclesia
                        </div>
                        <UserCircle2 size={20} />
                    </SidebarGroupLabel>
                    <SidebarGroupLabel className="justify-center p-2 m-4 group-data-[collapsible=icon]:hidden">
                        <p className="text-3xl text-primary">
                            {username}
                        </p>
                    </SidebarGroupLabel>
                    <SidebarTrigger className="group-data-[collapsible=icon]:block hidden w-full h-full p-2 text-primary brightness-150 hover:rotate-180 transition-all duration-300 ease-in-out" />
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem key={"initial_page"}>
                                <SidebarMenuButton asChild>
                                    <a href="/home" className="flex items-center gap-2 p-2 hover:bg-primary/10 rounded-lg">
                                        <Home size={16} />
                                        <span>Página Inicial</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem key={"next_events"}>
                                <SidebarMenuButton asChild>
                                    <SidebarNextEvents
                                        icon={<CalendarDays size={16} />}
                                        title={"Próximos Eventos"}
                                    />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem key={"my_agenda"}>
                                <SidebarMenuButton asChild>
                                    <SidebarMyAgenda
                                        icon={<CalendarClock size={16} />}
                                        title={"Minha Agenda"}
                                    />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem key={"my_escalas"}>
                                <SidebarMenuButton asChild>
                                    <SidebarMyEscalas
                                        icon={<Inbox size={16} />}
                                        title={"Minhas Escalas"}
                                    />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem key={"my_profile"}>
                                <SidebarMenuButton asChild>
                                    <SidebarMyProfile
                                        icon={<User2 size={16} />}
                                        title={"Meu Perfil"}
                                    />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {(isUserAdmin || isUserLeader) && <SidebarMenuItem key={"add_user"}>
                                <SidebarMenuButton asChild>
                                    <SidebarAddUser
                                        icon={<UserRoundPlus size={16} />}
                                        title={"Adicionar Usuário"}
                                    />
                                </SidebarMenuButton>
                            </SidebarMenuItem>}
                            {isUserAdmin && <SidebarMenuItem key={"users"}>
                                <SidebarMenuButton asChild>
                                    <SidebarManageUsers style="flex items-center gap-2 p-2 hover:bg-primary/10 rounded-lg"
                                        icon={<UserRoundCog size={16} />}
                                        title={"Gestão de Usuários"}
                                    />
                                </SidebarMenuButton>
                            </SidebarMenuItem>}
                            <SidebarMenuItem key={"logout"}>
                                <SidebarMenuButton asChild className="text-red-500 hover:text-red-600 hover:brightness-105 hover:animate-pulse">
                                    <a href="/" className="flex items-center gap-2 p-2" onClick={() => {
                                        Cookies.remove("token")
                                        Cookies.remove("username")
                                        { sessionStorage ? sessionStorage.removeItem("role") : null }
                                        setTimeout(() => {
                                            window.location.reload()
                                        }, 1000)
                                    }}>
                                        <LogOut size={16} />
                                        <span>Sair</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarFooter className="mt-auto flex justify-center items-center ">
                    {/* <SidebarMenuButton className="flex items-center justify-center h-fit gap-2 p-2 hover:bg-primary/10 rounded-lg group"> */}
                    <ThemeSelector className="bg-zinc-700/10 w-full" />
                    {/* </SidebarMenuButton> */}
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    )
}