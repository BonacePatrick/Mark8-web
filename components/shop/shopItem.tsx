import { coverImage, deliveryBox } from "@/app/assets";
import { useShopStore } from "@/store/shop-stores/shopStore";
import { Heart, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ShopItemProps {
  shop: {
    id: string;
    name: string;
    numberOfProducts: number;
    logoUrl: string;
    description?: string;
    rating?: number;
    reviewCount?: number;
  };
}

const ShopItem: React.FC<ShopItemProps> = ({ shop }) => {
  const { getTopProducts } = useShopStore();
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchTopProducts = async () => {
      const products = await getTopProducts(shop.id);
      setTopProducts(products.slice(0, 3)); // Ensure we only show top 3 products
    };
    fetchTopProducts();
  }, [shop.id, getTopProducts]);

  const productImageUrl =
    !imageError && shop.logoUrl ? shop.logoUrl : coverImage.src;

  return (
    <div className="w-full md:w-[98%] mx-auto p-4 space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 relative group">
                <Image
                  src={productImageUrl}
                  alt={"store logo"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg group-hover:scale-105 transition duration-500"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  decoding="async"
                  placeholder="blur"
                  blurDataURL={coverImage.toString()}
                  onError={() => setImageError(true)}
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold whitespace-nowrap">
                  {shop.name}
                </h2>
                <p className="text-gray-500">
                  {shop.numberOfProducts} Products
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="#" passHref className="flex items-center">
                <span className="bg-[#c1cf16] text-sm rounded-lg px-4 py-3 flex items-center space-x-2 hover:bg-opacity-80 transition duration-500 hover:bg-white hover:border-[#c1cf16] hover:border hover:scale-105">
                  <span className="text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </span>
                  <span className="whitespace-nowrap font-semibold">
                    View Profile
                  </span>
                </span>
              </Link>
              <button className="p-3 border border-gray-300 rounded-lg bg-white transition duration-500 hover:scale-105 hover:border-[#c1cf16]">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-3 border border-gray-300 rounded-lg bg-white transition duration-500 hover:scale-105 hover:border-[#c1cf16]">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="border-b border-[#E5E5E5] w-full md:w-[78.7rem] mx-[-1.5rem]"></div>
          
          <div className="flex flex-col lg:flex-row lg:space-x-2">
            <div className="lg:w-[50%]">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-gray-600">
                    {shop.description || "No description available."}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2.5 bg-white border rounded-full text-sm text-gray-600 font-semibold transition duration-500 hover:scale-105 hover:border-[#c1cf16] cursor-pointer">
                      Vectors
                    </span>
                    <span className="px-4 py-2.5 bg-white border rounded-full text-sm text-gray-600 font-semibold transition duration-500 hover:scale-105 hover:border-[#c1cf16] cursor-pointer">
                      Icons
                    </span>
                    <span className="px-4 py-2.5 bg-white border rounded-full text-sm text-gray-600 font-semibold transition duration-500 hover:scale-105 hover:border-[#c1cf16] cursor-pointer">
                      Backgrounds
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Reviews</h3>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <span className="text-[#c1cf16]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span className="font-semibold">
                        {shop.rating?.toFixed(1) || "N/A"}
                      </span>
                    </span>
                    <span className="text-gray-500">
                      ({shop.reviewCount || 0} reviews)
                    </span>
                  </div>
                </div>

                <button className="py-3 px-4 flex items-center justify-center space-x-3 bg-white border text-black font-semibold text-sm rounded-lg transition duration-500 hover:scale-105 hover:border-secondary">
                  <span className="text-secondary">
                    <Image
                      src={deliveryBox}
                      alt="delivery-box"
                      className="h-5 w-auto"
                    />
                  </span>
                  <span>Explore Products</span>
                </button>
              </div>
            </div>

            <div className="lg:w-2/3 mt-6 lg:mt-0">
              {topProducts.length === 0 &&  <h3 className="font-semibold mb-4">No products added yet.</h3>}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {topProducts.map((product: Product) => (
                  <div
                    key={product.id}
                    className="flex flex-col bg-white border rounded-xl overflow-hidden transition duration-500 hover:scale-105"
                  >
                    <Image
                      className="w-full h-48 object-cover"
                      src={product.image || coverImage.src}
                      alt={product.name}
                      width={300}
                      height={200}
                    />
                    <div className="p-4">
                      <h4 className="font-semibold mb-2">{product.name}</h4>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-bold text-[#c1cf16]">
                            {product.price} Rwf
                          </span>
                        </div>
                        <button className="p-2 border rounded-lg text-gray-400 hover:bg-white transition duration-500 hover:scale-105 hover:border-secondary">
                          <Heart size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
