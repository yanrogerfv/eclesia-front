
import { convertDateFormat, Escala, EscalaResumida, Levita } from "./apiObjects";
import { DialogVerEscala } from "./modals/dialog-escala";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

// function convertDateFormat(dateString: Date) {
//     const date = new Date(dateString);
//     return String((date.getDate() + 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
// }

export function EscalaSimpleCard(escala: EscalaResumida) {
    const day = escala.domingo ? "Domingo" : escala.quarta ? "Quarta" : "Especial"
    return (
        <Card className={`mx-4 border border-primary/40 ${new Date(escala.data) < new Date() ? 'opacity-60 grayscale' : ''}`} key={escala.id}>
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
        <Card className="mx-4 border border-primary/40" key={levita.id}>
            <CardHeader>
                <CardTitle className="text-secondary">
                    {levita.nome}</CardTitle>
                <CardDescription>
                    {levita.email ? levita.email : levita.contato}
                </CardDescription>
            </CardHeader>
            <CardContent className="flow-root h-24">
                {levita.instrumentos.map(instrumento => (
                    // <div key={instrumento.id} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
                    //     transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 m-1">
                    //         {instrumento.nome.toUpperCase()}</div>
                    <Badge variant={"outline"} key={instrumento.id}>{instrumento.nome.toUpperCase()}</Badge>
                        ))}
                <br />
            </CardContent>
        </Card>
    )
}