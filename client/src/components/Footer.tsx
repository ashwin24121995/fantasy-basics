import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 relative overflow-hidden mt-auto">
      <div className="absolute bottom-0 right-0 w-1/4 h-full">
        <div className="absolute bottom-0 right-0 w-32 h-full bg-secondary transform skew-x-[-12deg] translate-x-16 opacity-80"></div>
        <div className="absolute bottom-0 right-24 w-24 h-full bg-primary transform skew-x-[-12deg] translate-x-16 opacity-80"></div>
        <div className="absolute bottom-0 right-40 w-16 h-full bg-secondary transform skew-x-[-12deg] translate-x-16 opacity-60"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap justify-between gap-8 mb-8">
          <div className="flex-1 min-w-[200px]">
            <img src="/logo-new.webp" alt="Fantasy Basics" className="h-12 w-auto mb-4" />
            <p className="text-gray-400 text-sm max-w-xs">
              100% free fantasy cricket platform for entertainment purposes only.
            </p>
          </div>
          
          <div className="flex gap-16">
            <div>
              <h4 className="font-bold mb-4 text-secondary uppercase text-sm">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-secondary transition-colors">About Us</Link></li>
                <li><Link href="/how-to-play" className="text-gray-400 hover:text-secondary transition-colors">How to Play</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-secondary transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-secondary transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-secondary uppercase text-sm">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="text-gray-400 hover:text-secondary transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-secondary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/responsible-gaming" className="text-gray-400 hover:text-secondary transition-colors">Responsible Gaming</Link></li>
                <li><Link href="/fair-play" className="text-gray-400 hover:text-secondary transition-colors">Fair Play</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-wrap justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2024 Fantasy Basics. All Rights Reserved. | KAVERAMMA COFFEE CURING WORKS PRIVATE LIMITED, Karnataka, India</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Legal Disclosure: This is a skill-based gaming platform for entertainment purposes only. Participants must be 18+ years old. Not available in Telangana, Andhra Pradesh, Assam, and Odisha.
          </p>
        </div>
      </div>
    </footer>
  );
}
