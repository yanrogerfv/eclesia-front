"use client"

import * as React from "react"
import { themes } from "@/util/themes"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react";

import { Separator } from "./ui/separator";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Haze, Lollipop, MoonStar, SunDim, Trees, Moon, Sun, Church } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";


interface ThemeSelectorProps {
    className?: string;
}

function SidebarThemeSelector({ className }: ThemeSelectorProps) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="border rounded-xl p-1 group-data-[collapsible=icon]:block hidden text-primary hover:bg-primary/10">
                <SunDim />
            </div>
        )
    }

    const isSerene = theme === "serene"
    const isSunset = theme === "sunset"
    const isForest = theme === "forest"
    const isLollipop = theme === "lollipop"

    return (
        <div>
            <div className="border rounded-xl p-1 group-data-[collapsible=icon]:block hidden text-primary hover:bg-primary/10">
                {isSerene ? <MoonStar />
                    : isSunset ? <Haze />
                        : isForest ? <Trees />
                            : isLollipop ? <Lollipop />
                                : <SunDim />
                }
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
                <div className={`text-center bg-card border rounded-t-lg text-lg font-semibold text-primary`}>
                    Temas
                </div>
                <div className={`bg-card border rounded-b-lg p-2 flex items-center`}>
                    <TooltipProvider delayDuration={250}>
                        <Tooltip>
                            <TooltipTrigger>
                                <MoonStar className={isSerene ? "text-teal-500 size-7 mx-2" : "size-7 mx-2 hover:text-teal-500/85"}
                                    onClick={() => setTheme("serene")} />
                            </TooltipTrigger>
                            <TooltipContent className="bg-transparent border-none p-0">
                                <p className="text-teal-500/85  border-teal-500/85">Serene</p>
                            </TooltipContent>
                        </Tooltip>
                        <Separator orientation="vertical" className="h-[3dvh] mx-1" />
                        <Tooltip>
                            <TooltipTrigger>
                                <Haze className={isSunset ? "size-7 mx-2 text-orange-500/85" : "size-7 mx-2 hover:text-orange-500/85"}
                                    onClick={() => setTheme("sunset")} />
                            </TooltipTrigger>
                            <TooltipContent className="bg-transparent border-none p-0">
                                <p className="text-orange-500/85  border-orange-500/85">Sunset</p>
                            </TooltipContent>
                        </Tooltip>
                        <Separator orientation="vertical" className="h-[3dvh] mx-1" />
                        <Tooltip>
                            <TooltipTrigger>
                                <Trees className={isForest ? "size-7 mx-2 text-green-500/85" : "size-7 mx-2 hover:text-green-500/85"}
                                    onClick={() => setTheme("forest")} />
                            </TooltipTrigger>
                            <TooltipContent className="bg-transparent border-none p-0">
                                <p className="text-green-500/85  border-green-500/85">Forest</p>
                            </TooltipContent>
                        </Tooltip>
                        <Separator orientation="vertical" className="h-[3dvh] mx-1" />
                        <Tooltip>
                            <TooltipTrigger>
                                <Lollipop className={isLollipop ? "size-7 mx-2 text-rose-500/85" : "size-7 mx-2 hover:text-rose-500/85"}
                                    onClick={() => setTheme("lollipop")} />
                            </TooltipTrigger>
                            <TooltipContent className="bg-transparent border-none p-0">
                                <p className="text-rose-500/85  border-rose-500/85">Lollipop</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    )
}

export default SidebarThemeSelector;

export function HomepageThemeSelector() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="w-full transition-all duration-500 ease-in-out">
                <div className="w-full px-8">
                    <div className="text-center bg-card border rounded-t-lg text-lg font-semibold text-primary w-full">
                        Temas
                    </div>
                    <div className="w-full border-t-0 bg-card border rounded-b-lg p-2 grid grid-cols-4 items-center justify-center gap-2">
                        <div className="h-9 w-full bg-muted animate-pulse rounded" />
                        <div className="h-9 w-full bg-muted animate-pulse rounded" />
                        <div className="h-9 w-full bg-muted animate-pulse rounded" />
                        <div className="h-9 w-full bg-muted animate-pulse rounded" />
                    </div>
                </div>
            </div>
        )
    }

    const activeThemeIcon = themes.find(t => t.name === theme);

    return (
        <div className="w-full transition-all duration-500 ease-in-out">
            <div className="w-fit border rounded-lg p-1 group-data-[collapsible=icon]:block hidden text-primary hover:bg-primary/50">
                {activeThemeIcon ? <activeThemeIcon.icon size={20} /> : <Church size={20} />}
            </div>
            <div className="w-full px-8 group-data-[collapsible=icon]:hidden">
                <div className="text-center bg-card border rounded-t-lg text-lg font-semibold text-primary w-full">
                    Temas
                </div>
                <div className="w-full border-t-0 bg-card border rounded-b-lg p-2 grid grid-cols-4 items-center justify-center">
                    {themes.map((selectedTheme) => {
                        const Icon = selectedTheme.icon as React.ComponentType<any>;
                        return (
                            <Button key={selectedTheme.name} variant={selectedTheme.name === theme ? "default" : "outline"} size="sm" onClick={() => setTheme(selectedTheme.name)}>
                                <Icon />
                            </Button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


export function ThemeSwitcher() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {themes.slice(0, 8).map((theme) => (
                    <DropdownMenuItem key={theme.name} onClick={() => setTheme(theme.name)}>
                        {theme.displayName}
                    </DropdownMenuItem>
                ))}
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}