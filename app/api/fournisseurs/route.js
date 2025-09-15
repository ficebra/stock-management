import prisma from "@/lib/prisma"

export async function GET() {
    try {
        const fournisseurs = await prisma.fournisseur.findMany({
            orderBy: { createdAt: "desc" }
        })
        return Response.json(fournisseurs)
    } catch (error) {
        console.error("❌ Erreur GET Fournisseurs:", error)
        return Response.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        const body = await req.json()
        console.log("📩 Fournisseur reçu:", body)

        const fournisseur = await prisma.fournisseur.create({
            data: {
                nom: body.nom,
                contact: body.contact || null,
                telephone: body.telephone || null,
            }
        })

        return Response.json(fournisseur)
    } catch (error) {
        console.error("❌ Erreur POST Fournisseur:", error)
        return Response.json({ error: error.message }, { status: 500 })
    }
}
