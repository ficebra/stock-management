/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    // Configuration des images
    images: {
        domains: ['localhost'],
        unoptimized: true
    },

    // Variables d'environnement publiques
    // env: {
    //     CUSTOM_KEY: process.env.CUSTOM_KEY,
    // },

    // Configuration des headers de sécurité
    async headers() {
        return [
            {
                source: '/api/(.*)',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: process.env.NODE_ENV === 'production' ? 'https://votre-domaine.com' : '*',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, DELETE, OPTIONS',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type, Authorization',
                    },
                ],
            },
        ];
    },

    // Redirections
    async redirects() {
        return [
            {
                source: '/login',
                destination: '/',
                permanent: false,
            },
        ];
    },

    // Configuration Webpack personnalisée
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Configuration personnalisée si nécessaire
        return config;
    },

    // Configuration des pages exportées (si nécessaire pour le déploiement statique)
    // trailingSlash: true,
    // exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    //   return {
    //     '/': { page: '/' },
    //     '/dashboard': { page: '/dashboard' },
    //   };
    // },
}

module.exports = nextConfig;