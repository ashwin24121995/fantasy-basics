import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function FairPlayPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation activePage="fair-play" />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary via-primary/90 to-secondary py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full">
          <div className="absolute top-0 right-0 w-32 h-full bg-secondary transform skew-x-[-12deg] translate-x-16 opacity-60"></div>
          <div className="absolute top-0 right-24 w-24 h-full bg-white transform skew-x-[-12deg] translate-x-16 opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">Fair Play Policy</h1>
          <p className="text-xl text-white/90 max-w-2xl">Ensuring fairness, transparency, and integrity in every contest.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Introduction */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary"></div>
              <h2 className="text-3xl font-bold text-gray-900">Our Commitment to Fair Play</h2>
            </div>
            <p className="text-gray-700 mb-4">
              At Kavera, <strong>fair play</strong> is the foundation of everything we do. We are committed to providing a level playing field for all users, where skill, knowledge, and strategy determine success—not cheating, manipulation, or unfair advantages.
            </p>
            <p className="text-gray-700 mb-4">
              This Fair Play Policy outlines our principles, rules, and enforcement mechanisms to ensure that every contest is conducted with integrity, transparency, and respect for all participants.
            </p>
            <p className="text-gray-700">
              By using Kavera, you agree to abide by this Fair Play Policy. Violations may result in account suspension or permanent ban.
            </p>
          </section>

          {/* Core Principles */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-secondary"></div>
              <h2 className="text-3xl font-bold text-gray-900">Core Principles of Fair Play</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Equal Opportunity</h4>
                  <p className="text-gray-600 text-sm">Every user has equal access to match data, player statistics, and contest information. No user receives privileged information or unfair advantages.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-secondary">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Transparent Scoring</h4>
                  <p className="text-gray-600 text-sm">All fantasy points are calculated using a clear, publicly available scoring system based on real-time data from Cricket Data API.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">No Manipulation</h4>
                  <p className="text-gray-600 text-sm">We strictly prohibit any form of cheating, collusion, bot usage, or manipulation of contests, teams, or scoring systems.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-secondary">4</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Respectful Competition</h4>
                  <p className="text-gray-600 text-sm">All users must treat each other with respect. Harassment, abusive behavior, or unsportsmanlike conduct will not be tolerated.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary"></div>
              <h2 className="text-3xl font-bold text-gray-900">Prohibited Activities</h2>
            </div>
            <p className="text-gray-700 mb-6">
              The following activities are strictly prohibited and will result in immediate action, including account suspension or permanent ban:
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">1. Cheating and Manipulation</h3>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span><strong>Using bots or automation tools</strong> to create teams, join contests, or manipulate rankings.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span><strong>Exploiting bugs or glitches</strong> in the platform to gain unfair advantages.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span><strong>Tampering with scoring systems</strong> or attempting to manipulate fantasy points calculations.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span><strong>Using multiple accounts</strong> to dominate contests or create unfair advantages.</span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Collusion and Coordination</h3>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span><strong>Colluding with other users</strong> to manipulate contest outcomes or rankings.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span><strong>Sharing insider information</strong> or coordinating team selections to gain unfair advantages.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span><strong>Creating coordinated teams</strong> across multiple accounts to dominate leaderboards.</span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Account Abuse</h3>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span><strong>Creating multiple accounts</strong> to circumvent contest limits or gain unfair advantages.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span><strong>Sharing account credentials</strong> with others or allowing others to use your account.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span><strong>Impersonating other users</strong> or creating fake accounts.</span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">4. Harassment and Abusive Behavior</h3>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span><strong>Harassing, threatening, or abusing</strong> other users through messages, comments, or any other means.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span><strong>Using offensive language</strong> or engaging in hate speech, discrimination, or bullying.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span><strong>Spamming or flooding</strong> the platform with irrelevant or disruptive content.</span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">5. Unauthorized Access</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span><strong>Attempting to hack or breach</strong> the platform's security systems.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span><strong>Accessing other users' accounts</strong> without authorization.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span><strong>Reverse-engineering or decompiling</strong> the platform's code or systems.</span>
              </li>
            </ul>
          </section>

          {/* How We Ensure Fair Play */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-secondary"></div>
              <h2 className="text-3xl font-bold text-gray-900">How We Ensure Fair Play</h2>
            </div>
            <p className="text-gray-700 mb-6">
              Kavera employs multiple measures to detect, prevent, and address unfair practices:
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🔍</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Automated Monitoring Systems</h4>
                  <p className="text-gray-600 text-sm">We use advanced algorithms to detect suspicious activity, including bot usage, multiple accounts, and unusual patterns in team selection or contest participation.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🛡️</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Real-Time Data Verification</h4>
                  <p className="text-gray-600 text-sm">All match data and player statistics are sourced directly from Cricket Data API and verified in real-time to ensure accuracy and prevent manipulation.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Manual Review Team</h4>
                  <p className="text-gray-600 text-sm">Our dedicated team reviews flagged accounts, contests, and activities to ensure compliance with Fair Play policies.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Transparent Scoring System</h4>
                  <p className="text-gray-600 text-sm">Our scoring system is publicly documented and applied consistently to all users. You can view the complete scoring breakdown on our <a href="/how-to-play" className="text-primary hover:underline font-semibold">How to Play</a> page.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🚨</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">User Reporting System</h4>
                  <p className="text-gray-600 text-sm">Users can report suspicious activity or violations through our <a href="/contact" className="text-primary hover:underline font-semibold">Contact Us</a> page. All reports are investigated promptly.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Enforcement and Penalties */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary"></div>
              <h2 className="text-3xl font-bold text-gray-900">Enforcement and Penalties</h2>
            </div>
            <p className="text-gray-700 mb-6">
              Violations of this Fair Play Policy will result in the following actions, depending on the severity of the offense:
            </p>

            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">⚠️ Warning</h4>
                <p className="text-gray-700">
                  For minor or first-time violations, we may issue a warning and provide guidance on complying with Fair Play policies.
                </p>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">🚫 Temporary Suspension</h4>
                <p className="text-gray-700">
                  For moderate violations or repeated offenses, your account may be temporarily suspended for a period of 7 to 30 days. During this time, you will not be able to access the platform.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">🔒 Permanent Ban</h4>
                <p className="text-gray-700">
                  For serious violations, including cheating, bot usage, multiple accounts, or repeated offenses, your account will be permanently banned. You will not be allowed to create new accounts or access the platform in the future.
                </p>
              </div>

              <div className="bg-gray-100 border-l-4 border-gray-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">📋 Contest Disqualification</h4>
                <p className="text-gray-700">
                  If violations are detected during a contest, your team may be disqualified, and your ranking will be removed from the leaderboard.
                </p>
              </div>
            </div>

            <p className="text-gray-700 mt-6">
              All enforcement decisions are made at the sole discretion of Kavera. We reserve the right to investigate any activity and take appropriate action without prior notice.
            </p>
          </section>

          {/* Appeals Process */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-secondary"></div>
              <h2 className="text-3xl font-bold text-gray-900">Appeals Process</h2>
            </div>
            <p className="text-gray-700 mb-4">
              If you believe your account was suspended or banned in error, you have the right to appeal the decision.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">How to Appeal</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-3 mb-6">
              <li>Visit our <a href="/contact" className="text-primary hover:underline font-semibold">Contact Us</a> page.</li>
              <li>Submit a message with the subject line "Fair Play Appeal."</li>
              <li>Include your account email address and a detailed explanation of why you believe the decision was incorrect.</li>
              <li>Provide any supporting evidence (screenshots, timestamps, etc.).</li>
            </ol>

            <p className="text-gray-700 mb-4">
              Our team will review your appeal within <strong>7 business days</strong> and respond with a final decision. Appeal decisions are final and binding.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <p className="text-gray-700">
                <strong>Note:</strong> Submitting an appeal does not guarantee that your account will be reinstated. We carefully review all evidence before making a final decision.
              </p>
            </div>
          </section>

          {/* Reporting Violations */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary"></div>
              <h2 className="text-3xl font-bold text-gray-900">Reporting Violations</h2>
            </div>
            <p className="text-gray-700 mb-4">
              If you witness or suspect any violations of this Fair Play Policy, we encourage you to report them immediately.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">How to Report</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-3 mb-6">
              <li>Visit our <a href="/contact" className="text-primary hover:underline font-semibold">Contact Us</a> page.</li>
              <li>Submit a message with the subject line "Fair Play Violation Report."</li>
              <li>Provide details about the suspected violation, including usernames, contest IDs, and any evidence (screenshots, timestamps, etc.).</li>
            </ol>

            <p className="text-gray-700 mb-4">
              All reports are treated confidentially. We will investigate the matter and take appropriate action if a violation is confirmed.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <p className="text-gray-700">
                <strong>Thank you for helping us maintain a fair and transparent platform!</strong> Your vigilance ensures that Kavera remains a safe and enjoyable space for all cricket enthusiasts.
              </p>
            </div>
          </section>

          {/* Our Commitment */}
          <section className="bg-gradient-to-r from-primary to-secondary rounded-lg shadow-md p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Our Commitment to You</h2>
            <p className="text-white/90 mb-4">
              At Kavera, fair play is not just a policy—it's a promise. We are committed to:
            </p>
            <ul className="space-y-2 text-white/90 mb-4">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Providing equal opportunities for all users</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Maintaining transparent and accurate scoring systems</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Detecting and preventing cheating and manipulation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Enforcing Fair Play policies consistently and fairly</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Listening to user feedback and continuously improving our systems</span>
              </li>
            </ul>
            <p className="text-white font-bold">
              Together, we can build a community where skill, strategy, and sportsmanship thrive!
            </p>
          </section>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
