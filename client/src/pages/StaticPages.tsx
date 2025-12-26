import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface StaticPageProps {
  title: string;
  children: React.ReactNode;
}

function StaticPageLayout({ title, children }: StaticPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <div className="border-b bg-white">
        <div className="container py-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
      </div>
      <div className="container py-8 max-w-4xl">
        <Card>
          <CardContent className="prose prose-slate max-w-none pt-6">{children}</CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}

export function AboutPage() {
  return (
    <StaticPageLayout title="About Fantasy Basics">
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Welcome to Fantasy Basics</h2>
          <p>
            Fantasy Basics is India's premier fantasy cricket platform, brought to you by{" "}
            <strong>KAVERAMMA COFFEE CURING WORKS PRIVATE LIMITED</strong>. We are dedicated to providing cricket
            enthusiasts with an engaging, fair, and entertaining fantasy sports experience.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
          <p>
            Our mission is to make fantasy cricket accessible to everyone while maintaining the highest standards of
            fairness, transparency, and responsible gaming. We believe in creating a platform where cricket knowledge
            and strategy bring fun and entertainment—without any real money involved.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Why Choose Fantasy Basics?</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>100% Real Data:</strong> All match data, player statistics, and scores are sourced from reliable
              cricket APIs
            </li>
            <li>
              <strong>100% Free:</strong> No entry fees, no real money, no cash prizes—just pure cricket fun
            </li>
            <li>
              <strong>Fair Play Guaranteed:</strong> We ensure transparent scoring and contest management
            </li>
            <li>
              <strong>Real-time Updates:</strong> Get live scores and fantasy points as matches progress
            </li>
            <li>
              <strong>User-Friendly Interface:</strong> Easy team creation and contest participation
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Company Information</h3>
          <p>
            <strong>Company Name:</strong> KAVERAMMA COFFEE CURING WORKS PRIVATE LIMITED
            <br />
            <strong>Registration:</strong> Registered in Karnataka, India
            <br />
            <strong>Website:</strong> www.fantasybasics.com
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Compliance & Regulations</h3>
          <p>
            Fantasy Basics is a free-to-play entertainment platform that operates in full compliance with Indian laws. We
            strictly adhere to age restrictions (18+ only) and geographic restrictions as mandated by law. No real money or cash prizes are involved.
          </p>
          <p className="mt-2">
            <strong>Note:</strong> Fantasy sports are not available in Telangana, Andhra Pradesh, Assam, and Odisha as
            per state regulations.
          </p>
        </section>
      </div>
    </StaticPageLayout>
  );
}

export function HowToPlayPage() {
  return (
    <StaticPageLayout title="How to Play">
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Getting Started with Fantasy Basics</h2>
          <p>
            Fantasy cricket is a free game of skill where you create a virtual team of real cricket players and earn points
            based on their performance in actual matches. It's 100% free with no real money or cash prizes involved—just pure cricket entertainment. Here's how to get started:
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Step 1: Create Your Account</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Click on "Sign Up" and register with your email</li>
            <li>Verify your age (must be 18 or above)</li>
            <li>Select your state (restrictions apply to certain states)</li>
            <li>Complete your profile</li>
          </ol>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Step 2: Select a Match</h3>
          <p>Browse upcoming cricket matches and choose the one you want to play. You can filter by:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Upcoming matches</li>
            <li>Live matches</li>
            <li>Match format (T20, ODI, Test)</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Step 3: Join a Contest</h3>
          <p>Each match has multiple free contests you can join. Choose a contest that suits you:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>All contests are 100% free (no entry fee)</li>
            <li>Check the number of participants</li>
            <li>Review contest rules and scoring system</li>
            <li>Compete for fun and bragging rights—no cash prizes</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Step 4: Create Your Team</h3>
          <p>Build your dream team of 11 players from both teams:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Select players from different roles: Batsmen, Bowlers, All-rounders, Wicket-keepers</li>
            <li>Choose a Captain (earns 2x points)</li>
            <li>Choose a Vice-Captain (earns 1.5x points)</li>
            <li>Save your team and join the contest</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Step 5: Track Your Performance</h3>
          <p>Once the match starts:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Watch live scores and fantasy points update in real-time</li>
            <li>Check your team's ranking in the contest</li>
            <li>View detailed player performance statistics</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Scoring System</h3>
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Batting Points:</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Run: +1 point</li>
              <li>Boundary (4): +1 point</li>
              <li>Six (6): +2 points</li>
              <li>Half-century (50 runs): +8 points</li>
              <li>Century (100 runs): +16 points</li>
            </ul>

            <h4 className="font-semibold mt-4 mb-2">Bowling Points:</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Wicket: +25 points</li>
              <li>3 wickets: +4 points bonus</li>
              <li>5 wickets: +8 points bonus</li>
              <li>Maiden over: +12 points</li>
            </ul>

            <h4 className="font-semibold mt-4 mb-2">Fielding Points:</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Catch: +8 points</li>
              <li>Stumping: +12 points</li>
              <li>Run out: +6 points</li>
            </ul>
          </div>
        </section>
      </div>
    </StaticPageLayout>
  );
}

export function FAQPage() {
  return (
    <StaticPageLayout title="Frequently Asked Questions">
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold mb-2">What is Fantasy Basics?</h3>
          <p>
            Fantasy Basics is a fantasy cricket platform where you can create virtual teams of real cricket players and
            compete based on their actual performance in matches.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Is it free to play?</h3>
          <p>
            Yes! Fantasy Basics is 100% free to play. There are no entry fees, no real money involved, and no cash prizes. It's purely for entertainment and fun competition.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Who can play?</h3>
          <p>
            Anyone who is 18 years or older and resides in India can play, except residents of Telangana, Andhra
            Pradesh, Assam, and Odisha where fantasy sports are restricted.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">How do I create a team?</h3>
          <p>
            Select a match, choose a contest, and then pick 11 players from both teams. Don't forget to select a captain
            and vice-captain for bonus points!
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Can I edit my team after joining a contest?</h3>
          <p>
            You can edit your team until the match starts. Once the match begins, your team is locked and cannot be
            changed.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">How are fantasy points calculated?</h3>
          <p>
            Points are awarded based on real player performance including runs scored, wickets taken, catches, and other
            actions. Check our "How to Play" page for detailed scoring rules.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">How do I know who won?</h3>
          <p>Contest rankings are displayed after the match is completed and all fantasy points are calculated. Remember, this is for fun and bragging rights only—no cash prizes are awarded.</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Is my data safe?</h3>
          <p>
            Yes, we take data security seriously. All personal information is encrypted and stored securely. We never
            share your data with third parties without your consent.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">How do I contact support?</h3>
          <p>
            You can reach us through our Contact Us page or email us directly. We typically respond within 24-48 hours.
          </p>
        </section>
      </div>
    </StaticPageLayout>
  );
}

export function TermsPage() {
  return (
    <StaticPageLayout title="Terms & Conditions">
      <div className="space-y-6">
        <section>
          <p className="text-sm text-muted-foreground mb-4">Last Updated: December 26, 2025</p>
          <p>
            Welcome to Fantasy Basics, a free-to-play fantasy cricket entertainment platform. By accessing and using our platform, you agree to be bound by these Terms and
            Conditions. Please read them carefully. This platform involves NO real money, NO entry fees, and NO cash prizes.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h3>
          <p>
            By registering an account and using Fantasy Basics, you accept and agree to be bound by these Terms and
            Conditions and our Privacy Policy.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">2. Eligibility</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must be at least 18 years of age to use this platform</li>
            <li>You must be a resident of India</li>
            <li>
              You must NOT be a resident of Telangana, Andhra Pradesh, Assam, or Odisha where fantasy sports are
              restricted
            </li>
            <li>You must provide accurate and complete registration information</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">3. Account Responsibilities</h3>
          <p>You are responsible for:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">4. Contest Rules</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>All contests are 100% free with no entry fees</li>
            <li>No real money or cash prizes are awarded</li>
            <li>Teams must be created before the match starts</li>
            <li>Once a match begins, teams cannot be edited</li>
            <li>Points are awarded based on actual player performance</li>
            <li>Contest results are for entertainment purposes only</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">5. Prohibited Activities</h3>
          <p>Users must not:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use multiple accounts</li>
            <li>Manipulate or attempt to manipulate contests</li>
            <li>Use automated tools or bots</li>
            <li>Share account credentials with others</li>
            <li>Engage in any fraudulent activities</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">6. Intellectual Property</h3>
          <p>
            All content on Fantasy Basics, including logos, text, graphics, and software, is the property of KAVERAMMA
            COFFEE CURING WORKS PRIVATE LIMITED and is protected by copyright laws.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">7. Limitation of Liability</h3>
          <p>
            Fantasy Basics and KAVERAMMA COFFEE CURING WORKS PRIVATE LIMITED shall not be liable for any indirect,
            incidental, or consequential damages arising from your use of the platform.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">8. Changes to Terms</h3>
          <p>
            We reserve the right to modify these Terms and Conditions at any time. Continued use of the platform after
            changes constitutes acceptance of the modified terms.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">9. Governing Law</h3>
          <p>
            These Terms and Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive
            jurisdiction of courts in Karnataka, India.
          </p>
        </section>
      </div>
    </StaticPageLayout>
  );
}

export function PrivacyPage() {
  return (
    <StaticPageLayout title="Privacy Policy">
      <div className="space-y-6">
        <section>
          <p className="text-sm text-muted-foreground mb-4">Last Updated: December 26, 2025</p>
          <p>
            At Fantasy Basics, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
            use, and safeguard your personal information.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">1. Information We Collect</h3>
          <p>We collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, email address, date of birth, and state of residence
            </li>
            <li>
              <strong>Account Information:</strong> Username, password, and profile details
            </li>
            <li>
              <strong>Usage Data:</strong> Teams created, contests joined, and match participation
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, browser type, device information, and cookies
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">2. How We Use Your Information</h3>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide and maintain our services</li>
            <li>Verify your age and location eligibility</li>
            <li>Process contest entries and calculate results</li>
            <li>Send important updates and notifications</li>
            <li>Improve our platform and user experience</li>
            <li>Prevent fraud and ensure fair play</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">3. Data Security</h3>
          <p>
            We implement industry-standard security measures to protect your personal information, including encryption,
            secure servers, and access controls. However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">4. Information Sharing</h3>
          <p>We do not sell your personal information. We may share your data only in the following circumstances:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>With your explicit consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and prevent fraud</li>
            <li>With service providers who assist in operating our platform (under strict confidentiality agreements)</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">5. Cookies and Tracking</h3>
          <p>
            We use cookies and similar technologies to enhance your experience, analyze usage patterns, and maintain
            session information. You can control cookie preferences through your browser settings.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">6. Your Rights</h3>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your account and data</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent for data processing</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">7. Data Retention</h3>
          <p>
            We retain your personal information for as long as your account is active or as needed to provide services.
            We may retain certain information for legal and regulatory compliance purposes.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">8. Children's Privacy</h3>
          <p>
            Our platform is not intended for users under 18 years of age. We do not knowingly collect personal
            information from children. If we become aware of such collection, we will delete the information immediately.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">9. Changes to Privacy Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the
            new policy on our website and updating the "Last Updated" date.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">10. Contact Us</h3>
          <p>
            If you have questions about this Privacy Policy or how we handle your data, please contact us through our
            Contact Us page.
          </p>
        </section>
      </div>
    </StaticPageLayout>
  );
}

export function ResponsibleGamingPage() {
  return (
    <StaticPageLayout title="Responsible Gaming">
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Our Commitment to Responsible Gaming</h2>
          <p>
            At Fantasy Basics, we are committed to promoting responsible gaming practices. Fantasy Basics is a 100% free-to-play entertainment platform with no real money, no entry fees, and no cash prizes. Fantasy sports should be
            entertaining and enjoyable, played purely for fun.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Play Responsibly</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Play for entertainment and fun only</li>
            <li>Take regular breaks from gaming</li>
            <li>Be aware of the time you spend on the platform</li>
            <li>Remember: no real money is involved, it's just for fun</li>
            <li>Maintain a healthy balance with other activities</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Warning Signs</h3>
          <p>Be aware of these warning signs of excessive gaming:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Spending excessive time on the platform</li>
            <li>Neglecting work, family, or personal responsibilities</li>
            <li>Feeling anxious or irritable when not playing</li>
            <li>Gaming interfering with daily life</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Age Restrictions</h3>
          <p>
            Fantasy Basics is strictly for users 18 years and older. We verify age during registration and take measures
            to prevent underage access.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Self-Exclusion</h3>
          <p>
            If you feel you need a break from fantasy gaming, you can request account suspension or deletion. Contact our
            support team for assistance.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Get Help</h3>
          <p>
            If you or someone you know is struggling with gaming addiction, please seek help from professional
            organizations that specialize in gaming addiction support.
          </p>
        </section>
      </div>
    </StaticPageLayout>
  );
}

export function FairPlayPage() {
  return (
    <StaticPageLayout title="Fair Play Policy">
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Our Commitment to Fair Play</h2>
          <p>
            Fantasy Basics is built on the principles of fairness, transparency, and integrity. We ensure that all users
            have an equal opportunity to compete and win based on their cricket knowledge and strategy.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Transparent Scoring</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>All scoring rules are clearly published and accessible</li>
            <li>Points are calculated automatically based on official match data</li>
            <li>Real-time updates ensure accuracy and transparency</li>
            <li>No manual intervention in point calculation</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Anti-Fraud Measures</h3>
          <p>We actively monitor and prevent:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Multiple account creation</li>
            <li>Use of automated tools or bots</li>
            <li>Collusion between users</li>
            <li>Any form of cheating or manipulation</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Data Integrity</h3>
          <p>
            All match data, player statistics, and scores are sourced from reliable cricket APIs. We do not use mock or
            manipulated data. Every contest result is based on actual player performance in real matches.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Equal Opportunity</h3>
          <p>
            Every user has access to the same information and tools. We do not provide insider information or advantages
            to any user or group of users.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Reporting Violations</h3>
          <p>
            If you suspect any violation of our Fair Play Policy, please report it immediately through our Contact Us
            page. All reports are investigated thoroughly and kept confidential.
          </p>
        </section>
      </div>
    </StaticPageLayout>
  );
}

export function ContactPage() {
  return (
    <StaticPageLayout title="Contact Us">
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p>
            We're here to help! If you have any questions, concerns, or feedback, please don't hesitate to reach out to
            us.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Company Information</h3>
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <p>
              <strong>Company Name:</strong> KAVERAMMA COFFEE CURING WORKS PRIVATE LIMITED
            </p>
            <p>
              <strong>Website:</strong> www.fantasybasics.com
            </p>
            <p>
              <strong>Location:</strong> Karnataka, India
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Support Hours</h3>
          <p>Our support team is available:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Monday to Friday: 9:00 AM - 6:00 PM IST</li>
            <li>Saturday: 10:00 AM - 4:00 PM IST</li>
            <li>Sunday: Closed</li>
          </ul>
          <p className="mt-2 text-sm text-muted-foreground">
            We typically respond to all inquiries within 24-48 hours during business days.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">What We Can Help With</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Account and registration issues</li>
            <li>Contest and team creation questions</li>
            <li>Technical problems or bugs</li>
            <li>Scoring and points clarification</li>
            <li>Privacy and data concerns</li>
            <li>General feedback and suggestions</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Before You Contact Us</h3>
          <p>
            Please check our <Link href="/faq" className="text-primary hover:underline">FAQ page</Link> first - you might find the answer to your question there!
          </p>
        </section>
      </div>
    </StaticPageLayout>
  );
}
