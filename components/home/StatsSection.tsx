import React from 'react'

const stats = [
  {
    number: '50+',
    label: 'Active Campaigns',
    description: 'Voting campaigns across various categories'
  },
  {
    number: '10K+',
    label: 'Votes Cast',
    description: 'Total votes across all contests'
  },
  {
    number: '5K+',
    label: 'Registered Users',
    description: 'Community members participating'
  },
  {
    number: '100%',
    label: 'Transparent',
    description: 'All voting results are publicly verifiable'
  },
  {
    number: '30',
    label: 'Day Contests',
    description: 'Standard voting period duration'
  },
  {
    number: '$1',
    label: 'Per Vote',
    description: 'Fair pricing for paid votes'
  }
]

export function StatsSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Platform Statistics
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how our community is growing and making a difference through democratic voting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Live Platform - Join Now!</span>
          </div>
        </div>
      </div>
    </section>
  )
} 