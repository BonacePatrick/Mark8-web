"use client";

import { FC, useState, useEffect } from "react";
import { Minus, Plus, Heart } from "lucide-react";
import { useCartStore } from "@/store/cart-store/cartStore";
import { useProductStore } from "@/store/product-stores/productsStore";
import { fetchStores } from "@/services/api-client";
import Image from "next/image";
import { useShopStore } from "@/store/shop-stores/shopStore";
import SpinnerLoading from "../Load-indicator/Spinner";
import { AnimatePresence, motion } from "framer-motion";

interface ProductInfoProps {
  productId: string;
}

interface Store {
  id: string;
  name: string;
  image: string;
}

const ProductInfo: FC<ProductInfoProps> = ({ productId }) => {
  const [error, setError] = useState<string | null>(null);
  const [storeInfo, setStoreInfo] = useState<Store | null>(null);
  const storeData = useShopStore((state) => state.currentStore);
  const { addItem, updateQuantity, getItemQuantity, toggleCart } =
    useCartStore();
  const {
    currentProduct,
    fetchProductById,
    saveProduct,
    removeSavedProduct,
    isSaved,
  } = useProductStore();
  const product = useProductStore((state) =>
    state.products.find((p) => p.id === productId)
  );
  const [isProductSaved, setIsProductSaved] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  const quantity = getItemQuantity(productId);

  useEffect(() => {
    if (product) {
      setIsProductSaved(isSaved(product.id));
    }
  }, [product, isSaved]);

  const handleSaveProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product && isProductSaved) {
      removeSavedProduct(product.id);
    } else if (product) {
      saveProduct(product);
    }
    setIsProductSaved(!isProductSaved);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
  };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        await fetchProductById(productId);
        setError(null);
      } catch (err) {
        setError("Failed to load product details. Please try again later.");
      }
    };
    loadProduct();
  }, [productId, fetchProductById]);

  useEffect(() => {
    const loadStoreInfo = async () => {
      if (currentProduct?.store?.id) {
        try {
          const response = await fetchStores();
          const store = response.data.stores.find(
            (s: Store) => s.id === currentProduct.store.id
          );
          if (store) {
            setStoreInfo({
              id: store.id,
              name: store.name,
              image: store.image,
            });
          }
        } catch (err) {
          console.error("Failed to load store info:", err);
        }
      }
    };
    loadStoreInfo();
  }, [currentProduct]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!currentProduct) {
    return <SpinnerLoading />;
  }

  const averageRating =
    currentProduct.reviews.length > 0
      ? currentProduct.reviews.reduce((sum, review) => sum + review.rating, 0) /
        currentProduct.reviews.length
      : 0;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentProduct) {
      addItem(
        {
          id: currentProduct.id,
          name: currentProduct.name,
          price: currentProduct.unitPrice,
        },
        1
      );
      toggleCart();
    }
  };

  return (
    <div className="w-full space-y-4 my-10 border border-gray-200 rounded-xl p-6 relative min-h-[50vh] md:min-h-[40vh]">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-base text-black font-black">
            Product Details
          </span>
          <span className="bg-gray-100 p-2 rounded-lg text-xs text-black font-black">
            IN STOCK
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSaveProduct}
            className="flex items-center relative justify-center space-x-1 border py-2.5 px-6 rounded-lg bg-white transition duration-500 hover:scale-105 hover:border-secondary"
          >
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
            <span className="text-secondary">
              <Heart size={16} />
            </span>
            <span className="text-black font-black text-sm">Save</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col md:flex-row justify-between items-start py-8">
        <div>
          <h1 className="text-lg text-black font-black">{product?.name}</h1>
          <div className="flex items-center mt-2">
            <p className="text-sm font-bold text-[#c1cf16]">
              {product?.unitPrice.toLocaleString()} Rwf
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm text-black font-black mb-2">Description</h2>
        <p className="text-gray-600 text-sm font-semibold">
          {product?.description}
        </p>
      </div>

      {/* Reviews */}
      <div className="my-8">
        <h2 className="text-base font-semibold text-gray-800 mb-2">Reviews</h2>
        <div className="flex items-center">
          <div className="flex text-secondary">{/* Star icon */}</div>
          <span className="ml-2 text-gray-600 text-sm">
            {averageRating.toFixed(1)} ({product?.reviews.length} Reviews)
          </span>
        </div>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 pb-12">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className="p-2.5 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            <Minus size={16} />
          </button>
          <span className="text-center text-sm bg-gray-100 py-2 px-4 rounded-md">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="p-2.5 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex items-center space-x-2 mt-4 md:mt-0 bg-[#c1cf16] text-black px-4 py-2.5 font-black rounded-md hover:bg-[#b3b92d] transition duration-300"
        >
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
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>

          {/* Shopping cart icon */}
          <span className="font-semibold text-sm">Add To Cart</span>
        </button>
      </div>

      {/* Store Info */}
      <div className="flex justify-between items-center absolute bottom-0 w-[95%]">
        <div className="flex items-center space-x-2">
          <span className="text-base text-black font-black">Store Info:</span>
          <span className="flex items-center space-x-2 p-2">
            <div className="w-10 h-10 rounded-full relative">
              {storeInfo?.image ? (
                <Image
                  src={storeInfo.image}
                  alt={`${storeInfo.name} logo`}
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">No Image</span>
                </div>
              )}
            </div>
            <p className="text-sm font-semibold">
              {storeInfo?.name || storeData?.name || "Store"}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
