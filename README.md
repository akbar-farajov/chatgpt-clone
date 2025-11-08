# ChatGPT Clone

A modern, feature-rich ChatGPT clone built with Next.js 15, Supabase, and the Vercel AI SDK. This application provides an intuitive chat interface with AI capabilities, user authentication, and conversation management.

## ✨ Features

- 🤖 **AI-Powered Chat** - Integration with OpenAI and Google AI models
- 🔐 **Authentication** - Email/password and Google OAuth sign-in
- 💬 **Conversation Management** - Create, view, and delete chat conversations
- 🎨 **Modern UI** - Beautiful, responsive interface built with Radix UI and Tailwind CSS
- 🌓 **Theme Support** - Dark and light mode toggle
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Real-time Streaming** - Smooth AI response streaming with the AI SDK
- 🧩 **AI Elements** - Code blocks, reasoning chains, artifacts, and more
- 🛠️ **Custom Tools** - Extensible tool system for AI capabilities
- 📊 **User Profiles** - Personalized user experience with profile management

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router and Turbopack
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, Lucide Icons
- **Animations**: Framer Motion
- **Themes**: next-themes for dark/light mode

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
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# AI Provider API Keys
OPENAI_API_KEY=your_openai_api_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key

# OAuth (Optional)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

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
│   ├── actions/          # Server actions for auth, chat, and profile
│   ├── app/              # Next.js app router pages
│   │   ├── (auth)/      # Authentication pages (login, signup)
│   │   ├── (chat)/      # Chat interface and conversation pages
│   │   ├── api/         # API routes
│   │   └── auth/        # OAuth callback handlers
│   ├── components/       # React components
│   │   ├── ai-elements/ # AI-specific UI components
│   │   ├── chat/        # Chat interface components
│   │   ├── sidebar/     # Sidebar and navigation
│   │   └── ui/          # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and configurations
│   │   └── supabase/    # Supabase client setup
│   ├── tools/           # Custom AI tools
│   └── middleware.ts    # Next.js middleware for auth
├── supabase/
│   ├── migrations/      # Database migrations
│   └── config.toml      # Supabase configuration
├── public/              # Static assets
└── package.json         # Project dependencies
```

## 🗄️ Database Schema

The application uses the following main tables:

- **`profiles`** - User profile information
- **`chats`** - Chat conversations
- **`messages`** - Individual messages in conversations

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
pnpm run push:db         # Push schema changes to database
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

- Code blocks with syntax highlighting
- Reasoning chains
- Artifacts
- Tool usage visualization
- Chain-of-thought display
- Image generation support
- Web preview

### User Experience

- Responsive design for all screen sizes
- Dark/light theme toggle
- Smooth animations
- Loading states
- Error handling
- Toast notifications

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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

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

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and Supabase
