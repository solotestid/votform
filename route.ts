import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const voteSchema = z.object({
  contestId: z.string(),
  nomineeId: z.string(),
  type: z.enum(['FREE', 'PAID']),
  amount: z.number().min(1).max(100),
  amountPaid: z.number().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = voteSchema.parse(body)

    // Check if user is blocked or suspended
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user || user.isBlocked || user.isSuspended) {
      return NextResponse.json({ error: 'Account not eligible' }, { status: 403 })
    }

    // Check if contest exists and is active
    const contest = await prisma.contest.findUnique({
      where: { id: validatedData.contestId },
      include: { nominees: true }
    })

    if (!contest || contest.status !== 'VOTING') {
      return NextResponse.json({ error: 'Contest not available for voting' }, { status: 400 })
    }

    // Check if nominee exists in this contest
    const nominee = contest.nominees.find(n => n.id === validatedData.nomineeId)
    if (!nominee) {
      return NextResponse.json({ error: 'Invalid nominee' }, { status: 400 })
    }

    // Check if voting period is active
    const now = new Date()
    if (now < contest.startDate || now > contest.endDate) {
      return NextResponse.json({ error: 'Voting period not active' }, { status: 400 })
    }

    // Handle different vote types
    if (validatedData.type === 'FREE') {
      // Check if user already has a free vote for this contest
      const existingFreeVote = await prisma.vote.findFirst({
        where: {
          contestId: validatedData.contestId,
          userId: session.user.id,
          type: 'FREE'
        }
      })

      if (existingFreeVote) {
        return NextResponse.json({ error: 'Free vote already used' }, { status: 400 })
      }

      // Check if user has free vote credits
      if (user.freeVoteCredits < 1) {
        return NextResponse.json({ error: 'No free vote credits available' }, { status: 400 })
      }

      // Create free vote
      const vote = await prisma.vote.create({
        data: {
          contestId: validatedData.contestId,
          nomineeId: validatedData.nomineeId,
          userId: session.user.id,
          type: 'FREE',
          amount: 1,
        }
      })

      // Deduct free vote credit
      await prisma.user.update({
        where: { id: session.user.id },
        data: { freeVoteCredits: { decrement: 1 } }
      })

      return NextResponse.json(vote)
    } else {
      // PAID vote
      // Check if user has SMS verification for first paid vote
      if (!user.phoneVerified) {
        return NextResponse.json({ error: 'SMS verification required for paid votes' }, { status: 400 })
      }

      // Check if amount is valid for paid vote
      if (validatedData.amount < 1 || validatedData.amount > 100) {
        return NextResponse.json({ error: 'Invalid vote amount' }, { status: 400 })
      }

      // Remove any existing free vote for this contest
      await prisma.vote.deleteMany({
        where: {
          contestId: validatedData.contestId,
          userId: session.user.id,
          type: 'FREE'
        }
      })

      // Create paid vote
      const vote = await prisma.vote.create({
        data: {
          contestId: validatedData.contestId,
          nomineeId: validatedData.nomineeId,
          userId: session.user.id,
          type: 'PAID',
          amount: validatedData.amount,
          amountPaid: validatedData.amountPaid || validatedData.amount,
        }
      })

      return NextResponse.json(vote)
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 })
    }
    
    console.error('Vote creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const contestId = searchParams.get('contestId')
    const nomineeId = searchParams.get('nomineeId')

    if (!contestId) {
      return NextResponse.json({ error: 'Contest ID required' }, { status: 400 })
    }

    const where: any = { contestId }
    if (nomineeId) {
      where.nomineeId = nomineeId
    }

    const votes = await prisma.vote.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        },
        nominee: {
          select: {
            name: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Calculate vote statistics
    const voteStats = await prisma.vote.groupBy({
      by: ['nomineeId', 'type'],
      where: { contestId },
      _sum: {
        amount: true
      }
    })

    return NextResponse.json({
      votes,
      stats: voteStats
    })
  } catch (error) {
    console.error('Vote fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 