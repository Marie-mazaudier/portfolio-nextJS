import React, { forwardRef } from "react";
import Image, { ImageProps } from "next/image";

interface BuilderImageProps extends ImageProps {
  src: string;
}

const BuilderImage = forwardRef<HTMLImageElement, BuilderImageProps>(
  ({ src, width, height, alt, className, ...rest }, ref) => {
    const builderLoader = ({
      src,
      width,
      quality,
    }: {
      src: string;
      width: number;
      quality?: number;
    }) => {
      return `${src}?width=${width}&quality=${quality || 75}`;
    };

    return (
      <Image
        loader={() =>
          builderLoader({ src, width: width as number, quality: 75 })
        }
        src={src}
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
