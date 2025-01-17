import { UUID } from "crypto";

export interface Levita {
    id: UUID,
    nome: string,
    email: string,
    contato: string,
    descricao: string,
    instrumentos: Instrumento[]
}

export interface Instrumento {
    id: number,
    nome: string
}

export interface Musica {
    id: UUID,
    nome: string,
    link: string,
    cifra: string
}

export interface Escala {
    id: UUID,
    data: Date,
    titulo: string,
    quarta: boolean,
    domingo: boolean,
    especial: boolean,
    ministro: Levita,
    baixo: Levita,
    bateria: Levita,
    guitarra: Levita,
    teclado: Levita,
    violao: Levita,
    back: Levita[],
    musicas: Musica[],
    observacoes: string
}

export interface EscalaResumida {
    id: UUID,
    data: Date,
    titulo: string,
    quarta: boolean,
    domingo: boolean,
    especial: boolean,
    ministro: string,
    baixo: string,
    bateria: string,
    guitarra: string,
    teclado: string,
    violao: string,
    observacoes: string
}

export function convertDateFormat(dateString: Date | undefined) {
    if (dateString == undefined) return "";
    const date = new Date(dateString);
    const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
    if (date.getDate() == 28 && date.getMonth() == 1 && date.getFullYear() % 4 != 0) {
        return String(days[date.getDay()] + " - " + '01/03/' + date.getFullYear())
    } else if (date.getDate() == 29 && date.getMonth() == 1 && date.getFullYear() % 4 == 0) {
        return String(days[date.getDay()] + " - " + '01/03/' + date.getFullYear())
    } else if (date.getDate() == 31 && date.getMonth() == 12) {
        return String(days[date.getDay()] + " - " + '01/01/' + (date.getFullYear() + 1))
    }
    return String(days[date.getDay()] + " - " + (date.getDate() + 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
}


/* export async function fetchLevitas() {
    var levita = await (fetch('http://localhost:1004/v1/levita'));
    if (!levita.ok)
        throw new Error(`HTTP error! status: ${levita.status}`);
    var data: Levita[] = await levita.json() as Levita[];
    return data as Levita[];
} */

