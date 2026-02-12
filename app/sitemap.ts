import { MetadataRoute } from 'next';
import { services, companyInfo, siteConfig } from '@/lib/data';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

type ChangeFrequency = "weekly" | "daily" | "monthly" | "always" | "hourly" | "yearly" | "never";

interface StaticPageConfigItem {
  url: string;
  lastModified: Date;
  changeFrequency: ChangeFrequency;
  priority: number;
  condition: boolean;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastContentUpdate = new Date();

  const staticPagesConfig: StaticPageConfigItem[] = [
    { url: BASE_URL, lastModified: lastContentUpdate, changeFrequency: 'weekly', priority: 1, condition: true },
    { url: `${BASE_URL}/services`, lastModified: lastContentUpdate, changeFrequency: 'weekly', priority: 0.9, condition: true },
    { url: `${BASE_URL}/gallery`, lastModified: lastContentUpdate, changeFrequency: 'monthly', priority: 0.8, condition: siteConfig.pages.gallery.enabled },
    { url: `${BASE_URL}/pricing`, lastModified: lastContentUpdate, changeFrequency: 'monthly', priority: 0.8, condition: siteConfig.pages.pricing.enabled },
    { url: `${BASE_URL}/faq`, lastModified: lastContentUpdate, changeFrequency: 'monthly', priority: 0.7, condition: siteConfig.pages.faq.enabled },
    { url: `${BASE_URL}/about`, lastModified: lastContentUpdate, changeFrequency: 'monthly', priority: 0.8, condition: siteConfig.pages.about.enabled },
    { url: `${BASE_URL}/privacy-policy`, lastModified: lastContentUpdate, changeFrequency: 'yearly', priority: 0.3, condition: true },
    { url: `${BASE_URL}/terms-of-service`, lastModified: lastContentUpdate, changeFrequency: 'yearly', priority: 0.3, condition: true },
  ];

  const staticPages: MetadataRoute.Sitemap = staticPagesConfig
    .filter(page => page.condition)
    .map(({ url, lastModified, changeFrequency, priority }) => ({
      url,
      lastModified,
      changeFrequency,
      priority,
    }));


  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${BASE_URL}/services/${service.id}`,
    lastModified: lastContentUpdate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages];
}
