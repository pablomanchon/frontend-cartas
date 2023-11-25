import Cards from "@/components/Cards";
import FormProducto from "@/components/FormProducto";
import Image from "next/image";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <FormProducto />
      <Cards />
    </main>
  );
}
