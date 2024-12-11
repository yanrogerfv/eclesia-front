import { Button } from "@/components/ui/button";
import Link from "next/link";



export default function LandingPage() {


    return (
        <div className="h-screen bg-gradient-to-b from-black to-primary/10">
            <div className="h-screen bg-gradient-to-t from-transparent to-white/10">
            <main className="p-20">
                <nav>
                    <div className="flex justify-center">
                        <h1 className="w-1/2 text-center font-extrabold border border-spacing-40 rounded-xl text-8xl">
                            Planejador de Escalas</h1>
                        {/* <Button onClick={() => handleSereneMode()} variant={sereneMode ? "outline" : "default"} className="flex h-12 text-lg rounded-lg">Modo Sereno</Button> */}
                    </div>
                    <br />
                </nav>
                <br />
                <div>
                    <div key={"card-bg"} className="flex items-center justify-center">
                        <p className="text-center text-4xl">Planejador de Escalas</p>
                    </div>
                    <br />
                </div>
            </main>
            </div>
        </div>
    )
}