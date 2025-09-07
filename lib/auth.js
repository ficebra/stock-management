import { initialUsers } from "./data"

export function handleLogin({ email, password }) {
    return initialUsers.find(
        (u) => u.email === email && u.password === password
    )
}

export function handleLogout() {
    return null
}