# 🎮 Avafun

A fun web-based arcade where every game costs coins to play, and you can earn more coins the longer you play! Built with Next.js, React, and TypeScript.

![Avafun Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black) ![React](https://img.shields.io/badge/React-19.1.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 🚀 Live Demo

**🔗 [Play Avafun Now](https://avafun.vercel.app)**

## 🎯 Features

- **12 Unique Games**: From classic Snake to modern Password challenges
- **Coin Economy**: Earn coins by playing games and spend them to unlock new experiences
- **No Registration**: Play instantly without creating accounts
- **Local Storage**: Your progress is saved locally on your device
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes for comfortable gaming

## 🎮 Available Games

| Game                           | Price | Description                                            |
| ------------------------------ | ----- | ------------------------------------------------------ |
| 🐦 **Flappy Bird**             | 20 🪙 | Navigate through pipes and aim for the highest score   |
| 💰 **Spend Bill Gates' Money** | 25 🪙 | Experience what it's like to spend billions            |
| ✅ **Life Checklist**          | 40 🪙 | Complete life milestones and earn points               |
| ⚡ **Reaction Time**           | 15 🪙 | Test your reflexes and earn coins based on speed       |
| 📊 **Progress**                | 30 🪙 | Visualize time progress and upcoming events            |
| 🐍 **Snake Game**              | 15 🪙 | Classic snake gameplay with modern controls            |
| 🔢 **2048**                    | 20 🪙 | Combine numbered tiles to reach 2048                   |
| 🔐 **Password Game**           | 30 🪙 | Solve increasingly complex password rules              |
| 🎰 **Spin the Wheel**          | 25 🪙 | Test your luck and win (or lose) coins                 |
| 🧠 **Memory Match**            | 35 🪙 | Flip cards and match pairs with minimal moves          |
| 🛒 **Sell Sell Sell**          | 40 🪙 | Explore the world of consumer capitalism               |
| 🌌 **Speed**                   | 30 🪙 | Discover how fast you're actually moving through space |

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Context + Redux Toolkit
- **UI Components**: Radix UI + Custom Components
- **Icons**: Lucide React + Font Awesome
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/avalynndev/avafun.git
   cd avafun
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
avafun/
├── app/                    # Next.js App Router pages
│   ├── (game)/            # Game pages with session validation
│   ├── privacy/           # Privacy policy page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── sections/         # Page sections
│   └── (game-specific)/  # Game-specific components
├── data/                 # Static data files
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── redux/                # Redux store and slices
├── rules/                # Password game rule definitions
├── styles/               # Global CSS
└── types/                # TypeScript type definitions
```

## 🎨 Key Features Implementation

### Coin System

- **Local Storage**: Coins are stored in browser's localStorage
- **Session Validation**: Games require valid session keys to prevent cheating
- **Dynamic Pricing**: Different games cost different amounts
- **Earning Mechanics**: Each game has unique coin earning systems

### Game Architecture

- **Session Management**: Each game session is validated with unique keys
- **Progress Tracking**: High scores and progress saved locally
- **Responsive Design**: All games work on mobile and desktop
- **Accessibility**: Keyboard navigation and screen reader support

### Performance Optimizations

- **Code Splitting**: Games are loaded on demand
- **Image Optimization**: Next.js Image component for optimal loading
- **Bundle Optimization**: Tree shaking and dead code elimination
- **Caching**: Efficient caching strategies for static assets

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test your changes thoroughly
- Ensure responsive design

## 📜 Credits & Acknowledgments

- **Inspiration**: Some game concepts were inspired by [neal.fun](https://neal.fun) - an amazing collection of interactive experiences
- **2048 Game Logic**: The 2048 game implementation was adapted from public repositories and tutorials available online
- **Icons**: Lucide React, Font Awesome, and Radix UI icons
- **Hosting**: Deployed on Vercel

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Bug Reports

Found a bug? Please create an issue with:

- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Browser and device information

## 💡 Feature Requests

Have an idea for a new game or feature? We'd love to hear it! Create an issue with the "enhancement" label.

## 📞 Contact

- **GitHub**: [@avalynndev](https://github.com/avalynndev)
- **Twitter**: [@avalynndev](https://x.com/avalynndev)
- **Project**: [avalynndev/avafun](https://github.com/avalynndev/avafun)

---

**🎮 Made with ❤️ by avalynndev**

_Enjoy your games and may the coins be ever in your favor!_ 🪙
