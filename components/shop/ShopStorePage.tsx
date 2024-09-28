import CTA from "../home/CTA";
import Footer from "../home/Footer";
import Navbar from "../home/Navbar";
import ShopStoreLists from "./ShopStoreLists";
import StoreHero from "./StoreHero";

const ShopStorePage = () => {
  return (
    <> 
      <Navbar/>
      <StoreHero />
      <ShopStoreLists />
      <CTA />
      <Footer/>
    </>
  );
};

export default ShopStorePage;
