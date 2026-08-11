import CategoriesSection from "../components/CategoriesSection";
import DenimPants from "../components/DenimPants";
import FeaturedProducts from "../components/FeaturedProducts";
import HeroSection from "../components/HeroSection";
import MenCategory from "../components/MenCategory";
import OldMoneyShirt from "../components/OldMoneyShirt";
import Panjabi from "../components/Panjabi";
import SaleProducts from "../components/SaleProducts";


export default function Home() {
  return (
    <div>
       <HeroSection />
       <CategoriesSection/>
       <FeaturedProducts/>
       <SaleProducts/>
       <OldMoneyShirt/>
       <Panjabi/>
       <DenimPants/>
       <MenCategory />
    </div>
  )
}
