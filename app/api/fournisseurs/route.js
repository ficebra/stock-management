import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Contact, Telescope } from "lucide-react";

export async function GET() {
    try {
        const fournisseurs = await prisma.fournisseurs.findMany();
        return NextResponse.json(fournisseurs);
    } catch (error) {
        return NextResponse.json(
            { message: "Impossible de recuperer la liste des fournisseurs", error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    const { body } = await req.json();
    const fournisseur = await prisma.fournisseurs.create({
        data: {
            nom: body.nom,
            contact: body.contact,
            telephone: body.telephone
        }
    })
    return NextResponse.json(fournisseur)
}