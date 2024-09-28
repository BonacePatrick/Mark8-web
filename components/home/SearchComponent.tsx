"use client";

import { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { useProductStore } from '@/stores/product-stores/productsStore';
import { useShopStore } from '@/stores/shop-stores/shopStore';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/utils/useDebounce';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const router = useRouter();

  const { 
    searchProduct,
    resetProducts
  } = useProductStore();

  const { 
    searchStore,
    resetStores
  } = useShopStore();

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch();
    } else {
      resetProducts();
      resetStores();
    }
  }, [debouncedSearchTerm]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    // Search for products
    const productResults = await searchProduct(searchTerm);

    // Search for stores
    const storeResults = await searchStore(searchTerm);

    if (productResults.length > 0) {
      router.push(`/?search=${encodeURIComponent(searchTerm)}`);
    } else if (storeResults.length > 0) {
      router.push(`/stores?search=${encodeURIComponent(searchTerm)}`);
    } else {
      // No results found
      router.push(`/no-results?search=${encodeURIComponent(searchTerm)}`);
    }
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