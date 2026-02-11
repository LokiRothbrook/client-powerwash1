import type { MetadataRoute } from 'next'
import { companyInfo } from '@/lib/data'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: companyInfo.name,
    short_name: companyInfo.name,
    description: `${companyInfo.tagline}. Professional Power Washing services.`,
    start_url: '/',
    display: 'standalone',
    background_color: '#0f1223',
    theme_color: '#0f1223',
    icons: [
      {
        src: '/branding/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/branding/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
