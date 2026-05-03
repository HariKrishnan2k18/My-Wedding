# Wedding Evite — Next.js

This is a Next.js conversion of the [WeddingEvite](https://github.com/sarthak-1998/WeddingEvite) project originally built by Sarthak Jain.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
app/
  layout.tsx     # Root layout with metadata & font imports
  page.tsx       # Main wedding invitation page (Client Component)
  globals.css    # All styles (converted from original CSS)
public/
  assets/        # All original assets (audio, images, PDFs)
  favicon.png
```

## Changes from Original

- Converted from vanilla HTML/CSS/JS to **Next.js 14 (App Router)**
- jQuery removed — replaced with React hooks (`useEffect`, `useRef`, `useState`)
- jQuery-Sakura petal effect removed (jQuery dependency eliminated)
- Countdown timer rewritten as a React `useEffect`
- Audio playback handled via `useRef`
- All assets served from `/public` via Next.js static file serving
- Fully TypeScript

## Credits

Original project by [Sarthak Jain](https://github.com/sarthak-1998)
