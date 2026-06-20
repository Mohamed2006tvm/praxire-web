import { motion } from 'framer-motion';
import { FiShield, FiLock, FiEye, FiGlobe } from 'react-icons/fi';

export default function PrivacyPolicy() {
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
            <span className="text-primary font-bold text-xs tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full">Legal & Compliance</span>
            <h1 className="text-4xl md:text-5xl font-black text-text-primary mt-4 tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-4 text-text-secondary text-base max-w-2xl mx-auto">
              Last Updated: June 20, 2026. This policy outlines how Praxire collects, uses, and safeguards your data.
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
                <FiShield />
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-primary uppercase">Secure Storage</h4>
                <p className="text-[11px] text-text-secondary">AES-256 encryption</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FiLock />
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-primary uppercase">GDPR Ready</h4>
                <p className="text-[11px] text-text-secondary">Full user rights support</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FiEye />
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-primary uppercase">No Selling</h4>
                <p className="text-[11px] text-text-secondary">We never sell your data</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FiGlobe />
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-primary uppercase">Global Standard</h4>
                <p className="text-[11px] text-text-secondary">Cross-border safety</p>
              </div>
            </div>
          </div>

          {/* Legal Copy */}
          <div className="space-y-8 text-sm text-text-secondary leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">1. Introduction</h2>
              <p>
                Welcome to Praxire. Praxire ("we", "us", or "our") operates the website <a href="https://praxire.com" className="text-primary hover:underline font-semibold">https://praxire.com</a> and provides premium technology solutions including Web Development, Mobile App Development, UI/UX Design, Custom Software Development, SaaS Solutions, and Startup Technology Consulting. 
              </p>
              <p className="mt-2">
                We are committed to protecting the privacy, confidentiality, and security of the personal data of our website visitors, clients, and partners. This Privacy Policy explains how we collect, process, share, and protect your information when you interact with our website and engage our professional development or consulting services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">2. Information We Collect</h2>
              <p>
                To provide our high-performance software engineering services and ensure a seamless browsing experience, we collect two categories of information:
              </p>
              <div className="mt-4 space-y-4">
                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                  <h3 className="font-bold text-text-primary text-sm mb-2">A. Personal Information</h3>
                  <p>
                    This includes any information that identifies you as an individual. We collect this when you submit inquiries, subscribe to our newsletter, apply for open positions/internships, or sign service contracts. This may include:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
                    <li>Full name and job title</li>
                    <li>Contact details (email address, phone number, physical address)</li>
                    <li>Company profile details and professional designation</li>
                    <li>Resume, portfolio links, and career history (for applications)</li>
                    <li>Payment information and billing address</li>
                  </ul>
                </div>

                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                  <h3 className="font-bold text-text-primary text-sm mb-2">B. Technical Information</h3>
                  <p>
                    We automatically collect technical data during your interaction with our site. This includes:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
                    <li>IP address, browser type, and operating system</li>
                    <li>Device specifications and screen resolution</li>
                    <li>Referral URLs, clickstream data, and interaction times</li>
                    <li>Geographic location details (country level)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">3. Cookies and Tracking Technologies</h2>
              <p>
                Praxire uses cookies, beacons, and tracking pixels to analyze web traffic trends, administer the website, track user engagement patterns, and improve search engine performance. 
              </p>
              <p className="mt-2">
                You can configure your browser to reject all cookies or to notify you when a cookie is placed. However, disabling cookies may limit your access to specific interactive features of our website. We do not sell or lease the data gathered through cookies to third-party advertising companies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">4. How We Use Information</h2>
              <p>
                We use the gathered information to operate, scale, and optimize our development services. Specifically, your data is processed to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Respond to consultation requests, service inquiries, and project proposals</li>
                <li>Design, build, and deploy custom software products and SaaS systems</li>
                <li>Verify identities for invoicing, client portals, and secure platform access</li>
                <li>Process applications submitted for careers and internships</li>
                <li>Distribute newsletters, service updates, and relevant technology insights</li>
                <li>Enforce our legal rights, comply with laws, and protect against security breaches</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">5. Data Storage and Security</h2>
              <p>
                All data collected by Praxire is stored on secure cloud servers using modern security protocols. We utilize industry-standard cryptographic techniques (including SSL/TLS encryption for transit and AES-256 encryption for storage) to prevent unauthorized access, alteration, or disclosure.
              </p>
              <p className="mt-2">
                While we employ multi-layered firewalls, automated vulnerability scanning, and strict access controls, no internet transmission method or electronic storage solution is 100% secure. Therefore, we cannot guarantee absolute database security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">6. Third-Party Services</h2>
              <p>
                We collaborate with verified third-party vendors to manage payment processing, host databases, analyze website traffic, and manage newsletter campaigns. These third parties are contractually obligated to handle data confidentially, enforce comparable security protocols, and only process data under our direct instructions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">7. Data Retention</h2>
              <p>
                We retain your personal data only as long as necessary to fulfill the purposes for which it was collected, including satisfying any legal, accounting, reporting, or client relationship requirements. Following the termination of our active relationship or the fulfillment of your query, data will be safely anonymized or permanently deleted.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">8. User Rights (Including GDPR Compliance)</h2>
              <p>
                If you reside in the European Economic Area (EEA) or UK, you are granted specific data protection rights under the General Data Protection Regulation (GDPR). These rights include:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>The Right of Access:</strong> Request copies of the personal data we hold about you.</li>
                <li><strong>The Right to Rectification:</strong> Request correction of any inaccurate or incomplete information.</li>
                <li><strong>The Right to Erasure:</strong> Request the deletion of your personal data under certain conditions.</li>
                <li><strong>The Right to Restrict Processing:</strong> Request restrictions on how we process your data.</li>
                <li><strong>The Right to Data Portability:</strong> Receive your data in a structured, machine-readable format.</li>
                <li><strong>The Right to Object:</strong> Object to the processing of your data for direct marketing purposes.</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact our data compliance team at <span className="font-semibold text-text-primary">info@praxire.com</span>. We will respond to your request within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">9. Children's Privacy</h2>
              <p>
                Our services and website are directed strictly to businesses and adult professionals. We do not knowingly collect, store, or target personal information from individuals under the age of 18. If we discover that a child under 18 has submitted personal data to our system, we will delete it immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">10. International Data Transfers</h2>
              <p>
                Praxire's servers and technical hubs are located globally, primarily in India and cloud-based data centers. By accessing our services or submitting data, you consent to the cross-border transfer, storage, and processing of your information in these regions, subject to strict encryption and legal safety guarantees.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary tracking-tight mb-3">11. Policy Updates</h2>
              <p>
                We reserve the right to modify this Privacy Policy at any time. When updates are published, the revised "Last Updated" date at the top of the page will be modified. We encourage users to review this page periodically to remain informed about our data safeguarding methods.
              </p>
            </section>

            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h2 className="text-lg font-bold text-text-primary tracking-tight mb-2">12. Contact Information</h2>
              <p>
                If you have questions, compliance requests, or complaints regarding this Privacy Policy, please contact our Legal Officer:
              </p>
              <div className="mt-3 text-xs space-y-1 text-text-primary font-semibold">
                <p>Praxire Legal & Compliance Group</p>
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
