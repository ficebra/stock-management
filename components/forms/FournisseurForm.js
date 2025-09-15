"use client"
import { useState, useEffect } from "react"

export default function FournisseurForm({ fournisseur, onSave, onCancel }) {
    const [form, setForm] = useState({ nom: "", contact: "", telephone: "" })

    useEffect(() => {
        if (fournisseur) {
            setForm({
                nom: fournisseur.nom,
                contact: fournisseur.contact || "",
                telephone: fournisseur.telephone || ""
            })
        }
    }, [fournisseur])

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave({ ...form, id: fournisseur?.id })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-bold mb-4">
                    {fournisseur ? "Modifier le Fournisseur" : "Nouveau Fournisseur"}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={form.nom}
                        onChange={(e) => setForm({ ...form, nom: e.target.value })}
                        placeholder="Nom"
                        className="border p-2 rounded w-full"
                        required
                    />
                    <input
                        type="text"
                        value={form.contact}
                        onChange={(e) => setForm({ ...form, contact: e.target.value })}
                        placeholder="Contact"
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        value={form.telephone}
                        onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                        placeholder="Téléphone"
                        className="border p-2 rounded w-full"
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
