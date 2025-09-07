"use client"
import { useState } from "react"

export default function UserForm({ user, onSave, onCancel }) {
    const [formData, setFormData] = useState(
        user || { nom: "", email: "", role: "employe", password: "" }
    )

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">
                    {user ? "Modifier" : "Ajouter"} un utilisateur
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nom complet"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className="w-full p-3 border rounded-lg"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 border rounded-lg"
                        required
                    />
                    <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full p-3 border rounded-lg"
                        required
                    >
                        <option value="employe">Employé</option>
                        <option value="admin">Administrateur</option>
                    </select>
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full p-3 border rounded-lg"
                        required={!user}
                    />
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                        >
                            {user ? "Modifier" : "Ajouter"}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 bg-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-400"
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
