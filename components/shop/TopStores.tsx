"use client";

import Link from "next/link";
import { FC, useEffect } from "react";
import { useShopStore } from "@/store/shop-stores/shopStore"; 
import HomeStoreList from "./HomeStoreList";
import SpinnerLoading from "../Load-indicator/Spinner";

const TopStores: FC = () => {
  const searchTerm = useShopStore((state) => state.searchTerm);
  const isLoading = useShopStore((state) => state.isLoading);
  const error = useShopStore((state) => state.error);
  const setSearchTerm = useShopStore((state) => state.setSearchTerm);
  const fetchTopStores = useShopStore((state) => state.fetchTopStores);

  useEffect(() => {
    fetchTopStores();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded-2xl border shadow-lg w-full lg:w-80">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <span className="text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
              />
            </svg>
          </span>
          <h3 className="font-black text-black text-sm">Top 10 Stores</h3>
        </div>
        <Link href="/store" className="text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-external-link"
          >
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          </svg>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search a store"
          className="w-full py-2 pl-10 pr-3 text-sm rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#c1cf16]"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="absolute inset-y-0 left-3 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Store List */}
      {isLoading ? (
        <SpinnerLoading/>
      ) : error ? (
        <div className="text-center py-4 text-red-500">
          <p>Error loading stores:</p>
          <p>{error}</p>
        </div>
      ) : (
        <HomeStoreList/>
      )}
    </div>
  );
};

export default TopStores;