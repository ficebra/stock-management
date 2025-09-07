import { PrismaClient, TypeMouvement } from "@prisma/client"
const prisma = new PrismaClient()

export async function GET() {
    const mouvements = await prisma.mouvement.findMany({
        include: { article: true, user: true },
        orderBy: { createdAt: "desc" }
    })
    return Response.json(mouvements)
}

export async function POST(req) {
    const data = await req.json()

    if (!data.userId) {
        return new Response(JSON.stringify({ error: "Utilisateur non authentifié" }), { status: 401 })
    }

    // Vérifie que le type de mouvement est valide
    if (![TypeMouvement.ENTREE, TypeMouvement.SORTIE].includes(data.type)) {
        return new Response(JSON.stringify({ error: "Type de mouvement invalide" }), { status: 400 })
    }

    // Met à jour le stock
    if (data.type === TypeMouvement.ENTREE) {
        await prisma.article.update({
            where: { id: data.articleId },
            data: { quantite: { increment: data.quantite } }
        })
    } else if (data.type === TypeMouvement.SORTIE) {
        await prisma.article.update({
            where: { id: data.articleId },
            data: { quantite: { decrement: data.quantite } }
        })
    }

    const mouvement = await prisma.mouvement.create({
        data: {
            type: data.type,  // doit être "ENTREE" ou "SORTIE"
            quantite: data.quantite,
            articleId: data.articleId,
            userId: data.userId,
        }
    })

    return Response.json(mouvement)
}
