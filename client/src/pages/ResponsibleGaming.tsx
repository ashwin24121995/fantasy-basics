import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ResponsibleGamingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation activePage="responsible-gaming" />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary via-primary/90 to-secondary py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full">
          <div className="absolute top-0 right-0 w-32 h-full bg-secondary transform skew-x-[-12deg] translate-x-16 opacity-60"></div>
          <div className="absolute top-0 right-24 w-24 h-full bg-white transform skew-x-[-12deg] translate-x-16 opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">Responsible Gaming</h1>
          <p className="text-xl text-white/90 max-w-2xl">Play smart, play safe, and enjoy fantasy cricket responsibly.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Introduction */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary"></div>
              <h2 className="text-3xl font-bold text-gray-900">Our Commitment to Responsible Gaming</h2>
            </div>
            <p className="text-gray-700 mb-4">
              At Fantasy Basics, we are committed to promoting <strong>responsible gaming practices</strong> and ensuring that our platform remains a safe, healthy, and enjoyable space for all cricket enthusiasts. While our platform is <strong>100% free</strong> with no real money involved, we recognize that even skill-based gaming can become problematic if not approached responsibly.
            </p>
            <p className="text-gray-700">
              This page outlines our responsible gaming principles, provides guidelines for healthy participation, and offers resources for users who may need support.
            </p>
          </section>

          {/* What is Responsible Gaming */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-secondary"></div>
              <h2 className="text-3xl font-bold text-gray-900">What is Responsible Gaming?</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Responsible gaming means participating in fantasy cricket in a way that is:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Balanced</h4>
                  <p className="text-gray-600 text-sm">Gaming should be one of many activities in your life, not the only one. Balance fantasy cricket with work, family, hobbies, and social activities.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-secondary">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Time-Limited</h4>
                  <p className="text-gray-600 text-sm">Set time limits for how long you spend on the platform each day. Avoid excessive or compulsive participation.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Fun and Recreational</h4>
                  <p className="text-gray-600 text-sm">Fantasy cricket should be enjoyable entertainment, not a source of stress, anxiety, or obsession.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-secondary">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Age-Appropriate</h4>
                  <p className="text-gray-600 text-sm">Only individuals 18 years or older should participate, in compliance with Indian laws and regulations.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Guidelines for Healthy Participation */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary"></div>
              <h2 className="text-3xl font-bold text-gray-900">Guidelines for Healthy Participation</h2>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-4">1. Set Time Limits</h3>
            <p className="text-gray-700 mb-4">
              Decide in advance how much time you will spend on Fantasy Basics each day or week. Use timers or reminders to help you stick to your limits. If you find yourself spending more time than planned, take a break.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Take Regular Breaks</h3>
            <p className="text-gray-700 mb-4">
              Step away from the platform regularly. Take breaks between contests, especially during live matches. Use this time to stretch, hydrate, or engage in other activities.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Keep It Fun</h3>
            <p className="text-gray-700 mb-4">
              Remember that Fantasy Basics is a <strong>free entertainment platform</strong>. There are no real prizes or financial rewards. If you find yourself feeling frustrated, angry, or overly competitive, it may be time to take a step back.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">4. Don't Let It Interfere with Life</h3>
            <p className="text-gray-700 mb-4">
              Fantasy cricket should not interfere with your work, studies, relationships, or other responsibilities. If you notice that gaming is affecting your daily life, consider reducing your participation or seeking support.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">5. Play for the Right Reasons</h3>
            <p className="text-gray-700 mb-4">
              Participate because you enjoy cricket and want to test your knowledge, not because you feel compelled or addicted. If you find yourself playing out of habit rather than enjoyment, it's time to reassess.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">6. Be Aware of Your Emotions</h3>
            <p className="text-gray-700 mb-4">
              Pay attention to how you feel while playing. If you experience negative emotions like anxiety, frustration, or obsession, take a break. Gaming should be a positive experience.
            </p>
          </section>

          {/* Recognizing Problem Gaming */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-secondary"></div>
              <h2 className="text-3xl font-bold text-gray-900">Recognizing Problem Gaming</h2>
            </div>
            <p className="text-gray-700 mb-4">
              While Fantasy Basics does not involve real money, it's still important to recognize signs of problematic gaming behavior. Ask yourself:
            </p>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span>Do you spend more time on Fantasy Basics than you intended?</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span>Do you feel anxious, irritable, or restless when you can't access the platform?</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span>Has fantasy cricket affected your work, studies, or relationships?</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span>Do you play to escape from problems or negative emotions?</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span>Do you lie to others about how much time you spend on the platform?</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span>Do you feel unable to control or reduce your participation?</span>
              </li>
            </ul>
            <p className="text-gray-700">
              If you answered "yes" to one or more of these questions, you may be developing problematic gaming habits. We encourage you to take a break and consider seeking support.
            </p>
          </section>

          {/* Self-Exclusion and Account Management */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary"></div>
              <h2 className="text-3xl font-bold text-gray-900">Self-Exclusion and Account Management</h2>
            </div>
            <p className="text-gray-700 mb-4">
              If you feel that you need to take a break from Fantasy Basics, you have the following options:
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Temporary Break</h3>
            <p className="text-gray-700 mb-4">
              Simply stop logging in for a period of time. Your account and teams will remain intact, and you can return whenever you're ready.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Account Deletion</h3>
            <p className="text-gray-700 mb-4">
              If you wish to permanently delete your account, you can request account deletion through the <a href="/contact" className="text-primary hover:underline font-semibold">Contact Us</a> page. We will process your request within 7 business days and delete all your personal data.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Self-Exclusion Request</h3>
            <p className="text-gray-700">
              If you want to prevent yourself from accessing the platform for a specific period (e.g., 1 month, 3 months, 6 months), contact us through the <a href="/contact" className="text-primary hover:underline font-semibold">Contact Us</a> page with the subject line "Self-Exclusion Request." We will temporarily block your account for the requested period.
            </p>
          </section>

          {/* Support Resources */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-secondary"></div>
              <h2 className="text-3xl font-bold text-gray-900">Support Resources</h2>
            </div>
            <p className="text-gray-700 mb-6">
              If you or someone you know is struggling with gaming-related issues, the following resources may be helpful:
            </p>

            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">National Institute of Mental Health and Neurosciences (NIMHANS)</h4>
                <p className="text-gray-700 mb-2">India's premier mental health institution offering counseling and support for behavioral addictions.</p>
                <p className="text-gray-700">
                  <strong>Website:</strong> <a href="https://nimhans.ac.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://nimhans.ac.in</a>
                </p>
                <p className="text-gray-700">
                  <strong>Helpline:</strong> 080-46110007 (Service for Mental Health)
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Vandrevala Foundation Helpline</h4>
                <p className="text-gray-700 mb-2">24/7 mental health support and counseling services across India.</p>
                <p className="text-gray-700">
                  <strong>Helpline:</strong> 1860-2662-345 or 1800-2333-330 (Toll-Free)
                </p>
                <p className="text-gray-700">
                  <strong>Website:</strong> <a href="https://www.vandrevalafoundation.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.vandrevalafoundation.com</a>
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">iCall Psychosocial Helpline</h4>
                <p className="text-gray-700 mb-2">Free counseling service by Tata Institute of Social Sciences (TISS).</p>
                <p className="text-gray-700">
                  <strong>Helpline:</strong> 9152987821
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> icall@tiss.edu
                </p>
                <p className="text-gray-700">
                  <strong>Timings:</strong> Monday to Saturday, 8:00 AM to 10:00 PM IST
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Your Family and Friends</h4>
                <p className="text-gray-700">
                  Don't hesitate to reach out to trusted family members, friends, or healthcare professionals if you're struggling. Talking about your concerns is the first step toward getting help.
                </p>
              </div>
            </div>
          </section>

          {/* Age Verification and Legal Compliance */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary"></div>
              <h2 className="text-3xl font-bold text-gray-900">Age Verification and Legal Compliance</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">18+ Only</h4>
                <p className="text-gray-700">
                  Fantasy Basics is <strong>strictly for users 18 years or older</strong>. We verify the age of all users during registration. If you are under 18, you are not permitted to use this platform. Parents and guardians should monitor their children's online activities.
                </p>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Geographic Restrictions</h4>
                <p className="text-gray-700">
                  In compliance with Indian state laws, Fantasy Basics is <strong>not available</strong> to residents of the following states:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 ml-4">
                  <li>Telangana</li>
                  <li>Andhra Pradesh</li>
                  <li>Assam</li>
                  <li>Odisha</li>
                </ul>
                <p className="text-gray-700 mt-2">
                  Users from these states are automatically restricted from accessing the platform.
                </p>
              </div>
            </div>
          </section>

          {/* Our Commitment */}
          <section className="bg-gradient-to-r from-primary to-secondary rounded-lg shadow-md p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Our Commitment to You</h2>
            <p className="text-white/90 mb-4">
              At Fantasy Basics, we are dedicated to creating a safe, transparent, and responsible gaming environment. We continuously monitor our platform to ensure compliance with responsible gaming principles and Indian laws.
            </p>
            <p className="text-white/90 mb-4">
              If you have any concerns, questions, or feedback about responsible gaming, please don't hesitate to <a href="/contact" className="text-white underline font-semibold">contact us</a>. Your well-being is our priority.
            </p>
            <p className="text-white font-bold">
              Remember: Fantasy cricket is meant to be fun. Play responsibly, play safely, and enjoy the game!
            </p>
          </section>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
