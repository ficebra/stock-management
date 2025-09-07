"use client"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function Navbar({ user: propUser }) {
    const [user, setUser] = useState(propUser || null)
    const router = useRouter()
    const pathname = usePathname()

    // Charger user depuis localStorage si pas fourni en props
    useEffect(() => {
        if (!propUser) {
            const stored = localStorage.getItem("currentUser")
            if (stored) {
                try {
                    setUser(JSON.parse(stored))
                } catch (err) {
                    console.error("Erreur parsing currentUser", err)
                }
            }
        }
    }, [propUser])

    const links = [
        { name: "Tableau de bord", path: "/dashboard" },
        { name: "Categories", path: "/categories" },
        { name: "Fournisseurs", path: "/fournisseurs" },
        { name: "Articles", path: "/articles" },
        { name: "Mouvements", path: "/mouvements" },
        { name: "Historique", path: "/historique" },
    ]

    // ✅ Ajouter Administration si rôle = ADMIN
    if (user?.role === "ADMIN") {
        links.push({ name: "Administration", path: "/admin" })
    }

    return (
        <nav className="bg-white border-b">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex space-x-8">
                    {links.map((link) => (
                        <button
                            key={link.path}
                            onClick={() => router.push(link.path)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${pathname === link.path
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {link.name}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    )
}
