"use client"

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
    className: string;
}

const ThemeToggle = (className:ThemeToggleProps) => {
    const [sereneMode, setsereneMode] = useState(true);

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "serene") {
            setsereneMode(true);
        }
    }, []);

    useEffect(() => {
        if (sereneMode) {
            document.documentElement.classList.remove("sunset");
            document.documentElement.classList.add("serene");
            localStorage.setItem("theme", "serene");
          } else {
            document.documentElement.classList.remove("serene");
            document.documentElement.classList.add("sunset");
            localStorage.setItem("theme", "sunset");
          }
    }, [sereneMode]);

    return (
        <div className="relative h-[4dvh] w-[8dvh] flex items-center outline outline-1 outline-primary/50 text-primary hover:text-black hover:bg-secondary
        dark:bg-gray-900 bg-background cursor-pointer
        rounded-full p-1" onClick={() => setsereneMode(!sereneMode)}>
            <Sun className="mr-auto"/>
            <div className="absolute bg-white ml-1 size-6 rounded-full shadow-md transform transition-transform duration-300"
            style={sereneMode ? {left: "1px"} : {right: "4px"}}></div>
            <Moon className="ml-auto"/>
        </div>
    )
}

export default ThemeToggle;
