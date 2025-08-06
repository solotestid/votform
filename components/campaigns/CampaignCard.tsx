import React from 'react'
import Link from 'next/link'
import { Users, Calendar, Target } from 'lucide-react'

interface CampaignCardProps {
  id: string
  name: string
  category: string
  description: string
  joiners: number
  minJoiners: number
  status: 'DRAFT' | 'PENDING' | 'ACTIVE' | 'REJECTED' | 'COMPLETED' | 'VOTING'
}

export function CampaignCard({
  id,
  name,
  category,
  description,
  joiners,
  minJoiners,
  status
}: CampaignCardProps) {
  const progress = Math.min((joiners / minJoiners) * 100, 100)
  const isComplete = joiners >= minJoiners

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800'
      case 'VOTING':
        return 'bg-blue-100 text-blue-800'
      case 'COMPLETED':
        return 'bg-purple-100 text-purple-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-red-100 text-red-800'
    }
  }

  return (
    <Link href={`/campaigns/${id}`}>
      <div className="campaign-card group">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{category}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span>{joiners} joined</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Target className="w-4 h-4 mr-2" />
              <span>{minJoiners} needed</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {isComplete && (
            <div className="flex items-center text-green-600 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Ready to start voting!
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {isComplete ? 'Contest ready' : `${minJoiners - joiners} more needed`}
            </span>
            <span className="text-sm font-medium text-primary-600 group-hover:text-primary-700">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
} 