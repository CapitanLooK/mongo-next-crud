import { NextResponse } from "next/server"
import { connectDB } from "@/utils/mongoose"
import Task from "@/models/Task"

export async function GET(request, {params}){
    try{
        connectDB();
        const taskFound = await Task.findById(params.id)
        
        if(!taskFound)
            return NextResponse.json({
                message: "no se encontro la tarea"
            }, {
                status: 404
            });
    
        return NextResponse.json(taskFound);
    } catch(error){
        return NextResponse.json({
            message: "No es una tarea valida"
        }, {
            status: 400
        });

    }
}

export async function DELETE(request, {params}){
    try{
        const taskDeleted = await Task.findByIdAndDelete(params.id)
        if(!taskDeleted){
            return NextResponse.json({
                message: "no se encontro la tarea para borrar"
            })
        }
        return NextResponse.json(taskDeleted);
    } catch{
        return NextResponse.json({
            message: "Error al eliminar la tarea"
        }, {
            status: 400
        });
    
    }
}

export async function PUT(request, {params}){
    try{
        const data = await request.json()
        const taskUpdated = await Task.findByIdAndUpdate(params.id, data, {
            new: true
        })
    
        return NextResponse.json(taskUpdated);
    } catch(error){
        return NextResponse.json({
            message: "no se pudo actualizar la tarea"
        }, {
            status: 400
        });
    }
}