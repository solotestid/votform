#!/bin/bash

# Votee Voting Platform Installation Script
echo "🚀 Installing Votee Voting Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version check passed: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating environment file..."
    cp env.example .env.local
    echo "⚠️  Please configure your environment variables in .env.local"
    echo "   Required services:"
    echo "   - PostgreSQL database"
    echo "   - Stripe account"
    echo "   - Twilio account (for SMS)"
    echo "   - Cloudflare account (for Turnstile)"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

# Check if database is accessible
echo "🔍 Checking database connection..."
if npm run db:push &> /dev/null; then
    echo "✅ Database connection successful"
    
    # Ask if user wants to seed the database
    read -p "🌱 Would you like to seed the database with sample data? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🌱 Seeding database..."
        npm run db:seed
    fi
else
    echo "❌ Database connection failed. Please check your DATABASE_URL in .env.local"
    echo "   You can run 'npm run db:push' manually after configuring the database."
fi

echo ""
echo "🎉 Installation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Configure your environment variables in .env.local"
echo "2. Set up your database and run: npm run db:push"
echo "3. Start the development server: npm run dev"
echo "4. Visit http://localhost:3000"
echo ""
echo "🔧 Available commands:"
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  npm run db:generate  - Generate Prisma client"
echo "  npm run db:push      - Push schema to database"
echo "  npm run db:seed      - Seed database with sample data"
echo "  npm run db:studio    - Open Prisma Studio"
echo ""
echo "📚 Documentation: README.md"
echo "🐳 Docker: docker-compose up" 