"use client";

import Link from "next/link";
import Image from "next/image";
import { coverImage, shoppingCartIcon } from "@/app/assets";
import { useProductStore } from "@/stores/product-stores/productsStore";
import { useCartStore } from "@/stores/cart-store/cartStore";
import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCardProps {
  productId: string | number;
}

const ProductCard: FC<ProductCardProps> = ({ productId }) => {
  const product = useProductStore((state) =>
    state.products.find((p) => p.id === productId)
  );
  const { addItem, updateQuantity, getItemQuantity, toggleCart } =
    useCartStore();
  const { saveProduct, removeSavedProduct, isSaved } = useProductStore();
  const [imageError, setImageError] = useState(false);
  const [isProductSaved, setIsProductSaved] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  useEffect(() => {
    if (product) {
      setIsProductSaved(isSaved(product.id));
    }
  }, [product, isSaved]);

  if (!product) return null;

  const productImageUrl =
    !imageError && product?.thumbnail[0]
      ? product.thumbnail[0]
      : coverImage.src;

  const quantity = getItemQuantity(productId.toString());

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity === 0) {
      addItem(
        {
          id: product.id,
          name: product.name,
          price: product.unitPrice,
        },
        1
      );
    } else {
      updateQuantity(product.id, quantity + 1);
    }
    toggleCart();
  };

  const handleDecreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleSaveProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isProductSaved) {
      removeSavedProduct(product.id);
    } else {
      saveProduct(product);
    }
    setIsProductSaved(!isProductSaved);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
  };

  return (
    <Link href={`/product/${productId}`} className="block">
      <div className="flex flex-col w-[95%] md:w-full mx-auto md:mx-0 h-full overflow-hidden hover:scale-105 duration-500 transition bg-white border border-gray-50 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
        {/* Product Image */}
        <div className="relative w-full h-60">
          <Image
            src={productImageUrl}
            alt={product.name}
            className="object-cover w-full h-full"
            fill
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            decoding="async"
            placeholder="blur"
            blurDataURL={coverImage.toString()}
            onError={() => setImageError(true)}
          />
        </div>

        <div className="p-4 md:p-5 bg-white text-black">
          {/* Product Info */}
          <div>
            <h3 className="text-sm font-semibold">{product.name}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <p className="text-sm text-secondary">{`${product.unitPrice} Rwf`}</p>
              </div>
              <div className="flex items-center justify-end space-x-3">
                {quantity > 0 ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleDecreaseQuantity}
                      className="border py-1 px-3 rounded-lg hover:border-secondary duration-500 transition hover:scale-105 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold">{quantity}</span>
                    <button
                      onClick={handleAddToCart}
                      className="border py-1 px-3 rounded-lg hover:border-secondary duration-500 transition hover:scale-105 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="border p-3 rounded-lg hover:border hover:border-secondary duration-500 transition hover:scale-105 cursor-pointer"
                  >
                    <Image
                      src={shoppingCartIcon}
                      alt="shoppingCartIcon"
                      className="h-4 w-auto"
                    />
                  </button>
                )}
                <button
                  onClick={handleSaveProduct}
                  className="relative border p-3 rounded-lg hover:border hover:border-secondary duration-500 transition hover:scale-105 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={isProductSaved ? "#c1cf16" : "none"}
                    stroke={isProductSaved ? "#c1cf16" : "currentColor"}
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <AnimatePresence>
                    {showHeart && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#c1cf16"
                          className="w-8 h-8"
                        >
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
