import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation activePage="terms" />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary via-primary/90 to-secondary py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full">
          <div className="absolute top-0 right-0 w-32 h-full bg-secondary transform skew-x-[-12deg] translate-x-16 opacity-60"></div>
          <div className="absolute top-0 right-24 w-24 h-full bg-white transform skew-x-[-12deg] translate-x-16 opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">Terms & Conditions</h1>
          <p className="text-xl text-white/90 max-w-2xl">Please read these terms carefully before using Kavera</p>
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
              Welcome to Kavera, a free-to-play fantasy cricket platform operated by <strong>KAVERAMMA COFFEE CURING WORKS PRIVATE LIMITED</strong>, a company registered under the laws of India with its registered office in Karnataka, India.
            </p>
            <p className="text-gray-700 mb-4">
              These Terms and Conditions ("Terms") govern your access to and use of the Kavera website and services (collectively, the "Platform"). By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use the Platform.
            </p>
            <p className="text-gray-700">
              Kavera is a <strong>100% free entertainment platform</strong> with no real money transactions, no entry fees, and no cash prizes. All contests are free to join, and users compete purely for rankings, entertainment, and friendly competition.
            </p>
          </section>

          {/* Eligibility */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Eligibility</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Age Requirement</h3>
            <p className="text-gray-700 mb-4">
              You must be at least <strong>18 years of age</strong> to register and use the Platform. By creating an account, you represent and warrant that you are 18 years or older. We reserve the right to verify your age at any time and suspend or terminate your account if you are found to be underage.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Geographic Restrictions</h3>
            <p className="text-gray-700 mb-4">
              Kavera is available only to residents of India, <strong>except</strong> residents of the following states where fantasy sports are legally restricted:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Telangana</li>
              <li>Andhra Pradesh</li>
              <li>Assam</li>
              <li>Odisha</li>
            </ul>
            <p className="text-gray-700">
              If you are a resident of any of these restricted states, you are <strong>not permitted</strong> to register or use the Platform. We verify your state of residence during registration and reserve the right to suspend or terminate accounts found in violation of this restriction.
            </p>
          </section>

          {/* Account Registration */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Account Registration and Security</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Account Creation</h3>
            <p className="text-gray-700 mb-4">
              To use the Platform, you must create an account by providing accurate and complete information, including your name, email address, date of birth, and state of residence. You agree to keep your account information up-to-date.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 One Account Per User</h3>
            <p className="text-gray-700 mb-4">
              Each user is permitted to create and maintain <strong>only one account</strong>. Creating multiple accounts is strictly prohibited and will result in the suspension or permanent termination of all accounts associated with you.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Account Security</h3>
            <p className="text-gray-700 mb-4">
              You are responsible for maintaining the confidentiality of your account credentials (username and password). You agree to notify us immediately of any unauthorized access to or use of your account. We are not liable for any loss or damage arising from your failure to protect your account credentials.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.4 Account Termination</h3>
            <p className="text-gray-700">
              We reserve the right to suspend or terminate your account at any time, with or without notice, if we believe you have violated these Terms, engaged in fraudulent activity, or for any other reason at our sole discretion.
            </p>
          </section>

          {/* Platform Services */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Platform Services</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Free-to-Play Model</h3>
            <p className="text-gray-700 mb-4">
              Kavera is a <strong>100% free-to-play platform</strong>. There are:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li><strong>No entry fees</strong> to join contests</li>
              <li><strong>No real money transactions</strong> of any kind</li>
              <li><strong>No cash prizes or monetary rewards</strong></li>
              <li><strong>No in-app purchases or paid features</strong></li>
            </ul>
            <p className="text-gray-700 mb-4">
              All contests are free to join, and users compete for rankings, entertainment value, and friendly competition only.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Fantasy Cricket Gameplay</h3>
            <p className="text-gray-700 mb-4">
              The Platform allows you to create virtual fantasy cricket teams by selecting real cricket players from upcoming or live matches. Your team earns points based on the actual performance of your selected players in real matches. Points are calculated automatically using data from Cricket Data API.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Contests</h3>
            <p className="text-gray-700 mb-4">
              You can join free contests for any match by creating a fantasy team. Contest rankings are determined solely by total fantasy points earned. There are no prizes, rewards, or monetary benefits for winning contests—only rankings and recognition.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.4 Data Accuracy</h3>
            <p className="text-gray-700">
              We strive to provide accurate and up-to-date match data, player statistics, and fantasy points using Cricket Data API. However, we do not guarantee the accuracy, completeness, or timeliness of data. Fantasy points are calculated automatically based on official match data and are final once the match ends.
            </p>
          </section>

          {/* User Conduct */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">5. User Conduct and Prohibited Activities</h2>
            <p className="text-gray-700 mb-4">
              By using the Platform, you agree to comply with all applicable laws and regulations and to use the Platform only for lawful purposes. You agree <strong>NOT</strong> to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Create multiple accounts or use fake identities</li>
              <li>Use bots, automated tools, or scripts to interact with the Platform</li>
              <li>Manipulate, hack, or attempt to gain unauthorized access to the Platform or its systems</li>
              <li>Collude with other users to gain unfair advantages</li>
              <li>Engage in any form of cheating, fraud, or deceptive practices</li>
              <li>Harass, abuse, threaten, or harm other users</li>
              <li>Post or transmit any unlawful, offensive, defamatory, or inappropriate content</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Platform</li>
              <li>Use the Platform for any commercial purposes without our prior written consent</li>
              <li>Violate any applicable laws, regulations, or third-party rights</li>
            </ul>
            <p className="text-gray-700">
              Violation of these rules may result in immediate suspension or permanent termination of your account, and we reserve the right to take legal action if necessary.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Intellectual Property Rights</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Ownership</h3>
            <p className="text-gray-700 mb-4">
              All content on the Platform, including but not limited to text, graphics, logos, images, software, code, and design, is the property of KAVERAMMA COFFEE CURING WORKS PRIVATE LIMITED or its licensors and is protected by Indian and international copyright, trademark, and intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Limited License</h3>
            <p className="text-gray-700 mb-4">
              We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform for personal, non-commercial purposes only. You may not copy, modify, distribute, sell, or exploit any part of the Platform without our prior written consent.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">6.3 Trademarks</h3>
            <p className="text-gray-700">
              "Kavera" and all related logos, trademarks, and service marks are the property of KAVERAMMA COFFEE CURING WORKS PRIVATE LIMITED. You may not use these marks without our prior written permission.
            </p>
          </section>

          {/* Disclaimers */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Disclaimers and Limitations of Liability</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">7.1 "As Is" Basis</h3>
            <p className="text-gray-700 mb-4">
              The Platform is provided on an <strong>"as is"</strong> and <strong>"as available"</strong> basis without warranties of any kind, either express or implied. We do not warrant that the Platform will be uninterrupted, error-free, secure, or free from viruses or other harmful components.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">7.2 No Liability for Losses</h3>
            <p className="text-gray-700 mb-4">
              To the fullest extent permitted by law, KAVERAMMA COFFEE CURING WORKS PRIVATE LIMITED and its directors, officers, employees, and affiliates shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising from your use of or inability to use the Platform, including but not limited to loss of data, loss of profits, or business interruption.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">7.3 Third-Party Services</h3>
            <p className="text-gray-700">
              The Platform may contain links to third-party websites or services (such as Cricket Data API). We are not responsible for the content, accuracy, or practices of these third-party services. Your use of third-party services is at your own risk.
            </p>
          </section>

          {/* Privacy */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Privacy and Data Protection</h2>
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. Our collection, use, and protection of your personal information are governed by our <a href="/privacy" className="text-primary hover:underline font-semibold">Privacy Policy</a>, which is incorporated into these Terms by reference. By using the Platform, you consent to the collection and use of your information as described in the Privacy Policy.
            </p>
          </section>

          {/* Modifications */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Modifications to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify, update, or replace these Terms at any time at our sole discretion. When we make changes, we will update the "Last Updated" date at the top of this page. Your continued use of the Platform after any changes constitutes your acceptance of the new Terms.
            </p>
            <p className="text-gray-700">
              We encourage you to review these Terms periodically to stay informed of any updates.
            </p>
          </section>

          {/* Termination */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Termination</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to suspend or terminate your access to the Platform at any time, with or without cause, and with or without notice. Upon termination, your right to use the Platform will immediately cease, and we may delete your account and all associated data.
            </p>
            <p className="text-gray-700">
              You may also terminate your account at any time by contacting us through the <a href="/contact" className="text-primary hover:underline font-semibold">Contact Us</a> page and requesting account deletion.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Governing Law and Dispute Resolution</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">11.1 Governing Law</h3>
            <p className="text-gray-700 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">11.2 Jurisdiction</h3>
            <p className="text-gray-700 mb-4">
              Any disputes arising out of or relating to these Terms or your use of the Platform shall be subject to the exclusive jurisdiction of the courts located in Karnataka, India.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">11.3 Dispute Resolution</h3>
            <p className="text-gray-700">
              In the event of any dispute, you agree to first attempt to resolve the matter informally by contacting us through the <a href="/contact" className="text-primary hover:underline font-semibold">Contact Us</a> page. If the dispute cannot be resolved informally within 30 days, either party may pursue formal legal remedies.
            </p>
          </section>

          {/* Severability */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">12. Severability</h2>
            <p className="text-gray-700">
              If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.
            </p>
          </section>

          {/* Entire Agreement */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">13. Entire Agreement</h2>
            <p className="text-gray-700">
              These Terms, together with our Privacy Policy and any other legal notices published on the Platform, constitute the entire agreement between you and KAVERAMMA COFFEE CURING WORKS PRIVATE LIMITED regarding your use of the Platform.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions, concerns, or feedback regarding these Terms, please contact us:
            </p>
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-gray-800 font-semibold mb-2">KAVERAMMA COFFEE CURING WORKS PRIVATE LIMITED</p>
              <p className="text-gray-700">Karnataka, India</p>
              <p className="text-gray-700 mt-3">
                Email: <a href="/contact" className="text-primary hover:underline">Contact Us Form</a>
              </p>
              <p className="text-gray-700">
                Website: <a href="https://www.kavera.in" className="text-primary hover:underline">www.kavera.in</a>
              </p>
            </div>
          </section>

          {/* Acceptance */}
          <section>
            <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-lg text-white">
              <h3 className="text-2xl font-bold mb-3">Acceptance of Terms</h3>
              <p className="text-white/90">
                By clicking "I Agree" during registration or by accessing and using the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </div>
          </section>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
