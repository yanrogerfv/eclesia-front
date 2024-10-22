import { UUID } from "crypto";

export interface Levita {
    id: UUID,
    nome: string,
    email: string,
    contato: string,
    
    instrumentos: Instrumento[]
}

export interface Instrumento {
    numero: number,
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

export function convertDateFormat(dateString: Date) {
    const date = new Date(dateString);
    return String((date.getDate() + 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
}


/* export async function fetchLevitas() {
    var levita = await (fetch('http://localhost:1004/v1/levita'));
    if (!levita.ok)
        throw new Error(`HTTP error! status: ${levita.status}`);
    var data: Levita[] = await levita.json() as Levita[];
    return data as Levita[];
} */

