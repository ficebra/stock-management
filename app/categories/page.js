"use client"
import { useEffect, useState } from "react"
import Header from "@/components/Header"
import Navbar from "@/components/Navbar"
import CategoriesTable from "@/components/CategoriesTable"
import CategoryForm from "@/components/forms/CategoryForm"

export default function CategoriesPage() {
    const [user, setUser] = useState(null)
    const [categories, setCategories] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)

    
    const fetchCategories = async () => {
        const res = await fetch("/api/categories")
        setCategories(await res.json())
    }
    
    useEffect(() => {
        const u = JSON.parse(localStorage.getItem("currentUser"))
        if (!u) window.location.href = "/"
        else setUser(u)
        fetchCategories()
    }, [])

    if (!user) return null

    const saveCategory = async (data) => {
        if (data.id) {
            await fetch(`/api/categories/${data.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nom: data.nom })
            })
        } else {
            await fetch("/api/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nom: data.nom })
            })
        }
        setShowForm(false)
        setEditingCategory(null)
        fetchCategories()
    }

    const deleteCategory = async (id) => {
        if (confirm("Supprimer cette catégorie ?")) {
            await fetch(`/api/categories/${id}`, { method: "DELETE" })
            fetchCategories()
        }
    }

    return (
        <div>
            <Header user={user} />
            <Navbar user={user} />

            <main className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Gestion des Catégories</h2>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        + Nouvelle Catégorie
                    </button>
                </div>

                <CategoriesTable
                    categories={categories}
                    onEdit={(c) => {
                        setEditingCategory(c)
                        setShowForm(true)
                    }}
                    onDelete={deleteCategory}
                />
            </main>

            {showForm && (
                <CategoryForm
                    category={editingCategory}
                    onSave={saveCategory}
                    onCancel={() => {
                        setShowForm(false)
                        setEditingCategory(null)
                    }}
                />
            )}
        </div>
    )
}
