import CategoriesSection from "../components/CategoriesSection";
import DenimPants from "../components/DenimPants";
import FeaturedProducts from "../components/FeaturedProducts";
import HeroSection from "../components/HeroSection";
import MenCategory from "../components/MenCategory";
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
       <DenimPants/>
       <MenCategory />
    </div>
  )
}
