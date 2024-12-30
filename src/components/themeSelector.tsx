"use client"

import { Haze, Lollipop, Moon, MoonStar, Sun, Sunrise, Trees } from "lucide-react";
import { useEffect, useState } from "react";
import { Toggle } from "./ui/toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Separator } from "./ui/separator";


const ThemeSelector = () => {
    const [sereneMode, setSereneMode] = useState(document.documentElement.classList.contains("serene"));
    const [sunsetMode, setSunsetMode] = useState(document.documentElement.classList.contains("sunset"));
    const [forestMode, setForestMode] = useState(document.documentElement.classList.contains("forest"));
    const [lollipopMode, setLollipopMode] = useState(document.documentElement.classList.contains("lollipop"));

    function handleSereneMode() {
        setSereneMode(true);
        setSunsetMode(false);
        setForestMode(false);
        setLollipopMode(false);
        document.documentElement.classList.remove("sunset");
        document.documentElement.classList.remove("forest");
        document.documentElement.classList.remove("lollipop");
        document.documentElement.classList.add("serene");
        localStorage.setItem("theme", "serene");
    }

    function handleSunsetMode() {
        setSereneMode(false);
        setSunsetMode(true);
        setForestMode(false);
        setLollipopMode(false);
        document.documentElement.classList.remove("serene");
        document.documentElement.classList.remove("forest");
        document.documentElement.classList.remove("lollipop");
        document.documentElement.classList.add("sunset");
        localStorage.setItem("theme", "sunset");
    }

    function handleForestMode() {
        setSereneMode(false);
        setSunsetMode(false);
        setForestMode(true);
        setLollipopMode(false);
        document.documentElement.classList.remove("serene");
        document.documentElement.classList.remove("sunset");
        document.documentElement.classList.remove("lollipop");
        document.documentElement.classList.add("forest");
        localStorage.setItem("theme", "forest");
    }

    function handleLollipopMode() {
        setSereneMode(false);
        setSunsetMode(false);
        setForestMode(false);
        setLollipopMode(true);
        document.documentElement.classList.remove("serene");
        document.documentElement.classList.remove("sunset");
        document.documentElement.classList.remove("forest");
        document.documentElement.classList.add("lollipop");
        localStorage.setItem("theme", "lollipop");
    }

    /*useEffect(() => {
        if (sereneMode) {
            setSunsetMode(false);
            setForestMode(false);
            document.documentElement.classList.remove("sunset");
            document.documentElement.classList.remove("forest");
            document.documentElement.classList.add("serene");
            localStorage.setItem("theme", "serene");
        } else if (sunsetMode) {
            setSereneMode(false);
            setForestMode(false);
            document.documentElement.classList.remove("serene");
            document.documentElement.classList.remove("forest");
            document.documentElement.classList.add("sunset");
            localStorage.setItem("theme", "sunset");
        } else if (forestMode) {
            setSereneMode(false);
            setSunsetMode(false);
            document.documentElement.classList.remove("serene");
            document.documentElement.classList.remove("sunset");
            document.documentElement.classList.add("forest");
            localStorage.setItem("theme", "forest");
        }
    }, [sereneMode, sunsetMode, forestMode]);*/

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
            <div className="bg-black/70 rounded-lg p-2 flex items-center">
                {/* <Toggle className="p-0 size-10">
                <Haze className="flex h-8 w-8"/>
            </Toggle>
            <Toggle>
                <MoonStar/>
            </Toggle> */}
                <TooltipProvider delayDuration={250}>
                    <Tooltip>
                        <TooltipTrigger>
                            <MoonStar className={sereneMode ? "text-teal-500 size-7 mx-2" : "size-7 mx-2 hover:text-teal-500/85"}
                                onClick={() => handleSereneMode()} />
                        </TooltipTrigger>
                        <TooltipContent className="bg-transparent border-none p-0">
                            <p className="text-teal-500/85 border-b border-teal-500/85">Serene</p>
                        </TooltipContent>
                    </Tooltip>
                    <Separator orientation="vertical" className="h-[3dvh] mx-1"/>
                    <Tooltip>
                        <TooltipTrigger>
                            <Haze className={sunsetMode ? "size-7 mx-2 text-orange-500/85" : "size-7 mx-2 hover:text-orange-500/85"}
                                onClick={() => handleSunsetMode()} />
                        </TooltipTrigger>
                        <TooltipContent className="bg-transparent border-none p-0">
                            <p className="text-orange-500/85 border-b border-orange-500/85">Sunset</p>
                        </TooltipContent>
                    </Tooltip>
                    <Separator orientation="vertical" className="h-[3dvh] mx-1"/>
                    <Tooltip>
                        <TooltipTrigger>
                            <Trees className={forestMode ? "size-7 mx-2 text-green-500/85" : "size-7 mx-2 hover:text-green-500/85"}
                                onClick={() => handleForestMode()} />
                        </TooltipTrigger>
                        <TooltipContent className="bg-transparent border-none p-0">
                            <p className="text-green-500/85 border-b border-green-500/85">Forest</p>
                        </TooltipContent>
                    </Tooltip>
                    <Separator orientation="vertical" className="h-[3dvh] mx-1"/>
                    <Tooltip>
                        <TooltipTrigger>
                            <Lollipop className={lollipopMode ? "size-7 mx-2 text-rose-500/85" : "size-7 mx-2 hover:text-rose-500/85"}
                                onClick={() => handleLollipopMode()} />
                        </TooltipTrigger>
                        <TooltipContent className="bg-transparent border-none p-0">
                            <p className="text-rose-500/85 border-b border-rose-500/85">Lollipop</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}

export default ThemeSelector;
