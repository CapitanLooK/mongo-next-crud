import Link from "next/link"

function Navbar() {
    return(
        <nav className="bg-black-500 py-5 mb-2">
            <div className="container flex justify-between px-10 md:px-0 mx-auto">
                <h1 className="text-2xl font-bold">
                    <Link href="/">
                        Aplicacion de tareas
                    </Link>
                </h1>

            <ul className="flex gap-x-4">
                <li>
                    <Link href="/tasks/new">
                        Crear tarea
                    </Link>
                </li>
            </ul>
            </div>
        </nav>
    )
}

export default Navbar