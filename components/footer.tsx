"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Sparkles, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react"

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
    <footer className="relative bg-card overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

      {/* Laser wave accents */}
      <div className="absolute bottom-40 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-blue">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                <span className="gradient-text">{companyInfo.name.split(" ")[0]}</span>
                <span className="text-foreground"> {companyInfo.name.split(" ").slice(1).join(" ")}</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6">
              {companyInfo.tagline}. {footerContent.taglineSuffix}
            </p>
            <div className="flex gap-3">
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
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{footerContent.columns.services.title}</h3>
            <ul className="space-y-3">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.id}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                >
                  {footerContent.columns.services.viewAll}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{footerContent.columns.quickLinks.title}</h3>
            <ul className="space-y-3">
              {footerContent.columns.quickLinks.links
                .filter(link => {
                  if (link.href === '/pricing') return siteConfig.pages.pricing.enabled;
                  if (link.href === '/gallery') return siteConfig.pages.gallery.enabled;
                  if (link.href === '/faq') return siteConfig.pages.faq.enabled;
                  return true;
                })
                .map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{footerContent.columns.contact.title}</h3>
            <ul className="space-y-4">
              {siteConfig.showPhoneNumber && (
                <li>
                  <a
                    href={`tel:${companyInfo.phone.replace(/[^0-9]/g, "")}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    <Phone className="w-5 h-5 text-primary" />
                    {companyInfo.phone}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  {companyInfo.email}
                </a>
              </li>
              {siteConfig.showMapIcon && (
                <li>
                  <div className="flex items-start gap-3 text-muted-foreground text-sm">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    {companyInfo.address}
                  </div>
                </li>
              )}
            </ul>

            <div className="mt-6 p-4 rounded-xl glass-card">
              <h4 className="font-medium mb-2">{footerContent.columns.contact.businessHours}</h4>
              <p className="text-sm text-muted-foreground">{companyInfo.hours}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} {companyInfo.name}. {footerContent.bottomBar.copyright}
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              {footerContent.bottomBar.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-primary transition-colors"
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
