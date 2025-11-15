# Kapan Libur Lagi?

A modern web application built with Next.js, React, TypeScript, and Tailwind CSS that shows countdown to the next Indonesian national holiday and suggests optimal leave dates to maximize consecutive holidays.

## Features

- ⏰ **Countdown Timer**: Shows days and hours until the next national holiday
- 💡 **Leave Suggestions**: Intelligently suggests which days to take leave to maximize consecutive holidays
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- ⚡ **Fast**: Built with Next.js for optimal performance
- 🔒 **Type Safe**: Full TypeScript support

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles with Tailwind
├── components/
│   ├── Countdown.tsx       # Countdown component
│   └── LeaveSuggestions.tsx # Leave suggestions component
├── data/
│   └── holidays.ts         # Holiday data
├── types/
│   └── index.ts            # TypeScript type definitions
├── utils/
│   ├── dateUtils.ts        # Date utility functions
│   ├── holidayUtils.ts     # Holiday-related utilities
│   └── leaveSuggestionUtils.ts # Leave suggestion logic
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Build for Production

```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Inter Font**: Google Fonts

## License

MIT

