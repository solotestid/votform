import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="block">Democracy in</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Action
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Create campaigns, vote fairly, and discover winners in a transparent 
            voting platform that puts power back in the hands of the people.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/campaigns">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
              >
                Explore Campaigns
              </Button>
            </Link>
            
            <Link href="/campaigns/create">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3"
              >
                Start Campaign
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white/80">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-sm">Active Campaigns</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-sm">Votes Cast</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-sm">Transparent</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full"></div>
    </section>
  )
} 