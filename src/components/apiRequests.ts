"use client"

import { UUID } from "crypto";
import { useEffect, useState } from "react";
import { Instrumento, Musica } from "./apiObjects";

const apiUrl = process.env.API_URL;

export function DeleteLevita(levitaId: UUID) {
    useEffect(() => {
        fetch(apiUrl + "levita/" + levitaId.toString(), {
            method: "DELETE"
        }).catch((error) => {
            console.error("Erro na comunicação com a api: ", error);
        })
    }, [])
}

export function DeleteEscala(escalaId: UUID) {
    useEffect(() => {
        fetch(apiUrl + "escala/".concat(escalaId.toString()), {
            method: "DELETE"
        }).catch((error) => {
            console.error("Erro na comunicação com a api: ", error);
        })
    }, [])
}

export function CreateMusica(nomeMusica:string, linkMusica:string, cifraMusica:string) {
    // const [createdMusic, setCreatedMusic] = useState<Musica>()
    useEffect(() => {
        fetch("http://localhost:1004/v1/musicas", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nomeMusica,
                link: linkMusica,
                cifra: cifraMusica
            })
        }).then((res) => res.json())
        // .then((data) => setCreatedMusic(data))
        .catch((error) => {
            console.error("Erro na comunicação com a api: ", error);
        })
    }, [])
    // return createdMusic;
}
export function DeleteMusica(musicaId: UUID) {
    useEffect(() => {
        fetch(apiUrl + "musicas/".concat(musicaId.toString()), {
            method: "DELETE"
        }).catch((error) => {
            console.error("Erro na comunicação com a api: ", error);
        })
    }, [])
}

export function GetInstrumentos(){
    const [instrumentosBase, setInstrumentosBase] = useState<Instrumento[]>([])

    useEffect(() => {
        fetch("http://localhost:1004/v1/instrumento")
          .then((res) => res.json())
          .then((data) => {
            setInstrumentosBase(data)
          })
          .catch((error) => {
            console.error("Erro na comunicação com a api: ", error)
            setInstrumentosBase([]);
          })
      }, [instrumentosBase])
    return instrumentosBase;
}
