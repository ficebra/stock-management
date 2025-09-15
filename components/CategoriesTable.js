"use client"

export default function CategoriesTable({ categories, onEdit, onDelete }) {
    return (
        <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 text-left">Nom</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((c) => (
                    <tr key={c.id} className="border-t">
                        <td className="px-4 py-2">{c.nom}</td>
                        <td className="px-4 py-2 text-right space-x-2">
                            <button
                                onClick={() => onEdit(c)}
                                className="text-blue-600 hover:underline"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => onDelete(c.id)}
                                className="text-red-600 hover:underline"
                            >
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
