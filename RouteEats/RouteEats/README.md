# 🍔 RouteEats

A food-delivery dashboard that doubles as a **Data Structures & Algorithms showcase**: restaurant browsing, cart & checkout, route optimization on a city graph, a knapsack-based delivery bag packer, order tracking, and an analytics dashboard.

Built with **React 18, Vite, Tailwind CSS, Recharts and Lucide icons**.

## Features
- Restaurant & menu browsing with search and category filters
- Cart and checkout flow
- Route optimizer over a weighted graph (priority-queue / Dijkstra-style)
- Delivery bag packing (dynamic-programming knapsack)
- Order tracking and revenue analytics
- Light / dark mode, mobile-friendly layout

## Getting Started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Optional: package as a mobile app with Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android   # and/or @capacitor/ios
npm run build
npx cap add android
npx cap sync
npx cap open android
```

## Project Structure

```
RouteEats/
├── public/            favicon
├── src/
│   ├── main.jsx       entry point
│   ├── App.jsx        the whole app
│   └── index.css      Tailwind + utilities
├── capacitor.config.json
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## License
MIT
