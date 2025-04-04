import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: [
				"favicon.svg",
				"robots.txt",
				"apple-touch-icon.png",
				"favicon.ico",
				"site.webmanifest",
				"browserconfig.xml",
				"favicon-16x16.png",
				"favicon-32x32.png",
				"favicon-96x96",
			],
			devOptions: {
				enabled: true,
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
