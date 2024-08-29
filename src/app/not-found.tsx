import Link from "next/link"

function NotFound() {
  return (
    <section className="h-[calc(100vh-7rem)] flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold block p-2">404</h1>
      <p className="text-2xl font-bold p-5">Pagina no encontrada</p>
      <p>
        <Link href="/" className="text-3xl bg-black rounded-xl p-2 hover:bg-gray-800">
          Regresar al inicio
        </Link>
      </p>
    </section>
  )
}

export default NotFound