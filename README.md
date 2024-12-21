# Notificator

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

2. Bootstrap the project (Vercel development setup):

   ```bash
   npm run bootstrap
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Build for production:

   ```bash
   npm run build
   npm run start
   ```

5. Deploy to Vercel (Development environment):

   ```bash
   npm run deploy
   ```

6. Deploy to Vercel (Production environment):

   ```bash
   npm run deploy -- --prod
   ```

7. Clean build files and dependencies:
   ```bash
   npm run clean
   ```

## Available Scripts

- `npm run bootstrap` - Bootstrap the project (Vercel development setup)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run clean` - Clean build files and dependencies
- `npm run deploy` - Deploy to Vercel (Development environment)
- `npm run deploy -- --prod` - Deploy to Vercel (Production environment)

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
