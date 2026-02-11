"use client"

import * as React from "react"
import Script from "next/script"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2, Navigation } from "lucide-react"
import { companyInfo, services, contactSectionContent, siteConfig } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { formatPhoneNumber } from "@/lib/utils"

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

// Google Maps directions URL for the business address
const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(companyInfo.address)}`

const contactInfo = [
  ...(siteConfig.showPhoneNumber ? [{
    icon: Phone,
    label: "Phone",
    value: companyInfo.phone,
    href: `tel:${companyInfo.phone.replace(/[^0-9]/g, "")}`,
    external: false,
  }] : []),
  {
    icon: Mail,
    label: "Email",
    value: companyInfo.email,
    href: `mailto:${companyInfo.email}`,
    external: false,
  },
  ...(siteConfig.showMapIcon ? [{
    icon: MapPin,
    label: "Address",
    value: companyInfo.address,
    href: googleMapsUrl,
    external: true,
  }] : []),
  {
    icon: Clock,
    label: "Hours",
    value: companyInfo.hours,
    href: "#",
    external: false,
  },
].filter(Boolean)

export function ContactSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const turnstileRef = React.useRef<HTMLDivElement>(null)
  const turnstileWidgetId = React.useRef<string | null>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = React.useState<string | null>(null)
  const [turnstileReady, setTurnstileReady] = React.useState(!TURNSTILE_SITE_KEY)
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const renderTurnstile = React.useCallback(() => {
    if (
      !TURNSTILE_SITE_KEY ||
      !turnstileRef.current ||
      turnstileWidgetId.current !== null ||
      typeof window === "undefined" ||
      !(window as unknown as { turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => string } }).turnstile
    ) return

    const ts = (window as unknown as { turnstile: { render: (el: HTMLElement, opts: Record<string, unknown>) => string } }).turnstile
    turnstileWidgetId.current = ts.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => {
        setTurnstileToken(token)
        setTurnstileReady(true)
      },
      "expired-callback": () => {
        setTurnstileToken(null)
        setTurnstileReady(false)
      },
      "error-callback": () => {
        setTurnstileToken(null)
        setTurnstileReady(false)
      },
      theme: "auto",
    })
  }, [])

  const resetTurnstile = React.useCallback(() => {
    if (
      !TURNSTILE_SITE_KEY ||
      turnstileWidgetId.current === null ||
      typeof window === "undefined" ||
      !(window as unknown as { turnstile?: { reset: (id: string) => void } }).turnstile
    ) return

    const ts = (window as unknown as { turnstile: { reset: (id: string) => void } }).turnstile
    ts.reset(turnstileWidgetId.current)
    setTurnstileToken(null)
    setTurnstileReady(false)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target
    if (id === "phone") {
      const formattedPhoneNumber = formatPhoneNumber(value)
      setFormData((prev) => ({ ...prev, [id]: formattedPhoneNumber }))
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Client-side confirmation step
    const isConfirmed = window.confirm(
      "Are you sure you want to send this message? Please review your information."
    )

    if (!isConfirmed) {
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          ...(turnstileToken ? { turnstileToken } : {}),
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || "Failed to send message")
      }

      setIsSubmitted(true)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      })
      resetTurnstile()
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch {
      setError(contactSectionContent.form.errorMessage)
      resetTurnstile()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 water-pattern" />
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]"
        animate={{ x: [0, 50, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]"
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
             <span className="gradient-text">{contactSectionContent.title}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {contactSectionContent.subtitle}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">{contactSectionContent.contactInfo.title}</h3>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.external ? "_blank" : undefined}
                  rel={info.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl glass-card hover:border-primary/50 transition-all group shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <info.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{info.label}</div>
                    <div className="font-medium">{info.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Service Area Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8 aspect-video rounded-2xl glass-card overflow-hidden relative shadow-lg border border-primary"
            >
              <Image
                src="/branding/service-area.png"
                alt={`${companyInfo.name} service area map`}
                fill
                className="object-fill"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {/* Overlay with service area label */}
              <div className="absolute inset-0 flex items-end justify-center pb-4">
                <p className="text-sm text-muted-foreground px-4 text-center">Serving Pittsfield, And the surrounding area.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">{contactSectionContent.form.title}</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{contactSectionContent.form.labels.firstName}</Label>
                    <Input
                      id="firstName"
                      placeholder={contactSectionContent.form.placeholders.firstName}
                      required
                      maxLength={50}
                      className="glass"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{contactSectionContent.form.labels.lastName}</Label>
                    <Input
                      id="lastName"
                      placeholder={contactSectionContent.form.placeholders.lastName}
                      required
                      maxLength={50}
                      className="glass"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{contactSectionContent.form.labels.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={contactSectionContent.form.placeholders.email}
                      required
                      maxLength={100}
                      className="glass"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{contactSectionContent.form.labels.phone}</Label>
                    <Input
                      id="phone"
                      placeholder={contactSectionContent.form.placeholders.phone}
                      required
                      maxLength={20}
                      className="glass"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">{contactSectionContent.form.labels.service}</Label>
                  <select
                    id="service"
                    className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring glass"
                    required
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Select a service...</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="flex justify-between">
                    <span>{contactSectionContent.form.labels.message}</span>
                    <span className="text-sm text-muted-foreground">
                      {formData.message.length}/{contactSectionContent.form.maxLengths.message}
                    </span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={contactSectionContent.form.placeholders.message}
                    rows={4}
                    required
                    className="glass"
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={contactSectionContent.form.maxLengths.message}
                  />
                </div>

                {TURNSTILE_SITE_KEY && (
                  <>
                    <Script
                      src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                      onReady={renderTurnstile}
                    />
                    <div ref={turnstileRef} className="flex justify-center" />
                  </>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full group glow-blue"
                  disabled={isSubmitted || isLoading || !turnstileReady}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      {contactSectionContent.form.buttons.submitted}
                    </>
                  ) : isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {contactSectionContent.form.buttons.submitting}
                    </>
                  ) : (
                    <>
                      {contactSectionContent.form.buttons.submit}
                      <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  {contactSectionContent.form.disclaimer}
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
