import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return new Response(JSON.stringify(users), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        return new Response(JSON.stringify({ error: "Erreur serveur" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function POST(req) {
    try {
        const { nom, email, password, role } = await req.json();

        // Validation basique
        if (!nom || !email || !password || !role) {
            return new Response(JSON.stringify({ error: "Champs manquants" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Vérifier si l'email existe déjà
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return new Response(JSON.stringify({ error: "Email déjà utilisé" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const newUser = await prisma.user.create({
            data: { nom, email, password, role },
        });

        return new Response(JSON.stringify(newUser), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        return new Response(JSON.stringify({ error: "Erreur serveur" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}