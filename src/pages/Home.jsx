import CategoriesSection from "../components/CategoriesSection";
import DenimPants from "../components/DenimPants";
import EditorialBanner from "../components/EditorialBanner";
import FashionSection from "../components/FashionSection";
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
       <FashionSection />
       <FeaturedProducts/>
       <PromoSection/>
       <SaleProducts/>
       <PromoBanner />
       <OldMoneyShirt/>
       <Panjabi/>
       <DenimPants/>
       <EditorialBanner/>
       <MenCategory />
    </div>
  )
}
