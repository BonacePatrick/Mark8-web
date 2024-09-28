import RecentProductsPage from "../products/RecentProducts";
import CTA from "./CTA";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";

export default function HomeUIS() {
  return (
    <>
      <div>
        <Navbar/>
        <Hero />
        <RecentProductsPage />
        <CTA />
        <Footer/>
      </div>
    </>
  );
}
