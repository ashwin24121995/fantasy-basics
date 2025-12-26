import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation activePage="privacy" />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary via-primary/90 to-secondary py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full">
          <div className="absolute top-0 right-0 w-32 h-full bg-secondary transform skew-x-[-12deg] translate-x-16 opacity-60"></div>
          <div className="absolute top-0 right-24 w-24 h-full bg-white transform skew-x-[-12deg] translate-x-16 opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-xl text-white/90 max-w-2xl">Your privacy matters to us. Learn how we collect, use, and protect your data.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
          
          {/* Last Updated */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Last Updated:</strong> December 26, 2025
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Effective Date:</strong> December 26, 2025
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              Welcome to Kavera. This Privacy Policy explains how <strong>KAVERAMMA COFFEE CURING WORKS PRIVATE LIMITED</strong> ("we," "us," or "our") collects, uses, stores, and protects your personal information when you use our fantasy cricket platform ("Platform").
            </p>
            <p className="text-gray-700 mb-4">
              We are committed to protecting your privacy and ensuring the security of your personal data in compliance with applicable Indian data protection laws, including the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
            </p>
            <p className="text-gray-700">
              By using the Platform, you consent to the collection and use of your information as described in this Privacy Policy. If you do not agree with this Privacy Policy, please do not use the Platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We collect only the minimum information necessary to operate the Platform and provide our services. The types of information we collect include:
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Personal Information You Provide</h3>
            <p className="text-gray-700 mb-3">When you register an account, we collect:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li><strong>Name:</strong> Your full name for account identification</li>
              <li><strong>Email Address:</strong> For account creation, login, and communication</li>
              <li><strong>Date of Birth:</strong> To verify you are 18 years or older (legal requirement)</li>
              <li><strong>State of Residence:</strong> To verify you are not from a restricted state (Telangana, Andhra Pradesh, Assam, Odisha)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Usage and Activity Data</h3>
            <p className="text-gray-700 mb-3">When you use the Platform, we automatically collect:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li><strong>Fantasy Teams:</strong> Teams you create, players you select, contests you join</li>
              <li><strong>Contest History:</strong> Your participation in contests and rankings</li>
              <li><strong>Activity Logs:</strong> Pages visited, features used, time spent on the Platform</li>
              <li><strong>Device Information:</strong> Browser type, operating system, device type (desktop/mobile)</li>
              <li><strong>IP Address:</strong> For security and fraud prevention purposes</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Cookies and Tracking Technologies</h3>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to enhance your experience, remember your preferences, and analyze Platform usage. Cookies are small text files stored on your device. You can control cookie settings through your browser, but disabling cookies may affect Platform functionality.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.4 Information We Do NOT Collect</h3>
            <p className="text-gray-700 mb-3">We do <strong>NOT</strong> collect:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Payment information (credit cards, bank details) — because the Platform is 100% free</li>
              <li>Government-issued ID numbers (Aadhaar, PAN, etc.)</li>
              <li>Physical address or phone number (unless you voluntarily provide it)</li>
              <li>Sensitive personal data beyond what is listed above</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use your personal information for the following purposes:
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 To Provide and Operate the Platform</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Create and manage your account</li>
              <li>Enable you to create fantasy teams and join contests</li>
              <li>Calculate fantasy points and contest rankings</li>
              <li>Display your profile, teams, and contest history</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 To Ensure Legal Compliance</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Verify you are 18 years or older (age verification)</li>
              <li>Verify you are not from a restricted state (geographic restriction)</li>
              <li>Comply with Indian laws and regulations governing fantasy sports</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 To Improve the Platform</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Analyze usage patterns to improve features and user experience</li>
              <li>Identify and fix technical issues, bugs, and errors</li>
              <li>Develop new features and enhancements</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.4 To Communicate with You</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Send important updates about the Platform, Terms, or Privacy Policy</li>
              <li>Respond to your inquiries, feedback, or support requests</li>
              <li>Notify you of match results, contest rankings, or platform announcements (optional)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.5 To Ensure Security and Prevent Fraud</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Detect and prevent fraudulent activity, cheating, or abuse</li>
              <li>Enforce our Terms and Conditions and Fair Play Policy</li>
              <li>Protect the Platform and users from security threats</li>
            </ul>
          </section>

          {/* How We Share Your Information */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. How We Share Your Information</h2>
            <p className="text-gray-700 mb-4">
              We respect your privacy and do <strong>NOT</strong> sell, rent, or trade your personal information to third parties. However, we may share your information in the following limited circumstances:
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Service Providers</h3>
            <p className="text-gray-700 mb-4">
              We may share your information with trusted third-party service providers who help us operate the Platform, such as:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li><strong>Cricket Data API:</strong> To fetch real-time match data and player statistics</li>
              <li><strong>Cloud Hosting Providers:</strong> To store data securely (e.g., Vercel, AWS)</li>
              <li><strong>Analytics Tools:</strong> To analyze Platform usage and performance</li>
            </ul>
            <p className="text-gray-700 mb-4">
              These service providers are contractually obligated to protect your data and use it only for the purposes we specify.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Legal Compliance and Protection</h3>
            <p className="text-gray-700 mb-4">
              We may disclose your information if required by law or if we believe in good faith that such disclosure is necessary to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Comply with legal obligations, court orders, or government requests</li>
              <li>Enforce our Terms and Conditions or other policies</li>
              <li>Protect the rights, property, or safety of KAVERAMMA COFFEE CURING WORKS PRIVATE LIMITED, our users, or the public</li>
              <li>Prevent fraud, security threats, or illegal activities</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Business Transfers</h3>
            <p className="text-gray-700 mb-4">
              In the event of a merger, acquisition, sale of assets, or bankruptcy, your information may be transferred to the acquiring entity. We will notify you of any such change and ensure your data continues to be protected.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.4 With Your Consent</h3>
            <p className="text-gray-700">
              We may share your information with third parties if you explicitly consent to such sharing.
            </p>
          </section>

          {/* Data Security */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We take the security of your personal information seriously and implement industry-standard security measures to protect it, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li><strong>Encryption:</strong> Data is encrypted in transit (HTTPS/SSL) and at rest</li>
              <li><strong>Access Controls:</strong> Only authorized personnel have access to your data</li>
              <li><strong>Secure Servers:</strong> Data is stored on secure, reputable cloud infrastructure</li>
              <li><strong>Regular Audits:</strong> We conduct regular security audits and vulnerability assessments</li>
            </ul>
            <p className="text-gray-700">
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security. You are responsible for maintaining the confidentiality of your account credentials.
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
            <p className="text-gray-700 mb-4">
              We retain your personal information for as long as your account is active or as needed to provide you with the Platform's services. We may also retain certain information for longer periods if required by law or for legitimate business purposes, such as:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Resolving disputes or enforcing our Terms and Conditions</li>
              <li>Complying with legal, tax, or accounting requirements</li>
              <li>Preventing fraud and ensuring Platform security</li>
            </ul>
            <p className="text-gray-700">
              If you request account deletion, we will delete or anonymize your personal information within 30 days, except where retention is required by law.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Your Rights and Choices</h2>
            <p className="text-gray-700 mb-4">
              You have the following rights regarding your personal information:
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">7.1 Access and Update</h3>
            <p className="text-gray-700 mb-4">
              You can access and update your personal information (name, email) at any time by logging into your account and visiting the Dashboard or Profile page.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">7.2 Account Deletion</h3>
            <p className="text-gray-700 mb-4">
              You have the right to request deletion of your account and all associated personal data. To delete your account, contact us through the <a href="/contact" className="text-primary hover:underline font-semibold">Contact Us</a> page with your registered email address. We will process your request within 7 business days.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">7.3 Opt-Out of Communications</h3>
            <p className="text-gray-700 mb-4">
              You can opt out of receiving promotional emails or notifications by adjusting your account settings or clicking the "unsubscribe" link in any email we send. Please note that you cannot opt out of essential service-related communications (e.g., account security alerts, Terms updates).
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">7.4 Cookie Management</h3>
            <p className="text-gray-700 mb-4">
              You can control or delete cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of the Platform.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">7.5 Data Portability</h3>
            <p className="text-gray-700">
              You have the right to request a copy of your personal data in a structured, commonly used, and machine-readable format. Contact us to request data export.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              The Platform is <strong>NOT</strong> intended for use by individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are under 18, please do not use the Platform or provide any personal information.
            </p>
            <p className="text-gray-700">
              If we become aware that we have inadvertently collected personal information from a child under 18, we will take immediate steps to delete such information. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Third-Party Links and Services</h2>
            <p className="text-gray-700 mb-4">
              The Platform may contain links to third-party websites or services (e.g., Cricket Data API, social media platforms). We are not responsible for the privacy practices or content of these third-party sites.
            </p>
            <p className="text-gray-700">
              We encourage you to review the privacy policies of any third-party websites or services you visit. This Privacy Policy applies only to information collected by Kavera.
            </p>
          </section>

          {/* International Users */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">10. International Users</h2>
            <p className="text-gray-700 mb-4">
              The Platform is intended for users in India only. If you access the Platform from outside India, you do so at your own risk and are responsible for compliance with local laws.
            </p>
            <p className="text-gray-700">
              Your information will be stored and processed in India in accordance with Indian data protection laws.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or Platform features. When we make changes, we will update the "Last Updated" date at the top of this page.
            </p>
            <p className="text-gray-700">
              We encourage you to review this Privacy Policy periodically. Your continued use of the Platform after any changes constitutes your acceptance of the updated Privacy Policy.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal information, please contact us:
            </p>
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-gray-800 font-semibold mb-2">KAVERAMMA COFFEE CURING WORKS PRIVATE LIMITED</p>
              <p className="text-gray-700">Karnataka, India</p>
              <p className="text-gray-700 mt-3">
                Email: <a href="/contact" className="text-primary hover:underline">Contact Us Form</a>
              </p>
              <p className="text-gray-700">
                Website: <a href="https://www.fantasybasics.com" className="text-primary hover:underline">www.fantasybasics.com</a>
              </p>
            </div>
          </section>

          {/* Consent */}
          <section>
            <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-lg text-white">
              <h3 className="text-2xl font-bold mb-3">Your Consent</h3>
              <p className="text-white/90">
                By using the Platform, you acknowledge that you have read, understood, and agree to this Privacy Policy. If you do not agree with this Privacy Policy, please do not use the Platform.
              </p>
            </div>
          </section>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
