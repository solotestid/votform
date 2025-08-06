import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { CampaignCard } from '@/components/campaigns/CampaignCard'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { StatsSection } from '@/components/home/StatsSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Campaigns Preview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Campaigns
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover and participate in exciting voting campaigns across various categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Sample campaigns - these would be fetched from the database */}
            <CampaignCard
              id="1"
              name="Best Singer of All Time"
              category="Music"
              description="Vote for the greatest vocalist in music history"
              joiners={45}
              minJoiners={50}
              status="ACTIVE"
            />
            <CampaignCard
              id="2"
              name="Greatest Movie Director"
              category="Film"
              description="Who is the most influential filmmaker?"
              joiners={78}
              minJoiners={100}
              status="ACTIVE"
            />
            <CampaignCard
              id="3"
              name="Best Tech Innovation 2024"
              category="Technology"
              description="Vote for the most groundbreaking tech of the year"
              joiners={120}
              minJoiners={100}
              status="VOTING"
            />
          </div>

          <div className="text-center">
            <Link href="/campaigns">
              <Button className="btn-primary">
                View All Campaigns
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Own Campaign?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Create a voting campaign and let the community decide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/campaigns/create">
              <Button className="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
                Create Campaign
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                Join Votee
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 