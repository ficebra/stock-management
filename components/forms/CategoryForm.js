"use client"
import { useState, useEffect } from "react"

export default function CategoryForm({ category, onSave, onCancel }) {
    const [nom, setNom] = useState("")

    useEffect(() => {
        if (category) setNom(category.nom)
    }, [category])

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave({ nom, id: category?.id })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-bold mb-4">
                    {category ? "Modifier la Catégorie" : "Nouvelle Catégorie"}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Nom de la catégorie"
                        className="border p-2 rounded w-full"
                        required
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
