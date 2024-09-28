import { FC } from "react";
import ProductCard from "./ProductCard";
import { useProductStore } from "@/store/product-stores/productsStore";
import ProductSkeleton from "./ProductSkeleton"

const ProductGrid: FC = () => {
  const products = useProductStore((state) => state.products);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { isLoading } = useProductStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard  productId={product.id} />
          {isLoading &&
            skeletons.map((skeleton) => <ProductSkeleton key={skeleton} />)}
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
