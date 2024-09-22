'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  const [activeFaq, setActiveFaq] = useState(null)

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null)
    } else {
      setActiveFaq(index)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link className="flex items-center justify-center" href="/">
          <span className="text-xl font-bold">LinkedBoost AI</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#faq">
            FAQ
          </Link>
          {session ? (
            <>
              <Button onClick={() => router.push('/dashboard')} variant="outline">Dashboard</Button>
              <Button onClick={() => signOut()} variant="outline">Sign Out</Button>
            </>
          ) : (
            <Button onClick={() => router.push('/auth/signin')} variant="outline">Sign In</Button>
          )}
        </nav>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
                AI-Powered Personal Branding for LinkedIn
              </h1>
              <p className="mx-auto max-w-[700px] text-xl text-gray-200 md:text-2xl">
                Boost your LinkedIn presence with AI-generated content, profile optimization, and analytics.
              </p>
              <div className="space-x-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">Get Started for Free</Button>
                </Link>
                {!session && (
                  <Link href="/signup">
                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">Sign Up</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="AI Content Generation"
                description="Our advanced AI analyzes your industry trends and personal style to create engaging, tailored LinkedIn posts that resonate with your network."
                icon={<BulbIcon className="h-10 w-10" />}
              />
              <FeatureCard
                title="Profile Optimization"
                description="Get AI-powered suggestions to enhance your LinkedIn profile, making it more attractive to recruiters and potential connections."
                icon={<UserIcon className="h-10 w-10" />}
              />
              <FeatureCard
                title="Smart Analytics"
                description="Track your LinkedIn performance with detailed insights on post engagement, profile views, and network growth to refine your strategy."
                icon={<BarChartIcon className="h-10 w-10" />}
              />
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PricingCard
                title="Basic"
                price="$9.99"
                features={[
                  "5 AI-generated posts per month",
                  "Basic profile optimization",
                  "Weekly analytics report"
                ]}
              />
              <PricingCard
                title="Pro"
                price="$19.99"
                features={[
                  "15 AI-generated posts per month",
                  "Advanced profile optimization",
                  "Daily analytics report",
                  "Priority support"
                ]}
              />
              <PricingCard
                title="Enterprise"
                price="Custom"
                features={[
                  "Unlimited AI-generated posts",
                  "Full profile management",
                  "Real-time analytics",
                  "Dedicated account manager"
                ]}
              />
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <FaqItem
                question="How does the AI content generation work?"
                answer="Our AI analyzes your industry, past posts, and current trends to generate relevant and engaging content tailored to your personal brand."
                isActive={activeFaq === 0}
                onClick={() => toggleFaq(0)}
              />
              <FaqItem
                question="Can I edit the AI-generated content?"
                answer="Absolutely! You have full control to edit, refine, or completely rewrite the AI-generated content before posting."
                isActive={activeFaq === 1}
                onClick={() => toggleFaq(1)}
              />
              <FaqItem
                question="How often should I post on LinkedIn?"
                answer="We recommend posting 2-3 times per week for optimal engagement, but our analytics will help you find the best frequency for your specific audience."
                isActive={activeFaq === 2}
                onClick={() => toggleFaq(2)}
              />
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                quote="LinkedBoost AI has transformed my LinkedIn strategy. My engagement has skyrocketed!"
                author="Sarah J., Marketing Manager"
              />
              <TestimonialCard
                quote="The AI-generated content is spot-on. It's like having a personal LinkedIn assistant."
                author="Mike T., Entrepreneur"
              />
              <TestimonialCard
                quote="The analytics feature helps me understand what content resonates with my network. Invaluable!"
                author="Emily R., Sales Executive"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 LinkedBoost AI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/privacy">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/terms">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/contact">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm">
      <div className="mb-4 text-blue-500">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function PricingCard({ title, price, features }) {
  return (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-3xl font-bold mb-4">{price}<span className="text-sm font-normal">/month</span></p>
      <ul className="mb-6 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="mt-auto">Choose Plan</Button>
    </div>
  )
}

function FaqItem({ question, answer, isActive, onClick }) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={onClick}
      >
        <span className="text-lg font-medium">{question}</span>
        <ChevronDownIcon className={`h-5 w-5 transform transition-transform ${isActive ? 'rotate-180' : ''}`} />
      </button>
      {isActive && (
        <p className="mt-2 text-gray-600">{answer}</p>
      )}
    </div>
  )
}

function TestimonialCard({ quote, author }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-600 mb-4 italic">"{quote}"</p>
      <p className="text-sm font-bold">- {author}</p>
    </div>
  )
}

function BulbIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  )
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}