"use client";

import React, { useEffect } from "react";
import { useShopStore } from "@/store/shop-stores/shopStore";
import ShopItem from "./shopItem";
import SpinnerLoading from "../Load-indicator/Spinner";

const ShopStoreLists: React.FC = () => {
  const {
    isLoading,
    hasMore,
    error,
    fetchTopStores,
    loadMoreStores,
    getFilteredStores,
  } = useShopStore();

  useEffect(() => {
    fetchTopStores();
  }, []);

  const filteredStores = getFilteredStores();

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      loadMoreStores();
    }
  };

  return (
    <section className="min-h-screen py-14">
      <div className="flex flex-col space-y-3">
        {filteredStores.map((store) => (
          <ShopItem key={store.id} shop={store} />
        ))}
        {isLoading && <SpinnerLoading/>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {!isLoading && hasMore && (
          <div className="flex justify-center mt-6 group">
            <button
              className="bg-white flex items-center transition duration-500 group-hover:scale-105 group-hover:border group-hover:border-secondary space-x-2 text-black font-black border text-sm px-2.5 md:px-4 py-1.5 md:py-2.5 rounded-lg"
              onClick={handleLoadMore}
              disabled={!hasMore}
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
        {!isLoading && !hasMore && filteredStores.length > 0 && (
          <div className="text-center">No more stores to load</div>
        )}
        {!isLoading && filteredStores.length === 0 && (
          <div className="text-center">No stores found</div>
        )}
      </div>
    </section>
  );
};

export default ShopStoreLists;
