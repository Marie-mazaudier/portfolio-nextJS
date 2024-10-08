"use client"; // Ce fichier est un Client Component

import React from "react";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";

interface ProductDetailsProps {
  imageUrl: string;
  title: string;
  description: string;
  price: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  imageUrl,
  title,
  description,
  price,
}) => {
  return (
    <div className="flex items-center pt-5 mt-20 max-sm:flex-col">
      <ProductImage imageUrl={imageUrl} />
      <ProductInfo title={title} description={description} price={price} />
    </div>
  );
};

export default ProductDetails;
