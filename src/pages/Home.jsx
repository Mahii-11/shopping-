import CategoriesSection from "../components/CategoriesSection";
import FeaturedProducts from "../components/FeaturedProducts";
import HeroSection from "../components/HeroSection";
import OldMoneyShirt from "../components/OldMoneyShirt";
import Panjabi from "../components/Panjabi";
import PromoBanner from "../components/PromoBanner";
import PromoSection from "../components/PromoSection";
import SaleProducts from "../components/SaleProducts";
export default function Home() {
  return (
    <div>
       <HeroSection />
       <CategoriesSection/>
       <FeaturedProducts/>
       <PromoSection/>
       <SaleProducts/>
       <PromoBanner />
       <OldMoneyShirt/>
       <Panjabi/>
    </div>
  )
}
