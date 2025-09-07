"use client"
import { useEffect, useState } from "react"
import Header from "@/components/Header"
import Navbar from "@/components/Navbar"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

export default function HistoriquePage() {
    const [mouvements, setMouvements] = useState([])
    const [filtered, setFiltered] = useState([])
    const [users, setUsers] = useState([])

    // Filtres
    const [type, setType] = useState("")
    const [user, setUser] = useState("")
    const [date, setDate] = useState("")

    useEffect(() => {
        fetch("/api/mouvements")
            .then(res => res.json())
            .then(data => {
                setMouvements(data)
                setFiltered(data)
                const uniqueUsers = [...new Map(data.map(m => [m.user.id, m.user])).values()]
                setUsers(uniqueUsers)
            })
    }, [])

    useEffect(() => {
        let results = [...mouvements]

        if (type) results = results.filter(m => m.type === type)
        if (user) results = results.filter(m => m.user?.id === parseInt(user))
        if (date) results = results.filter(m => new Date(m.createdAt).toISOString().slice(0, 10) === date)

        setFiltered(results)
    }, [type, user, date, mouvements])

    // Export PDF
    const exportPDF = () => {
        const doc = new jsPDF()
        doc.text("Historique des mouvements", 14, 15)
        autoTable(doc, {
            head: [["Type", "Article", "Quantité", "Utilisateur", "Date"]],
            body: filtered.map(m => [
                m.type,
                m.article?.nom,
                m.quantite,
                m.user?.nom,
                new Date(m.createdAt).toLocaleString("fr-FR")
            ])
        })
        doc.save("historique.pdf")
    }

    // Export Excel
    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            filtered.map(m => ({
                Type: m.type,
                Article: m.article?.nom,
                Quantité: m.quantite,
                Utilisateur: m.user?.nom,
                Date: new Date(m.createdAt).toLocaleString("fr-FR")
            }))
        )
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Historique")
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
        saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "historique.xlsx")
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* ✅ Header en haut */}
            <Header />
            <Navbar />

            {/* <div className="flex flex-1"> */}
                {/* ✅ Navbar à gauche */}
                {/* <Navbar /> */}

                <main className="flex-1 p-6">
                    <h1 className="text-2xl font-bold mb-6">📜 Historique des actions</h1>

                    {/* Filtres */}
                    <div className="flex flex-wrap gap-4 mb-6 bg-gray-100 p-4 rounded-lg shadow">
                        <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded">
                            <option value="">-- Filtrer par type --</option>
                            <option value="ENTREE">Entrée</option>
                            <option value="SORTIE">Sortie</option>
                        </select>

                        <select value={user} onChange={(e) => setUser(e.target.value)} className="border p-2 rounded">
                            <option value="">-- Filtrer par utilisateur --</option>
                            {users.map(u => <option key={u.id} value={u.id}>{u.nom}</option>)}
                        </select>

                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 rounded" />

                        <button onClick={() => { setType(""); setUser(""); setDate(""); }} className="bg-pink-500 text-white px-4 py-2 rounded">
                            Réinitialiser
                        </button>

                        {/* Export */}
                        <button onClick={exportPDF} className="bg-green-600 text-white px-4 py-2 rounded">Export PDF</button>
                        <button onClick={exportExcel} className="bg-blue-600 text-white px-4 py-2 rounded">Export Excel</button>
                    </div>

                    {/* Tableau */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">
                            <thead className="bg-pink-100">
                                <tr>
                                    <th className="px-4 py-2 text-left">Type</th>
                                    <th className="px-4 py-2 text-left">Article</th>
                                    <th className="px-4 py-2 text-left">Quantité</th>
                                    <th className="px-4 py-2 text-left">Utilisateur</th>
                                    <th className="px-4 py-2 text-left">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((m) => (
                                    <tr key={m.id} className="border-t hover:bg-gray-50">
                                        <td className={`px-4 py-2 font-semibold ${m.type === "ENTREE" ? "text-green-600" : "text-red-600"}`}>
                                            {m.type}
                                        </td>
                                        <td className="px-4 py-2">{m.article?.nom}</td>
                                        <td className="px-4 py-2">{m.quantite}</td>
                                        <td className="px-4 py-2">{m.user?.nom}</td>
                                        <td className="px-4 py-2">{new Date(m.createdAt).toLocaleString("fr-FR")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            {/* </div> */}
        </div>
    )
}
