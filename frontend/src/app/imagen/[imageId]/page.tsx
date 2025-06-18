"use client"

import { useParams } from "next/navigation";
import { useState } from "react";

export default function ImagenVista(){

    const { imageId } = useParams<{ imageId: string }>();
    const [fondoOscuro, setFondoOscuro] = useState(false);
    return (
        <main
         style={{
        backgroundColor: fondoOscuro ? '#000' : '#fff',
        color: fondoOscuro ? '#fff' : '#000',
        minHeight: '100vh',
        padding: '2rem',
        textAlign: 'center',
      }}>
            <h1>Vista de Imagen</h1>
            <p>ID de la imagen: {imageId}</p>
            <button onClick={() => setFondoOscuro(!fondoOscuro)}>
        Cambiar fondo
      </button>
        </main>
    )
}