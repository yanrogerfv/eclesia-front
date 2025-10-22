"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { themes } from "@/util/themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider 
  themes={themes.map(theme => theme.name)}  //defaultTheme="system"
  // {...{enableSystem: true}}
  {...props}>{children}</NextThemesProvider>
}