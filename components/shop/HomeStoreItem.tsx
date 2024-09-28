"use client";

import { coverImage } from "@/app/assets";
import { useShopStore } from "@/store/shop-stores/shopStore";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";

interface HomeStoreItemProps {
  storeId: string;
}

const HomeStoreItem: FC<HomeStoreItemProps> = ({ storeId }) => {
  const store = useShopStore((state) =>
    state.stores.find((s) => s.id === storeId)
  );

  const [imageError, setImageError] = useState(false);

  if (!store) return null;

  // Fallback to coverImage if imageError is true or if logoUrl is not valid
  const imageUrl =
    !imageError && store.logoUrl?.trim() ? store.logoUrl : coverImage.src;

  return (
    <Link href={`/stores/${storeId}`} className="block">
      <div className="flex items-center space-x-3 p-2 bg-white hover:bg-gray-100 rounded-lg">
        <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden">
          <Image
            src={imageUrl}
            alt={`${store.name} logo`}
            className="w-full h-full object-cover"
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
            placeholder="blur"
            blurDataURL={coverImage.src}
            onError={() => setImageError(true)} // Set error state if image fails to load
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{store.name}</h4>
          <p className="text-xs text-gray-500">
            {store.numberOfProducts} Products
          </p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
};

export default HomeStoreItem;