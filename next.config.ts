import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images:{
    domains: ['lh3.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  
};

export default nextConfig;


