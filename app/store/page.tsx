import ShopStorePage from "@/components/shop/ShopStorePage";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Stores | Mark8",
  description: "Your stores on Mark8",
}

const StorePage = () => {
  return (
    <>  
      <ShopStorePage />
    </>
  );
};

export default StorePage;
