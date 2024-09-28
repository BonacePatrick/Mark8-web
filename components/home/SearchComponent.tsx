"use client";

import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useProductStore } from '@/stores/product-stores/productsStore';
import { useShopStore } from '@/stores/shop-stores/shopStore';
import { useRouter } from 'next/navigation';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // Zustand product and store search state handlers
  const { setSearchQuery: setProductSearchQuery, clearSearchAndFetch: clearProductSearch } = useProductStore();
  const { setSearchTerm: setStoreSearchTerm, clearSearchAndFetch: clearStoreSearch, getFilteredStores } = useShopStore();

  const handleSearch = async () => {
    if (!searchTerm.trim()) return; // Prevent empty searches

    // First, attempt to search for stores
    setStoreSearchTerm(searchTerm);
    await clearStoreSearch(); // Clear and fetch filtered stores
    const filteredStores = getFilteredStores();

    if (filteredStores.length > 0) {
      // If stores match, redirect to /stores page
      router.push('/stores');
    } else {
      // No store matches, proceed to search for products
      setProductSearchQuery(searchTerm);
      await clearProductSearch(); // Clear and fetch filtered products

      // Redirect to the homepage to display product search results
      router.push('/');
    }

    // Clear the search term after search
    setSearchTerm('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-center md:justify-start gap-4 py-3 px-2 md:py-8 md:px-8 w-full">
      <label className="text-base text-black font-black">Search</label>
      <div className="flex w-full max-w-lg">
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#c1cf16] text-xl" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Search products, stores, etc..."
            className="w-full md:w-[98%] pl-10 pr-4 py-3 rounded-xl bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-[#c1cf16] text-sm text-gray-600"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-[#c1cf16] text-white px-4 py-2 rounded-xl flex items-center gap-2 transition duration-500 hover:scale-105 hover:bg-white hover:border hover:border-secondary"
        >
          <span className="text-black font-semibold">Search</span>
          <FaSearch className="text-black text-lg" />
        </button>
      </div>
    </div>
  );
};

export default SearchComponent;
