
import { Escala } from "./apiObjects";
import { DialogEscala } from "./dialog-escala";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

function convertDateFormat(dateString: Date) {
    const date = new Date(dateString);
    return String((date.getDate() + 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
}

export function EscalaCard(escala: Escala) {
    return (
        <Card className="hover:text-current/50" key={escala.id}>
            <CardHeader>
                <CardTitle className={
                    escala.domingo ? "text-teal-400" : escala.quarta ? "text-emerald-400" : "text-sky-400"
                }>
                    {escala.titulo}
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
                {/* <Button className="float-right" onClick={() => <ModalEscala escala={escala}/>}>Ver Escala</Button>
                  {isEscalaModalOpen && <ModalEscala escala={escala}/>} */}
                <DialogEscala key={escala.id}
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
                />
                {/* <DialogEscala escala={escala}/> */}
            </CardFooter>
        </Card>
    )
}