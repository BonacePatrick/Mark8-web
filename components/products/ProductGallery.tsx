"use client";

import { coverImage } from "@/app/assets";
import Image from "next/image";
import { FC, useState } from "react";

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: FC<ProductGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col w-full overflow-hidden group bg-white border shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 space-y-4 my-10 border-gray-200 rounded-xl relative min-h-[50vh] md:min-h-[40vh]">
      <div className="relative w-full h-96">
        <Image
          src={images[selectedImage]}
          alt="Product image"
          width={500}
          height={500}
          loading="lazy"
          decoding="async"
          placeholder="blur"
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          blurDataURL={coverImage.toString()}
          className="object-cover object-center w-full h-full group-hover:scale-105 duration-500 transition"
        />
      </div>
      <div className="grid grid-cols-4 gap-1 p-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={` w-12 h-12 overflow-hidden rounded-lg ${
              index === selectedImage ? "ring-2 ring-secondary" : ""
            }`}
          >
            <Image
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              width={50}
              height={50}
              decoding="async"
              placeholder="blur"
              quality={90}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              blurDataURL={coverImage.toString()}
              className="object-cover w-full h-full object-center"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
