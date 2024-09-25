"use client"; // Ce fichier est un Client Component

import React from "react";
import BackgroundSection from "./BackgroundSection";
import ProductDetails from "./ProductDetails";

interface ProductDisplayProps {
  backgroundImageUrl: string;
  productImageUrl: string;
  productTitle: string;
  productDescription: string;
  productPrice: string;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({
  backgroundImageUrl,
  productImageUrl,
  productTitle,
  productDescription,
  productPrice,
}) => {
  return (
    <>
      <BackgroundSection imageUrl={backgroundImageUrl} />
      <ProductDetails
        imageUrl={productImageUrl}
        title={productTitle}
        description={productDescription}
        price={productPrice}
      />
    </>
  );
};

export default ProductDisplay;
