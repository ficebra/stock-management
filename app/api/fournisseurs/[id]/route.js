import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// PUT - Modifier un fournisseur par ID
export async function PUT(req, { params }) {
    const data = await req.json();
    const fournisseur = await prisma.fournisseurs.update({
        where: { id: Number(params.id) },
        data: {
            nom: data.nom,
            contact: data.contact,
            telephone: data.telephone
        }
    });
    return Response.json(fournisseur);
}

// DELETE - Supprimer un fournisseur par ID
export async function DELETE(req, { params }) {
    await prisma.fournisseurs.delete({
        where: { id: Number(params.id) }
    });
    return Response.json({ success: true });
}