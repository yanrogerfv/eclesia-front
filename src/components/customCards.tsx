
import { convertDateFormat, Escala, EscalaResumida, Levita } from "@/lib/apiObjects";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

export function EscalaSimpleCard(escala: EscalaResumida) {
    const day = escala.domingo ? "Domingo" : escala.quarta ? "Quarta" : "Especial"
    return (
        <Card className={` border border-primary/40 ${new Date(escala.data) < new Date() ? 'opacity-60 grayscale' : ''}`} key={escala.id}>
            <CardHeader>
                {/* <CardTitle> */}
                <CardTitle className={escala.domingo ? "text-secondary" : escala.quarta ? "text-subprimary" : "text-special"}>
                    {convertDateFormat(escala.data)}</CardTitle>
                <CardDescription>
                    {escala.titulo}
                </CardDescription>
            </CardHeader>
            <CardContent key={escala.id} className="flow-root text-subprimary">
                Ministro: <a className="text-colortext">{escala.ministro?escala.ministro:"bo dia :D"}</a><br />
            </CardContent>
        </Card>
    )
}

export function LevitaSimpleCard(levita: Levita) {
    return (
        <Card className="border border-primary/40" key={levita.id}>
            <CardHeader>
                <CardTitle className="text-secondary">
                    {levita.nome}</CardTitle>
                <CardDescription>
                    {levita.email ? levita.email : levita.contato}
                </CardDescription>
            </CardHeader>
            <CardContent className="flow-root h-20">
                {levita.instrumentos.map(instrumento => (
                    <Badge variant={"outline"} key={instrumento.id}>{instrumento.nome.toUpperCase()}</Badge>
                        ))}
                <br />
            </CardContent>
        </Card>
    )
}