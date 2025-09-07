"use client"
import { useEffect, useState } from "react"
import { initialArticles } from "@/lib/data"
import Header from "@/components/Header"
import Navbar from "@/components/Navbar"
import ArticlesTable from "@/components/ArticlesTable"
import ArticleForm from "@/components/forms/ArticleForm"

export default function ArticlesPage() {
    const [user, setUser] = useState(null)
    const [articles, setArticles] = useState(initialArticles)
    const [showForm, setShowForm] = useState(false)
    const [editingArticle, setEditingArticle] = useState(null)

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem("currentUser"))
        if (!u) window.location.href = "/"
        else setUser(u)
    }, [])

    if (!user) return null

    const saveArticle = (formData) => {
        if (editingArticle) {
            setArticles((prev) =>
                prev.map((a) =>
                    a.id === editingArticle.id ? { ...formData, id: editingArticle.id } : a
                )
            )
            setEditingArticle(null)
        } else {
            const newArticle = {
                ...formData,
                id: Math.max(...articles.map((a) => a.id), 0) + 1,
                dateCreation: new Date().toISOString().split("T")[0],
            }
            setArticles((prev) => [...prev, newArticle])
        }
        setShowForm(false)
    }

    const deleteArticle = (id) => {
        if (confirm("Voulez-vous supprimer cet article ?")) {
            setArticles((prev) => prev.filter((a) => a.id !== id))
        }
    }

    return (
        <div>
            <Header user={user} />
            <Navbar user={user} />

            <main className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Gestion des Articles</h2>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        + Nouvel Article
                    </button>
                </div>

                <ArticlesTable
                    articles={articles}
                    onEdit={(a) => {
                        setEditingArticle(a)
                        setShowForm(true)
                    }}
                    onDelete={deleteArticle}
                    user={user}
                />
            </main>

            {showForm && (
                <ArticleForm
                    article={editingArticle}
                    onSave={saveArticle}
                    onCancel={() => {
                        setShowForm(false)
                        setEditingArticle(null)
                    }}
                />
            )}
        </div>
    )
}
