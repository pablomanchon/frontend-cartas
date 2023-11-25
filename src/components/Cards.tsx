"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import { Producto } from "../../types";

const Cards = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get<Producto[]>(
          "https://backend-cartas-production-5902.up.railway.app/api/productos"
        );
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className='cards'>
      {productos.map((producto) => (
        <Card key={producto.id} producto={producto} />
      ))}
    </div>
  );
};

export default Cards;
