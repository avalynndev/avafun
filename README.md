<center> <h1><a href="https://avafun.vercel.app/"> Avafun</a> </h1></center>

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,nextjs,tailwind,ts" />
  <br/>
  <a href=""><kbd>⚫️ shadcn-ui</kbd></a>
</p>
<br/><br/>

# ⚡What is Avafun?

A web-based arcade where every game costs coins to play. The longer you play, the more coins you earn to unlock new games. Built with Next.js, React, and TypeScript.

Here is the [video](https://www.youtube.com/watch?v=nT9bRKZK0QU) showcasing the abilities of this wonderful website.

# 🔥Features

- 12 Unique Games: From classic Snake to modern Password challenges
- Coin Economy: Earn coins by playing games and spend them to unlock new experiences
- No Registration: Play instantly without creating accounts
- Local Storage: Your progress is saved locally on your device
- Responsive Design: Works perfectly on desktop, tablet, and mobile
- Dark/Light Theme: Toggle between themes for comfortable gaming

## Available Games

| Game | Price | Description |
|------|-------|-------------|
| **Flappy Bird** | 20 coins | Navigate through pipes and aim for the highest score |
| **Spend Bill Gates' Money** | 25 coins | Experience what it's like to spend billions |
| **Life Checklist** | 40 coins | Complete life milestones and earn points |
| **Reaction Time** | 15 coins | Test your reflexes and earn coins based on speed |
| **Progress** | 30 coins | Visualize time progress and upcoming events |
| **Snake Game** | 15 coins | Classic snake gameplay with modern controls |
| **2048** | 20 coins | Combine numbered tiles to reach 2048 |
| **Password Game** | 30 coins | Solve increasingly complex password rules |
| **Spin the Wheel** | 25 coins | Test your luck and win (or lose) coins |
| **Memory Match** | 35 coins | Flip cards and match pairs with minimal moves |
| **Sell Sell Sell** | 40 coins | Explore the world of consumer capitalism |
| **Speed** | 30 coins | How fast you're actually moving through space |

# 🧬 Self Hosting Guide

### Prerequisites

- Node.js 20 or later
- npm or bun package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/avalynndev/avafun.git
cd avafun
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

By following these steps, you can host the Avafun web app on your own server and make it accessible to users.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Favalynndev%2Favafun)

## Project Structure

```
avafun/
├── app/                   # App Router and game pages
│   ├── 2048/
│   ├── flappy-bird/
│   ├── life-checklist/
│   ├── memory-match/
│   ├── password-game/
│   ├── progress/
│   ├── reaction-time/
│   ├── sell-sell-sell/
│   ├── snake-game/
│   ├── speed/
│   ├── spend/
│   ├── spin-the-wheel/
│   ├── privacy/
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── favicon.ico
│   ├── apple-icon.png
│   ├── icon0.svg
│   ├── icon1.png
│   └── manifest.json
├── components/            # React components
│   ├── 2048/
│   ├── password/
│   ├── sections/
│   ├── spend/
│   ├── ui/
│   ├── coin-context.tsx
│   ├── coin-display.tsx
│   ├── coin-drop.tsx
│   ├── memory-game.tsx
│   ├── mode-toggle.tsx
│   ├── store-provider.tsx
│   ├── tailwind-indicator.tsx
│   └── theme-provider.tsx
├── config/
│   └── site.ts
├── data/
│   ├── games.ts
│   └── products.json
├── fonts/
│   ├── GeistMonoVF.woff
│   └── GeistVF.woff
├── hooks/
│   ├── spend.ts
│   └── use-game.ts
├── lib/
│   ├── fonts.ts
│   └── utils.ts
├── redux/
│   ├── productSlicer.ts
│   └── store.ts
├── rules/                 # Password Game rules and helpers
│   ├── earthquake.tsx
│   ├── location.tsx
│   ├── qrcode.tsx
│   ├── riddle.tsx
│   ├── rule.ts
│   ├── rules.ts
│   ├── slidingpuzzle.tsx
│   ├── sum.tsx
│   ├── time-emoji.tsx
│   ├── utils.ts
│   ├── wordle.tsx
│   └── words.ts
├── styles/
│   └── globals.css
├── types/
│   └── 2048.ts
├── util/
│   ├── date.ts
│   └── height.ts
├── public/                # Static assets
│   ├── 2048/
│   ├── games/
│   ├── memory-cards/
│   ├── sell-sell-sell/
│   ├── speed/
│   ├── spend/
│   ├── logo.svg
│   ├── web-app-manifest-192x192.png
│   └── web-app-manifest-512x512.png
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── components.json
├── package.json
└── README.md
```

## 📝 Notes and Credits

- AI has been very minutely used. Only for fixing bugs
- This project has lot of inspiration from neal.fun, none of the code is copied from neal.fun though. Except the images.
- 2048 game logic has been copied from a github repo.
- This project was made for the theme "COINS" for Siege Week 5.

---

**Made with ❤️ for Keerthi**