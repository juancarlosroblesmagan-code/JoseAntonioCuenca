import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SobreNosotrosPage from './pages/SobreNosotrosPage';
import NuestrasFirmasPage from './pages/NuestrasFirmasPage';
import ProductosPage from './pages/ProductosPage';
import FAQPage from './pages/FAQPage';
import ContactoPage from './pages/ContactoPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre-nosotros" element={<SobreNosotrosPage />} />
          <Route path="/nuestras-firmas" element={<NuestrasFirmasPage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/preguntas-frecuentes" element={<FAQPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
