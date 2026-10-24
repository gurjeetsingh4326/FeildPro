
import type { NextConfig } from 'next'

const repoName = 'YOUR_REPOSITORY_NAME'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: `/${repoName}`,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
