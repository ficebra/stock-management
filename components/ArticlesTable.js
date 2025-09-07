"use client"
import { Edit, Trash2, AlertTriangle } from "lucide-react"

export default function ArticlesTable({ articles, onEdit, onDelete, user }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Article</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fournisseur</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium">{article.nom}</div>
                  <div className="text-sm text-gray-500">{article.description}</div>
                </td>
                <td className="px-6 py-4">{article.categorie}</td>
                <td className="px-6 py-4">
                  <div>Achat: {article.prixAchat.toLocaleString()} CFA</div>
                  <div>Vente: {article.prixVente.toLocaleString()} CFA</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`font-medium ${article.quantite <= article.seuilAlerte ? "text-red-600" : ""}`}>
                    {article.quantite}
                  </span>
                  {article.quantite <= article.seuilAlerte && (
                    <AlertTriangle className="inline ml-2 h-4 w-4 text-red-500" />
                  )}
                  <div className="text-xs text-gray-500">Seuil: {article.seuilAlerte}</div>
                </td>
                <td className="px-6 py-4">{article.fournisseur}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(article)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit size={16} />
                    </button>
                    {user.role === "admin" && (
                      <button
                        onClick={() => onDelete(article.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
