"use client";
import { ChangeEvent, useState } from "react";
import axios from "axios";

export default function FormProducto() {
  const [loading, setLoading] = useState(false);
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    imagenes: null as FileList | null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProducto({
      ...producto,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProducto({
      ...producto,
      imagenes: event.target.files,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("categoria", producto.categoria);
    if (producto.imagenes) {
      Array.from(producto.imagenes).forEach((file) =>
        formData.append("imagenes", file)
      );
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/productos",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Nombre
        </label>
        <input
          type='text'
          name='nombre'
          onChange={handleChange}
          required
          className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black'
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Precio
        </label>
        <input
          type='number'
          step='0.01'
          name='precio'
          onChange={handleChange}
          required
          className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black'
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Categoría
        </label>
        <input
          type='text'
          name='categoria'
          onChange={handleChange}
          required
          className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black'
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Imágenes
        </label>
        <input
          type='file'
          name='imagenes'
          onChange={handleFileChange}
          multiple
          required
          className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black'
        />
      </div>
      <button
        type='submit'
        disabled={loading}
        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      >
        {loading ? "Cargando..." : "Enviar"}
      </button>
    </form>
  );
}
