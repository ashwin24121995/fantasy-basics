import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: string;
  faqs: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    title: "Getting Started",
    icon: "🚀",
    faqs: [
      {
        question: "What is Fantasy Basics?",
        answer: "Fantasy Basics is a 100% free fantasy cricket platform where you create virtual teams of real cricket players and compete based on their actual performance in live matches. It's a game of skill that tests your cricket knowledge and strategic thinking. There are no entry fees, no real money transactions, and no cash prizes—just pure cricket entertainment and friendly competition."
      },
      {
        question: "Is Fantasy Basics really free?",
        answer: "Yes, absolutely! Fantasy Basics is 100% free to play. There are no entry fees, no hidden charges, no in-app purchases, and no real money involved at any point. All contests are free to join, and you compete purely for fun, rankings, and bragging rights among friends. We will never ask you for payment information or charge you anything."
      },
      {
        question: "Who can play on Fantasy Basics?",
        answer: "Anyone who is 18 years or older and resides in India can play on Fantasy Basics, except residents of four states where fantasy sports are restricted: Telangana, Andhra Pradesh, Assam, and Odisha. During registration, you'll need to verify your age and select your state of residence."
      },
      {
        question: "How do I create an account?",
        answer: "Creating an account is quick and easy! Click the 'Sign Up' or 'Register' button, provide your email address (or use social login), verify that you're 18 or older, select your state of residence, and complete your profile with your name and preferences. Once done, you can immediately start playing!"
      },
      {
        question: "Do I need to download an app?",
        answer: "No app download is required! Fantasy Basics is a web-based platform that works perfectly on any device—desktop, laptop, tablet, or mobile phone. Simply visit our website from any browser and start playing instantly."
      }
    ]
  },
  {
    title: "Playing the Game",
    icon: "🏏",
    faqs: [
      {
        question: "How do I create a fantasy team?",
        answer: "To create a team: (1) Select an upcoming or live match from the Matches page. (2) Choose a free contest to join. (3) Build your team of 11 players from both competing teams, selecting a mix of batsmen, bowlers, all-rounders, and wicket-keepers. (4) Assign one player as Captain (2x points) and another as Vice-Captain (1.5x points). (5) Save your team and join the contest. Your team will start earning points once the match begins!"
      },
      {
        question: "What are the team composition rules?",
        answer: "Your team must have exactly 11 players with the following composition: 3-6 Batsmen, 3-6 Bowlers, 1-4 All-Rounders, and 1-4 Wicket-Keepers. You must select players from both teams playing in the match. Additionally, you must choose one Captain (who earns 2x points) and one Vice-Captain (who earns 1.5x points)."
      },
      {
        question: "What is the role of Captain and Vice-Captain?",
        answer: "The Captain and Vice-Captain are the most important selections in your team because they earn bonus points. Your Captain earns 2x (double) the points they score, while your Vice-Captain earns 1.5x the points. For example, if your Captain scores 50 fantasy points, they'll actually contribute 100 points to your total. Choose these positions wisely—they can significantly impact your final ranking!"
      },
      {
        question: "Can I edit my team after joining a contest?",
        answer: "You can edit your team anytime before the match starts. Once the match begins, your team is locked and cannot be changed. We recommend monitoring team news and player availability right up until the match start time to make any necessary last-minute adjustments."
      },
      {
        question: "How many contests can I join?",
        answer: "You can join as many free contests as you like! There's no limit to the number of contests you can participate in. You can join multiple contests for the same match with the same team or create different teams for different contests. Play as much as you want—it's all free!"
      }
    ]
  },
  {
    title: "Scoring & Points",
    icon: "📊",
    faqs: [
      {
        question: "How are fantasy points calculated?",
        answer: "Fantasy points are calculated based on real player performance in the match. Batsmen earn points for runs scored, boundaries, and milestones (50s, 100s). Bowlers earn points for wickets taken, maidens, and wicket bonuses. Fielders earn points for catches, stumpings, and run-outs. Additionally, performance bonuses are awarded for high strike rates and good economy rates. Your Captain's points are doubled (2x) and Vice-Captain's points are multiplied by 1.5x."
      },
      {
        question: "What are the main scoring categories?",
        answer: "The main scoring categories are: (1) Batting - runs, boundaries, sixes, 50s, 100s, strike rate bonuses. (2) Bowling - wickets, wicket bonuses (3/4/5 wickets), maidens, economy rate bonuses. (3) Fielding - catches, stumpings, run-outs. (4) Negative Points - ducks (out for 0). All points are sourced from real match data via Cricket Data API and updated in real-time."
      },
      {
        question: "How much is a wicket worth?",
        answer: "A wicket is worth 25 points, making it one of the highest-scoring actions in fantasy cricket. Additionally, bowlers earn bonus points for multiple wickets: +4 points for 3 wickets, +8 points for 4 wickets, and +16 points for 5 wickets in a match. This is why selecting in-form bowlers is crucial for a high-scoring team."
      },
      {
        question: "Do players get negative points?",
        answer: "Yes, there is one negative scoring scenario: if a batsman gets out for a duck (0 runs), they lose 2 points. This penalty applies only to batsmen and all-rounders when batting, not to bowlers or wicket-keepers. All other actions earn positive points or zero points."
      },
      {
        question: "When are points updated?",
        answer: "Points are updated in real-time as the match progresses! Our system fetches live match data from Cricket Data API and automatically updates player statistics and fantasy points every few seconds. You can watch your team's score change live without needing to refresh the page. Final points are confirmed after the match ends."
      }
    ]
  },
  {
    title: "Contests & Competition",
    icon: "🏆",
    faqs: [
      {
        question: "What types of contests are available?",
        answer: "All contests on Fantasy Basics are free contests with varying participant sizes. You'll find small contests (50-100 participants), medium contests (100-500 participants), and large contests (500-1000+ participants). The contest size affects the level of competition—smaller contests are easier to rank high in, while larger contests offer more competitive challenges. All contests are 100% free to join."
      },
      {
        question: "How do I win a contest?",
        answer: "To win a contest, your fantasy team must score more points than other participants. Points are earned based on your players' real performance in the match. The participant with the highest total fantasy points at the end of the match ranks first. Remember, there are no cash prizes or monetary rewards—you compete for rankings, bragging rights, and the satisfaction of proving your cricket knowledge!"
      },
      {
        question: "Can I join multiple contests for the same match?",
        answer: "Yes! You can join as many contests as you like for the same match. You can use the same team across multiple contests or create different teams with different strategies. This allows you to test various approaches and maximize your chances of ranking high in at least one contest."
      },
      {
        question: "What happens if a match is cancelled?",
        answer: "If a match is cancelled or abandoned before it starts, all contests for that match are automatically cancelled, and your team selections are reset. If a match is abandoned after it starts, points are calculated based on the performance up to that point, and contest rankings are finalized accordingly. You'll be notified of any match status changes."
      },
      {
        question: "How are rankings determined?",
        answer: "Rankings are determined solely by total fantasy points. The participant with the highest points ranks 1st, second-highest ranks 2nd, and so on. In case of a tie (two or more participants with the same points), the participant who joined the contest earlier gets the higher rank. All rankings are calculated automatically and displayed in real-time during the match."
      }
    ]
  },
  {
    title: "Account & Privacy",
    icon: "🔒",
    faqs: [
      {
        question: "Is my personal information safe?",
        answer: "Yes, absolutely. We take data privacy very seriously. Your personal information (name, email, state) is stored securely and encrypted. We never share your data with third parties without your explicit consent. We only collect the minimum information necessary to operate the platform and comply with Indian regulations. For complete details, please read our Privacy Policy."
      },
      {
        question: "Why do I need to verify my age?",
        answer: "Age verification is mandatory as per Indian laws governing fantasy sports platforms. Fantasy sports are classified as games of skill, and participants must be 18 years or older. During registration, you'll be asked to confirm your age. This is a legal requirement to ensure responsible gaming and compliance with regulations."
      },
      {
        question: "Why are certain states restricted?",
        answer: "Residents of Telangana, Andhra Pradesh, Assam, and Odisha cannot participate in fantasy sports due to state-specific regulations that prohibit such activities. These restrictions are mandated by law, and we must comply with them. We verify your state during registration to ensure legal compliance."
      },
      {
        question: "Can I change my email address?",
        answer: "Currently, email addresses cannot be changed after registration as they serve as your unique account identifier. If you need to use a different email, please contact our support team through the Contact Us page, and we'll assist you with the process."
      },
      {
        question: "How do I delete my account?",
        answer: "If you wish to delete your account, please contact us through the Contact Us page with your registered email address and request for account deletion. We'll process your request within 7 business days and permanently delete all your personal data from our systems, as per our Privacy Policy and data protection regulations."
      }
    ]
  },
  {
    title: "Technical & Support",
    icon: "⚙️",
    faqs: [
      {
        question: "Which browsers are supported?",
        answer: "Fantasy Basics works on all modern web browsers including Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, and Opera. For the best experience, we recommend using the latest version of your preferred browser. The platform is fully responsive and works seamlessly on desktop, laptop, tablet, and mobile devices."
      },
      {
        question: "Why are live scores not updating?",
        answer: "Live scores are fetched from Cricket Data API and update automatically every few seconds. If scores aren't updating, it could be due to: (1) Temporary API connectivity issues, (2) Your internet connection, or (3) The match hasn't started yet. Try refreshing the page or checking your internet connection. If the issue persists, please contact support."
      },
      {
        question: "What if I see incorrect player points?",
        answer: "All fantasy points are calculated automatically based on official match data from Cricket Data API. Points are updated in real-time and finalized after the match ends. If you believe there's an error in point calculation, please contact us through the Contact Us page with the match ID, player name, and specific details of the discrepancy. We'll investigate and correct any errors."
      },
      {
        question: "How do I report a bug or issue?",
        answer: "If you encounter any technical issues, bugs, or problems while using Fantasy Basics, please report them through our Contact Us page. Provide as much detail as possible: what you were doing when the issue occurred, what browser/device you're using, and any error messages you saw. We'll investigate and resolve the issue as quickly as possible."
      },
      {
        question: "How can I contact customer support?",
        answer: "You can contact our support team through the Contact Us page. Fill out the contact form with your name, email, subject, and detailed message describing your question or issue. We typically respond within 24-48 hours during business days. For urgent matters, please mention 'URGENT' in the subject line."
      }
    ]
  },
  {
    title: "Rules & Regulations",
    icon: "📋",
    faqs: [
      {
        question: "Is fantasy cricket legal in India?",
        answer: "Yes, fantasy cricket is legal in India as it is recognized as a game of skill, not chance. However, it is restricted in four states: Telangana, Andhra Pradesh, Assam, and Odisha. Fantasy Basics operates in full compliance with Indian laws and regulations. Since we don't involve any real money transactions, we operate as a free entertainment platform."
      },
      {
        question: "What are the main rules of Fantasy Basics?",
        answer: "The main rules are: (1) You must be 18+ years old. (2) You cannot be a resident of Telangana, Andhra Pradesh, Assam, or Odisha. (3) You can only create teams from players in the actual match squads. (4) Teams must follow composition rules (3-6 batsmen, 3-6 bowlers, 1-4 all-rounders, 1-4 wicket-keepers). (5) You must select one Captain and one Vice-Captain. (6) Teams are locked once the match starts. For complete rules, please read our Terms & Conditions and Fair Play Policy."
      },
      {
        question: "Can I create multiple accounts?",
        answer: "No, creating multiple accounts is strictly prohibited and violates our Terms & Conditions. Each user is allowed only one account. If we detect multiple accounts from the same person, all accounts will be suspended or permanently banned. Play fair and enjoy the game with a single account."
      },
      {
        question: "What is your Fair Play Policy?",
        answer: "Our Fair Play Policy ensures a level playing field for all participants. It prohibits: creating multiple accounts, using bots or automated tools, manipulating match data, colluding with other users, and any form of cheating. We use automated systems and manual reviews to detect violations. Users found violating the policy will face account suspension or permanent ban. For complete details, visit our Fair Play page."
      },
      {
        question: "What happens if I violate the rules?",
        answer: "Violations of our Terms & Conditions or Fair Play Policy result in consequences ranging from warnings to permanent account bans, depending on the severity. Common violations include: multiple accounts, use of bots, data manipulation, and abusive behavior. We take rule violations seriously to maintain a fair and enjoyable environment for all users. If you believe your account was suspended in error, contact support with details."
      }
    ]
  }
];

function FAQAccordion({ faq }: { faq: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 px-6 flex justify-between items-center hover:bg-gray-50 transition-colors text-left"
      >
        <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
        <span className={`text-2xl text-primary flex-shrink-0 transition-transform ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-700">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation activePage="faq" />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary via-primary/90 to-secondary py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full">
          <div className="absolute top-0 right-0 w-32 h-full bg-secondary transform skew-x-[-12deg] translate-x-16 opacity-60"></div>
          <div className="absolute top-0 right-24 w-24 h-full bg-white transform skew-x-[-12deg] translate-x-16 opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-white/90 max-w-2xl">Find answers to common questions about Fantasy Basics</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Have a Question?</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              We've compiled answers to the most common questions about Fantasy Basics. Browse through the categories below to find what you're looking for. If you can't find your answer, feel free to contact us through our Contact Us page.
            </p>
          </div>

          {/* FAQ Categories */}
          {faqCategories.map((category, index) => (
            <section key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-primary to-secondary p-6">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{category.icon}</span>
                  <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                </div>
              </div>

              {/* FAQs */}
              <div>
                {category.faqs.map((faq, faqIndex) => (
                  <FAQAccordion key={faqIndex} faq={faq} />
                ))}
              </div>
            </section>
          ))}

          {/* Still Have Questions */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg shadow-md p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help! Reach out to us through the contact form, and we'll get back to you within 24-48 hours.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
