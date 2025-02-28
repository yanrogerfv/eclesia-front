import { CalendarClock, CalendarDays, Home, Inbox, LogOut, UserCircle2 } from "lucide-react"
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
} from "@/components/ui/sidebar"
import { SidebarMyAgenda, SidebarMyEscalas, SidebarNextEvents } from "./modals/sidebar-modals"
import ThemeSelector from "./themeSelector"

export function AppSidebar() {
    return (
        <Sidebar side="left" collapsible="icon">
            <SidebarContent className="h-screen flex flex-col">
                <SidebarGroup>
                    <SidebarGroupLabel className="flex justify-between p-4">
                        Meu Perfil <UserCircle2 size={20} />
                    </SidebarGroupLabel>
                    <SidebarGroupLabel className="flex justify-center p-2">
                        <p className="text-3xl text-primary">
                            {Cookies.get("username") ? Cookies.get("username") : "Usuário"}
                        </p>
                    </SidebarGroupLabel>
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
                            <SidebarMenuItem key={"logout"}>
                                <SidebarMenuButton asChild className="text-red-500 hover:text-red-600 hover:brightness-125 hover:animate-pulse">
                                    <a href="/" className="flex items-center gap-2 p-2" onClick={() => {
                                        Cookies.remove("token")
                                        Cookies.remove("username")
                                        sessionStorage.removeItem("role")
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