import { useState } from 'react';
import './App.css';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Services from './sections/Services';
import HowItWorks from './sections/HowItWorks';
import About from './sections/About';
import Professionals from './sections/Professionals';
import Testimonials from './sections/Testimonials';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero onSearch={handleSearch} />
        <Services />
        <HowItWorks />
        <About />
        <Professionals 
          searchQuery={searchQuery} 
          selectedService="" 
        />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
