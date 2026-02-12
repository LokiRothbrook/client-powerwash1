"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react"

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
import { services, companyInfo, footerContent, siteConfig } from "@/lib/data"

export function Footer() {
  const currentYear = new Date().getFullYear()

  // Define social media platforms and their corresponding Lucide icons
  const socialPlatforms = [
    { id: 'facebook', Icon: Facebook },
    { id: 'instagram', Icon: Instagram },
    { id: 'x', Icon: XIcon },
    { id: 'youtube', Icon: Youtube },
  ];

  return (
    <footer className="relative overflow-hidden water-pattern">
      {/* Background gradient matching page banners */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-accent/10" />
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <Image
                src="/branding/logo-transparent-header.png"
                alt={`${companyInfo.name} Logo`}
                width={200}
                height={200}
                className="object-contain max-h-14 w-auto"
              />
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              {companyInfo.tagline}. {footerContent.taglineSuffix}
            </p>
            <div className="flex gap-2">
              {socialPlatforms.map((platform) => {
                const socialData = siteConfig.socialMedia[platform.id as keyof typeof siteConfig.socialMedia];
                if (socialData && socialData.enabled) {
                  const IconComponent = platform.Icon;
                  return (
                    <motion.a
                      key={platform.id}
                      href={socialData.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 overflow-hidden group"
                    >
                      <IconComponent className="w-4 h-4 relative z-10" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity glow-blue rounded-lg" />
                    </motion.a>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-foreground font-semibold mb-3">{footerContent.columns.services.title}</h3>
            <ul className="space-y-1.5">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.id}`}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-foreground hover:text-foreground/80 transition-colors text-sm font-medium"
                >
                  {footerContent.columns.services.viewAll}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-foreground font-semibold mb-3">{footerContent.columns.quickLinks.title}</h3>
            <ul className="space-y-1.5">
              {footerContent.columns.quickLinks.links
                .filter(link => {
                  if (link.href === '/pricing') return siteConfig.pages.pricing.enabled;
                  if (link.href === '/gallery') return siteConfig.pages.gallery.enabled;
                  if (link.href === '/faq') return siteConfig.pages.faq.enabled;
                  if (link.href === '/#testimonials') return siteConfig.homepageSections.testimonials.enabled;
                  return true;
                })
                .map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-foreground font-semibold mb-3">{footerContent.columns.contact.title}</h3>
            <ul className="space-y-2">
              {siteConfig.showPhoneNumber && (
                <li>
                  <a
                    href={`tel:${companyInfo.phone.replace(/[^0-9]/g, "")}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4 text-foreground" />
                    {companyInfo.phone}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 text-foreground" />
                  {companyInfo.email}
                </a>
              </li>
              {siteConfig.showMapIcon && (
                <li>
                  <div className="flex items-start gap-2 text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4 text-foreground flex-shrink-0 mt-0.5" />
                    {companyInfo.address}
                  </div>
                </li>
              )}
            </ul>

            <div className="mt-3 p-3 rounded-xl backdrop-blur-md bg-primary/10 border border-primary/20 text-center">
              <h4 className="text-foreground text-sm font-medium mb-1">{footerContent.columns.contact.businessHours}</h4>
              <p className="text-muted-foreground text-xs">{companyInfo.hours}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-primary/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-foreground/60">
              &copy; {currentYear} {companyInfo.name}. {footerContent.bottomBar.copyright}
            </p>
            <div className="flex items-center gap-6 text-sm text-foreground/60">
              {footerContent.bottomBar.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
