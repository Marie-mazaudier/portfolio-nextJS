"use client"; // Ce fichier est un Client Component

import React from "react";

interface ProductInfoProps {
  title: string;
  description: string;
  price: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  description,
  price,
}) => {
  return (
    <div className="box-border px-10 pt-5 w-full text-left max-sm:px-2.5 max-sm:text-center">
      <h2 className="mb-2.5 text-3xl font-[normal] text-zinc-800 max-sm:text-2xl">
        {title}
      </h2>
      <p className="mb-5 text-lg text-neutral-600 max-sm:text-base">
        {description}
      </p>
      <div className="mb-5 text-2xl font-[bold] max-sm:text-xl">{price}</div>
      <button className="px-5 py-2.5 text-lg text-white bg-black border-white cursor-pointer border-[none] max-sm:text-base">
        Buy Now
      </button>
    </div>
  );
};

export default ProductInfo;
