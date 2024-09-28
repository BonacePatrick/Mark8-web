import React from "react";
import SingleStorePage from "@/components/shop/SingleStorePage";
import { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Stores Query | Mark8",
  description: "Your store on Mark8",
};

export default function StoreQueryPage() {
  return (
    <>
      <Navbar />
      <div className="py-7 md:py-14">
        <SingleStorePage />
      </div>
      <CTA />
      <Footer />
    </>
  );
}
