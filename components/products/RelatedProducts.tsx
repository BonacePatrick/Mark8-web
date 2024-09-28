"use client";

import { useEffect } from "react";
import { useProductStore } from "@/store/product-stores/productsStore"; 
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  categoryId,
  currentProductId,
}) => {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [categoryId, fetchProducts]);

  const relatedProducts = products
    .filter((product) => product.id !== currentProductId)
    .slice(0, 4);

  return (
    <>
      <h2 className="text-black font-black my-2 mx-2 md:mx-0 text-xl">
        You might also like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-16">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} productId={product.id} />
        ))}
      </div>
    </>
  );
};

export default RelatedProducts;
