import * as React from "react"

import { Button } from "./ui/button"
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

type ButtonLinkProps = {
    title: string;
    reff: string;
}

export const ButtonLink = ({ title, reff }: ButtonLinkProps) => {
    return (
        <Link href={reff}
        className="w-auto outline outline-1 outline-cyan-400/50 text-white flex-1 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 hover:text-black">
            {title}</Link>
    );
};


