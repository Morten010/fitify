/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    output: "standalone",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    fallbacks: {
        document: "/offline",
        image: "/no-connection.svg"
    }
});
  

const nextConfig = withPWA({
    reactStrictMode: true,
})

module.exports = nextConfig
