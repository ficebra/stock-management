export const initialArticles = [
    {
        id: 1,
        nom: "Chaussures Adidas",
        categorie: "Mode",
        description: "Chaussures de sport Adidas originales",
        prixAchat: 20000,
        prixVente: 30000,
        quantite: 47,
        seuilAlerte: 10,
        fournisseur: "Adidas Store",
        dateCreation: "2025-01-15",
    },
]

export const initialMouvements = [
    {
        id: 1,
        articleId: 1,
        type: "sortie",
        quantite: 3,
        motif: "Vente",
        date: "2025-08-27T10:30:00",
        utilisateur: "Marie Kouassi",
    },
]

export const initialUsers = [
    {
        id: 1,
        nom: "Jean Admin",
        email: "admin@boutique.ci",
        role: "admin",
        password: "admin123",
    },
    {
        id: 2,
        nom: "Marie Kouassi",
        email: "marie@boutique.ci",
        role: "employe",
        password: "employe123"
    }
]