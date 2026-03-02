import { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Star, Phone, CheckCircle } from 'lucide-react';
import { COMPANY_INFO } from '@/data/providers';

interface HeroProps {
  onSearch: (query: string) => void;
}

const Hero = ({ onSearch }: HeroProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      const servicesSection = document.querySelector('#services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const stats = [
    { icon: CheckCircle, value: '15+', label: 'Years Experience' },
    { icon: Star, value: '4.9', label: 'Customer Rating' },
    { icon: Phone, value: '24/7', label: 'Support Available' },
  ];

  const popularServices = [
    'Mason Work',
    'Plumbing',
    'Tilling',
    'Carpentry',
    'Electricals',
    'Painting',
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white"
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      
      {/* Decorative Shape */}
      <div 
        className={`absolute bottom-0 right-0 w-64 h-64 transition-all duration-1000 ${
          isVisible ? 'opacity-10' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(135deg, #3553fc 0%, transparent 70%)',
          borderRadius: '100% 0 0 0',
          animation: 'float 8s ease-in-out infinite',
        }}
      />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-medium text-primary">{COMPANY_INFO.tagline}</span>
            </div>

            {/* Title */}
            <h1 
              className={`mb-6 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="text-primary">{COMPANY_INFO.name}</span>
              <br />
              <span className="text-3xl lg:text-4xl">Your Trusted Building Partner</span>
            </h1>

            {/* Description */}
            <p 
              className={`text-lg text-brand-gray/80 mb-8 leading-relaxed transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              We provide professional construction services including masonry, plumbing, tilling, 
              carpentry, electricals, painting, water well drilling, manhole construction, and biodigester installation.
            </p>

            {/* Search Box */}
            <form 
              onSubmit={handleSearch}
              className={`relative mb-8 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="What service do you need?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-36 py-4 bg-white border border-gray-200 rounded-xl text-brand-gray placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 shadow-card"
                />
                <button
                  type="submit"
                  className="absolute right-2 btn-primary py-2.5 px-5 text-sm"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Quick Tags */}
            <div 
              className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="text-sm text-brand-gray/60">Popular:</span>
              {popularServices.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    onSearch(tag);
                    const servicesSection = document.querySelector('#services');
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-sm text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-wrap gap-4 mb-12 transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="btn-primary group"
              >
                <Phone className="w-4 h-4" />
                Call Now
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <button
                onClick={() => {
                  const servicesSection = document.querySelector('#services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-secondary"
              >
                View All Services
              </button>
            </div>

            {/* Stats */}
            <div 
              className={`flex flex-wrap gap-8 transition-all duration-700 delay-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-xl text-brand-black">{stat.value}</p>
                    <p className="text-sm text-brand-gray/60">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image Grid */}
          <div 
            className={`relative lg:pl-8 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-lg animate-float">
                  <img
                    src="/service-masonry.jpg"
                    alt="Masonry work"
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                  <img
                    src="/service-plumbing.jpg"
                    alt="Plumbing service"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                  <img
                    src="/service-tiling.jpg"
                    alt="Tilling service"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg animate-float" style={{ animationDelay: '1.5s' }}>
                  <img
                    src="/service-carpentry.jpg"
                    alt="Carpentry work"
                    className="w-full h-40 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div 
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-card p-4 animate-float"
              style={{ animationDelay: '2s' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-brand-black">Call Us Now</p>
                  <p className="text-sm text-primary font-medium">{COMPANY_INFO.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
