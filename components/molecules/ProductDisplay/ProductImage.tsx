"use client"; // Ce fichier est un Client Component

import React from "react";

interface ProductImageProps {
  imageUrl: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageUrl }) => {
  return (
    <div className="flex object-cover overflow-hidden overflow-x-hidden overflow-y-hidden justify-center items-center w-full aspect-square">
      <img
        loading="lazy"
        alt="Product"
        src={imageUrl}
        className="object-cover size-full"
      />
    </div>
  );
};

export default ProductImage;
