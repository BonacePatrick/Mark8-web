'use client';

import React, { useState, useEffect } from "react";
import { Product, useProductStore } from "@/store/product-stores/productsStore";
import ProductCard from "./ProductCard";
import SpinnerLoading from "../Load-indicator/Spinner";

const SavedProductsList = () => {
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const getSavedProducts = useProductStore((state) => state.savedProducts);

  useEffect(() => {
    const updateSavedProducts = () => {
      setSavedProducts(getSavedProducts);
      setIsLoading(false);
    };

    // Update saved products immediately
    updateSavedProducts();

    // Set up an interval to update the saved products periodically
    const intervalId = setInterval(updateSavedProducts, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [getSavedProducts]);

  if (isLoading) {
    return <SpinnerLoading/>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-6 md:py-14">
      {savedProducts.map((product) => (
        <ProductCard key={product.id} productId={product.id} />
      ))}
      {savedProducts.length === 0 && (
        <p className="col-span-full text-center text-gray-500">
          No saved products yet.
        </p>
      )}
    </div>
  );
};

export default SavedProductsList;