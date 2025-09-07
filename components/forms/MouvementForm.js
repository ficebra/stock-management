"use client"
import { useState } from "react"

export default function MouvementForm({ onSave, onCancel, articles }) {
    const [formData, setFormData] = useState({
        articleId: "",
        type: "entree",
        quantite: "",
        motif: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Nouveau mouvement</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <select
                        value={formData.articleId}
                        onChange={(e) => setFormData({ ...formData, articleId: e.target.value })}
                        className="w-full p-3 border rounded-lg"
                        required
                    >
                        <option value="">Sélectionner un article</option>
                        {articles.map((a) => (
                            <option key={a.id} value={a.id}>
                                {a.nom} (Stock: {a.quantite})
                            </option>
                        ))}
                    </select>
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full p-3 border rounded-lg"
                        required
                    >
                        <option value="entree">Entrée</option>
                        <option value="sortie">Sortie</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Quantité"
                        value={formData.quantite}
                        onChange={(e) => setFormData({ ...formData, quantite: e.target.value })}
                        className="w-full p-3 border rounded-lg"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Motif (Vente, Réapprovisionnement...)"
                        value={formData.motif}
                        onChange={(e) => setFormData({ ...formData, motif: e.target.value })}
                        className="w-full p-3 border rounded-lg"
                        required
                    />
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                        >
                            Enregistrer
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
