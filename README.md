# Votee - Democratic Voting Platform

A comprehensive voting platform that enables users to create campaigns, vote fairly, and discover winners in a transparent and secure environment.

## 🚀 Features

### Core Functionality
- **Campaign Creation**: Users can create voting campaigns with custom categories, nominees, and minimum joiner requirements
- **Two-Tier Voting System**: Free votes (1 per user per contest) and paid votes (unlimited, $1 per vote)
- **Anti-Abuse Protection**: SMS verification, device fingerprinting, and rate limiting
- **Transparent Results**: Real-time rankings with distance indicators, final counts revealed at the end
- **Ultra-Fast Voting**: Complete paid votes in under 5 seconds with one-tap payment integration
- **Viral Growth**: Referral system rewards users with free vote credits

### Admin Controls
- **User Management**: Block, unblock, suspend users
- **Campaign Management**: Approve, reject, delete campaigns and contests
- **Data Export**: Export voting details, user lists, and comprehensive analytics
- **Real-time Monitoring**: Track all platform activities and voting patterns

### Security Features
- **SMS Verification**: Required for first paid vote
- **Device Fingerprinting**: Prevents multiple account abuse
- **Rate Limiting**: Prevents vote manipulation
- **Cloudflare Turnstile**: Anti-bot protection for free votes

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **SMS**: Twilio
- **Anti-bot**: Cloudflare Turnstile
- **UI Components**: Radix UI, Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account
- Twilio account (for SMS verification)
- Cloudflare account (for Turnstile)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd votee
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Copy the example environment file and configure your variables:
```bash
cp env.example .env.local
```

Fill in the required environment variables:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/votee"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# Stripe
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"

# Twilio (SMS verification)
TWILIO_ACCOUNT_SID="your_twilio_account_sid"
TWILIO_AUTH_TOKEN="your_twilio_auth_token"
TWILIO_PHONE_NUMBER="+1234567890"

# Cloudflare Turnstile (Anti-bot)
CLOUDFLARE_TURNSTILE_SECRET="your_turnstile_secret_key"
CLOUDFLARE_TURNSTILE_SITE_KEY="your_turnstile_site_key"
```

### 4. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Seed database with sample data
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Usage Guide

### For Users

#### Creating a Campaign
1. Sign up/log in to your account
2. Navigate to "Create Campaign"
3. Fill in campaign details:
   - Campaign name and description
   - Category selection
   - Minimum number of joiners required
   - Add nominees (2-20 nominees)
   - Specify prize recipients (if applicable)
4. Submit for review

#### Joining a Campaign
1. Browse available campaigns
2. Click "Join Campaign" on campaigns you're interested in
3. Once minimum joiners are reached, the campaign becomes a contest

#### Voting in Contests
1. Navigate to active contests
2. Choose between free vote (1 per contest) or paid votes (unlimited)
3. For paid votes, complete SMS verification on first vote
4. Select nominee and vote amount
5. Complete payment (for paid votes)

### For Admins

#### Accessing Admin Panel
1. Log in with admin account
2. Navigate to `/admin` dashboard
3. Access comprehensive controls for:
   - User management
   - Campaign/contest management
   - Voting analytics
   - Data export

#### User Management
- View all users with detailed statistics
- Block/unblock users
- Suspend/unsuspend users
- Delete users (with confirmation)

#### Campaign Management
- Approve/reject pending campaigns
- Delete campaigns and contests
- Monitor campaign progress
- View detailed analytics

#### Data Export
- Export user lists
- Export voting data
- Export campaign statistics
- Generate comprehensive reports

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signup` - User registration
- `GET /api/auth/session` - Get current session

### Campaigns
- `GET /api/campaigns` - List campaigns
- `POST /api/campaigns` - Create campaign
- `GET /api/campaigns/[id]` - Get campaign details
- `PUT /api/campaigns/[id]` - Update campaign

### Voting
- `POST /api/votes` - Cast vote
- `GET /api/votes` - Get vote statistics
- `GET /api/votes/[contestId]` - Get contest votes

### Admin
- `GET /api/admin?type=users` - Get users
- `GET /api/admin?type=campaigns` - Get campaigns
- `GET /api/admin?type=contests` - Get contests
- `GET /api/admin?type=votes` - Get votes
- `GET /api/admin?type=stats` - Get platform stats
- `POST /api/admin` - Execute admin actions

## 🏗️ Project Structure

```
votee/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── campaigns/         # Campaign pages
│   ├── contests/          # Contest pages
│   ├── admin/             # Admin dashboard
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # UI components
│   ├── campaigns/        # Campaign components
│   ├── contests/         # Contest components
│   ├── admin/            # Admin components
│   └── providers/        # Context providers
├── lib/                  # Utility functions
├── prisma/               # Database schema
└── public/               # Static assets
```

## 🔒 Security Features

### Anti-Abuse Measures
- **SMS Verification**: Required for first paid vote
- **Device Fingerprinting**: Tracks unique devices
- **Rate Limiting**: Prevents rapid voting
- **Cloudflare Turnstile**: Anti-bot protection
- **Unique Vote Constraints**: One free vote per user per contest

### Data Protection
- **Encrypted Passwords**: bcrypt hashing
- **Secure Sessions**: JWT with secure configuration
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: Prisma ORM

## 🎨 UI/UX Features

### Modern Design
- **Responsive Design**: Works on all devices
- **Dark/Light Mode**: Theme support
- **Smooth Animations**: Framer Motion integration
- **Accessibility**: WCAG compliant

### User Experience
- **Ultra-Fast Voting**: 5-second paid vote flow
- **Real-time Updates**: Live vote counts
- **Confetti Effects**: Celebration animations
- **Progress Indicators**: Visual feedback

## 📊 Analytics & Monitoring

### Platform Statistics
- Total users, campaigns, contests, votes
- Active campaigns and contests
- User engagement metrics
- Revenue tracking

### Admin Analytics
- Detailed user activity
- Campaign performance
- Voting patterns
- Revenue analytics

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically

### Docker
```bash
# Build image
docker build -t votee .

# Run container
docker run -p 3000:3000 votee
```

### Manual Deployment
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Configure reverse proxy (nginx)
4. Set up SSL certificates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@votee.com or create an issue in the repository.

## 🔄 Version History

- **v1.0.0** - Initial release with core voting functionality
- **v1.1.0** - Added admin dashboard and analytics
- **v1.2.0** - Enhanced security and anti-abuse measures

---

Built with ❤️ for democratic voting 