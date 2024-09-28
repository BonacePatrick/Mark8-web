'use client';

import React, { useState, useEffect } from "react";
import { useProductStore } from "@/store/product-stores/productsStore";

const ProductPageHero = () => {
  const [savedProductsCount, setSavedProductsCount] = useState<number | null>(null);
  const getSavedProductsCount = useProductStore((state) => state.getSavedProductsCount);

  useEffect(() => {
    const updateCount = () => {
      setSavedProductsCount(getSavedProductsCount());
    };

    // Update count immediately
    updateCount();

    // Set up an interval to update the count periodically
    const intervalId = setInterval(updateCount, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [getSavedProductsCount]);

  return (
    <section className="min-h-[40vh] Product-page-hero-bg flex flex-col items-center justify-center my-10">
      <h2 className="text-xl text-black font-black">Saved Products</h2>
      <span className="">
        {savedProductsCount !== null ? `${savedProductsCount} Saved` : 'Loading...'}
      </span>
    </section>
  );
};

export default ProductPageHero;