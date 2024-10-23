"use client"

import { UUID } from "crypto";
import { useEffect } from "react";




export function DeleteLevita(levitaId:UUID){
    useEffect(() => {
        fetch("http://localhost:1004/v1/levita/".concat(levitaId.toString()), {
            method: "DELETE"
        }).catch((error) => {
            console.error("Erro na comunicação com a api: ", error);
          })
      }, [])
}

export function DeleteEscala(escalaId:UUID){
    useEffect(() => {
        fetch("http://localhost:1004/v1/escala/".concat(escalaId.toString()), {
            method: "DELETE"
        }).catch((error) => {
            console.error("Erro na comunicação com a api: ", error);
          })
      }, [])
}

export function DeleteMusica(musicaId:UUID){
    useEffect(() => {
        fetch("http://localhost:1004/v1/musica/".concat(musicaId.toString()), {
            method: "DELETE"
        }).catch((error) => {
            console.error("Erro na comunicação com a api: ", error);
          })
      }, [])
}

