import { UUID } from "crypto";

export interface Levita {
    id: UUID,
    nome: string,
    instrumentos: Instrumento[],
    contato: string,
    email: string,
    disponivel: boolean
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
    back: Array<Levita>,
    musicas: Array<Musica>,
    observacoes: string
}

export async function fetchLevitas() {
    var levita = await (fetch('http://localhost:1004/v1/levita'));
    if (!levita.ok)
        throw new Error(`HTTP error! status: ${levita.status}`);
    var data: Levita[] = await levita.json() as Levita[];
    return data as Levita[];
}

export var levitas = await fetchLevitas();

export async function postLevita(levita:Levita) {
    var response = await (fetch('http://localhost:1004/v1/levita',
    {
        method: 'POST'
    }));
    if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
    var data: Levita[] = await response.json() as Levita[];
    return data as Levita[];
}
