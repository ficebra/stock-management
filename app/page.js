"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { initialUsers } from "@/lib/data"
import {
  Package, Plus, Edit, Trash2, Search, Filter,
  AlertTriangle, TrendingUp, Download, Users,
  LogIn, LogOut, Eye, EyeOff, ShoppingCart,
  ArrowUp, ArrowDown, Calendar, DollarSign
} from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Connexion échouée")
        return
      }

      const user = await res.json()

      // Stocker l'utilisateur en session locale (temporaire)
      localStorage.setItem("currentUser", JSON.stringify(user))

      router.push("/dashboard")
    } catch (err) {
      console.error(err)
      setError("Erreur de connexion")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <div className="text-center mb-8">
          <Package className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Stocks</h1>
          <p className="text-gray-600 mt-2">Connectez-vous à votre compte</p>
        </div>
        {/* <h2 className="text-2xl font-bold text-center">Connexion</h2> */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Se connecter
        </button>
      </form>
    </div>
  )
}
