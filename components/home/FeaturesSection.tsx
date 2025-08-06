import React from 'react'
import { Vote, Users, Shield, Award, Zap, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Vote,
    title: 'Fair Voting System',
    description: 'Two-tier voting with free and paid options, ensuring both accessibility and engagement.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Users create campaigns, suggest nominees, and participate in democratic decision-making.',
  },
  {
    icon: Shield,
    title: 'Anti-Abuse Protection',
    description: 'SMS verification, device fingerprinting, and rate limits prevent manipulation.',
  },
  {
    icon: Award,
    title: 'Transparent Results',
    description: 'Real-time rankings with distance indicators, final counts revealed at the end.',
  },
  {
    icon: Zap,
    title: 'Ultra-Fast Voting',
    description: 'Complete a paid vote in under 5 seconds with one-tap payment integration.',
  },
  {
    icon: TrendingUp,
    title: 'Viral Growth',
    description: 'Referral system rewards users with free vote credits for bringing friends.',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Votee?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform combines democratic principles with modern technology to create 
            the most fair and engaging voting experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                <feature.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience Democracy in Action?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of users who are already participating in meaningful votes 
              and creating campaigns that matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Get Started Free
              </button>
              <button className="btn-outline">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 