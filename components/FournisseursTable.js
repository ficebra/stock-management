"use client"

export default function FournisseursTable({ fournisseurs, onEdit, onDelete }) {
    return (
        <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 text-left">Nom</th>
                    <th className="px-4 py-2 text-left">Contact</th>
                    <th className="px-4 py-2 text-left">Téléphone</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                </tr>
            </thead>
            <tbody>
                {fournisseurs.map((f) => (
                    <tr key={f.id} className="border-t">
                        <td className="px-4 py-2">{f.nom}</td>
                        <td className="px-4 py-2">{f.contact || "-"}</td>
                        <td className="px-4 py-2">{f.telephone || "-"}</td>
                        <td className="px-4 py-2 text-right space-x-2">
                            <button
                                onClick={() => onEdit(f)}
                                className="text-blue-600 hover:underline"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => onDelete(f.id)}
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
