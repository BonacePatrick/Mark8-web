"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart-store/cartStore";
import { useProductStore } from "@/store/product-stores/productsStore";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { coverImage } from "@/app/assets";

const CartModal = () => {
  const {
    items,
    isCartOpen,
    toggleCart,
    removeItem,
    updateQuantity,
    getTotalPrice,
  } = useCartStore();

  const { products, fetchProducts } = useProductStore();
  const [imageError, setImageError] = useState<string[]>([]);

  useEffect(() => {
    if (isCartOpen && products.length === 0) {
      fetchProducts();
    }
  }, [isCartOpen, products.length, fetchProducts]);

  const handleImageError = (id: string) => {
    setImageError((prev) => [...prev, id]);
  };

  if (!isCartOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl w-full min-h-[86vh] max-w-md relative"
      >
        <div className="p-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleCart}
                className="text-gray-500 hover:text-gray-700"
              >
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-base font-semibold">
                My Cart ({items.length})
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center py-2 px-3 space-x-2 bg-white border text-black text-sm font-black rounded-lg transition duration-500">
                <span className="text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </span>
                <span>Save Cart For Later</span>
              </button>
              <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 text-red-500">
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <p className="text-sm flex items-center space-x-3 text-gray-500 font-black bg-gray-50 mb-4 p-4 w-full">
            <span className="font-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
            </span>
            <span>By proceeding you won&apos;t be charged yet</span>
          </p>

          <div className="space-y-4 mb-6 overflow-y-auto max-h-[calc(100vh-300px)]">
            {items.map((item, index) => {
              const product = products.find((p) => p.id === item.id);
              const productImageUrl =
                !imageError.includes(item.id) && product?.thumbnail?.[0]
                  ? product.thumbnail[0]
                  : coverImage.src;

              return (
                <div
                  key={item.id}
                  className="bg-white border rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-gray-500">
                      {index + 1}.
                    </span>
                    <div className="w-12 h-12">
                      <Image
                        src={productImageUrl}
                        alt={item.name || "Product image"}
                        width={64}
                        height={64}
                        quality={90}
                        className="rounded-md object-cover h-12 w-12"
                        loading="lazy"
                        decoding="async"
                        placeholder="blur"
                        blurDataURL={coverImage.src}
                        onError={() => handleImageError(item.id)}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium whitespace-nowrap">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">{item.price} Rwf</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 ml-2 rounded-md border border-gray-300 hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-center text-sm bg-gray-100 py-2 px-4 rounded-md">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-md border border-gray-300 hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start">
                <span className="font-black text-black text-sm">Total:</span>
                <span className="font-bold text-xl">{getTotalPrice()} Rwf</span>
              </div>
              <button className="py-3 px-4 bg-[#c1cf16] hover:text-black text-white rounded-lg text-sm font-medium hover:border hover:bg-white hover:border-secondary hover:scale-105 transition duration-500">
                $ Checkout
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CartModal;
