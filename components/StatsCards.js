import { Package, DollarSign, AlertTriangle, TrendingUp } from "lucide-react"

export default function StatsCards({ articles, mouvements }) {
    const articlesEnAlerte = articles.filter((a) => a.quantite <= a.seuilAlerte)

    const stats = {
        totalArticles: articles.length,
        valeurStock: articles.reduce((sum, a) => sum + a.quantite * a.prixAchat, 0),
        articlesEnAlerte: articlesEnAlerte.length,
        beneficeEstime: 0, // TODO: calcul à partir des mouvements
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-sm text-gray-600">Total Articles</p>
                <p className="text-2xl font-bold">{stats.totalArticles}</p>
                <Package className="h-8 w-8 text-blue-600 mt-2" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-sm text-gray-600">Valeur du Stock</p>
                <p className="text-2xl font-bold">{stats.valeurStock.toLocaleString()} CFA</p>
                <DollarSign className="h-8 w-8 text-green-600 mt-2" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-sm text-gray-600">Alertes Stock</p>
                <p className="text-2xl font-bold">{stats.articlesEnAlerte}</p>
                <AlertTriangle className="h-8 w-8 text-yellow-600 mt-2" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-sm text-gray-600">Bénéfices Estimés</p>
                <p className="text-2xl font-bold">{stats.beneficeEstime.toLocaleString()} CFA</p>
                <TrendingUp className="h-8 w-8 text-purple-600 mt-2" />
            </div>
        </div>
    )
}
