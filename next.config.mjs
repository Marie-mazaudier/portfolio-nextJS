import path from "path";
import { fileURLToPath } from "url";
import BuilderDevTools from "@builder.io/dev-tools/next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = BuilderDevTools()({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    });

    // Configurer l'alias @ pour pointer vers le dossier app
    config.resolve.alias["@"] = path.resolve(__dirname, "./app");

    return config;
  },

  // Ajout de la configuration des variables d'environnement
  env: {
    BREVO_API_KEY: process.env.BREVO_API_KEY,
  },
});

export default nextConfig;
