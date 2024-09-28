import PrelineScript from "@/components/PrelineScript";
import CartModal from "@/components/products/CartModel";
import QueryProviders from "@/utils/QueryProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";

// Font
const NunitoRegular = localFont({
  src: "./fonts/Nunito-Regular.ttf",
  weight: "500",
});

export const metadata: Metadata = {
  title: "Mark8 | E-commerce app",
  description:
    "This is an e-commerce app where users can view and purchase products, and store owners can create stores and list their products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${NunitoRegular.className} antialiased`}>
        <QueryProviders>
          <Toaster />
          <div className="md:mx-4">
            {children}
          </div>
          <CartModal />
        </QueryProviders>
      </body>
      <PrelineScript />
    </html>
  );
}
