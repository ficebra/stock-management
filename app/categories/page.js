"use client"
import { useEffect, useState } from "react"

export default function CategoriesPage() {
    const [categories, setCategories] = useState([])
    const [nom, setNom] = useState("")
    const [editId, setEditId] = useState(null)

    // 🔄 Récupérer toutes les catégories
    const fetchCategories = async () => {
        const res = await fetch("/api/categories")
        const data = await res.json()
        setCategories(data)
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    // ➕ Ajouter ou modifier
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!nom.trim()) return

        if (editId) {
            // 📝 Modification
            await fetch(`/api/categories/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nom }) // ✅ bien stringify
            })
        } else {
            // ➕ Création
            await fetch("/api/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nom }) // ✅ bien stringify
            })
        }

        setNom("")
        setEditId(null)
        fetchCategories()
    }

    // 🖊 Éditer
    const handleEdit = (cat) => {
        setNom(cat.nom)
        setEditId(cat.id)
    }

    // ❌ Supprimer
    const handleDelete = async (id) => {
        if (confirm("Supprimer cette catégorie ?")) {
            await fetch(`/api/categories/${id}`, { method: "DELETE" })
            fetchCategories()
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">📂 Gestion des Catégories</h1>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Nom de la catégorie"
                    className="border p-2 rounded w-64"
                    required
                />
                <button className="bg-pink-500 text-white px-4 py-2 rounded">
                    {editId ? "Modifier" : "Ajouter"}
                </button>
            </form>

            {/* Liste */}
            <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">
                <thead className="bg-pink-100">
                    <tr>
                        <th className="px-4 py-2 text-left">Nom</th>
                        <th className="px-4 py-2 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((c) => (
                        <tr key={c.id} className="border-t">
                            <td className="px-4 py-2">{c.nom}</td>
                            <td className="px-4 py-2 text-right space-x-2">
                                <button
                                    onClick={() => handleEdit(c)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => handleDelete(c.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
