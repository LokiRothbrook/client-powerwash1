import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { companyInfo } from "@/lib/data"

export const metadata = {
  title: "Terms of Service",
  description: "Understand the terms and conditions governing your use of our services.",
}

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="relative py-24 lg:py-32">
        <div className="absolute inset-0 water-pattern" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Last Updated: January 19, 2026
          </p>

          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                Welcome to the website of {companyInfo.name}. These Terms of Service (&quot;Terms&quot;) govern your access to and use of our website and its content (the &quot;Website&quot;). By accessing or using the Website, you signify that you have read, understood, and agree to be bound by these Terms. If you do not agree with these Terms, please do not use the Website.
              </p>
              <p className="mb-4">
                Please note that these Terms of Service apply only to your use of the Website. If you engage {companyInfo.name} for professional Powerwashing services, a separate written agreement will govern that client relationship.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Website Services</h2>
              <p className="mb-4">
                The {companyInfo.name} Website provides information about our company, {companyInfo.name}, a leading provider of professional Powerwashing services in Pittsfield, and the surrounding areas. We offer a comprehensive range of services. The content on this Website is for informational purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Obligations</h2>
              <p className="mb-4">As a user of our Website, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information when requested through contact forms.</li>
                <li>Use the Website only for lawful purposes.</li>
                <li>Not interfere with the security or integrity of the Website.</li>
                <li>Comply with all applicable local, state, national, and international laws and regulations.</li>
                <li>Not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Website without express written permission from us.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Intellectual Property</h2>
              <p className="mb-4">
                Unless otherwise indicated, the Website is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Website (collectively, the &quot;Content&quot;) and the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
              </p>
              <p className="mb-4">
                The content on the Website is provided for your information and personal use only. You may not copy, reproduce, distribute, transmit, broadcast, display, sell, license, or otherwise exploit any Content for any other purposes without the prior written consent of the respective owners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Disclaimers and Limitation of Liability</h2>
              <p className="mb-4">
                THE WEBSITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE WEBSITE WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE WEBSITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p className="mb-4">
                IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE WEBSITE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Governing Law</h2>
              <p className="mb-4">
                These Terms of Service shall be governed by and construed in accordance with the laws of Illinois, without regard to its conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Service at any time and for any reason. We will alert you about any changes by updating the &quot;Last Updated&quot; date of these Terms of Service (January 25, 2026), and you waive any right to receive specific notice of each such change.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Us</h2>
              <p>
                If you have questions or comments about these Terms of Service, please contact us at:
              </p>
              <p className="mt-2">
                {companyInfo.name}
                <br />
                {companyInfo.address}
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
