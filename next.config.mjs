/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "neal.fun",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.crazygames.com",
        port: "",
        pathname: "/games/2048/**",
      },
    ],
  },
};

export default nextConfig;
