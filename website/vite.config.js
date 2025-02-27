import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'VScouter',
        short_name: 'VScouter',
        description: "VScouter is the ultimate FRC scouting app designed to streamline data collection, visualization, and analysis for the Reefscape season. Enhance your team's performance today!",
        theme_color: '#3A3B3E',
        icons: [
          {
            src: '192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      registerType: "autoUpdate", // Automatically updates the service worker when changes are made
      devOptions: {
        enabled: true, // Enable PWA during development for testing
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
            options: {
              cacheName: "html-cache",
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "script",
            handler: "NetworkFirst",
            options: {
              cacheName: "js-cache",
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "style",
            handler: "NetworkFirst",
            options: {
              cacheName: "css-cache",
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "NetworkFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache images for 30 days
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
