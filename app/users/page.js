"use client"
import { useEffect, useState } from "react"
import { initialUsers } from "@/lib/data"
import Header from "@/components/Header"
import Navbar from "@/components/Navbar"
import UsersTable from "@/components/UsersTable"
import UserForm from "@/components/forms/UserForm"

export default function UsersPage() {
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState(initialUsers)
    const [showForm, setShowForm] = useState(false)
    const [editingUser, setEditingUser] = useState(null)

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem("currentUser"))
        if (!u) window.location.href = "/"
        else if (u.role !== "admin") window.location.href = "/dashboard"
        else setUser(u)
    }, [])

    if (!user) return null

    const saveUser = (formData) => {
        if (editingUser) {
            setUsers((prev) =>
                prev.map((u) => (u.id === editingUser.id ? { ...formData, id: editingUser.id } : u))
            )
            setEditingUser(null)
        } else {
            const newUser = {
                ...formData,
                id: Math.max(...users.map((u) => u.id), 0) + 1,
            }
            setUsers((prev) => [...prev, newUser])
        }
        setShowForm(false)
    }

    const deleteUser = (id) => {
        if (user.id === id) {
            alert("Vous ne pouvez pas supprimer votre propre compte !")
            return
        }
        if (confirm("Voulez-vous supprimer cet utilisateur ?")) {
            setUsers((prev) => prev.filter((u) => u.id !== id))
        }
    }

    return (
        <div>
            <Header user={user} />
            <Navbar user={user} />

            <main className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Gestion des Utilisateurs</h2>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        + Nouvel Utilisateur
                    </button>
                </div>

                <UsersTable
                    users={users}
                    onEdit={(u) => {
                        setEditingUser(u)
                        setShowForm(true)
                    }}
                    onDelete={deleteUser}
                />
            </main>

            {showForm && (
                <UserForm
                    user={editingUser}
                    onSave={saveUser}
                    onCancel={() => {
                        setShowForm(false)
                        setEditingUser(null)
                    }}
                />
            )}
        </div>
    )
}
