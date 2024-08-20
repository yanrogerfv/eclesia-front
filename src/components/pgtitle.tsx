"use client"

import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

interface props {
    urlBack: string, title: string, subtitle: string
}

export default function PageHeader(props: props): JSX.Element {
    return (
        <>
            <nav>
                <div className="flex items-center gap-3">
                    {(props.urlBack != "null") ?
                        (<Link href={props.urlBack} className="w-auto text-4xl justify-center p-2 cursor-pointer outline outline-1 outline-rose-400/50 hover:bg-rose-400 hover:text-black rounded-lg">
                            <ChevronLeft className="size-10" />
                        </Link>) : <></>}
                    <h1 className="font-extrabold tracking-tight text-5xl">{props.title}</h1>
                    {(props.urlBack != "null") ?
                    <div className="flex items-end inset-x-full">
                        <Button variant={"outline"} className="flex translate-x-[42vw]">aaa</Button>
                    </div> : <></>}
                </div>
                <br />
                <h2 className="scroll-m-20 border-b text-base text-neutral-700 tracking-tight transition-colors first:mt-0">
                    {props.subtitle}</h2>
            </nav>
            <br />
        </>
    )
}