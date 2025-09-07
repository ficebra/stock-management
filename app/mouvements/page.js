"use client"
import { useEffect, useState } from "react"
import { initialArticles, initialMouvements } from "@/lib/data"
import Header from "@/components/Header"
import Navbar from "@/components/Navbar"
import MovementsTable from "@/components/MovementsTable"
import MouvementForm from "@/components/forms/MouvementForm"

export default function MouvementsPage() {
    const [user, setUser] = useState(null)
    const [articles, setArticles] = useState(initialArticles)
    const [mouvements, setMouvements] = useState(initialMouvements)
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem("currentUser"))
        if (!u) window.location.href = "/"
        else setUser(u)
    }, [])

    if (!user) return null

    const saveMouvement = (formData) => {
        const article = articles.find((a) => a.id === parseInt(formData.articleId))
        if (!article) return

        const newMouvement = {
            id: Math.max(...mouvements.map((m) => m.id), 0) + 1,
            ...formData,
            articleId: parseInt(formData.articleId),
            quantite: parseInt(formData.quantite),
            date: new Date().toISOString(),
            utilisateur: user.nom,
        }

        setMouvements((prev) => [...prev, newMouvement])

        // mise à jour du stock
        const nouvelleQuantite =
            formData.type === "entree"
                ? article.quantite + parseInt(formData.quantite)
                : article.quantite - parseInt(formData.quantite)

        if (nouvelleQuantite < 0) {
            alert("Stock insuffisant pour cette sortie !")
            return
        }

        setArticles((prev) =>
            prev.map((a) =>
                a.id === article.id ? { ...a, quantite: nouvelleQuantite } : a
            )
        )

        setShowForm(false)
    }

    return (
        <div>
            <Header user={user} />
            <Navbar user={user} />

            <main className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Mouvements de Stock</h2>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        + Nouveau Mouvement
                    </button>
                </div>

                <MovementsTable mouvements={mouvements} articles={articles} />
            </main>

            {showForm && (
                <MouvementForm
                    onSave={saveMouvement}
                    onCancel={() => setShowForm(false)}
                    articles={articles}
                />
            )}
        </div>
    )
}
