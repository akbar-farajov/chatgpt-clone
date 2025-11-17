# ChatGPT Clone

A modern, feature-rich ChatGPT clone built with Next.js 16, React 19, Supabase, and the Vercel AI SDK. This application provides an intuitive chat interface with advanced AI capabilities, comprehensive user authentication, conversation management, and detailed usage tracking.

> **Note**: This is a full-stack application featuring 30+ AI-specific UI components, real-time streaming, token usage tracking, and a beautiful responsive design built with Radix UI and Tailwind CSS 4.

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Database Schema](#️-database-schema)
- [Available Scripts](#-available-scripts)
- [Features in Detail](#-features-in-detail)
- [Deployment](#-deployment)
- [Security Best Practices](#-security-best-practices)
- [Performance Optimizations](#-performance-optimizations)
- [Key Configuration](#-key-configuration)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Roadmap](#️-roadmap)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

## ✨ Features

- 🤖 **AI-Powered Chat** - Integration with OpenAI and Google AI models
- 🔐 **Authentication** - Email/password and Google OAuth sign-in
- 💬 **Conversation Management** - Create, view, and delete chat conversations
- 🎨 **Modern UI** - Beautiful, responsive interface built with Radix UI and Tailwind CSS
- 🌓 **Theme Support** - Dark and light mode toggle
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Real-time Streaming** - Smooth AI response streaming with the AI SDK
- 🧩 **AI Elements** - Code blocks, reasoning chains, artifacts, and more
- 🛠️ **Custom Tools** - Extensible tool system for AI capabilities (weather, image generation)
- 📊 **User Profiles** - Personalized user experience with profile management
- 📈 **Usage Tracking** - Monitor token consumption with daily usage statistics
- 🎯 **Token Limits** - Daily token limits (3000 tokens) with detailed tracking

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 16 with App Router and Turbopack
- **UI Library**: React 19.2
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, Lucide Icons
- **Animations**: Motion (Framer Motion)
- **Themes**: next-themes for dark/light mode
- **State Management**: Zustand, SWR for data fetching

### Backend

- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with OAuth
- **API**: Next.js API Routes

### AI & Tools

- **AI SDK**: Vercel AI SDK (@ai-sdk/react)
- **AI Providers**: OpenAI, Google Generative AI
- **Code Highlighting**: Shiki
- **Markdown**: streamdown

### Development

- **Language**: TypeScript
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Code Quality**: TypeScript strict mode

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher
- **pnpm** (recommended) or npm
- **Supabase CLI** (for local development)
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd chatgpt-clone
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
# Get these from your Supabase project settings
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# AI Provider API Keys
# OpenAI API Key - Get from https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key

# Google AI API Key - Get from https://ai.google.dev/
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key

# Application URL (Required for OAuth)
# For local development, use http://localhost:3000
# For production, use your actual domain
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Important Notes:**
- At least one AI provider API key (OpenAI or Google AI) is required
- `SUPABASE_SERVICE_ROLE_KEY` should NEVER be exposed to the client
- Update `NEXT_PUBLIC_SITE_URL` in production to match your deployed URL
- For Google OAuth, configure redirect URLs in Supabase Auth settings

### 4. Set Up Supabase

#### Option A: Local Development

1. Initialize Supabase locally:

```bash
npx supabase init
npx supabase start
```

2. Run migrations:

```bash
npx supabase db reset
```

3. Generate TypeScript types:

```bash
pnpm run generate:types
```

#### Option B: Supabase Cloud

1. Create a new project at [supabase.com](https://supabase.com)
2. Run migrations from the `supabase/migrations` folder
3. Copy your project URL and keys to `.env.local`

### 5. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
chatgpt-clone/
├── src/
│   ├── actions/          # Server actions
│   │   ├── auth.ts      # Authentication actions
│   │   ├── chat.ts      # Chat management actions
│   │   ├── profile.ts   # User profile actions
│   │   └── usage.ts     # Token usage tracking actions
│   ├── app/              # Next.js app router pages
│   │   ├── (auth)/      # Authentication route group
│   │   │   ├── login/   # Login page
│   │   │   └── signup/  # Sign up page
│   │   ├── (dashboard)/ # Protected dashboard route group
│   │   │   ├── (chat)/  # Chat interface pages
│   │   │   │   └── chat/[chatId]/ # Individual chat page
│   │   │   ├── usage/   # Token usage statistics page
│   │   │   └── layout.tsx
│   │   ├── api/         # API routes
│   │   │   ├── chat/    # Chat streaming endpoint
│   │   │   └── chats/   # Chat CRUD operations
│   │   └── auth/        # OAuth callback handlers
│   ├── components/       # React components
│   │   ├── ai-elements/ # AI-specific UI components (30+ components)
│   │   ├── sidebar/     # Sidebar and navigation components
│   │   ├── ui/          # Reusable UI components (Radix-based)
│   │   └── theme-provider.tsx
│   ├── hooks/           # Custom React hooks
│   │   ├── use-chats.ts # SWR hook for chat management
│   │   └── use-mobile.ts # Mobile detection hook
│   ├── lib/             # Utility functions and configurations
│   │   ├── supabase/    # Supabase client setup
│   │   ├── constants.ts # App constants (token limits, etc.)
│   │   ├── prompts.ts   # AI system prompts
│   │   ├── types.ts     # TypeScript type definitions
│   │   └── utils.ts     # Utility functions
│   └── tools/           # Custom AI tools
│       ├── generate-image.ts # Image generation tool
│       ├── get-weather.ts    # Weather information tool
│       └── index.ts
├── supabase/
│   ├── migrations/      # Database migrations (4 migrations)
│   ├── config.toml      # Supabase configuration
│   └── seed.sql         # Database seed data
├── public/              # Static assets
│   ├── icons/          # SVG icons (Google, logo)
│   └── images/         # Image assets
├── components.json      # shadcn/ui configuration
├── tsconfig.json        # TypeScript configuration
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── package.json         # Project dependencies
```

## 🗄️ Database Schema

The application uses the following main tables:

- **`profiles`** - User profile information with daily token tracking
- **`chats`** - Chat conversations with metadata
- **`messages`** - Individual messages in conversations
- **`usage`** - Token usage tracking per chat and user with detailed metrics

### Database Features

- Row Level Security (RLS) enabled on all tables
- Automatic timestamps with triggers
- Foreign key relationships with cascade deletes
- Indexes for optimized query performance
- Generated columns for computed values (e.g., total_tokens)

Run migrations to set up the database schema:

```bash
pnpm run reset:db
```

## 🔧 Available Scripts

```bash
# Development
pnpm dev              # Start development server with Turbopack

# Build & Production
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm run generate:types  # Generate TypeScript types from Supabase
pnpm run reset:db        # Reset local database
pnpm run push:db         # Push schema changes to remote database
pnpm run push:db-local   # Push schema changes to local database
```

## 🎨 Features in Detail

### Authentication

- Email/password authentication
- Google OAuth integration
- Protected routes with middleware
- Session management with Supabase

### Chat Interface

- Real-time message streaming
- Syntax-highlighted code blocks
- Markdown support
- Message history
- Conversation sidebar
- New chat creation
- Chat deletion

### AI Elements

The application includes 30+ specialized AI UI components for rich interactions:

- **Code Block** - Syntax highlighting with Shiki, copy functionality
- **Reasoning** - Display AI reasoning and chain-of-thought processes
- **Artifacts** - Standalone content generated by AI (documents, code)
- **Tool Usage** - Visual feedback for tool calls and results
- **Chain-of-Thought** - Step-by-step thinking visualization
- **Image Generation** - AI-powered image creation and display
- **Web Preview** - Embedded web content preview
- **Sources** - Citation and source tracking for AI responses
- **Suggestions** - Contextual follow-up suggestions
- **Canvas** - Visual flow diagram for complex reasoning
- **Nodes & Edges** - Interactive graph visualization with xyflow/react
- **Queue Management** - Async task queue visualization
- **Context Display** - Show active context and memory

### Usage Tracking & Management

- Real-time token consumption tracking
- Daily token usage statistics
- Per-chat usage breakdown
- Input, output, reasoning, and cached token metrics
- Daily token limits (3000 tokens default)
- Usage history with detailed model information
- Automatic daily reset of token counters

### User Experience

- Responsive design for all screen sizes
- Dark/light theme toggle
- Smooth animations
- Loading states and skeletons
- Error handling with helpful messages
- Toast notifications
- Collapsible sidebar for better screen space

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository to [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Environment Variables for Production

Make sure to set all required environment variables in your deployment platform:

- Supabase URL and keys
- AI provider API keys
- Site URL for OAuth redirects

## 🔒 Security Best Practices

- Never commit `.env.local` to version control
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret and server-side only
- Use Row Level Security (RLS) policies in Supabase
- Implement rate limiting for API routes
- Validate all user inputs
- Use HTTPS in production
- Regularly update dependencies

## ⚡ Performance Optimizations

- **Server Components** - Leveraging React Server Components for better performance
- **Turbopack** - Using Turbopack for faster development builds
- **SWR** - Smart data fetching with automatic caching and revalidation
- **Code Splitting** - Automatic code splitting with Next.js
- **Image Optimization** - Next.js automatic image optimization
- **Streaming Responses** - Real-time AI response streaming for better UX
- **Database Indexes** - Optimized database queries with proper indexing
- **Lazy Loading** - Components loaded on demand

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Add comments for complex logic

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend and authentication
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI integration
- [Radix UI](https://www.radix-ui.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [OpenAI](https://openai.com/) - AI models
- [Google AI](https://ai.google.dev/) - AI models

## 🔑 Key Configuration

### Token Limits

You can modify the daily token limit in `src/lib/constants.ts`:

```typescript
export const DAILY_TOKEN_LIMIT = 3000; // Adjust as needed
```

### AI Models

The application supports multiple AI models. Configure your preferred models in the chat interface or API routes.

### Custom Tools

Add custom AI tools in the `src/tools/` directory. Each tool should export:
- Tool definition with schema
- Execute function
- Proper error handling

Example tools included:
- **Weather Tool** - Get current weather information
- **Image Generation** - Generate images with AI

## 🐛 Troubleshooting

### Common Issues

**Database Connection Issues**
- Ensure Supabase is running: `npx supabase status`
- Check `.env.local` file has correct credentials
- Verify migrations are applied: `pnpm run reset:db`

**Authentication Errors**
- Verify `NEXT_PUBLIC_SITE_URL` matches your development URL
- Check Supabase Auth settings for OAuth providers
- Ensure callback URLs are configured correctly

**Token Limit Reached**
- Check usage page at `/usage` to monitor consumption
- Wait for daily reset (midnight UTC)
- Adjust `DAILY_TOKEN_LIMIT` if needed

**Build Errors**
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `pnpm install`
- Check TypeScript types: `pnpm run generate:types`

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

## 🗺️ Roadmap

- [ ] Multi-model selection UI
- [ ] Conversation export (PDF, Markdown)
- [ ] Voice input support
- [ ] Plugin system for custom tools
- [ ] Team collaboration features
- [ ] Advanced analytics dashboard
- [ ] Fine-tuning support

---

Built with ❤️ using Next.js and Supabase
