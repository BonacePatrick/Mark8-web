'use client';

import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import { filterVector } from '@/app/assets';
import { useProductStore } from '@/stores/product-stores/productsStore';

const Hero: FC = () => {
  const { 
    totalProducts, 
    setSearchQuery, 
    setCategory, 
    fetchProducts, 
    resetProducts, 
    clearSearchAndFetch,
    searchQuery
  } = useProductStore();
  const [searchInput, setSearchInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  const handleSearch = () => {
    setSearchQuery(searchInput);
    resetProducts();
    fetchProducts();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFilter = (category: string) => {
    if (category.toLowerCase() === 'all') {
      clearSearchAndFetch();
    } else {
      setCategory(category.toLowerCase());
      resetProducts();
      fetchProducts();
    }
  };

  return (
    <section className="flex flex-col items-center justify-center mx-2 md:mx-6 rounded-xl px-4 py-16 mt-6 text-center bg-gray-900 space-y-6 md:py-24 lg:py-32">
      {/* Title */}
      <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
        Welcome to <span className="text-[#c1cf16]">Mark8</span>
      </h1>

      {/* Subtitle */}
      <p className="text-sm text-gray-400 md:text-base lg:text-lg">
        {totalProducts.toLocaleString()} Products
      </p>

      {/* Search Box */}
      <div className="relative w-full max-w-md mt-8">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          {/* Search Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#c1cf16]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
          </svg>
        </div>

        <input
          type="text"
          placeholder="What are you looking for?"
          className="w-full pl-10 pr-10 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c1cf16]"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {/* Filter Icon */}
          <Image
            src={filterVector}
            alt='filter-vector'
            className='w-5 h-5 cursor-pointer'
            onClick={() => setShowFilters(!showFilters)}
          />
        </div>
      </div>

      {/* Category Buttons */}
      <div className="flex items-center space-x-2 mt-6">
        {['All', 'Vectors', 'Icons', 'Backgrounds'].map((category) => (
          <button
            key={category}
            onClick={() => handleFilter(category)}
            className="px-3 md:px-6 py-2.5 rounded-2xl text-sm font-medium text-gray-300 bg-gray-800 duration-500 transition hover:bg-gray-700"
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Hero;