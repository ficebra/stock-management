"use client"
import { useState } from "react"

export default function ArticleForm({ article, onSave, onCancel }) {
    const [formData, setFormData] = useState(
        article || {
            nom: "",
            categorie: "",
            description: "",
            prixAchat: "",
            prixVente: "",
            quantite: "",
            seuilAlerte: "",
            fournisseur: "",
        }
    )

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave({
            ...formData,
            prixAchat: parseFloat(formData.prixAchat),
            prixVente: parseFloat(formData.prixVente),
            quantite: parseInt(formData.quantite),
            seuilAlerte: parseInt(formData.seuilAlerte),
        })
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">
                    {article ? "Modifier" : "Ajouter"} un article
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nom de l'article"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className="w-full p-3 border rounded-lg"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Catégorie"
                        value={formData.categorie}
                        onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                        className="w-full p-3 border rounded-lg"
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-3 border rounded-lg"
                        rows="3"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            placeholder="Prix d'achat (CFA)"
                            value={formData.prixAchat}
                            onChange={(e) => setFormData({ ...formData, prixAchat: e.target.value })}
                            className="w-full p-3 border rounded-lg"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Prix de vente (CFA)"
                            value={formData.prixVente}
                            onChange={(e) => setFormData({ ...formData, prixVente: e.target.value })}
                            className="w-full p-3 border rounded-lg"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            placeholder="Quantité"
                            value={formData.quantite}
                            onChange={(e) => setFormData({ ...formData, quantite: e.target.value })}
                            className="w-full p-3 border rounded-lg"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Seuil d'alerte"
                            value={formData.seuilAlerte}
                            onChange={(e) => setFormData({ ...formData, seuilAlerte: e.target.value })}
                            className="w-full p-3 border rounded-lg"
                            required
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Fournisseur"
                        value={formData.fournisseur}
                        onChange={(e) => setFormData({ ...formData, fournisseur: e.target.value })}
                        className="w-full p-3 border rounded-lg"
                        required
                    />
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                        >
                            {article ? "Modifier" : "Ajouter"}
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
