import { motion } from 'framer-motion';
import { FiFileText, FiAward, FiHelpCircle, FiLock } from 'react-icons/fi';

export default function TermsOfService() {
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Header */}
      <section className="bg-white py-16 border-b border-border text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary font-bold text-xs tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full">Legal & Agreement</span>
            <h1 className="text-4xl md:text-5xl font-black text-text-primary mt-4 tracking-tight">
              Terms of Service
            </h1>
            <p className="mt-4 text-text-secondary text-base max-w-2xl mx-auto">
              Last Updated: June 20, 2026. Please read these terms carefully before engaging our services or using our website.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-border shadow-md">
          {/* Quick Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 pb-12 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FiFileText />
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-primary uppercase">Governing Law</h4>
                <p className="text-[11px] text-text-secondary">Jurisdiction of India</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FiAward />
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-primary uppercase">IP Ownership</h4>
                <p className="text-[11px] text-text-secondary">Transferred upon payment</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FiLock />
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-primary uppercase">Confidential</h4>
                <p className="text-[11px] text-text-secondary">Strict NDA protocols</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FiHelpCircle />
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-primary uppercase">Billing</h4>
                <p className="text-[11px] text-text-secondary">Milestone basis</p>
              </div>
            </div>
          </div>

          {/* Legal Copy */}
          <div className="space-y-8 text-sm text-text-secondary leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">1. Introduction</h2>
              <p>
                Welcome to Praxire. These Terms of Service ("Terms") govern your access to and use of the website located at <a href="https://praxire.com" className="text-primary hover:underline font-semibold">https://praxire.com</a>, along with any other software development, design, and technology consulting services provided by Praxire ("Company", "we", "us", or "our").
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">2. Acceptance of Terms</h2>
              <p>
                By accessing this website, requesting project proposals, or executing a Statement of Work (SOW) with Praxire, you agree to comply with and be bound by these Terms, as well as our Privacy Policy. If you are entering into this agreement on behalf of a company or other legal entity, you represent that you have the authority to bind such entity. If you do not agree to all of these Terms, you must immediately cease using our website and services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">3. Services Offered</h2>
              <p>
                Praxire specializes in engineering top-tier digital products. Our professional service offerings include:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Web Development:</strong> Front-end and back-end web application engineering.</li>
                <li><strong>Mobile App Development:</strong> Native and cross-platform mobile solutions.</li>
                <li><strong>UI/UX Design:</strong> High-fidelity wireframing, layout system designs, and user research.</li>
                <li><strong>Custom Software Development:</strong> Specialized enterprise database integrations, APIs, and business systems.</li>
                <li><strong>SaaS Product Development:</strong> Scalable multi-tenant cloud application architectures.</li>
                <li><strong>Startup Technology Consulting:</strong> Fractional CTO services, product auditing, and infrastructure design.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">4. User Responsibilities</h2>
              <p>
                As a user of our website or digital portals, you agree not to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Submit false, misleading, or fraudulent contact information.</li>
                <li>Engage in automated scraping, hacking, or denial-of-service (DoS) attacks on our servers.</li>
                <li>Upload malicious code, viruses, or spam via our career, internship, or contact forms.</li>
                <li>Impersonate any person or entity, or falsely represent your affiliation with any business.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">5. Client Responsibilities</h2>
              <p>
                For clients engaging our software development services, project success depends on close collaboration. The client agrees to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Provide timely feedback, specifications, design assets, and api documentation where required.</li>
                <li>Approve milestones or request modifications within the timelines specified in the applicable Statement of Work.</li>
                <li>Designate a primary project manager to coordinate communications with Praxire's engineering squad.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">6. Payments and Billing</h2>
              <p>
                Services are invoiced on a milestone basis, monthly retainer, or fixed-price structure as detailed in the Statement of Work.
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Invoices:</strong> Invoices are payable within the net terms specified in the agreement (typically 7–15 days).</li>
                <li><strong>Late Payments:</strong> Late payments may result in the suspension of active development and deployment operations.</li>
                <li><strong>Refunds:</strong> Since our services involve custom professional engineering hours, all payments made for delivered milestones are non-refundable.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">7. Intellectual Property Rights</h2>
              <p>
                All elements of the Praxire website, including layout styles, graphics, source code, logos, translations, and marketing content, are the intellectual property of Praxire and are protected by international copyright laws. You may not copy, replicate, or use our intellectual property without explicit written consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">8. Project Ownership and Deliverables</h2>
              <p>
                Upon receipt of full and final payment for a specific project or milestone, all rights, title, and ownership of the custom code, design files, and databases generated specifically for the client ("Deliverables") will be transferred to the client. 
              </p>
              <p className="mt-2">
                Praxire retains ownership of pre-existing development frameworks, standard backend libraries, and utility components ("Company IP") used during the build. We grant the client a perpetual, worldwide, non-exclusive, royalty-free license to use and modify such pre-existing components integrated within the Deliverables.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">9. Confidentiality</h2>
              <p>
                Both parties agree to treat all business information, technical specifications, and proprietary data disclosed during our collaboration as "Confidential Information". Neither party will disclose Confidential Information to any third party without prior written consent, except as required by law. This obligation survives the termination of any active service agreements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">10. Service Modifications</h2>
              <p>
                We reserve the right to modify, suspend, or discontinue any aspect of our website, standard SaaS offerings, or consultant structures at any time without notice. We are not liable to you or any third party for changes to standard site services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">11. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, in no event shall Praxire, its founders, directors, employees, or contractors be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, goodwill, or other intangible losses, arising from your access to or use of the website or custom software solutions.
              </p>
              <p className="mt-2">
                Our total cumulative liability under any Statement of Work shall not exceed the total amount paid by the client to Praxire for the specific milestone or phase that gave rise to the liability.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">12. Third-Party Integrations</h2>
              <p>
                Our custom applications may integrate with third-party APIs (e.g., payment gateways, cloud hosting providers, map systems, AI engines). Praxire is not responsible for the performance, downtime, security, or policy changes of these third-party platforms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">13. Termination of Services</h2>
              <p>
                Either party may terminate an active Statement of Work for convenience by providing 30 days' written notice, or immediately in the event of a material breach of terms by the other party. Upon termination, the client shall pay Praxire for all custom development hours completed up to the effective termination date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">14. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless Praxire and its representatives from and against any claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including attorney's fees) arising from your violation of these Terms, or your infringement of any third-party intellectual property rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">15. Governing Law (India)</h2>
              <p>
                These Terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of India. You agree that the courts located in India shall have exclusive jurisdiction to settle any disputes arising under this agreement.
              </p>
            </section>

            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h2 className="text-lg font-bold text-text-primary tracking-tight mb-2">16. Contact Information</h2>
              <p>
                For questions, clarifications, or support regarding these Terms of Service, please contact us:
              </p>
              <div className="mt-3 text-xs space-y-1 text-text-primary font-semibold">
                <p>Praxire Legal Group</p>
                <p>Email: info@praxire.com</p>
                <p>Website: https://praxire.com</p>
                <p>Country: India</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
