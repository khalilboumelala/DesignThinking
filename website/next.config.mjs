/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // pour générer en statique
  compress: true,
  webpack: (config) => {
    // Split en plus petits bundles
    config.optimization.splitChunks = {
      chunks: "all",
      minSize: 20000,
      maxSize: 250000, // force des chunks plus petits
    };
    return config;
  },
};

export default nextConfig
