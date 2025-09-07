"use client"
import { useEffect, useState } from "react"
import { initialArticles, initialMouvements } from "@/lib/data"
import Header from "@/components/Header"
import Navbar from "@/components/Navbar"
import StatsCards from "@/components/StatsCards"

export default function DashboardPage() {
    const [user, setUser] = useState(null)
    const [articles, setArticles] = useState(initialArticles)
    const [mouvements, setMouvements] = useState(initialMouvements)

    useEffect(() => {
        const stored = localStorage.getItem("currentUser")
        if (!stored) {
            window.location.href = "/" // pas connecté
        } else {
            try {
                const parsedUser = JSON.parse(stored)
                setUser(parsedUser)
            } catch (e) {
                console.error("Erreur parsing utilisateur :", e)
                window.location.href = "/"
            }
        }
    }, [])

    // 👉 tant que le user n’est pas chargé, on n’affiche rien
    if (!user) return null

    return (
        <div>
            <Header user={user} />
            <Navbar user={user} />
            <main className="px-4 sm:px-6 lg:px-8 py-8">
                <h2 className="text-2xl font-bold mb-6">
                    Bienvenue {user.nom} 👋
                </h2>
                <StatsCards articles={articles} mouvements={mouvements} />
            </main>
        </div>
    )
}
