// This API route handles the submission of quote requests from the contact form.
// It performs validation, sanitization, and then sends an email using the Resend service.

import { Resend } from "resend"
import { NextResponse } from "next/server"
import { escapeHtml } from "@/lib/utils" // Utility for HTML escaping
import { contactSectionContent } from "@/lib/data" // Contains email template and other content

// Initialize Resend with the API key from environment variables.
const resend = new Resend(process.env.RESEND_API_KEY)

// --- Rate Limiting ---
// Simple in-memory rate limiter (suitable for single-server deployments)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5 // Max 5 requests per minute per IP

function getRateLimitKey(request: Request): string {
  // Try to get real IP from various headers (for proxied environments like Vercel)
  const forwarded = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")
  return forwarded?.split(",")[0]?.trim() || realIp || "unknown"
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }

  entry.count++
  return false
}

// Clean up old entries periodically (every 5 minutes)
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(ip)
    }
  }
}, 5 * 60 * 1000)

// --- Allowed Origins ---
// Add your production domain(s) here
const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_BASE_URL,
  "http://localhost:3000",
].filter(Boolean) as string[]

// Regex for email format validation (stricter than before).
// Requires at least 2 characters in TLD, prevents double @ and double dots.
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
// Regex for phone number format validation.
// Allows common US formats: (123) 456-7890, 123-456-7890, 123.456.7890, +1 123 456 7890
const PHONE_REGEX = /^[\+]?[1]?[-.\s]?[(]?[0-9]{3}[)]?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/

// Defines the maximum allowed lengths for each input field.
// These limits help prevent abuse and ensure data fits into storage.
const MAX_LENGTHS = {
  firstName: 50,
  lastName: 50,
  email: 100,
  phone: 20,
  service: 100,
  message: 1000,
}

/**
 * Handles POST requests for quote submissions.
 * Processes form data, validates it, sanitizes it, and sends a formatted email.
 *
 * @param request The incoming Next.js Request object.
 * @returns A NextResponse indicating success or failure.
 */
export async function POST(request: Request) {
  try {
    // --- Rate Limiting Check ---
    const clientIp = getRateLimitKey(request)
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    // --- Origin Validation ---
    const origin = request.headers.get("origin")
    if (origin && !ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed))) {
      return NextResponse.json(
        { error: "Unauthorized origin." },
        { status: 403 }
      )
    }

    // --- Content-Type Validation ---
    const contentType = request.headers.get("content-type")
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json." },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { firstName, lastName, email, phone, service, message, turnstileToken } = body

    // --- Turnstile Verification ---
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
    if (turnstileSecret) {
      if (!turnstileToken) {
        return NextResponse.json(
          { error: "Verification required. Please complete the security check." },
          { status: 400 }
        )
      }

      const turnstileResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: turnstileSecret,
            response: turnstileToken,
            remoteip: clientIp,
          }),
        }
      )

      const turnstileResult = await turnstileResponse.json()
      if (!turnstileResult.success) {
        return NextResponse.json(
          { error: "Security verification failed. Please try again." },
          { status: 403 }
        )
      }
    }

    // --- Input Validation ---
    // 1. Validate required fields: Ensures all necessary fields are provided.
    if (!firstName || !lastName || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      )
    }

    // 2. Validate lengths: Checks if input lengths exceed predefined maximums.
    if (firstName.length > MAX_LENGTHS.firstName) {
      return NextResponse.json({ error: `First name cannot exceed ${MAX_LENGTHS.firstName} characters.` }, { status: 400 })
    }
    if (lastName.length > MAX_LENGTHS.lastName) {
      return NextResponse.json({ error: `Last name cannot exceed ${MAX_LENGTHS.lastName} characters.` }, { status: 400 })
    }
    if (email.length > MAX_LENGTHS.email) {
      return NextResponse.json({ error: `Email cannot exceed ${MAX_LENGTHS.email} characters.` }, { status: 400 })
    }
    if (phone.length > MAX_LENGTHS.phone) {
      return NextResponse.json({ error: `Phone number cannot exceed ${MAX_LENGTHS.phone} characters.` }, { status: 400 })
    }
    if (service.length > MAX_LENGTHS.service) {
      return NextResponse.json({ error: `Service cannot exceed ${MAX_LENGTHS.service} characters.` }, { status: 400 })
    }
    if (message.length > MAX_LENGTHS.message) {
      return NextResponse.json({ error: `Message cannot exceed ${MAX_LENGTHS.message} characters.` }, { status: 400 })
    }

    // 3. Validate formats: Checks email and phone number against regex patterns.
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 })
    }
    if (!PHONE_REGEX.test(phone)) {
      return NextResponse.json({ error: "Invalid phone number format." }, { status: 400 })
    }

    // --- Input Sanitization ---
    // HTML escaping is performed on all user-provided inputs to prevent HTML injection
    // vulnerabilities when these values are later embedded into an HTML email.
    const sanitizedFirstName = escapeHtml(firstName)
    const sanitizedLastName = escapeHtml(lastName)
    const sanitizedEmail = escapeHtml(email)
    const sanitizedPhone = escapeHtml(phone)
    const sanitizedService = escapeHtml(service)
    const sanitizedMessage = escapeHtml(message)

    // --- Email Composition and Sending ---
    // The HTML content for the email is loaded from `lib/data.ts` to allow for
    // easier customization of the email template without modifying this API route directly.
    //
    // TO CHANGE THE EMAIL TEMPLATE:
    // Edit the `quoteEmailTemplate` string within the `contactSectionContent.form` object
    // in `lib/data.ts`. You can use `{{placeholder}}` syntax (e.g., `{{firstName}}`)
    // which will be automatically replaced with the sanitized form data.
    let emailHtml = contactSectionContent.form.quoteEmailTemplate
    emailHtml = emailHtml.replace(/{{firstName}}/g, sanitizedFirstName)
    emailHtml = emailHtml.replace(/{{lastName}}/g, sanitizedLastName)
    emailHtml = emailHtml.replace(/{{email}}/g, sanitizedEmail)
    emailHtml = emailHtml.replace(/{{phone}}/g, sanitizedPhone)
    emailHtml = emailHtml.replace(/{{service}}/g, sanitizedService)
    emailHtml = emailHtml.replace(/{{message}}/g, sanitizedMessage)

    // Send the email using Resend.
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Quote Request <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL || "your-email@example.com"], // Recipient email address
      subject: `New Quote Request from ${sanitizedFirstName} ${sanitizedLastName}`,
      html: emailHtml,
    })

    if (error) {
      // Log Resend API errors for debugging (only message, not full object)
      console.error("Resend error:", error.message || "Unknown email service error")
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      )
    }

    // Return a success response with the email ID from Resend.
    return NextResponse.json({ success: true, id: data?.id })
  } catch (error) {
    // Catch any unexpected server errors and return a generic error response.
    // Only log the error message, not the full stack trace in production
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("Server error:", errorMessage)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

