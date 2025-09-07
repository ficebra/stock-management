import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req) {
    try {
        const { email, password } = await req.json()
        console.log("📩 Tentative connexion:", email, password)
        
        // Vérifie si l'utilisateur existe
        const user = await prisma.user.findUnique({
            where: { email },
        })
        console.log("👤 Utilisateur trouvé:", user)

        if (!user) {
            return new Response(JSON.stringify({ error: "Utilisateur introuvable" }), {
                status: 401,
            })
        }

        // ⚠️ Ici on compare en clair (à améliorer avec bcrypt ensuite)
        if (user.password !== password) {
            return new Response(JSON.stringify({ error: "Mot de passe incorrect" }), {
                status: 401,
            })
        }

        // On retourne les infos utiles (sans le mot de passe !)
        const safeUser = {
            id: user.id,
            nom: user.nom,
            email: user.email,
            role: user.role,
        }

        return new Response(JSON.stringify(safeUser), { status: 200 })
    } catch (error) {
        console.error("Erreur login API:", error)
        return new Response(JSON.stringify({ error: "Erreur serveur" }), {
            status: 500,
        })
    }
}
