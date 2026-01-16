# ☁️ KumoNote

A kawaii, cloud-themed web app that generates random positive notes. Built with React, Vite, and lots of love. 💌

## ✨ Features
- **Random Positive Notes**: Get a daily dose of "gentle", "confidence", or "wholesome" vibes.
- **Aesthetic Mode**: Toggle between a clean solid card and a dreamy glassmorphism style with floating animated stickers.
- **Story Export**: Download your note as a 1080x1920 PNG, perfect for Instagram Stories.
- **Mascot**: Improved cute cloud mascot.

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your machine.

### Installation

1.  Clone the repo (or just open this folder).
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running Locally

```bash
npm run dev
```
Open your browser to `http://localhost:5173` (or the port shown in terminal).

## 🌍 Deployment

### GitHub Pages

1.  Update `vite.config.ts` to set the base path to your repository name:
    ```ts
    export default defineConfig({
      plugins: [react()],
      base: '/KumoNote/', // Replace with your repo name
    })
    ```
2.  Build the project:
    ```bash
    npm run build
    ```
3.  Upload the contents of the `dist` folder to your GitHub repository (or use `gh-pages` package to deploy).

Enjoy the good vibes! ✨
