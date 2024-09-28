"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "../home/Navbar";
import CTA from "../home/CTA";
import Footer from "../home/Footer";

const ProductPageHero = dynamic(() => import("./ProductPageHero"), {
  ssr: false,
  loading: () => <div>Loading hero...</div>,
});
const SavedProductsList = dynamic(() => import("./SavedProductsList"), {
  ssr: false,
  loading: () => <div>Loading saved products...</div>,
});

const SavedProductsPage = () => {
  return (
    <>
      <Navbar />
      <ProductPageHero />
      <SavedProductsList />
      <CTA />
      <Footer/>
    </>
  );
};

export default SavedProductsPage;
