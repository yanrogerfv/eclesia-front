"use client"

import { Haze, Lollipop, MoonStar, SunDim, Trees } from "lucide-react";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Separator } from "./ui/separator";

interface ThemeSelectorProps {
    className?: string;
}

function ThemeSelector({ className }: ThemeSelectorProps) {

    const [clientDocument, setLocal] = useState<HTMLElement>();

    useEffect(() => {
        // This code now runs only on the client side
        const local = document.documentElement;
        setLocal(local);
    }, []);

    const [sereneMode, setSereneMode] = useState(false);
    const [sunsetMode, setSunsetMode] = useState(false);
    const [forestMode, setForestMode] = useState(false);
    const [lolpopMode, setLolpopMode] = useState(false);

    useEffect(() => {
        setSereneMode(clientDocument?.getAttribute("class") === "serene" ? true : false);
        setSunsetMode(clientDocument?.getAttribute("class") === "sunset" ? true : false);
        setForestMode(clientDocument?.getAttribute("class") === "forest" ? true : false);
        setLolpopMode(clientDocument?.getAttribute("class") === "lollipop" ? true : false);
    }, [clientDocument?.getAttribute("class"), sereneMode, sunsetMode, forestMode, lolpopMode]);

    function handleThemeChange(theme: string) {
        switch (theme) {
            case "serene":
                setSereneMode(true);
                setSunsetMode(false);
                setForestMode(false);
                setLolpopMode(false);
                break;
            case "sunset":
                setSereneMode(false);
                setSunsetMode(true);
                setForestMode(false);
                setLolpopMode(false);
                break;
            case "forest":
                setSereneMode(false);
                setSunsetMode(false);
                setForestMode(true);
                setLolpopMode(false);
                break;
            case "lollipop":
                setSereneMode(false);
                setSunsetMode(false);
                setForestMode(false);
                setLolpopMode(true);
                break;
            default:
                setSereneMode(false);
                setSunsetMode(false);
                setForestMode(false);
                setLolpopMode(false);
                break;
        }
    }

    function handleSereneMode() {
        clientDocument?.setAttribute("class", "serene");
        handleThemeChange(clientDocument?.getAttribute("class") || "root");
    }

    function handleSunsetMode() {
        clientDocument?.getAttribute("class") !== "sunset" ?
            clientDocument?.setAttribute("class", "sunset") :
            clientDocument?.setAttribute("class", "root");
        handleThemeChange(clientDocument?.getAttribute("class") || "root");
    }

    function handleForestMode() {
        clientDocument?.setAttribute("class", "forest");
        handleThemeChange(clientDocument?.getAttribute("class") || "root");
    }

    function handleLollipopMode() {
        clientDocument?.setAttribute("class", "lollipop");
        handleThemeChange(clientDocument?.getAttribute("class") || "root");
    }

    return (
        // <div className="relative h-[4dvh] w-[8dvh] flex items-center outline outline-1 outline-primary/50 text-primary hover:text-black hover:bg-secondary
        // dark:bg-gray-900 bg-background cursor-pointer
        // rounded-full p-1" onClick={() => setsereneMode(!sereneMode)}>
        //     <Sun className="mr-auto"/>
        //     <div className="absolute bg-white ml-1 size-6 rounded-full shadow-md transform transition-transform duration-300"
        //     style={sereneMode ? {left: "1px"} : {right: "4px"}}></div>
        //     <Moon className="ml-auto"/>
        // </div>
            <div>
                <div className="border rounded-xl p-1 group-data-[collapsible=icon]:block hidden text-primary">
                    { sereneMode ? <MoonStar/>
                    : sunsetMode ? <Haze/>
                    : forestMode ? <Trees/>
                    : lolpopMode ? <Lollipop/>
                    : <SunDim/>
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
                                    <MoonStar className={sereneMode ? "text-teal-500 size-7 mx-2" : "size-7 mx-2 hover:text-teal-500/85"}
                                        onClick={() => handleSereneMode()} />
                                </TooltipTrigger>
                                <TooltipContent className="bg-transparent border-none p-0">
                                    <p className="text-teal-500/85  border-teal-500/85">Serene</p>
                                </TooltipContent>
                            </Tooltip>
                            <Separator orientation="vertical" className="h-[3dvh] mx-1" />
                            <Tooltip>
                                <TooltipTrigger>
                                    <Haze className={sunsetMode ? "size-7 mx-2 text-orange-500/85" : "size-7 mx-2 hover:text-orange-500/85"}
                                        onClick={() => handleSunsetMode()} />
                                </TooltipTrigger>
                                <TooltipContent className="bg-transparent border-none p-0">
                                    <p className="text-orange-500/85  border-orange-500/85">Sunset</p>
                                </TooltipContent>
                            </Tooltip>
                            <Separator orientation="vertical" className="h-[3dvh] mx-1" />
                            <Tooltip>
                                <TooltipTrigger>
                                    <Trees className={forestMode ? "size-7 mx-2 text-green-500/85" : "size-7 mx-2 hover:text-green-500/85"}
                                        onClick={() => handleForestMode()} />
                                </TooltipTrigger>
                                <TooltipContent className="bg-transparent border-none p-0">
                                    <p className="text-green-500/85  border-green-500/85">Forest</p>
                                </TooltipContent>
                            </Tooltip>
                            <Separator orientation="vertical" className="h-[3dvh] mx-1" />
                            <Tooltip>
                                <TooltipTrigger>
                                    <Lollipop className={lolpopMode ? "size-7 mx-2 text-rose-500/85" : "size-7 mx-2 hover:text-rose-500/85"}
                                        onClick={() => handleLollipopMode()} />
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

export default ThemeSelector;
