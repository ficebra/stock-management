import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// PUT - Modifier une catégorie par ID";
export async function PUT(req, { params }) {
    const data = await req.json();
    const categorie = await prisma.category.update({
        where: { id: Number(params.id) },
        data: { nom : data.nom }
    });
    return Response.json(categorie);
}

// DELETE - Supprimer une catégorie par ID
export async function DELETE(req, { params }) {
    await prisma.categorie.delete({
        where: { id: Number(params.id) }
    });
    return Response.json({ success: true });
}
