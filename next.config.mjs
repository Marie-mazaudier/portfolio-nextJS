import path from "path";
import { fileURLToPath } from "url";
import BuilderDevTools from "@builder.io/dev-tools/next";
import TerserPlugin from "terser-webpack-plugin"; // Importer TerserPlugin

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = BuilderDevTools()({
  webpack(config, { isServer }) {
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

    // Ajout de TerserPlugin pour supprimer les console.log et les commentaires
    if (!isServer) {
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // Supprime tous les console.log
            },
            output: {
              comments: false, // Supprime les commentaires du code minifié
            },
          },
        }),
      ];
    }

    return config;
  },

  // Ajout de la configuration des variables d'environnement
  env: {
    BREVO_API_KEY: process.env.BREVO_API_KEY,
  },
});

export default nextConfig;
