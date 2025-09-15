import prisma from "@/lib/prisma"

export async function PUT(req, { params }) {
    try {
        const body = await req.json()
        const fournisseur = await prisma.fournisseur.update({
            where: { id: Number(params.id) },
            data: {
                nom: body.nom,
                contact: body.contact || null,
                telephone: body.telephone || null,
            }
        })
        return Response.json(fournisseur)
    } catch (error) {
        console.error("❌ Erreur PUT Fournisseur:", error)
        return Response.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    try {
        await prisma.fournisseur.delete({
            where: { id: Number(params.id) }
        })
        return Response.json({ success: true })
    } catch (error) {
        console.error("❌ Erreur DELETE Fournisseur:", error)
        return Response.json({ error: error.message }, { status: 500 })
    }
}
