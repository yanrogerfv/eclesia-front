import { CalendarClock, CalendarDays, Home, Inbox, LogOut, User2, UserCircle2 } from "lucide-react"
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
import { SidebarAddUser, SidebarMyAgenda, SidebarMyEscalas, SidebarNextEvents } from "./modals/sidebar-modals"
import ThemeSelector from "./themeSelector"
import { useEffect, useState } from "react"

export function AppSidebar({ lado }: { lado : "left" | "right" }) {

    const [isUserAdminOrLeader, setUserAdminOrLeader] = useState(false)
    const [username, setUsername] = useState("");

    useEffect(() => {
        // This code now runs only on the client side, avoiding the ReferenceError
        const userAdmin = sessionStorage.getItem("role") === "ADMIN" || sessionStorage.getItem("role") === "LIDER";
        setUsername(Cookies.get("username") || "Usuário")
        setUserAdminOrLeader(userAdmin);
      }, []);

    return (
        <Sidebar side={lado} collapsible="icon">
            <SidebarContent className="h-screen flex flex-col">
                <SidebarGroup>
                    <SidebarGroupLabel className="flex justify-between p-4">
                        Eclesia <UserCircle2 size={20} />
                    </SidebarGroupLabel>
                    <SidebarGroupLabel className="flex justify-center p-2 m-4">
                        <p className="text-3xl text-primary">
                            {username}
                        </p>
                    </SidebarGroupLabel>
                    {/* <SidebarTrigger className="data-[sidebar=active]:bg-fuchsia-500 [&>span:last-child]:truncate data-[active=true]:bg-lime-500 [&>svg]:size-4 [&>svg]:shrink-0" /> */}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem key={"initial_page"}>
                                <SidebarMenuButton asChild>
                                    <a href="/v0" className="flex items-center gap-2 p-2 hover:bg-primary/10 rounded-lg">
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
                            {isUserAdminOrLeader && <SidebarMenuItem key={"add_user"}>
                                <SidebarMenuButton asChild>
                                    <SidebarAddUser
                                        icon={<User2 size={16} />}
                                        title={"Adicionar Usuário"}
                                    />
                                </SidebarMenuButton>
                            </SidebarMenuItem>}
                            <SidebarMenuItem key={"logout"}>
                                <SidebarMenuButton asChild className="text-red-500 hover:text-red-600 hover:brightness-125 hover:animate-pulse">
                                    <a href="/" className="flex items-center gap-2 p-2" onClick={() => {
                                        Cookies.remove("token")
                                        Cookies.remove("username")
                                        {sessionStorage ? sessionStorage.removeItem("role") : null}
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
                    <ThemeSelector className="bg-zinc-700/10 w-full overflow-hidden 
                    group-data-[collapsible=icon]:!hidden"/>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    )
}