import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { companyInfo, seoConfig } from "@/lib/data"
import type { Metadata } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: seoConfig.pages.privacyPolicy.title,
  description: seoConfig.pages.privacyPolicy.description,
  openGraph: {
    url: '/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${BASE_URL}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Privacy Policy",
        "item": `${BASE_URL}/privacy-policy`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <Header />
      <main className="relative py-24 lg:py-32">
        <div className="absolute inset-0 water-pattern" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Last Updated: January 19, 2026
          </p>

          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to {companyInfo.name}. We are committed to protecting your privacy and handling your data in an open and transparent manner. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
              <p className="mb-4">We collect information that you voluntarily provide to us when you express an interest in obtaining information about our Powerwashing services, when you participate in activities on the Website, or otherwise when you contact us (e.g., through our contact or quote request forms).</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Personal Data:</strong> We may collect personal identification information such as your name, email address, phone number, specific service interest, and any other details you choose to provide within your message when you fill out our contact or quote request forms.
                </li>
                <li>
                  <strong>Anonymous Usage Data (Vercel Analytics):</strong> We use Vercel Analytics to collect anonymous, non-personal data about website usage, such as page views, unique visitors, and referral sources. This helps us understand how our website is performing and improve user experience. Vercel Analytics may use cookies or similar technologies for this purpose, but this data does not identify you personally.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect from you to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide you with accurate quotes for our pressure washing services.</li>
                <li>Communicate with you effectively regarding your inquiries and service requests.</li>
                <li>Deliver and manage the services you have requested from us.</li>
                <li>Analyze anonymous usage trends (via Vercel Analytics) to improve the functionality and user experience of our Website.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Disclosure of Your Information</h2>
              <p className="mb-4">We do not sell, trade, or otherwise transfer your personal identification information to outside parties. We only disclose personal information collected through our forms with third parties as described below:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Service Providers:</strong> We may share your information with third-party service providers who perform services for us or on our behalf, including email delivery services to manage communications. These service providers are provided with only the information necessary to perform their specific functions and are not authorized to use or disclose your personal information for their own marketing or other purposes.
                </li>
                <li>
                  <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
                </li>
                <li>
                  <strong>Anonymous Usage Data:</strong> Anonymous usage data collected by Vercel Analytics may be processed by Vercel in accordance with their privacy policy.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
              <p className="mb-4">
                We use administrative, technical, and physical security measures to help protect the information you provide to us. While we have taken reasonable steps to secure this information, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission over the Internet or method of electronic storage can be guaranteed against any interception or other type of misuse.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have the following rights concerning your personal data:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The right to be informed about the collection and use of your personal data.</li>
                <li>The right to access your personal data.</li>
                <li>The right to rectification of inaccurate personal data.</li>
                <li>The right to erasure (to be forgotten).</li>
                <li>The right to restrict processing.</li>
                <li>The right to data portability.</li>
                <li>The right to object to processing.</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us at {companyInfo.email}.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Cookie Usage</h2>
              <p className="mb-4">
                Our website primarily uses cookies through Vercel Analytics to collect anonymous usage data, such as page views and unique visitors, to understand website performance. These cookies do not identify you personally. We do not use other cookies for tracking, advertising, or personalization purposes. You can control the use of cookies at the individual browser level. If you reject cookies, you may still use our site, but your ability to use some features or areas of our site may be limited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. The updated version will be indicated by an updated &quot;Last Updated&quot; date (January 25, 2026), and the updated version will be effective as soon as it is accessible. We encourage you to review this Privacy Policy frequently to be informed of how we are protecting your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2">
                {companyInfo.name}
                <br />
                {companyInfo.email}
                <br />
                {companyInfo.phone}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}


