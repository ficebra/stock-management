import { NextResponse } from "next/server";
import { PrismaClient, Role } from "@prisma/client"
const prisma = new PrismaClient()

export async function GET() {
    try {
        const categories = await prisma.categorie.findMany();
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch categories", error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const body = await req.json()
        console.log("📩 Données reçues:", body)

        const categorie = await prisma.categorie.create({
            data: { nom: body.nom }
        })

        return Response.json(categorie)
    } catch (error) {
        console.error("❌ Erreur API categories POST:", error)
        return Response.json({ error: error.message }, { status: 500 })
    }
}