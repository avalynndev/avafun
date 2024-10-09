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
    ],
  },
};

export default nextConfig;
