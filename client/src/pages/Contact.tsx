import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success("Message Sent!", {
        description: "Thank you for contacting us. We'll get back to you within 24-48 hours.",
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast.error("Error", {
        description: error.message || "Failed to send message. Please try again.",
      });
      setIsSubmitting(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    submitMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation activePage="contact" />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary via-primary/90 to-secondary py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full">
          <div className="absolute top-0 right-0 w-32 h-full bg-secondary transform skew-x-[-12deg] translate-x-16 opacity-60"></div>
          <div className="absolute top-0 right-24 w-24 h-full bg-white transform skew-x-[-12deg] translate-x-16 opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-2xl">Have questions or feedback? We'd love to hear from you!</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is your message about?"
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Company</h3>
                  <p className="text-gray-700">KAVERAMMA COFFEE CURING WORKS PRIVATE LIMITED</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Location</h3>
                  <p className="text-gray-700">Karnataka, India</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Website</h3>
                  <p className="text-gray-700">
                    <a href="https://www.kavera.in" className="text-primary hover:underline">
                      www.kavera.in
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-primary to-secondary rounded-lg shadow-md p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Response Time</h3>
              <p className="text-white/90 mb-4">
                We aim to respond to all inquiries within <strong>24-48 hours</strong> during business days (Monday-Friday).
              </p>
              <p className="text-white/90">
                For urgent matters, please mark your subject line with "URGENT" and we'll prioritize your request.
              </p>
            </div>

            {/* Common Topics */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Common Topics</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Account issues or login problems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Questions about fantasy cricket rules</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Technical issues or bugs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Contest or scoring inquiries</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Partnership or business opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Feedback and suggestions</span>
                </li>
              </ul>
            </div>

            {/* FAQ Link */}
            <div className="bg-yellow-50 border-2 border-secondary rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Before You Contact Us</h3>
              <p className="text-gray-700 mb-4">
                Many common questions are already answered in our comprehensive FAQ section. Check there first to get instant answers!
              </p>
              <a
                href="/faq"
                className="inline-block bg-secondary hover:bg-secondary/90 text-gray-900 font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Visit FAQ Page
              </a>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span className="font-semibold">Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Saturday:</span>
                  <span>10:00 AM - 4:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Sunday:</span>
                  <span className="text-gray-500">Closed</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                * Messages received outside business hours will be responded to on the next business day.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What to Include in Your Message</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">For Technical Issues:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Your account email address (if applicable)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Device and browser information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Detailed description of the problem</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Steps to reproduce the issue</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Screenshots (if possible)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">For General Inquiries:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Clear subject line</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Detailed explanation of your question</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Relevant match or contest IDs (if applicable)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Any previous communication reference</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Preferred contact method</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="max-w-6xl mx-auto mt-8">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy Notice</h3>
            <p className="text-gray-700">
              Your personal information will be used solely to respond to your inquiry and will not be shared with third parties. 
              For more information, please read our <a href="/privacy" className="text-primary hover:underline font-semibold">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
