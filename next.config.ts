
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
    // Allow loading images from the public directory
    domains: ['localhost'], // Add 'localhost' if testing locally with custom images in public/
  },
  // The webpack configuration block has been removed as Turbopack
  // is expected to handle Node.js module fallbacks automatically.
};

export default nextConfig;
