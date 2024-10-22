"use client"

import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Escala } from "./apiObjects";

interface props {
    escala: Escala
}

const ModalEscala = (props:props) => {
    const [modalOpen, setModalOpen] = useState(true);
    return ( modalOpen &&
        <>
            <div key={props.escala.id} className="fixed inset-0 flex justify-center items-center bg-black/25 backdrop-blur-sm">
                <div className="w-[600px]">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex">{props.escala.titulo}
                                <X onClick= {() => setModalOpen(false)}
                                    className="flex hover:cursor-pointer outline-teal-400 outline rounded-lg text-right justify-items-end items-end justify-end" />
                            </CardTitle>
                            <CardDescription>
                                Descricao descritiva
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>{props.escala.back.map(backLevita => (<Badge key={backLevita.id} className="m-1">{backLevita.nome}</Badge>))}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default ModalEscala;

// export function BadgeDisponivel(text: string, disp: boolean, chav: string) {
//     return (
//         <div key={chav} className="flex items-center space-x-2">
//             {disp ?
//                 <Badge key={chav} className="bg-rose-400">{text}</Badge>
//                 :
//                 <Badge key={chav} variant={"outline"}>{text}</Badge>
//             }
//         </div>
//     )

// }