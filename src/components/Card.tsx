import Image from "next/image";
import React from "react";
import { Producto } from "../../types";

export default function Card({ producto }: { producto: Producto }) {
  const { nombre, precio, categoria, imagenes } = producto;

  // Asume que la primera imagen es la principal
  const imagenPrincipal = imagenes[0];
  const imagenBuffer = Buffer.from(imagenPrincipal).toString("base64");
  return (
    <div className='card'>
      <Image
        src={`data:image/webp;base64,${imagenBuffer}`}
        alt={nombre}
        width={300}
        height={300}
      />
      <div className='card-body'>
        <h5 className='card-title'>{nombre}</h5>
        <p className='card-text'>Precio: ${precio}</p>
        <p className='card-text'>Categoría: {categoria}</p>
      </div>
    </div>
  );
}
