
import { Escala, EscalaResumida, Levita } from "./apiObjects";
import { DialogVerEscala } from "./dialogs/dialog-escala";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

function convertDateFormat(dateString: Date) {
    const date = new Date(dateString);
    return String((date.getDate() + 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
}

export function EscalaCard(escala: Escala) {
    return (
        <>
            <Card className="hover:text-current/50" key={escala.id}>
                <CardHeader>
                    <CardTitle className={
                        escala.domingo ? "text-teal-400" : escala.quarta ? "text-emerald-400" : "text-sky-400"
                    }>{escala.titulo}

                    </CardTitle>
                    {convertDateFormat(escala.data)}
                    <CardDescription>
                        {escala.observacoes}
                    </CardDescription>
                </CardHeader>
                <CardContent key={escala.id}>
                    <a className="text-teal-400">Ministro: </a><a className="text-emerald-400">{escala.ministro.nome}</a><br />
                    <a className="text-teal-400">Violão: </a>{escala.violao ? escala.violao.nome : <a className="text-zinc-50/50">Não inserido.</a>}<br />
                    <a className="text-teal-400">Teclado: </a>{escala.teclado ? escala.teclado.nome : <a className="text-zinc-50/50">Não inserido.</a>}<br />
                    <a className="text-teal-400">Bateria: </a>{escala.bateria ? escala.bateria.nome : <a className="text-zinc-50/50">Não inserido.</a>}<br />
                    <a className="text-teal-400">Baixo: </a>{escala.baixo ? escala.baixo.nome : <a className="text-zinc-50/50">Não inserido.</a>}<br />
                    <a className="text-teal-400">Guitarra: </a>{escala.guitarra ? escala.guitarra.nome : <a className="text-zinc-50/50">Não inserido.</a>}<br />
                </CardContent>
                <CardFooter className="mt-auto inset-x-0 bottom-0 flow-root">
                    {escala.domingo ?
                        <Badge className="bg-teal-400/80 hover:bg-teal-400/20">Domingo</Badge>
                        : escala.quarta ?
                            <Badge className="bg-emerald-400/80 hover:bg-emerald-400/20">Quarta</Badge>
                            :
                            <Badge className="bg-sky-400/80 hover:bg-sky-400/20">Especial</Badge>
                    }
                    <DialogVerEscala key={escala.id}
                        escalaId={escala.id}
                    />
                </CardFooter>
            </Card>
        </>
    )
}

export function EscalaSimpleCard(escala: EscalaResumida) {
    const day = escala.domingo ? "Domingo" : escala.quarta ? "Quarta" : "Especial"
    return (
        <Card className="mx-4" key={escala.id}>
            <CardHeader>
                <CardTitle className={escala.domingo ? "text-teal-400" : escala.quarta ? "text-emerald-400" : "text-sky-400"}>
                    {day + " - " + convertDateFormat(escala.data)}</CardTitle>
                <CardDescription>
                    {escala.titulo}
                </CardDescription>
            </CardHeader>
            <CardContent key={escala.id} className="flow-root text-teal-400">
                Ministro: <a className="text-emerald-400">{escala.ministro?escala.ministro:"bo dia :D"}</a><br />
                <div className="float-right">
                    {/* <DialogEscala key={escala.id}
                        id={escala.id}
                        titulo={escala.titulo}
                        ministro={escala.ministro}
                        violao={escala.violao}
                        teclado={escala.teclado}
                        bateria={escala.bateria}
                        guitarra={escala.guitarra}
                        baixo={escala.baixo}
                        data={escala.data}
                        quarta={escala.quarta}
                        musicas={escala.musicas}
                        observacoes={escala.observacoes}
                        domingo={escala.domingo}
                        especial={escala.especial}
                        back={escala.back}
                    /> */}
                </div>
            </CardContent>
        </Card>
    )
}

export function LevitaSimpleCard(levita: Levita) {
    return (
        <Card className="mx-4" key={levita.id}>
            <CardHeader>
                <CardTitle className="text-teal-400">
                    {levita.nome}</CardTitle>
                <CardDescription>
                    {levita.email ? levita.email : levita.contato}
                </CardDescription>
            </CardHeader>
            <CardContent className="flow-root text-teal-400 h-24">
                {levita.instrumentos.map(instrumento => (
                    <div key={instrumento.id} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
                        transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 m-1">
                            {instrumento.nome.toUpperCase()}</div>))}
                <br />
            </CardContent>
        </Card>
    )
}