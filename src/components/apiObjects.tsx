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