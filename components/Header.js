"use client"
import { useEffect, useState } from "react"
import { LogOut, Package } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Header({ user: propUser }) {
    const [user, setUser] = useState(propUser || null)
    const router = useRouter()

    // Charger depuis localStorage si pas reçu en props
    useEffect(() => {
        if (!propUser) {
            const stored = localStorage.getItem("currentUser")
            if (stored) {
                try {
                    setUser(JSON.parse(stored))
                } catch {
                    console.error("Erreur parsing currentUser")
                }
            }
        }
    }, [propUser])

    const logout = () => {
        localStorage.removeItem("currentUser")
        router.push("/login")
    }

    // Sécurité : si pas encore chargé
    if (!user) {
        return (
            <header className="bg-white shadow px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-semibold text-gray-500">Chargement...</h1>
                </div>
            </header>
        )
    }

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo / titre */}
                    <div className="flex items-center gap-4">
                        <Package className="h-8 w-8 text-blue-600" />
                        <h1 className="text-xl font-semibold text-gray-900">
                            Gestion des Stocks
                        </h1>
                    </div>

                    {/* User + logout */}
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            {user.nom} (
                            {user.role === "ADMIN"
                                ? "Administrateur"
                                : user.role === "EMPLOYE"
                                    ? "Employé"
                                    : user.role}
                            )
                        </span>
                        <button
                            onClick={logout}
                            className="p-2 text-gray-400 hover:text-gray-600"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
