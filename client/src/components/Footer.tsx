import { Link } from "wouter";
import { Trophy, Mail, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden mt-auto">
      {/* Angular design elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-full pointer-events-none">
        <div className="absolute bottom-0 right-0 w-40 h-full bg-secondary transform skew-x-[-12deg] translate-x-20 opacity-70"></div>
        <div className="absolute bottom-0 right-32 w-32 h-full bg-primary transform skew-x-[-12deg] translate-x-20 opacity-70"></div>
        <div className="absolute bottom-0 right-56 w-24 h-full bg-secondary transform skew-x-[-12deg] translate-x-20 opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/kavera-logo.png" alt="Kavera" className="h-10 w-auto" />
            </div>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              India's #1 free fantasy cricket platform by KAVERAMMA COFFEE CURING WORKS PRIVATE LIMITED. Build your dream team, compete with friends, and prove your cricket knowledge!
            </p>
            <div className="flex items-center gap-2 text-secondary text-sm">
              <Trophy className="w-4 h-4" />
              <span className="font-semibold">100% Free Forever</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-secondary uppercase text-sm tracking-wider border-b border-gray-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-secondary transition-colors hover:translate-x-1 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-to-play" className="text-gray-400 hover:text-secondary transition-colors hover:translate-x-1 inline-block">
                  How to Play
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-secondary transition-colors hover:translate-x-1 inline-block">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-secondary transition-colors hover:translate-x-1 inline-block">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4 text-secondary uppercase text-sm tracking-wider border-b border-gray-800 pb-2">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-secondary transition-colors hover:translate-x-1 inline-block">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-secondary transition-colors hover:translate-x-1 inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/responsible-gaming" className="text-gray-400 hover:text-secondary transition-colors hover:translate-x-1 inline-block">
                  Responsible Gaming
                </Link>
              </li>
              <li>
                <Link href="/fair-play" className="text-gray-400 hover:text-secondary transition-colors hover:translate-x-1 inline-block">
                  Fair Play
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4 text-secondary uppercase text-sm tracking-wider border-b border-gray-800 pb-2">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" />
                <span className="leading-relaxed">
                  KAVERAMMA COFFEE CURING WORKS PRIVATE LIMITED<br />
                  Karnataka, India
                </span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0 text-secondary" />
                <Link href="/contact" className="hover:text-secondary transition-colors">
                  Contact Form
                </Link>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <ExternalLink className="w-4 h-4 flex-shrink-0 text-secondary" />
                <a 
                  href="https://www.fantasybasics.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors"
                >
                  www.fantasybasics.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © 2024 Kavera by KAVERAMMA COFFEE CURING WORKS PRIVATE LIMITED. All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <span className="px-3 py-1 bg-gray-800 rounded-full">Age Verified (18+)</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full">Registered in India</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full">100% Transparent</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500 text-center md:text-left leading-relaxed">
            <strong>Legal Disclosure:</strong> This is a skill-based gaming platform for entertainment purposes only. 
            No real money involved. Participants must be 18+ years old. Not available in Telangana, Andhra Pradesh, Assam, and Odisha.
          </p>
        </div>
      </div>
    </footer>
  );
}
