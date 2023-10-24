/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    fallbacks: {
        document: "/offline",
    }
});
  

const nextConfig = withPWA({
    reactStrictMode: true,
})

module.exports = nextConfig
