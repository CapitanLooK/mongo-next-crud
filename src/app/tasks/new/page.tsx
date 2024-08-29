"use client";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

function FormPage() {
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
    });

    const router = useRouter();
    const params = useParams();

    const getTask = async () => {
        const response = await fetch(`/api/tasks/${params.id}`)
        const data = await response.json();
        setNewTask({
            title: data.title,
            description: data.description,
        })
    }

    const createTask = async () => {
        try {
            const response = await fetch('/api/tasks', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask)
            })
            const data = await response.json();
            if (response.status === 200) {
                router.push('/')
                router.refresh();
                console.log(data);
            }
        } catch (error) {
            console.log(error);

        }

    }

    const deleteTask = async () => {
        if (window.confirm("Seguro que quiere borrar la tarea?")) {
            const response = await fetch(`/api/tasks/${params.id}`, {
                method: "DELETE",
            })
            router.push('/')
            router.refresh();
        }

    }

    const updateTask = async () => {
        try {
            const response = await fetch(`/api/tasks/${params.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            })
        } catch (error) {
            console.log(error);
        }
        router.push('/')
        router.refresh();
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!params.id) {
            createTask();
        }
        else {
            updateTask();
        }
        router.push('/')
        router.refresh();

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value
        })

    };

    useEffect(() => {
        if (params.id) {
            getTask();
        }
    })
    return (
        <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
            <form onSubmit={handleSubmit}>
                <header className="container flex justify-between items-center">
                    <h1 className="font-bold text-3xl">
                        {!params.id ? "Crear nueva tarea" : "Modificar Tarea"}
                    </h1>
                    {params.id ? <button className="bg-red-500 px-3 py-1 rounded-md" onClick={deleteTask} type="button">
                        Borrar
                    </button> : null}
                </header>
                <input type="text" name="title" placeholder="Titulo" className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4" onChange={handleChange} value={newTask.title} />
                <textarea rows={3} name="description" placeholder="Descripcion" className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4" onChange={handleChange} value={newTask.description}></textarea>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-4 rounded-lg">
                    {!params.id ? "Guardar" : "Modificar"}
                </button>
            </form>
        </div>
    )
}

export default FormPage