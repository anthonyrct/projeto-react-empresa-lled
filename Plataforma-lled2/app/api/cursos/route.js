import Curso from "@/models/Curso";
import connectMongo from "@/utils/dbConnect";
import { NextResponse } from "next/server";


export async function GET() {
    await connectMongo();

    try {
        const cursos = await Curso.find({});
        return NextResponse.json({ success: true, cursos });
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        return NextResponse.json({ success: false, message: 'Erro ao buscar cursos' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { title, descricao, preco } = await request.json();
        await connectMongo();   

        if (!title || !descricao || !preco) {
            return NextResponse.json({ success: false, message: 'Todos os campos são necessários.' }, { status: 400 });
        }

        const curso = await Curso.create({ title, descricao, preco });
        return NextResponse.json({ success: true, curso });
    } catch (error) {
        console.error('Erro ao cadastrar curso:', error);
        return NextResponse.json({ success: false, message: 'Erro ao cadastrar curso na API' }, { status: 400 });
    }
}