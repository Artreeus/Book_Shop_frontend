import Hero from "../components/Hero";
import FeaturedBook from "../components/FeaturedBook";
import ProductCard from "../components/ProductCard";
import Blog from "../components/Blog";
import ContactUs from "../components/shared-component/ContactUs";
import HomePageSections from "../components/MoreSections";

const Home = () => {
  return (
    <div>
      <Hero />
      <ProductCard />
      <FeaturedBook />
      <Blog />
      <HomePageSections/>
      <ContactUs />
    </div>
  );
};

export default Home;
