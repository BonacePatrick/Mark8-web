"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "../home/Navbar";
import CTA from "../home/CTA";
import Footer from "../home/Footer";
import SpinnerLoading from "../Load-indicator/Spinner";

const ProductPageHero = dynamic(() => import("./ProductPageHero"), {
  ssr: false,
  loading: () => <SpinnerLoading/>,
});
const SavedProductsList = dynamic(() => import("./SavedProductsList"), {
  ssr: false,
  loading: () => <SpinnerLoading/>,
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
