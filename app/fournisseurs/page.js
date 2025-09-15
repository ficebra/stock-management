"use client"
import { useEffect, useState } from "react"
import Header from "@/components/Header"
import Navbar from "@/components/Navbar"
import FournisseursTable from "@/components/FournisseursTable"
import FournisseurForm from "@/components/forms/FournisseurForm"

export default function FournisseursPage() {
    const [user, setUser] = useState(null)
    const [fournisseurs, setFournisseurs] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [editingFournisseur, setEditingFournisseur] = useState(null)

    const fetchFournisseurs = async () => {
        const res = await fetch("/api/fournisseurs")
        setFournisseurs(await res.json())
    }

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem("currentUser"))
        if (!u) window.location.href = "/"
        else setUser(u)
        fetchFournisseurs()
    }, [])

    if (!user) return null

    const saveFournisseur = async (data) => {
        if (data.id) {
            await fetch(`/api/fournisseurs/${data.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
        } else {
            await fetch("/api/fournisseurs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
        }
        setShowForm(false)
        setEditingFournisseur(null)
        fetchFournisseurs()
    }

    const deleteFournisseur = async (id) => {
        if (confirm("Supprimer ce fournisseur ?")) {
            await fetch(`/api/fournisseurs/${id}`, { method: "DELETE" })
            fetchFournisseurs()
        }
    }

    return (
        <div>
            <Header user={user} />
            <Navbar user={user} />

            <main className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Gestion des Fournisseurs</h2>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        + Nouveau Fournisseur
                    </button>
                </div>

                <FournisseursTable
                    fournisseurs={fournisseurs}
                    onEdit={(f) => {
                        setEditingFournisseur(f)
                        setShowForm(true)
                    }}
                    onDelete={deleteFournisseur}
                />
            </main>

            {showForm && (
                <FournisseurForm
                    fournisseur={editingFournisseur}
                    onSave={saveFournisseur}
                    onCancel={() => {
                        setShowForm(false)
                        setEditingFournisseur(null)
                    }}
                />
            )}
        </div>
    )
}
