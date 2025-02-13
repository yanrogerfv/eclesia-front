import { Calendar, CalendarClock, CalendarDays, Home, Inbox, LogOut, Search, Settings, User2, UserCircle2 } from "lucide-react"
import Cookies from "js-cookie"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { SidebarMyAgenda, SidebarMyEscalas, SidebarNextEvents } from "./modals/sidebar-modals"

// Menu items.
const items = [
    {//DONE
        title: "Próximos Eventos", 
        url: "#",
        icon: Calendar,
        className: "text-current",
    },
    {//HALFWAY-DONE
        title: "Minha Agenda", 
        url: "#",
        icon: CalendarClock,
        className: "text-current",
    },
    {//DONE
        title: "Minhas Escalas", 
        url: "/v0/escalas",
        icon: Inbox,
        className: "text-current",
    },
    {
        title: "Meu Usuário",
        url: "#",
        icon: User2,
        className: "text-current",
    }
    // {items.map((item) => (
    //     <SidebarMenuItem key={item.title}>
    //         <SidebarMenuButton asChild>
    //             {/* <a href={item.url} className={item.className}>
    //                 <item.icon />
    //                 <span>{item.title}</span>
    //             </a> */}
    //             <MyEscalasSidebar
    //                 icon={item.icon}
    //                 title={item.title}
    //                 style={item.className}
    //             />
    //         </SidebarMenuButton>
    //     </SidebarMenuItem>
    // ))}
]

export function AppSidebar() {
    return (
        <Sidebar side="right" collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="flex justify-between">
                        Meu Perfil <UserCircle2 size={20} />
                    </SidebarGroupLabel>
                    <SidebarGroupLabel className="flex justify-center">
                        <p className="p-2 flex text-3xl justify-center text-primary">{Cookies.get("username") ? Cookies.get("username") : "Usuário"}</p>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem key={"initial_page"}> {/* Página Inicial */}
                                <SidebarMenuButton asChild>
                                    <a href="/v0" className={"text-current"}>
                                        <Home size={16}/>
                                        <span>Página Inicial</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem key={"next_events"}> {/* Próximos Eventos */}
                                <SidebarMenuButton asChild>
                                    <SidebarNextEvents
                                        icon={<CalendarDays size={16}/>}
                                        title={"Próximos Eventos"}
                                    />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem key={"my_agenda"}> {/* Minha Agenda */}
                                <SidebarMenuButton asChild>
                                    <SidebarMyAgenda
                                        icon={<CalendarClock size={16}/>}
                                        title={"Minha Agenda"}
                                    />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem key={"my_escalas"}> {/* Minhas Escalas */}
                                <SidebarMenuButton asChild>
                                    <SidebarMyEscalas
                                        icon={<Inbox size={16}/>}
                                        title={"Minhas Escalas"}
                                    />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem key={"logout"}> {/* Logout */}
                                <SidebarMenuButton asChild className={"text-red-500 hover:text-red-600 hover:brightness-125 hover:animate-pulse"} onClick={() => {
                                    Cookies.remove("token")
                                    Cookies.remove("username")
                                    sessionStorage.removeItem("role")
                                    setTimeout(() => {
                                        window.location.reload()
                                    }, 1000)
                                }}>
                                    <a href="/">
                                        <LogOut />
                                        <span>Sair</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}