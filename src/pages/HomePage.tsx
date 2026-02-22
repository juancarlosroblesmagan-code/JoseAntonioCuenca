import Hero from '../components/Hero';
import About from '../components/About';
import Brands from '../components/Brands';
import TrustSection from '../components/TrustSection';
import ProductGallery from '../components/ProductGallery';
import Promotions from '../components/Promotions';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Brands />
      <TrustSection />
      <ProductGallery />
      <Promotions />
      <FAQ />
      <Contact />
    </>
  );
};

export default HomePage;
