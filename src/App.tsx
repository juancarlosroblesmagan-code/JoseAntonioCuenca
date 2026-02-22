import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Brands from './components/Brands';
import TrustSection from './components/TrustSection';
import ProductGallery from './components/ProductGallery';
import Promotions from './components/Promotions';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Brands />
        <TrustSection />
        <ProductGallery />
        <Promotions />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
