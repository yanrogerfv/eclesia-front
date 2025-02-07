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

// Menu items.
const items = [
    {
        title: "Página Inicial",
        url: "#",
        icon: Home,
        className: "text-current",
    },
    {
        title: "Próximos Eventos",
        url: "#",
        icon: Calendar,
        className: "text-current",
    },
    {
        title: "Minha Agenda",
        url: "#",
        icon: CalendarClock,
        className: "text-current",
    },
    {
        title: "Minhas Escalas",
        url: "#",
        icon: Inbox,
        className: "text-current",
    },
    {
        title: "Meu Usuário",
        url: "#",
        icon: User2,
        className: "text-current",
    },
    {
        title: "Sair",
        url: "#",
        icon: LogOut,
        className: "text-red-500 hover:text-rose-500",
    },
]

export function AppSidebar() {
    return (
        <Sidebar side="right" collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="flex justify-between">
                        Meu Perfil <UserCircle2 size={20} />
                    </SidebarGroupLabel>
                    <p className="p-2 flex text-3xl justify-center text-primary">{Cookies.get("username") ? Cookies.get("username") : "Usuário"}</p>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className={item.className}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}