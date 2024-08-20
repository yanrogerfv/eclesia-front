"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { //Card
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { useTransition } from "react";
import { UUID } from "crypto";
import Link from "next/link";
import { //Navigation Menu
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { //Menu Bar
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from "@/components/ui/menubar";
import { ButtonLink } from "@/components/buttonlink";
import PageHeader from "@/components/pgtitle";
import { Calendar } from "@/components/ui/calendar";
import ptBR from 'date-fns/locale/pt-BR';
import { Locale } from "date-fns";

export default async function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <main className="max-w-6xl mx-auto my-12">
      <PageHeader urlBack="null" title="Planejador" subtitle="Planejador de Escalas" />
      <div>
        <div key={"card-bg"} className="flex gap-4 w-full p-5 h-auto bg">
          <ButtonLink title="Escalas" reff="v0/escalas" />
          <ButtonLink title="Levitas" reff="v0/levitas" />
          <ButtonLink title="Músicas" reff="v0/musicas" />
          <ButtonLink title="Instrumentos" reff="v0/instrumentos" />
        </div><br />
        <Card className="p-10 bg-current/30">
            <Calendar title="Próximas Escalas" locale={ptBR as unknown as Locale} selected={date} onSelect={setDate} className="flex border"/>
            <Card>
              
            </Card>
      </Card>


    </div>
    </main >
  );
}
