import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@votee.com' },
    update: {},
    create: {
      email: 'admin@votee.com',
      name: 'Admin User',
      password: adminPassword,
      isAdmin: true,
      phoneVerified: true,
      freeVoteCredits: 10,
      referralCode: 'ADMIN001',
    },
  })

  // Create sample users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'john@example.com' },
      update: {},
      create: {
        email: 'john@example.com',
        name: 'John Doe',
        password: await bcrypt.hash('password123', 10),
        phoneVerified: true,
        freeVoteCredits: 5,
        referralCode: 'JOHN001',
      },
    }),
    prisma.user.upsert({
      where: { email: 'jane@example.com' },
      update: {},
      create: {
        email: 'jane@example.com',
        name: 'Jane Smith',
        password: await bcrypt.hash('password123', 10),
        phoneVerified: true,
        freeVoteCredits: 3,
        referralCode: 'JANE001',
      },
    }),
    prisma.user.upsert({
      where: { email: 'bob@example.com' },
      update: {},
      create: {
        email: 'bob@example.com',
        name: 'Bob Johnson',
        password: await bcrypt.hash('password123', 10),
        phoneVerified: false,
        freeVoteCredits: 1,
        referralCode: 'BOB001',
      },
    }),
  ])

  // Create sample campaigns
  const campaigns = await Promise.all([
    prisma.campaign.upsert({
      where: { id: 'campaign-1' },
      update: {},
      create: {
        id: 'campaign-1',
        name: 'Best Singer of All Time',
        description: 'Vote for the greatest vocalist in music history. From classical to modern pop, who has the most iconic voice?',
        category: 'Music',
        minJoiners: 50,
        status: 'ACTIVE',
        createdBy: users[0].id,
        nominees: {
          create: [
            {
              name: 'Freddie Mercury',
              description: 'Queen frontman with incredible vocal range',
              image: 'https://example.com/freddie.jpg',
              prizeRecipient: 'Freddie Mercury Estate',
            },
            {
              name: 'Whitney Houston',
              description: 'The Voice with unmatched power and emotion',
              image: 'https://example.com/whitney.jpg',
              prizeRecipient: 'Whitney Houston Estate',
            },
            {
              name: 'Michael Jackson',
              description: 'King of Pop with distinctive vocal style',
              image: 'https://example.com/michael.jpg',
              prizeRecipient: 'Michael Jackson Estate',
            },
            {
              name: 'Aretha Franklin',
              description: 'Queen of Soul with gospel roots',
              image: 'https://example.com/aretha.jpg',
              prizeRecipient: 'Aretha Franklin Estate',
            },
          ],
        },
      },
    }),
    prisma.campaign.upsert({
      where: { id: 'campaign-2' },
      update: {},
      create: {
        id: 'campaign-2',
        name: 'Greatest Movie Director',
        description: 'Who is the most influential filmmaker in cinema history?',
        category: 'Film',
        minJoiners: 100,
        status: 'ACTIVE',
        createdBy: users[1].id,
        nominees: {
          create: [
            {
              name: 'Stanley Kubrick',
              description: 'Master of visual storytelling',
              image: 'https://example.com/kubrick.jpg',
            },
            {
              name: 'Alfred Hitchcock',
              description: 'Master of suspense and psychological thrillers',
              image: 'https://example.com/hitchcock.jpg',
            },
            {
              name: 'Martin Scorsese',
              description: 'Contemporary master of American cinema',
              image: 'https://example.com/scorsese.jpg',
            },
            {
              name: 'Steven Spielberg',
              description: 'Blockbuster pioneer and storyteller',
              image: 'https://example.com/spielberg.jpg',
            },
          ],
        },
      },
    }),
    prisma.campaign.upsert({
      where: { id: 'campaign-3' },
      update: {},
      create: {
        id: 'campaign-3',
        name: 'Best Tech Innovation 2024',
        description: 'Vote for the most groundbreaking technology of the year',
        category: 'Technology',
        minJoiners: 75,
        status: 'VOTING',
        createdBy: users[2].id,
        nominees: {
          create: [
            {
              name: 'ChatGPT-4',
              description: 'Advanced AI language model',
              image: 'https://example.com/chatgpt.jpg',
            },
            {
              name: 'Tesla Cybertruck',
              description: 'Revolutionary electric vehicle design',
              image: 'https://example.com/cybertruck.jpg',
            },
            {
              name: 'Apple Vision Pro',
              description: 'Spatial computing headset',
              image: 'https://example.com/visionpro.jpg',
            },
            {
              name: 'SpaceX Starship',
              description: 'Reusable rocket technology',
              image: 'https://example.com/starship.jpg',
            },
          ],
        },
      },
    }),
  ])

  // Create sample contests (for campaigns that reached minimum joiners)
  const contests = await Promise.all([
    prisma.contest.upsert({
      where: { id: 'contest-1' },
      update: {},
      create: {
        id: 'contest-1',
        campaignId: 'campaign-3', // Best Tech Innovation 2024
        name: 'Best Tech Innovation 2024',
        description: 'Vote for the most groundbreaking technology of the year',
        category: 'Technology',
        status: 'VOTING',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-31'),
      },
    }),
  ])

  // Add joiners to campaigns
  await Promise.all([
    prisma.campaignJoiner.upsert({
      where: {
        campaignId_userId: {
          campaignId: 'campaign-1',
          userId: users[0].id,
        },
      },
      update: {},
      create: {
        campaignId: 'campaign-1',
        userId: users[0].id,
      },
    }),
    prisma.campaignJoiner.upsert({
      where: {
        campaignId_userId: {
          campaignId: 'campaign-1',
          userId: users[1].id,
        },
      },
      update: {},
      create: {
        campaignId: 'campaign-1',
        userId: users[1].id,
      },
    }),
    prisma.campaignJoiner.upsert({
      where: {
        campaignId_userId: {
          campaignId: 'campaign-2',
          userId: users[2].id,
        },
      },
      update: {},
      create: {
        campaignId: 'campaign-2',
        userId: users[2].id,
      },
    }),
  ])

  // Add sample votes
  await Promise.all([
    prisma.vote.upsert({
      where: { id: 'vote-1' },
      update: {},
      create: {
        id: 'vote-1',
        contestId: 'contest-1',
        nomineeId: (await prisma.nominee.findFirst({ where: { name: 'ChatGPT-4' } }))!.id,
        userId: users[0].id,
        type: 'FREE',
        amount: 1,
      },
    }),
    prisma.vote.upsert({
      where: { id: 'vote-2' },
      update: {},
      create: {
        id: 'vote-2',
        contestId: 'contest-1',
        nomineeId: (await prisma.nominee.findFirst({ where: { name: 'Tesla Cybertruck' } }))!.id,
        userId: users[1].id,
        type: 'PAID',
        amount: 5,
        amountPaid: 5.0,
      },
    }),
    prisma.vote.upsert({
      where: { id: 'vote-3' },
      update: {},
      create: {
        id: 'vote-3',
        contestId: 'contest-1',
        nomineeId: (await prisma.nominee.findFirst({ where: { name: 'Apple Vision Pro' } }))!.id,
        userId: users[2].id,
        type: 'PAID',
        amount: 10,
        amountPaid: 10.0,
      },
    }),
  ])

  // Create sample suggestions
  await Promise.all([
    prisma.suggestion.upsert({
      where: { id: 'suggestion-1' },
      update: {},
      create: {
        id: 'suggestion-1',
        campaignId: 'campaign-1',
        userId: users[1].id,
        type: 'NOMINEE',
        content: 'Add Beyoncé to the nominees list',
        status: 'PENDING',
      },
    }),
    prisma.suggestion.upsert({
      where: { id: 'suggestion-2' },
      update: {},
      create: {
        id: 'suggestion-2',
        campaignId: 'campaign-2',
        userId: users[0].id,
        type: 'DESCRIPTION',
        content: 'Update description to include more details about each director',
        status: 'APPROVED',
      },
    }),
  ])

  console.log('✅ Database seeded successfully!')
  console.log(`👥 Created ${users.length + 1} users (including admin)`)
  console.log(`📢 Created ${campaigns.length} campaigns`)
  console.log(`🏆 Created ${contests.length} contests`)
  console.log(`🗳️ Created sample votes and suggestions`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 