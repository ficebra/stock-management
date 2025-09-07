import './globals.css'

export const metadata = {
  title: 'Stock Management',
  description: 'Application de gestion de stock',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}
