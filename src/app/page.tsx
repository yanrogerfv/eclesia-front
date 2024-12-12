import ThemeToggle from "@/components/themeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";



export default function LandingPage() {


    return (
        <div className="h-screen bg-gradient-to-b from-black to-primary/10">
            <main className="px-20">
                <nav className="bg-primary/25 h-[10dvh] rounded-b-3xl">

                </nav>
                <nav className="pt-20 flex justify-center">
                    <div className="flex-row justify-center text-center p-10 font-extrabold bg-black/50 border border-spacing-40 rounded-xl">
                        <h1 className="w-1/2 text-center text-8xl">
                            Eclesia</h1>
                        {/* <Button onClick={() => handleSereneMode()} variant={sereneMode ? "outline" : "default"} className="flex h-12 text-lg rounded-lg">Modo Sereno</Button> */}
                        <p className="text-center text-zinc-300/90 text-2xl">
                            Uma amiga na hora de organizar os Levitas e montar Escalas!</p>
                    </div>
                    <br />
                </nav>
                <div className="justify-center items-center">
                    <div key={"card-bg"} className="flex items-center justify-center">
                    </div>
                    <br />
                    <div className="flex justify-center">
                        <ThemeToggle />

                        <Button variant={"outfill"} className="flex h-12 text-lg rounded-lg"><Link href="/v0" className="w-full">Começar</Link></Button>
                    </div>
                </div>
            </main>
        </div>
    )
}