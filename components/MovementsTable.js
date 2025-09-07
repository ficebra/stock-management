"use client"
import { ArrowUp, ArrowDown, Calendar } from "lucide-react"

export default function MovementsTable({ mouvements, articles }) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Article</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantité</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Motif</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {mouvements.slice().reverse().map((mouvement) => {
                            const article = articles.find((a) => a.id === mouvement.articleId)
                            return (
                                <tr key={mouvement.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-gray-400" />
                                            {new Date(mouvement.date).toLocaleDateString("fr-FR")}
                                            <span className="text-xs text-gray-500 ml-2">
                                                {new Date(mouvement.date).toLocaleTimeString("fr-FR", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{article?.nom || "Article supprimé"}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {mouvement.type === "entree" ? (
                                                <ArrowUp className="h-4 w-4 text-green-600" />
                                            ) : (
                                                <ArrowDown className="h-4 w-4 text-red-600" />
                                            )}
                                            <span
                                                className={`px-2 py-1 text-xs font-medium rounded-full ${mouvement.type === "entree"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                    }`}
                                            >
                                                {mouvement.type === "entree" ? "Entrée" : "Sortie"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{mouvement.quantite}</td>
                                    <td className="px-6 py-4">{mouvement.motif}</td>
                                    <td className="px-6 py-4">{mouvement.utilisateur}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}