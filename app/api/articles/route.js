import { PrismaClient, Role } from "@prisma/client"
const prisma = new PrismaClient()

export async function GET() {
    const articles = await prisma.article.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" }
    })
    return Response.json(articles)
}

export async function POST(req) {
    const data = await req.json()

    if (!data.userId) {
        return new Response(JSON.stringify({ error: "Utilisateur non authentifié" }), { status: 401 })
    }

    // Vérifie que l'utilisateur existe et son rôle
    const user = await prisma.user.findUnique({ where: { id: data.userId } })
    if (!user) {
        return new Response(JSON.stringify({ error: "Utilisateur introuvable" }), { status: 404 })
    }

    // ⚠️ Exemple : seuls les ADMIN peuvent créer des articles
    if (user.role !== Role.ADMIN) {
        return new Response(JSON.stringify({ error: "Accès refusé" }), { status: 403 })
    }

    const article = await prisma.article.create({
        data: {
            nom: data.nom,
            categorie: data.categorie,
            prixAchat: data.prixAchat,
            prixVente: data.prixVente,
            quantite: data.quantite,
            seuilAlerte: data.seuilAlerte,
            userId: data.userId,
        }
    })

    return Response.json(article)
}
