# Modern Next.js App

A modern web application built with Next.js 14 and Radix UI.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Radix UI
- Tailwind CSS

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   npm run start
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run clean` - Clean build files and dependencies

## Project Structure

```text
.
├── app/
│ ├── layout.tsx # Root layout with Radix UI Theme
│ ├── page.tsx # Home page component
│ └── globals.css # Global styles
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

This structure provides a clean and modular layout for your Next.js application.
