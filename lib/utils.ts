import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export function calculateDistanceToNext(currentVotes: number, nextVotes: number): 'close' | 'far' | 'equal' {
  if (currentVotes === 0 && nextVotes === 0) return 'equal'
  if (currentVotes === 0 || nextVotes === 0) return 'far'
  
  const difference = Math.abs(currentVotes - nextVotes)
  const percentage = (difference / Math.max(currentVotes, nextVotes)) * 100
  
  if (percentage <= 1) return 'equal'
  if (percentage <= 15) return 'close'
  return 'far'
} 