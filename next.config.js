/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            "images.unsplash.com",
            "lh3.googleusercontent.com",
            "firebasestorage.googleapis.com",
        ],
    },
};

module.exports = nextConfig;
