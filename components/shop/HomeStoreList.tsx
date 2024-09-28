"use client";

import { FC, useMemo } from "react";
import Image from "next/image";
import { Store, useShopStore } from "@/store/shop-stores/shopStore";
import { coverImage } from "@/app/assets";
import Link from "next/link";

const HomeStoreItem: FC<{ store: Store }> = ({ store }) => {
  const imageUrl = store.logoUrl?.trim() ? store.logoUrl : coverImage.src;

  return (
    <Link href={`/store/${store.id}`} className="flex items-center space-x-3 p-2 bg-white hover:bg-gray-100 rounded-lg">
      <span className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
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
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = coverImage.src;
          }}
        />
      </span>
      <div className="flex-1">
        <h4 className="font-semibold">{store.name}</h4>
        <p className="text-sm text-gray-500">
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
    </Link>
  );
};

const HomeStoreList: FC = () => {
  const getFilteredStores = useShopStore((state) => state.getFilteredStores);
  const searchTerm = useShopStore((state) => state.searchTerm);
  
  const sortedStores = useMemo(() => {
    const stores = getFilteredStores();
    return stores.sort((a, b) => b.numberOfProducts - a.numberOfProducts);
  }, [getFilteredStores, searchTerm]);

  return (
    <div className="space-y-3">
      {sortedStores.map((store) => (
        <HomeStoreItem key={store.id} store={store} />
      ))}
    </div>
  );
};

export default HomeStoreList;