/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/auth",
  //       permanent: true,
  //     },
  //   ];
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    API_URL: "http://localhost:8080/",
  },
};

export default nextConfig;
