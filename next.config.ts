
import type { NextConfig } from 'next'

const repoName = 'FeildPro'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: `/${repoName}`,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
