/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SERVER_URL: process.env.SERVER_URL,
        SERVER_PORT: process.env.SERVER_PORT
    }
};

export default nextConfig;
