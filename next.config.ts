
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
   webpack: (config, { isServer }) => {
    // Fix for 'async_hooks' module not found error in client build
    // Caused by @opentelemetry/sdk-trace-node (dependency of Genkit)
    if (!isServer) {
      // Mark 'async_hooks' as not available in the browser environment
      // This prevents the build error, assuming OpenTelemetry tracing is server-side only.
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        async_hooks: false,
      };
    }

    return config;
  },
};

export default nextConfig;

