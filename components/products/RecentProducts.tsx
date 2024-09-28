'use client'

import { useEffect } from "react";
import TopStoresPage from "../shop/TopStoresPage";
import ProductGrid from "./ProductGrid";
import Image from "next/image";
import { deliveryBox, filterButton, sortButton } from "@/app/assets";
import { useProductStore } from "@/store/product-stores/productsStore";
import ProductSkeleton from "./ProductSkeleton";
import ShopSkeleton from "../shop/ShopSkeleton";

export default function RecentProductsPage() {
  const {
    totalProducts,
    isLoading,
    error,
    fetchProducts,
    loadMoreProducts,
    hasNextPage,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const productSkeletons = Array.from({ length: 18 }, (_, i) => i + 1);  // 12 is the number of products skeleton per page
  const shopSkeletons = Array.from({ length: 10 }, (_, i) => i + 1);   // 10 is the number of shops skeleton per page

  if (error) return <div>Error: {error}</div>;

  return (
    <section className="min-h-screen py-6 md:py-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center ml-4 space-x-3">
        <Image src={deliveryBox} alt="delivery-box" className="h-5 w-auto" />
        <h2 className="text-black font-black">
          Recent Products ({totalProducts})
        </h2>
        </div>
        <div className="flex items-center space-x-2 mr-4">
          <div className="w-10 h-10">
            <Image src={sortButton} alt="sort" className="w-10 h-10 hover:scale-105 transition duration-500" />
          </div>
          <div className="w-10 h-10">
            <Image src={filterButton} alt="sort" className="w-10 h-10 hover:scale-105 transition duration-500" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 py-4 md:p-4">
        {/*  Products */}
        <div className="w-full lg:w-3/4">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
              {productSkeletons.map((skeleton) => (
                <ProductSkeleton key={skeleton} />
              ))}
            </div>
          ) : (
            <ProductGrid />
          )}
          {!isLoading && hasNextPage && (
            <div className="flex justify-center mt-6 group">
              <button
                className="bg-white flex items-center transition duration-500 group-hover:scale-105 group-hover:border group-hover:border-secondary space-x-2 text-black font-black border text-sm px-2.5 md:px-4 py-1.5 md:py-2.5 rounded-lg"
                onClick={loadMoreProducts}
                disabled={!hasNextPage}
              >
                <span className="text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-down animate-bounce"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
                <span>Load More</span>
              </button>
            </div>
          )}
        </div>

        {/* Right side - Top Stores */}
        <div className="w-full lg:w-1/4">
          {isLoading ? (
            <div className="flex flex-col gap-6">
              {shopSkeletons.map((skeleton) => (
                <ShopSkeleton key={skeleton} />
              ))}
            </div>
          ) : (
            <TopStoresPage />
          )}
        </div>
      </div>
    </section>
  );
}
