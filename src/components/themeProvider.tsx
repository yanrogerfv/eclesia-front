"use client"
import React, { useEffect, useState } from "react";
import { Haze, Lollipop, Moon, MoonStar, Sun, Sunrise, Trees } from "lucide-react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemeProvider>) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <NextThemeProvider
            {...props}
        >
            {mounted && children}
        </NextThemeProvider>
    );
}

export function ChangeTheme (){
    return (
        <div className="relative h-[4dvh] w-[8dvh] flex items-center outline outline-1 outline-primary/50 text-primary hover:text-black hover:bg-secondary
        dark:bg-gray-900 bg-background cursor-pointer
        rounded-full p-1" onClick={() => localStorage.setItem("theme", "serene")}>
            <Sun className="mr-auto" />
            <div className="absolute bg-white ml-1 size-6 rounded-full shadow-md transform transition-transform duration-300"
                style={localStorage.getItem("theme") == "serene" ? { left: "1px" } : { right: "4px" }}></div>
            <Moon className="ml-auto" />
        </div>

        
    )
}