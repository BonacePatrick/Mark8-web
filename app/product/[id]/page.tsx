import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cookies } from 'next/headers';
import { fetchProductById } from "@/services/api-client";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";
import Breadcrumb from "@/components/products/Breadcrumb";
import LoadingSpinner from "@/components/products/LoadingSpinner";
import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import RelatedProducts from "@/components/products/RelatedProducts";
import Navbar from "@/components/home/Navbar";
import { AxiosError } from "axios";

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const accessToken = cookies().get('accessToken')?.value;
    const response = await fetchProductById(params.id, accessToken);
    const product = response.data;

    if (!product) {
      return {
        title: "Product Not Found",
      };
    }
    return {
      title: `${product.name} | Mark8`,
      description: product.description,
    };
  } catch (error) {
    console.error("Error fetching product metadata:", error);
    return {
      title: "Error | Your Store Name",
      description: "An error occurred while fetching product details.",
    };
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const accessToken = cookies().get('accessToken')?.value;

  try {
    const response = await fetchProductById(params.id, accessToken);
    const product = response.data;

    if (!product) {
      notFound();
    }

    return (
      <> 
        <Navbar/>
        <div className="container mx-auto px-4 py-8">
        <Breadcrumb productName={product.name} />
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <Suspense fallback={<LoadingSpinner />}>
                <ProductGallery images={product.thumbnail} />
              </Suspense>
            </div>
            <div className="md:flex-1 px-4">
              <Suspense fallback={<LoadingSpinner />}>
                <ProductInfo productId={params.id} />
              </Suspense>
            </div>
          </div>
        </div>
        <Suspense fallback={<LoadingSpinner />}>
          <RelatedProducts categoryId={product.category.id} currentProductId={product.id} />
        </Suspense>
        <CTA />
        <Footer />
      </>
    );
  } catch (error) {
    if ((error as AxiosError).response?.status === 401) {
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
          <p>Please log in to view this product.</p>
        </div>
      );
    }
    notFound();
  }
}