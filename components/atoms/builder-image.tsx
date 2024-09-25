"use client"; // Ce fichier est un Client Component

import React, { forwardRef } from "react";
import Image, { ImageProps } from "next/image";

// On détermine la base URL selon l'environnement
const baseUrl =
  process.env.NEXT_PUBLIC_API_URL === "http://localhost:1337"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_URL;

interface BuilderImageProps extends ImageProps {
  src: string;
}

const BuilderImage = forwardRef<HTMLImageElement, BuilderImageProps>(
  ({ src, width, height, alt, className, ...rest }, ref) => {
    // Fonction pour charger l'image avec la base URL correcte
    const builderLoader = ({
      src,
      width,
      quality,
    }: {
      src: string;
      width: number;
      quality?: number;
    }) => {
      // Si le chemin de l'image commence par '/', on ajoute la base URL
      const imageUrl = src.startsWith("/") ? `${baseUrl}${src}` : src;
      return `${imageUrl}?width=${width}&quality=${quality || 75}`;
    };

    return (
      <Image
        loader={() =>
          builderLoader({ src, width: width as number, quality: 75 })
        }
        src={src.startsWith("/") ? `${baseUrl}${src}` : src} // Concatène la base URL si nécessaire
        width={width}
        height={height}
        alt={alt}
        className={className}
        ref={ref} // Ajout de la prop ref ici
        {...rest}
      />
    );
  }
);

// Ajout du displayName pour éviter les warnings en mode développement
BuilderImage.displayName = "BuilderImage";

export default BuilderImage;
