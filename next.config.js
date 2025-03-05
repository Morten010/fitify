/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    output: "standalone",
    register: true,
    skipWaiting: true,
    disable: true,
    fallbacks: {
        document: "/offline.html",
        image: "/no-connection.svg"
    },
});
  

const nextConfig = withPWA({
    reactStrictMode: true,
    dangerouslyAllowCleanPatternsOutsideProject: true,
})

module.exports = nextConfig
